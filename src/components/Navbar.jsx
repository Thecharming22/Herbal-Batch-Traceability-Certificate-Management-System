import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white dark:bg-black text-gray-900 dark:text-white px-2 sm:px-8 py-3 flex items-center shadow-md transition-colors duration-300">

      {/* Left Logo */}
      <div className="flex-shrink-0 mr-2 sm:mr-auto">
        <h1
          className="logo-text text-[12px] sm:text-2xl font-extrabold cursor-pointer transition-all duration-300 hover:scale-105 dark:text-green-400"
        >
          Herbal Traceability
        </h1>
      </div>

      {/* Center Navigation */}
      <div className="flex-grow flex justify-center gap-2 sm:gap-8 text-[10px] sm:text-base font-semibold">
        <Link
          to="/"
          className="nav-link hover:text-green-600 dark:hover:text-green-400"
        >
          Home
        </Link>

        <Link
          to="/about"
          className="nav-link hover:text-green-600 dark:hover:text-green-400"
        >
          About
        </Link>

        <Link
          to="/login"
          className="nav-link hover:text-green-600 dark:hover:text-green-400"
        >
          Login
        </Link>

        <Link
          to="/demo"
          className="nav-link hover:text-green-600 dark:hover:text-green-400"
        >
          Demo
        </Link>
      </div>

      {/* Right Profile Icon */}
      <div className="flex-shrink-0 ml-2 sm:ml-auto">
        <button className="profile-icon w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-300 bg-gray-200 dark:bg-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800 dark:text-gray-200"
          >
            <path
              fillRule="evenodd"
              d="M12 2a5 5 0 100 10 5 5 0 000-10zM4 20a8 8 0 1116 0v1H4v-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

    </nav>
  );
}

export default Navbar;