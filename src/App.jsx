import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";   // ✅ Toast import

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import About from "./pages/About";      
import ForgotPassword from "./pages/ForgotPassword";   // ✅ new import
import Dashboard from "./pages/Dashboard";             // ✅ new import

function App() {
  // ✅ Load theme from localStorage
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
      {/* Wrapper to control layout */}
      <div className="flex flex-col min-h-screen bg-white dark:bg-black">
        <Navbar theme={theme} setTheme={setTheme} />

        {/* Main content grows to fill space */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />     
            <Route path="/forgot-password" element={<ForgotPassword />} /> 
            <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ added route */}
          </Routes>
        </main>

        <Footer />

        {/* ✅ Toast container now top-center */}
        <Toaster position="top-center" />
      </div>
    </BrowserRouter>
  );
}

export default App;
