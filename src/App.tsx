import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Lazy load components for better performance
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const Questionnaire = React.lazy(() => import('./pages/questionnaire'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-dietrium-light">
          <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
            <h1 className="text-2xl font-bold text-dietrium-dark mb-4">Something went wrong</h1>
            <p className="text-gray-600">Please try refreshing the page</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const LoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-dietrium-light">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dietrium"></div>
  </div>
);

const App: React.FC = () => {
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <div className="min-h-screen bg-dietrium-light">
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </div>
          </div>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App; 