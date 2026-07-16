// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import About from "./pages/About";      
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AddBatch from "./pages/AddBatch";
import BatchRecords from "./pages/BatchRecords";
import AIInsights from "./pages/AIInsights";
import Profile from "./pages/Profile";   // ✅ new import
import ProtectedRoute from "./components/ProtectedRoute";
import GoogleSuccess from "./pages/GoogleSuccess";
import ResetPassword from "./pages/ResetPassword";
import Contact from "./pages/Contact";
// ✅ Inner component that can use useLocation
function AppContent({ theme, setTheme }) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      {/* ✅ Navbar hide on admin pages */}
      {location.pathname !== "/dashboard" &&
       location.pathname !== "/add-batch" &&
       location.pathname !== "/batch-records" &&
       location.pathname !== "/ai-insights" &&
       location.pathname !== "/profile" && (   // ✅ hide on profile too
        <Navbar theme={theme} setTheme={setTheme} />
      )}

      {/* Main content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/google-success" element={<GoogleSuccess />}/>
          <Route path="/reset-password/:token" element={<ResetPassword />}/>
        <Route path="/contact" element={<Contact />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
         <Route
  path="/add-batch"
  element={
    <ProtectedRoute>
      <AddBatch />
    </ProtectedRoute>
  }
/>
          
<Route
  path="/batch-records"
  element={
    <ProtectedRoute>
      <BatchRecords />
    </ProtectedRoute>
  }
/>
         <Route
  path="/ai-insights"
  element={
    <ProtectedRoute>
      <AIInsights />
    </ProtectedRoute>
  }
/>
          
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
        </Routes>
      </main>

      {/* Footer + Toast */}
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}

export default function App() {
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
    <BrowserRouter>
      <AppContent theme={theme} setTheme={setTheme} />
    </BrowserRouter>
  );
}
