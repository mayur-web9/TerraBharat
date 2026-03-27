import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div className="text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">Page not found.</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center px-6 py-3 bg-forest-600 hover:bg-forest-700 text-white rounded-lg font-semibold"
      >
        Return home
      </Link>
    </div>
  </div>
);

export default NotFound;
