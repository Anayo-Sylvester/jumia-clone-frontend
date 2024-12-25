import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { handleCreateCart } from "./Logic/logic";
import { Navigate, useNavigate } from "react-router";
import { ToastContext } from "../../../Layouts/Toast/Logic/logic";

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 
  'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 
  'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo',
  'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

const InputField = ({ label, type, name, value, onChange, options }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 p-4 block w-full rounded-md border-gray-300 shadow-lg focus:border-orange-500 focus:ring-orange-500"
          required
        >
          <option value="">Select a {label.toLowerCase()}</option>
          {options?.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 p-4 block w-full rounded-md border-gray-300 shadow-lg focus:border-orange-500 focus:ring-orange-500"
          required
        />
      )}
    </div>
  );
};

const formFields = [
  { label: 'Street Address', type: 'text', name: 'street' },
  { label: 'City', type: 'text', name: 'city' },
  { label: 'State', type: 'select', name: 'state', options: NIGERIAN_STATES }
];

const OrderConfirmationUi = ({ data }) => {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jumiaCloneToken')}`
        },
        body: JSON.stringify({
          items: data.Hits,
          shippingAddress: formData
        })
      });

      if (!response.ok) throw new Error('Failed to place order');
      
      // Handle successful order
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const {setData} = useContext(ToastContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form className="space-y-4">
        {formFields.map(field => (
          <InputField
            key={field.name}
            {...field}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          onClick={async(e) =>{ 
            e.preventDefault();
            const isSuccessful = await handleCreateCart({ Hits: data.Hits, formData })
            if(isSuccessful) {
              navigate('/order');
            }else{
              setData(false,'Failed to create Order')
            }
          }}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white 
            ${isFormValid ? 'bg-orange hover:bg-orange-dark' : 'bg-gray-300'}
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {isLoading ? 'Processing...' : 'Confirm Order'}
        </button>
      </form>
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string)
};

OrderConfirmationUi.propTypes = {
  data: PropTypes.shape({
    Hits: PropTypes.array.isRequired,
    nbHits: PropTypes.number.isRequired
  }).isRequired
};

export default OrderConfirmationUi;