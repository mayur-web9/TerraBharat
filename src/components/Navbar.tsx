import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, MapPin } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'AI Itinerary', path: '/itinerary' },
    { name: 'Marketplaces', path: '/Marketplaces' },
    { name: 'Events', path: '/events' },
    { name: 'Feedback', path: '/feedback' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-offwhite dark:bg-gray-900 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-forest-600 to-forest-800 p-2 rounded-lg group-hover:scale-105 transition-transform">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-forest-700 to-saffron-500 bg-clip-text text-transparent">
                TerraBharat 
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400">Discover Unseen India</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-forest-50 dark:hover:bg-gray-800 hover:text-forest-700 dark:hover:text-forest-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-300" />
              )}
            </button>

            {user ? (
              <Link
                to="/dashboard"
                className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg bg-forest-600 text-white hover:bg-forest-700 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Admin Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-forest-600 to-forest-700 text-white hover:from-forest-700 hover:to-forest-800 transition-all"
              >
                <User className="h-4 w-4" />
                <span>Admin Login</span>
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-forest-50 dark:hover:bg-gray-800 hover:text-forest-700 dark:hover:text-forest-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to={user ? '/dashboard' : '/login'}
              className="block px-3 py-2 rounded-md text-base font-medium bg-forest-600 text-white hover:bg-forest-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {user ? 'Admin Dashboard' : 'Admin Login'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
