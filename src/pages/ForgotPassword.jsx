import { FaEnvelope } from "react-icons/fa";

export default function ForgotPassword() {
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
        {/* Forgot Password Box */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-12 rounded-2xl shadow-2xl w-[32rem]">
          <h2 className="text-3xl font-bold mb-8 text-center">Forgot Password</h2>

          <form className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col">
              <label className="text-base font-medium mb-2">Email</label>
              <div className="flex items-center border rounded px-4 py-3 focus-within:border-green-600">
                <FaEnvelope className="text-gray-500 mr-2" />
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Send Reset Link Button */}
            <button
              type="submit"
              className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 text-lg font-semibold"
            >
              Send Reset Link
            </button>
          </form>

          {/* Back to Login */}
          <p className="text-base text-center mt-6">
            Remembered your password?{" "}
            <a href="/login" className="text-green-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
