import React, { useState, useRef, useCallback, useMemo, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContext } from '../../../Layouts/Toast/Logic/logic';
import { AuthContext } from '../../../../contexts/AuthContext';
import queryClient from '../../../../utils/queryClient';

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
 * @returns {JSX.Element} Rendered input field with floating label
 */
const InputField = React.memo(({
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
}) => {
  // Memoize computed class names
  const spanClassName = useMemo(() => `
    placeholder absolute left-4 
    ${value ? 'top-0 text-xs' : 'top-1/2 text-base'} 
    ${disabled && 'cursor-not-allowed'} 
    px-1 bg-white transform -translate-y-1/2 text-gray-600 transition-all
  `, [value, disabled]);

  // Memoize click handler
  const handleSpanClick = useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <div className="relative input-container">
      <span
        ref={spanRef}
        onClick={handleSpanClick}
        className={spanClassName}
      >
        {placeholder}
      </span>
      <input
        ref={inputRef}
        type={type}
        name={name}
        value={value}
        onInput={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        onChange={(e) => validate && validate(e.target.value)}
        className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-orange"
      />
    </div>
  );
});

InputField.displayName = 'InputField';

/**
 * Form Component - Handles user authentication (login/register)
 * @param {Object} props
 * @param {string} props.param - Authentication type ('login' or 'register')
 * @param {Function} props.setIsLoggedIn - Function to update login state
 */

const Form = ({ param }) => {
  const { setData } = useContext(ToastContext);
  const { handleLogIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginData, setLoginData] = useState({});

  const refs = {
    email: { input: useRef(null), span: useRef(null) },
    password: { input: useRef(null), span: useRef(null) },
    confirmPassword: { input: useRef(null), span: useRef(null) },
    name: { input: useRef(null), span: useRef(null) },
  };

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

  const editInputValue = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleSuccess = useCallback(async (response) => {
    if (param === 'login' && response.status === 200) {
      handleLogIn();
    } else if (param === 'register') {
      setData(true, 'Registration successful, please login');
      navigate('/login');
    }
    
    setLoginData((prev) => ({ ...prev, password: '', confirmPassword: '' }));
    setIsSubmitting(false);
  }, [param, navigate, setData, queryClient]);


  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/${param}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.msg || 'Authentication failed');
      }
      
      // Return structured response
      return { 
        status: response.status, 
        data: responseData 
      };
    },
    onSuccess: handleLogIn,
    onError: handleSuccess,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await mutation.mutate(loginData);
    } catch (error) {
      setData(false, 'Authentication failed');
      console.error('Form submission error:', error);
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/.test(password);

  const isFormValid = () => {
    if (!loginData.email || !validateEmail(loginData.email) || !loginData.password) return false;
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
        className={`w-full p-4 rounded-md shadow-md text-white font-semibold ${
          isFormValid() && !isSubmitting ? 'bg-orange' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {isSubmitting ? 'Processing...' : param === 'login' ? 'Login' : 'Register'}
      </button>
      <p className="text-center text-gray-600">
        {param === 'login' ? (
          <>
            Don't have an account?{' '}
            <Link to="/register" className="text-orange hover:underline font-medium">
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link to="/login" className="text-orange hover:underline font-medium">
              Login
            </Link>
          </>
        )}
      </p>
    </form>
  );
};

export default Form;