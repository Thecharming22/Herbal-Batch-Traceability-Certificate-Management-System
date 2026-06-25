import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import About from "./pages/About";   
import DemoPage from "./pages/DemoPage";   
import ForgotPassword from "./pages/ForgotPassword";   // ✅ new import

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
            <Route path="/demo" element={<DemoPage />} />   
            <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ✅ added route */}
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
