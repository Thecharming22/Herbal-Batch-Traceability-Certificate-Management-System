import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
function Navbar() {
  const [showGuide, setShowGuide] = useState(false);
const [showHelp, setShowHelp] = useState(false);
const [showContact, setShowContact] = useState(false);
  // ✅ Theme state inside Navbar
  const navigate = useNavigate();

const [showProfileMenu, setShowProfileMenu] = useState(false);

const menuRef = useRef(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
useEffect(() => {
  function handleClickOutside(event) {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowProfileMenu(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  return (
  <nav className="relative bg-white dark:bg-black text-gray-900 dark:text-white px-4 sm:px-8 py-3 flex items-center shadow-md transition-colors duration-300">
{showGuide && (
<div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[99999] p-4">

<div className="bg-[#08160f] w-[600px] max-w-[90vw] max-h-[85vh] overflow-y-auto rounded-2xl border border-yellow-500 p-5 sm:p-8">

<h2 className="text-2xl sm:text-3xl text-yellow-400 font-bold mb-5">
📖 User Guide
</h2>

<ul className="space-y-3 text-white">

<li>🌿 Login to access Dashboard.</li>

<li>📦 Add and manage herbal batches.</li>

<li>📄 Recent batch records</li>

<li>🧴 Browse Essential Oils.</li>

<li>🤖 Use Herbal AI for plant related questions.</li>

<li>📈 Check AI Insights for yield prediction.</li>

</ul>

<button

onClick={()=>setShowGuide(false)}

className="mt-8 bg-green-700 px-6 py-2 rounded"

>

Close

</button>

</div>

</div>
)}
{showHelp && (

<div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[99999] p-4">

<div className="bg-[#08160f] w-[600px] max-w-[90vw] max-h-[85vh] overflow-y-auto rounded-2xl border border-yellow-500 p-5 sm:p-8">

<h2 className="text-2xl sm:text-3xl text-yellow-400 font-bold mb-5">

❓ Help Center

</h2>

<div className="space-y-4 text-white">

<p><b>How do I login?</b><br/>Use your registered credentials.</p>

<p><b>How do I add a batch?</b><br/>Open Dashboard → Add Batch.</p>

<p><b>How do I view certificates?</b><br/>Go to Recent batch records of dashboard → View.</p>

<p><b>How do I use AI?</b><br/>Click the Herbal AI button and ask your question.</p>

</div>

<button

onClick={()=>setShowHelp(false)}

className="mt-8 bg-green-700 px-6 py-2 rounded"

>

Close

</button>

</div>

</div>

)}
{showContact && (

<div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[99999] p-4">

<div className="bg-[#08160f] w-[600px] max-w-[90vw] max-h-[85vh] overflow-y-auto rounded-2xl border border-yellow-500 p-5 sm:p-8">

<h2 className="text-2xl sm:text-3xl text-yellow-400 font-bold mb-5">

📞 Contact Us

</h2>

<div className="text-white space-y-3">

<p>

🏢 <b>Organization</b><br/>

Alaknanda Herbal & Essential Oil Distillers

</p>

<p>

📍 Chamoli, Uttarakhand

</p>

<p>

🌿 AYUSH Certified Herbal Traceability System

</p>

<p>

📧 Available on request

</p>

   <div>
            <h2 className="text-yellow-300 font-semibold">
              ☎ Support Hours
            </h2>

            <p>
              Monday - Friday
              <br />
              9:00 AM - 6:00 PM
            </p>
          </div>
</div>

<button

onClick={()=>setShowContact(false)}

className="mt-8 bg-green-700 px-6 py-2 rounded"

>

Close

</button>

</div>

</div>

)}
      {/* Left Logo */}
<div className="flex-shrink-0 w-[125px] sm:w-auto">
        <h1
          className="logo-text text-[12px] sm:text-2xl font-extrabold cursor-pointer transition-all duration-300 hover:scale-105 dark:text-green-400"
        >
          Herbal Traceability
        </h1>
      </div>

      {/* Center Navigation */}
<div className="absolute left-[53%] -translate-x-1/2 flex gap-2 sm:left-1/2 sm:gap-8 text-[10px] sm:text-base font-semibold">
        <Link to="/" className="nav-link hover:text-green-600 dark:hover:text-green-400">Home</Link>
        <Link to="/about" className="nav-link hover:text-green-600 dark:hover:text-green-400">About</Link>
        <Link to="/login" className="nav-link hover:text-green-600 dark:hover:text-green-400">Login</Link>
      </div>

      {/* Right Controls */}
     <div className="flex items-center gap-2 sm:gap-4 ml-auto">
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
      <div className="relative" ref={menuRef}>

<button
onClick={() => setShowProfileMenu(!showProfileMenu)}
className="
profile-icon
w-6
h-6
sm:w-10
sm:h-10
rounded-full
flex
items-center
justify-center
cursor-pointer
transition
duration-300
bg-gray-200
dark:bg-gray-700
hover:scale-105
"
>

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

{showProfileMenu && (

<div
className="
absolute
right-0
mt-3
w-64
bg-black/95
backdrop-blur-md
border
border-yellow-400/30
rounded-2xl
shadow-2xl
overflow-hidden
z-50
animate-fadeIn
"
>

<button
onClick={() => navigate("/login")}
className="w-full text-left px-5 py-3 hover:bg-green-900/50 text-white transition"
>
 Login
</button>
<button
onClick={() => navigate("/signup")}
className="w-full text-left px-5 py-3 hover:bg-green-900/50 text-white transition"
>
Register
</button>

<button
onClick={() => {
    setShowGuide(true);
    setShowProfileMenu(false);
}}
className="w-full text-left px-5 py-3 hover:bg-green-900/50 text-white transition"
>
User Guide
</button>

<button
onClick={() => {
    setShowHelp(true);
    setShowProfileMenu(false);
}}
className="w-full text-left px-5 py-3 hover:bg-green-900/50 text-white transition"
>
Help Center
</button>

<button
onClick={() => {
    setShowContact(true);
    setShowProfileMenu(false);
}}
className="w-full text-left px-5 py-3 hover:bg-green-900/50 text-white transition"
>
Contact Us
</button>

</div>

)}

</div>
      </div>
    </nav>
    
  );
  
}

export default Navbar;
