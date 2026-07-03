// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  // All links
  const allLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/add-batch", label: "Add Batch" },
    { path: "/batch-records", label: "Batch Records" },
    { path: "/ai-insights", label: "AI Insights" },
    { path: "/profile", label: "Profile" },
  ];

  // Hide current page link
  const links = allLinks.filter((link) => link.path !== location.pathname);

  return (
    <div className="w-64 p-6 shadow flex flex-col bg-green-900/30 backdrop-blur-sm">
      {/* Sidebar Title */}
      <h1
        className="font-extrabold text-3xl mb-6
                   bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 
                   bg-clip-text text-transparent animate-shine">
        🌿 Herbal Traceability
      </h1>

      {/* Quick Menu Section */}
      <div className="mb-6 p-4">
        <ul className="space-y-4 text-lg font-semibold text-white">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="block w-full text-left px-4 py-2 bg-green-800/40 hover:bg-green-700/60 transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
