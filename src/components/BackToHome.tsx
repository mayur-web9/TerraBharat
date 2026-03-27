import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, ArrowLeft } from 'lucide-react';

const BackToHome = () => {
  const location = useLocation();
  
  // Don't show on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="w-full flex justify-center py-12 px-4 bg-transparent mt-auto">
      <Link
        to="/"
        className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 text-forest-700 dark:text-forest-400 font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all border border-gray-100 dark:border-gray-700"
      >
        <div className="p-2 rounded-xl bg-forest-50 dark:bg-forest-900/30 group-hover:bg-forest-100 dark:group-hover:bg-forest-900/50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="flex items-center gap-2">
          <HomeIcon className="w-5 h-5" />
          Back to Home Page
        </span>
      </Link>
    </div>
  );
};

export default BackToHome;
