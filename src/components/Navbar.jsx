import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  // ✅ Theme state inside Navbar
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

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
        <Link to="/" className="nav-link hover:text-green-600 dark:hover:text-green-400">Home</Link>
        <Link to="/about" className="nav-link hover:text-green-600 dark:hover:text-green-400">About</Link>
        <Link to="/login" className="nav-link hover:text-green-600 dark:hover:text-green-400">Login</Link>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4 ml-2 sm:ml-auto">
        {/* Dark/Light Toggle Icon */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 transition duration-300"
        >
          {theme === "dark" ? (
            // ☀️ Light Mode Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.5a1 1 0 011 1V7a1 1 0 01-2 0V5.5a1 1 0 011-1zM12 17a1 1 0 011 1v1.5a1 1 0 01-2 0V18a1 1 0 011-1zM4.5 12a1 1 0 011-1H7a1 1 0 010 2H5.5a1 1 0 01-1-1zM17 12a1 1 0 011-1h1.5a1 1 0 010 2H18a1 1 0 01-1-1zM7.05 7.05a1 1 0 011.414 0L9.5 8.086a1 1 0 01-1.414 1.414L7.05 8.464a1 1 0 010-1.414zM14.5 14.5a1 1 0 011.414 0l1.036 1.036a1 1 0 01-1.414 1.414l-1.036-1.036a1 1 0 010-1.414zM14.5 9.5a1 1 0 010-1.414l1.036-1.036a1 1 0 011.414 1.414L15.914 9.5a1 1 0 01-1.414 0zM7.05 16.95a1 1 0 010-1.414l1.036-1.036a1 1 0 011.414 1.414L8.464 16.95a1 1 0 01-1.414 0z" />
            </svg>
          ) : (
            // 🌙 Dark Mode Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-800 dark:text-gray-200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
            </svg>
          )}
        </button>

        {/* Profile Icon */}
        <button className="profile-icon w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-300 bg-gray-200 dark:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800 dark:text-gray-200">
            <path fillRule="evenodd" d="M12 2a5 5 0 100 10 5 5 0 000-10zM4 20a8 8 0 1116 0v1H4v-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
