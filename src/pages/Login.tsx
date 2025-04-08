import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    console.log('Login component mounted');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Implement actual login logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      navigate('/questionnaire');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dietrium-light flex">
      {/* Left Panel with Logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-dietrium items-center justify-center">
        <div className="text-white text-center">
          <img
            src="/assets/logo.png"
            alt="Dietrium Logo"
            className="w-64 h-auto mb-6"
          />
          <h2 className="text-3xl font-semibold">Welcome to Dietrium</h2>
          <p className="mt-4 text-lg opacity-90">Your journey to better health starts here</p>
        </div>
      </div>

      {/* Right Panel with Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-bold text-dietrium-dark">Sign In</h3>
              <p className="text-gray-600 mt-2">Welcome back! Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-dietrium focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-dietrium focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-dietrium border-gray-300 rounded focus:ring-dietrium"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-dietrium hover:text-dietrium-dark"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-dietrium hover:bg-dietrium-dark text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-gray-600">Don't have an account?</span>{" "}
              <Link to="/signup" className="text-dietrium hover:text-dietrium-dark font-semibold">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 