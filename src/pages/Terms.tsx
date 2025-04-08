import React from 'react';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-dietrium-light">
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-dietrium-dark mb-6">Terms of Service</h1>
          
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Welcome to Dietrium. By using our service, you agree to these terms. Please read them carefully.
            </p>
            
            <h2 className="text-xl font-semibold text-dietrium-dark mt-6 mb-3">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using Dietrium, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            
            <h2 className="text-xl font-semibold text-dietrium-dark mt-6 mb-3">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily access Dietrium for personal, non-commercial transitory viewing only.
            </p>
            
            <h2 className="text-xl font-semibold text-dietrium-dark mt-6 mb-3">3. Disclaimer</h2>
            <p className="mb-4">
              The materials on Dietrium are provided on an 'as is' basis. Dietrium makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            
            <h2 className="text-xl font-semibold text-dietrium-dark mt-6 mb-3">4. Limitations</h2>
            <p className="mb-4">
              In no event shall Dietrium or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Dietrium.
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link 
              to="/signup" 
              className="text-dietrium hover:text-dietrium-dark font-medium transition-colors duration-200"
            >
              ← Back to Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms; 