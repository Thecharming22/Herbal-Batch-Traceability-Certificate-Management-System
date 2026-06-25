import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";   // ✅ add this import

export default function Login() {
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
        {/* Login Box */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-12 rounded-2xl shadow-2xl w-[32rem]">
          <h2 className="text-4xl font-bold mb-8 text-center">Login</h2>

          <form className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-2">Email</label>
              <div className="flex items-center border rounded px-4 py-3 focus-within:border-green-600">
                <FaEnvelope className="text-gray-500 mr-2" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent outline-none"
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
                  placeholder="Enter your password"
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password" className="text-green-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 text-lg font-semibold"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="text-base text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-green-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
