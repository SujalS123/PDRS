import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  UserIcon, 
  ChartBarIcon, 
  CalendarIcon, 
  CogIcon, 
  ArrowLeftOnRectangleIcon 
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    navigate('/login');
  };

  const navigationItems = [
    { name: 'Overview', icon: HomeIcon, id: 'overview' },
    { name: 'Profile', icon: UserIcon, id: 'profile' },
    { name: 'Progress', icon: ChartBarIcon, id: 'progress' },
    { name: 'Meal Plan', icon: CalendarIcon, id: 'meal-plan' },
    { name: 'Settings', icon: CogIcon, id: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-dietrium">Dietrium</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-dietrium-light text-dietrium-dark'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
              {navigationItems.find(item => item.id === activeTab)?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-dietrium-light flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-dietrium-dark" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="col-span-full bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-800">Welcome back!</h3>
              <p className="text-gray-600 mt-1">Here's an overview of your health journey.</p>
            </div>

            {/* Stats Cards */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="text-sm font-medium text-gray-500">Daily Calories</h4>
              <p className="text-2xl font-semibold text-gray-800 mt-2">1,850</p>
              <p className="text-sm text-green-600 mt-1">Under target by 150</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="text-sm font-medium text-gray-500">Water Intake</h4>
              <p className="text-2xl font-semibold text-gray-800 mt-2">1.5L</p>
              <p className="text-sm text-blue-600 mt-1">75% of daily goal</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h4 className="text-sm font-medium text-gray-500">Protein</h4>
              <p className="text-2xl font-semibold text-gray-800 mt-2">65g</p>
              <p className="text-sm text-purple-600 mt-1">85% of daily goal</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 