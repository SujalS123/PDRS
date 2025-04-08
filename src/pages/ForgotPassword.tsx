import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-dietrium-light flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-dietrium-dark text-center">
            Forgot Password
          </h2>
          <p className="text-gray-600 text-center">
            Enter your email to reset your password
          </p>

          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="text-dietrium">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600">
                If an account exists with that email, you will receive password reset instructions.
              </p>
              <Link
                to="/login"
                className="text-dietrium hover:text-dietrium-dark transition-colors duration-200"
              >
                Return to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-dietrium focus:border-transparent transition-colors duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-dietrium hover:bg-dietrium-dark text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Reset Password
              </button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm text-dietrium hover:text-dietrium-dark transition-colors duration-200"
                >
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword; 