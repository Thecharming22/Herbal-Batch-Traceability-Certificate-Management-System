import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white px-4 sm:px-8 py-3 flex items-center shadow-md">

      {/* Left Logo */}
      <div className="flex-shrink-0 mr-auto">
        <h1 
          className="logo-text text-base sm:text-2xl font-extrabold cursor-pointer 
                     transition-all duration-300 hover:scale-105"
        >
          Herbal Traceability
        </h1>
      </div>

      {/* Center Navigation */}
      <div className="flex-grow flex justify-center gap-4 sm:gap-8 text-sm sm:text-base font-semibold">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </div>

      {/* Right Profile Icon */}
      <div className="flex-shrink-0 ml-auto">
        <button className="profile-icon w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 sm:w-6 sm:h-6"
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
