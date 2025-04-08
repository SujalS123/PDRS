import React from 'react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-dietrium-light">
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-dietrium-dark mb-6">Privacy Policy</h1>
          
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              At Dietrium, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
            
            <h2 className="text-xl font-semibold text-dietrium-dark mt-6 mb-3">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, including your name, email address, and health-related information when you use our service.
            </p>
            
            <h2 className="text-xl font-semibold text-dietrium-dark mt-6 mb-3">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect Dietrium and our users.
            </p>
            
            <h2 className="text-xl font-semibold text-dietrium-dark mt-6 mb-3">3. Information Sharing</h2>
            <p className="mb-4">
              We do not share your personal information with third parties except as described in this privacy policy. We may share your information with third-party service providers who perform services on our behalf.
            </p>
            
            <h2 className="text-xl font-semibold text-dietrium-dark mt-6 mb-3">4. Data Security</h2>
            <p className="mb-4">
              We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
            </p>
            
            <h2 className="text-xl font-semibold text-dietrium-dark mt-6 mb-3">5. Your Rights</h2>
            <p className="mb-4">
              You have the right to access, update, or delete your personal information. You can also opt out of certain data collection and use.
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

export default Privacy; 