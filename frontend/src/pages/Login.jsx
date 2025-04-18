import React, { useState } from 'react';
import api from '../api/axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { TOAST_MESSAGES } from '../constants/messages';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      //  Use custom Axios instance
      const res = await api.post('/auth/login', {
        email,
        password,
      });

      //  Save token in localStorage
      localStorage.setItem('token', res.data.token);
      toast.success(TOAST_MESSAGES.LOGIN_SUCCESS);
      //  Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } catch (err) {
      toast.error(TOAST_MESSAGES.LOGIN_FAILED);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-600">Project Tracker</h1>
          <p className="text-gray-500 mt-2">Welcome back, please login.</p>
        </div>

        <div className="space-y-4">
          <InputField
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />

          <div className="relative">
            <InputField
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              required
            />

            <Button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-sm text-gray-500 hover:text-gray-700 px-0 py-0 bg-transparent"
              text={showPassword ? 'Hide' : 'Show'}
              
            />
          </div>

          <Button
            text="Login"
            onClick={handleLogin}
            variant="primary"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          />
        </div>

        <p className="text-sm text-gray-500 text-center mt-6">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
            Register
          </a>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
