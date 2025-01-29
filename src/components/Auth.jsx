import React, { useState } from 'react';
import login from '../assets/login.gif';
import axios from 'axios';
import toast from 'react-hot-toast';

const Auth = ({ onLoginSuccess }) => {
  const [state, setState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const url = state === 'Sign Up' ? 'http://localhost:4000/api/v1/signup' : 'http://localhost:4000/api/v1/login';

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
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="hidden md:block">
        <img src={login} alt="Login" className="h-[500px] w-auto" />
      </div>

      <div className="w-full max-w-md p-6 bg-white rounded-lg border">
        <form onSubmit={onSubmitHandler}>
          <h2 className="text-2xl font-bold mb-4 text-center">
            {state === 'Sign Up' ? 'Sign Up' : 'Login'}
          </h2>
          <p className="text-center mb-6">
            Please {state === 'Sign Up' ? 'Sign Up' : 'Login'} to generate GIF
          </p>

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
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
