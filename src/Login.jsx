import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient'; // Import your Supabase client
import Cookies from 'js-cookie';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Store token or session information if needed
      Cookies.set('token', data.session.access_token, { expires: 7 }); // Store token securely

      navigate('/dashboard'); // Redirect to the dashboard after successful login
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Invalid email or password');
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  return (
    <div className="min-h-screen bg-sky-900 flex items-center justify-center">
      <div className="container mx-auto flex justify-center">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h5 className="text-2xl font-bold text-center text-gray-800">Login</h5>
          <form onSubmit={submitHandler} className="mt-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
              />
            </div>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
            )}
            <div className="text-center">
              <button
                type="submit"
                className={`w-1/4 ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 rounded transition duration-150 ease-in-out`}
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
