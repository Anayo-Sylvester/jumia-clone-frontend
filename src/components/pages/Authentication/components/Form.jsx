import React, { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../../../../App';

/**
 * InputField Component - Reusable form input field with floating label
 * @param {Object} props - Component props
 * @param {string} props.type - Input type (text, email, password)
 * @param {string} props.name - Input name attribute
 * @param {string} props.placeholder - Input placeholder text
 * @param {string} props.value - Input value
 * @param {React.RefObject} props.spanRef - Reference to span element
 * @param {React.RefObject} props.inputRef - Reference to input element
 * @param {Function} props.onInput - Input change handler
 * @param {Function} props.onFocus - Focus event handler
 * @param {Function} props.onBlur - Blur event handler
 * @param {boolean} props.disabled - Input disabled state
 * @param {Function} props.validate - Validation function
 */
const InputField = ({
  type,
  name,
  placeholder,
  value,
  spanRef,
  inputRef,
  onInput,
  onFocus,
  onBlur,
  disabled,
  validate,
}) => (
  <div className="relative input-container">
    {/* Floating label implementation */}
    <span
      ref={spanRef}
      onClick={() => inputRef.current.focus()}
      className={`placeholder absolute left-4 ${value ? 'top-0 text-xs' : 'top-1/2 text-base'} ${disabled && 'cursor-not-allowed'} px-1 bg-white transform -translate-y-1/2 text-gray-600 transition-all`}
    >
      {placeholder}
    </span>
    <input
      type={type}
      name={name}
      ref={inputRef}
      value={value}
      onInput={onInput}
      onFocus={onFocus}
      onBlur={onBlur}
      title = {name==='confirm-password' && disabled ? ' Enter your password first' : ''}
      className={`input border-[1px] ${disabled && 'cursor-not-allowed'} border-gray-400 w-full p-4 rounded-md focus:border-orange focus:outline-none`}
      disabled={disabled}
    />
    {/* Validation error message */}
    {value && validate && !validate(value) && (
      <p className="text-red-500 text-sm mt-1">Invalid {name}</p>
    )}
    
  </div>
);

/**
 * Form Component - Handles user authentication (login/register)
 * @param {Object} props
 * @param {string} props.param - Authentication type ('login' or 'register')
 * @param {Function} props.setIsLoggedIn - Function to update login state
 */
const Form = ({ param, setIsLoggedIn,setIsToastVisible,setToastData}) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginData, setLoginData] = useState({});

  // References for form input elements
  const refs = {
    email: { input: useRef(null), span: useRef(null) },
    password: { input: useRef(null), span: useRef(null) },
    confirmPassword: { input: useRef(null), span: useRef(null) },
    name: { input: useRef(null), span: useRef(null) },
  };

  console.log('form')
  // Handlers for floating label animation
  const handleInputFocus = (spanRef) => {
    if (spanRef.current) {
      spanRef.current.style.top = '0';
      spanRef.current.style.fontSize = '12px';
    }
  };

  const handleInputBlur = (spanRef, inputRef) => {
    if (!inputRef.current?.value && spanRef.current) {
      spanRef.current.style.top = '50%';
      spanRef.current.style.fontSize = '16px';
    }
  };

  // Handle input changes
  const editInputValue = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  // API mutation setup using react-query
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${apiBaseUrl}/auth/${param}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log({response,responseData});
      return { data: responseData, status: response.status };
    },
    onSuccess: (response) => {
      // Handle successful authentication
      if (response.status === 200 && response.data?.token) {
        localStorage.setItem('jumiaCloneToken', response.data.token);
        setIsLoggedIn(true);
        navigate('/login');
        setToastData(prevData => ({
          ...prevData,
          message: 'Logged in successfully',
          success: !prevData.success
        }));
        setIsToastVisible(true);
      } else if (response.status === 201) {
        navigate('/login');
        setIsToastVisible(true);
        setToastData(prevData => ({
          ...prevData,
          message: 'Registered successfully, please login',
          success: true,
        }));
      } else {
        console.log(response);
        setLoginData((prev) => ({ ...prev, password: '', confirmPassword: '' }));
        setToastData(prevData => ({
          ...prevData,
          message: response.data.msg,
          success: false,
        }));
        setIsToastVisible(true);
      }
      setIsSubmitting(false);
    },
    onError: () => {
      setIsSubmitting(false);
      setLoginData((prev) => ({ ...prev, password: '', confirmPassword: '' }));
    },
  });

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await mutation.mutate(loginData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password must contain at least 8 characters, one letter, one number, and one special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/;
    return passwordRegex.test(password);
  };

  // Form validation
  const isFormValid =  () => {
    if (!loginData.email || !validateEmail(loginData.email) || !loginData.password) return false;
    console.log({firstCheck: !loginData.email || !validateEmail(loginData.email) || !loginData.password});
    if (param === 'register') {
      return (
        loginData.username &&
        validatePassword(loginData.password) &&
        loginData['confirm-password'] === loginData.password
      );
    }
    return true;
  };
  

  return (
    <form className="mt-5 flex flex-col gap-y-8" onSubmit={handleSubmit}>
      {param === 'register' && (
        <InputField
          type="text"
          name="username"
          placeholder="Enter Username*"
          value={loginData.username || ''}
          spanRef={refs.name.span}
          inputRef={refs.name.input}
          onInput={editInputValue}
          onFocus={() => handleInputFocus(refs.name.span)}
          onBlur={() => handleInputBlur(refs.name.span, refs.name.input)}
        />
      )}
      <InputField
        type="email"
        name="email"
        placeholder="Enter Email*"
        value={loginData.email || ''}
        spanRef={refs.email.span}
        inputRef={refs.email.input}
        onInput={editInputValue}
        onFocus={() => handleInputFocus(refs.email.span)}
        onBlur={() => handleInputBlur(refs.email.span, refs.email.input)}
        disabled={isSubmitting}
        validate={validateEmail}
      />
      <InputField
        type="password"
        name="password"
        placeholder="Enter Password*"
        value={loginData.password || ''}
        spanRef={refs.password.span}
        inputRef={refs.password.input}
        onInput={editInputValue}
        onFocus={() => handleInputFocus(refs.password.span)}
        onBlur={() => handleInputBlur(refs.password.span, refs.password.input)}
        disabled={isSubmitting}
        validate={param === 'register' ? validatePassword : undefined}
      />
      {param === 'register' && (
        <InputField
          type="password"
          name="confirm-password"
          placeholder="Confirm Password*"
          value={loginData['confirm-password'] || ''}
          spanRef={refs.confirmPassword.span}
          inputRef={refs.confirmPassword.input}
          onInput={editInputValue}
          onFocus={() => handleInputFocus(refs.confirmPassword.span)}
          onBlur={() => handleInputBlur(refs.confirmPassword.span, refs.confirmPassword.input)}
          disabled={!validatePassword(loginData.password) || isSubmitting}
        />
      )}
      <button
        type="submit"
        disabled={!isFormValid() || isSubmitting}
        onClick={(e)=>handleSubmit(e)}
        className={`w-full p-4 rounded-md shadow-md text-white font-semibold ${
          isFormValid() && !isSubmitting ? 'bg-orange' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {isSubmitting ? 'Processing...' : param === 'login' ? 'Login' : 'Register'}
      </button>
      <p className="text-sm">
        {param === 'login' ? (
          <>
            New to Jumia?{' '}
            <a href="/register" className="text-orange underline">
              Create an account
            </a>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <a href="/login" className="text-orange underline">
              Login
            </a>
          </>
        )}
      </p>
      <p className="text-sm">
        By continuing you agree to Jumia's{' '}
        <a
          href="https://my.jumia.com.ng/interaction/_VEatLsEYBXDzVW4b1prF/en-ng/terms-and-conditions"
          target="_blank"
          className="text-orange underline"
          rel="noopener noreferrer"
        >
          Terms and Conditions
        </a>
      </p>
    </form>
  );
};

export default Form;