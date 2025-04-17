import React, { useState } from 'react';
import api from '../api/axios'; //  Import custom axios instance
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const getPasswordStrength = (pass) => {
    if (pass.length < 8) return 'Weak';
    const hasLetters = /[a-zA-Z]/.test(pass);
    const hasSymbols = /[\W_]/.test(pass);
    const hasNumbers = /\d/.test(pass);

    if (hasLetters && hasSymbols && hasNumbers) return 'Strong';
    if ((hasLetters && hasSymbols) || (hasLetters && hasNumbers)) return 'Medium';
    return 'Weak';
  };

  const validateInputs = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) newErrors.email = 'Email is required.';
    else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format.';

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/;
    if (!password) newErrors.password = 'Password is required.';
    else if (!passwordRegex.test(password))
      newErrors.password = 'Password must be at least 8 characters and include letters and a symbol.';

    if (!confirmPassword) newErrors.confirmPassword = 'Confirm your password.';
    else if (confirmPassword !== password)
      newErrors.confirmPassword = 'Passwords do not match.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateInputs()) {
      toast.error('Please fix the form errors');
      return;
    }

    try {
      // Use custom axios instance
      await api.post('/auth/register', { email, password });

      toast.success('Registered successfully! Redirecting...');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      toast.error('Registration failed. Try again later.');
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordStrength(getPasswordStrength(value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-600">Create an Account</h1>
          <p className="text-gray-500 mt-2">Sign up to get started!</p>
        </div>

        <div className="space-y-4">
          <div>
            <InputField
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <div className="relative">
              <InputField
                label="Password"
                name="password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                required
              />
              <Button
                text={showPassword ? 'Hide' : 'Show'}
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-8 text-sm text-gray-500 hover:text-gray-700 bg-transparent px-0 py-0"
              />
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            {password && (
              <div className="text-xs mt-1 text-gray-600">
                Password strength:{' '}
                <span
                  className={`font-semibold ${passwordStrength === 'Strong'
                    ? 'text-green-600'
                    : passwordStrength === 'Medium'
                      ? 'text-yellow-500'
                      : 'text-red-500'
                    }`}
                >
                  {passwordStrength}
                </span>
              </div>
            )}
          </div>

          <div>
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              required
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <Button
            text="Register"
            onClick={handleRegister}
            className="w-full text-white bg-green-600 hover:bg-green-700"
          />
        </div>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{' '}
          <Link to="/" className="text-green-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
