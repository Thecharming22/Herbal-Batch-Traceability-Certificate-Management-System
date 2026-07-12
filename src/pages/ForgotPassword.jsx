import { FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
      setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

if (res.ok) {
  toast.success(data.message);
} else {
  toast.error(data.message);
}
    } catch (err) {
      toast.error("Something went wrong.");
    }finally {
  setLoading(false);
}
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source src="/flowers.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 flex items-center justify-center">
<div className="bg-black/90 backdrop-blur-lg p-12 rounded-2xl shadow-2xl w-[32rem]">
         <h2 className="text-3xl font-bold mb-8 text-center text-white">Forgot Password</h2>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
             <label className="text-base font-medium mb-2 text-white">Email</label>
           
              <div className="inputBox">
<FaEnvelope style={{ color: "black" }} />

               <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  style={{
    color: "white",
    background: "transparent",
  }}
/>
              </div>
            </div>

      <button
  type="submit"
  disabled={loading}
  className="loginBtn disabled:opacity-50"
>
  {loading ? "Sending..." : "Send Reset Link"}
</button>
          </form>

          <p className="text-base text-center mt-6 text-white">
  Remembered your password?{" "}
  <a href="/login" className="text-green-400 hover:underline">
    Login
  </a>
</p>
        </div>
      </div>
    </section>
  );
}
