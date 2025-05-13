import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500';
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8 items-center">
            <Link to="/" className="font-bold text-xl text-gray-900">
              Sift
            </Link>
            <div className="hidden sm:flex sm:space-x-8">
              <Link
                to="/feed"
                className={`inline-flex items-center px-1 pt-1 ${isActive('/feed')}`}
              >
                Quiz
              </Link>
              <Link
                to="/learn"
                className={`inline-flex items-center px-1 pt-1 ${isActive('/learn')}`}
              >
                Learn
              </Link>
              <Link
                to="/about"
                className={`inline-flex items-center px-1 pt-1 ${isActive('/about')}`}
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 
