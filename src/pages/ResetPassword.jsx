import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import "./Login.css";
export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-4">

      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/flowers.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="absolute inset-0 flex items-center justify-center">

     <div
  className="w-[92%] max-w-[420px] sm:max-w-[500px] p-5 sm:p-10 rounded-2xl"
  style={{
    background: "rgba(0,0,0,.88)",
  }}
>

        <h2 className="text-xl sm:text-3xl text-white font-bold mb-5 sm:mb-8 text-center">
            Reset Password
          </h2>

         <form onSubmit={handleReset} className="space-y-4 sm:space-y-5">

            <div>
              <label className="text-white">New Password</label>

             <div className="inputBox">
  <FaLock style={{ color: "black" }} />

  <input
    type="password"
    placeholder="Enter new password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    style={{
      color: "white",
      background: "transparent",
    }}
  />
</div>
            </div>

            <div>
              <label className="text-white">
                Confirm Password
              </label>
<div className="inputBox">
  <FaLock style={{ color: "black" }} />

  <input
    type="password"
    placeholder="Confirm new password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
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
  className="loginBtn disabled:opacity-50"
  disabled={loading}
>
  {loading ? "Resetting..." : "Reset Password"}
</button>

          </form>

        </div>

      </div>

    </section>
  );
}