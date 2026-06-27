import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import Loader from "../components/ui/Loader.jsx";   // ✅ direct import

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Signup successful");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/flowers.mp4" type="video/mp4" />
      </video>

      {/* Transparent Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Signup Box */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-12 rounded-2xl shadow-2xl w-[32rem]">
          <h2 className="text-4xl font-bold mb-8 text-center">Sign Up</h2>

          <form className="flex flex-col gap-6" onSubmit={handleSignup}>
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-2">Full Name</label>
              <div className="flex items-center border rounded px-4 py-3 focus-within:border-green-600">
                <FaUser className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="flex-1 bg-transparent outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-2">Email</label>
              <div className="flex items-center border rounded px-4 py-3 focus-within:border-green-600">
                <FaEnvelope className="text-gray-500 mr-2" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-2">Password</label>
              <div className="flex items-center border rounded px-4 py-3 focus-within:border-green-600">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Create a password"
                  className="flex-1 bg-transparent outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-2">Confirm Password</label>
              <div className="flex items-center border rounded px-4 py-3 focus-within:border-green-600">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  className="flex-1 bg-transparent outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 text-lg font-semibold"
            >
              Register
            </button>
          </form>

          {/* Loader */}
          {loading && <Loader />}

          {/* Already have account */}
          <p className="text-base text-center mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
