// src/pages/Profile.jsx
import Sidebar from "../components/Sidebar";

export default function Profile() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100/70 backdrop-blur-md">
        <div className="bg-green-900/100 backdrop-blur-sm text-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-extrabold 
                         bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                         bg-clip-text text-transparent animate-shine">
            👤 Profile
          </h2>

          {/* Profile Details */}
          <div className="border-t border-gray-400 pt-4 mt-4 space-y-6">
            <div>
              <h3 className="text-xl font-bold 
                             bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                             bg-clip-text text-transparent animate-shine">
                Name
              </h3>
              <p className="text-lg mt-2">Admin</p>
            </div>

            <div>
              <h3 className="text-xl font-bold 
                             bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                             bg-clip-text text-transparent animate-shine">
                Email
              </h3>
              <p className="text-lg mt-2">admin@herbal.com</p>
            </div>

            <div>
              <h3 className="text-xl font-bold 
                             bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                             bg-clip-text text-transparent animate-shine">
                Role
              </h3>
              <p className="text-lg mt-2">Production Manager</p>
            </div>

            <div>
              <h3 className="text-xl font-bold 
                             bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                             bg-clip-text text-transparent animate-shine">
                Organization
              </h3>
              <p className="text-lg mt-2">Alaknanda Herbal & Essential Oil Distillers</p>
            </div>

            <div>
              <h3 className="text-xl font-bold 
                             bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                             bg-clip-text text-transparent animate-shine">
                Last Login
              </h3>
              <p className="text-lg mt-2">29 June 2026</p>
            </div>
          </div>

          {/* ✅ Logout Button */}
          <div className="mt-8">
            <button
              onClick={() => {
                localStorage.removeItem("token"); // clear auth token
                window.location.href = "/login";   // redirect to login page
              }}
              className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded cursor-pointer transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
