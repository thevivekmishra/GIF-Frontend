import React, { useState } from 'react';
import login from '../assets/login.png';
import axios from 'axios';
import toast from 'react-hot-toast';

const Auth = ({ onLoginSuccess }) => {
  const [state, setState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Loading state

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Set loading state to true
    setIsLoading(true);

    const url = state === 'Sign Up' ? 'https://gif-backend-ve0b.onrender.com/api/v1/signup' : 'https://gif-backend-ve0b.onrender.com/api/v1/login';

    const userData = {
      email,
      password,
      ...(state === 'Sign Up' && { name }),
    };

    try {
      const response = await axios.post(url, userData);
      console.log('Response:', response.data);
      toast.success(`${state === 'Sign Up' ? 'Registration' : 'Login'} Successful`);

      // After successful login/signup, pass the token to the parent (App.js)
      onLoginSuccess(response.data.token);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred, please try again later.';
      toast.error(errorMessage);
      console.error('Error:', errorMessage);
    } finally {
      setIsLoading(false);  // Set loading state to false after request completes
    }
  };

  return (
    <div className="flex justify-center items-center h-screen px-2 pt-10 w-full gap-4 bg-gray-200">
      <div className="hidden md:block">
        <img src={login} alt="Login" className="h-[500px] w-[600px]" />
      </div>

      <div className="w-full max-w-md p-2 md:p-7 bg-white rounded-lg border">
        <form onSubmit={onSubmitHandler}>
          <h2 className="text-2xl font-bold mb-4 text-center">
            {state === 'Sign Up' ? 'Sign Up' : 'Login'}
          </h2>
          
          {/* Show "Please wait..." while loading */}
          {isLoading && (
            <div className="mb-4 text-center text-gray-500">Please wait...</div>
          )}

          {state === 'Sign Up' && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                disabled={isLoading}  // Disable the input while loading
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="abc@gmail.com"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              disabled={isLoading}  // Disable the input while loading
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="******"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              disabled={isLoading}  // Disable the input while loading
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className={`w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}  // Disable the button while loading
            >
              {state === 'Sign Up' ? 'Create Account' : 'Login'}
            </button>
          </div>

          <div className="text-center">
            {state === 'Sign Up' ? (
              <p>
                Already have an account?{' '}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setState('Login')}
                >
                  Login Here
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setState('Sign Up')}
                >
                  Create Account
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
