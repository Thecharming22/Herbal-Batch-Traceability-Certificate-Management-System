import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../components/ui/Loader.jsx";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

     if (res.ok) {

  if (rememberMe) {
    localStorage.setItem("token", data.token);
  } else {
    sessionStorage.setItem("token", data.token);
  }

  toast.success("Login successful");
  navigate("/dashboard");
} else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
   <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/flowers.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Main Container */}
    <div className="absolute inset-0 flex items-center justify-center px-4 py-6">

        <div className="loginContainer">

          {/* LEFT SIDE */}

         <div
  className="loginLeft"
  style={{
    background: "rgba(0,0,0,0.88)",
    color: "#fff",
  }}
>
<h2 className="loginTitle" style={{ color: "white" }}>
              Welcome Back
            </h2>

            <p className="loginSub" style={{ color: "#d7d7d7" }}>
              Login to continue managing Herbal Traceability.
            </p>

            <form
              className="w-full"
              onSubmit={handleLogin}
            >

              {/* Email */}

              <label className="fieldLabel" style={{ color: "white" }}>
                Email
              </label>

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

              {/* Password */}

              <label className="fieldLabel" style={{ color: "white" }}>
                Password
              </label>

              <div className="inputBox">

             <FaLock style={{ color: "black" }} />
                <input
  type="password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  style={{
    color: "white",
    background: "transparent",
  }}
/>

              </div>

              {/* Remember + Forgot */}

              <div className="remember">

                <label className="flex items-center gap-2">

                <input
  type="checkbox"
  checked={rememberMe}
  onChange={(e) => setRememberMe(e.target.checked)}
/>

                  Remember Me

                </label>

                <Link to="/forgot-password">

                  Forgot Password?

                </Link>

              </div>

              {/* Login Button */}

              <button
  type="submit"
  className="loginBtn"
>
  Login
</button>

<div
  style={{
    display: "flex",
    alignItems: "center",
    margin: "18px 0",
  }}
>
 <hr
    style={{
      flex: 1,
      border: "none",
      borderTop: "1px solid rgba(255,255,255,0.4)",
    }}
  />

  <span
    style={{
      color: "white",
      margin: "0 12px",
      fontWeight: "600",
    }}
  >
    OR
  </span>
 <hr
    style={{
      flex: 1,
      border: "none",
      borderTop: "1px solid rgba(255,255,255,0.4)",
    }}
  />
</div>

<button
  type="button"
  className="loginBtn"
  onClick={() => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  }}
>
  Continue with Google
</button>
            </form>

            <p className="signupText">

              Don't have an account?

              <Link to="/signup">

                Sign Up

              </Link>

            </p>

          </div>

          {/* RIGHT SIDE */}

          <div className="loginRight">

            <div>

              <h1>
                🌿 Herbal Traceability
              </h1>

              <p>
                Securely manage herbal batches,
                certificates, dispatch records,
                and AI-powered yield prediction
                with a modern digital platform.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Loader */}

      {loading && <Loader />}

    </section>
  );
}