import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
    phoneCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    pan: '',
    aadhar: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First Name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last Name is required';
    if (!formData.username.trim()) errs.username = 'Username is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Valid email required';
    if (!formData.password || formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!formData.phoneCode.trim()) errs.phoneCode = 'Country code required';
    if (!/^\d{10}$/.test(formData.phoneNumber)) errs.phoneNumber = '10 digit phone number required';
    if (!formData.country) errs.country = 'Country is required';
    if (!formData.city) errs.city = 'City is required';
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan)) errs.pan = 'Invalid PAN number';
    if (!/^\d{12}$/.test(formData.aadhar)) errs.aadhar = '12 digit Aadhar number required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      navigate('/summary', { state: formData });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Registration Form</h2>
      {['firstName', 'lastName', 'username'].map(field => (
        <div key={field} className="form-group">
          <input
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.replace(/([A-Z])/g, ' $1')}
          />
          {errors[field] && <p className="error">{errors[field]}</p>}
        </div>
      ))}

      <div className="form-group">
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <input
          type={formData.showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <label>
          <input
            type="checkbox"
            onChange={() => setFormData({ ...formData, showPassword: !formData.showPassword })}
          /> Show Password
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <div className="form-group-row">
        <input
          name="phoneCode"
          placeholder="Country Code"
          value={formData.phoneCode}
          onChange={handleChange}
        />
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      {(errors.phoneCode || errors.phoneNumber) && (
        <p className="error">{errors.phoneCode || errors.phoneNumber}</p>
      )}

      <div className="form-group">
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>
        {errors.country && <p className="error">{errors.country}</p>}
      </div>

      <div className="form-group">
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">Select City</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="New York">New York</option>
        </select>
        {errors.city && <p className="error">{errors.city}</p>}
      </div>

      <div className="form-group">
        <input
          name="pan"
          value={formData.pan}
          onChange={handleChange}
          placeholder="PAN Number"
        />
        {errors.pan && <p className="error">{errors.pan}</p>}
      </div>

      <div className="form-group">
        <input
          name="aadhar"
          value={formData.aadhar}
          onChange={handleChange}
          placeholder="Aadhar Number"
        />
        {errors.aadhar && <p className="error">{errors.aadhar}</p>}
      </div>

      <button
        type="submit"
        className="submit-btn"
      >
        Submit
      </button>
    </form>
  );
}