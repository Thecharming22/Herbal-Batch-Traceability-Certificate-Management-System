import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../components/ui/Loader.jsx";
import "./Login.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
if (password.length < 6) {
  toast.error("Password must be at least 6 characters long.");
  return;
}
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();
if (res.ok) {

  // Login immediately after signup
  const loginRes = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const loginData = await loginRes.json();

  if (loginRes.ok) {
    localStorage.setItem("token", loginData.token);

    toast.success("Account created successfully!");

    navigate("/dashboard");
  } else {
    toast.success("Account created. Please login.");
    navigate("/login");
  }

} else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Main Container */}
      <div className="absolute inset-0 flex items-center justify-center">

        <div className="loginContainer">

          {/* LEFT GREEN PANEL */}
          <div className="loginRight">

            <div>

              <h1>
                🌿 Herbal Traceability
              </h1>

              <p>
                Register today to securely manage herbal batches,
                certificates, dispatch records and AI-powered
                yield prediction from one smart dashboard.
              </p>

            </div>

          </div>

          {/* RIGHT BLACK PANEL */}
          <div
            className="loginLeft"
            style={{
              background: "rgba(0,0,0,.88)",
            }}
          >

           <h2 className="loginTitle" style={{ color: "white" }}>
              Create Account
            </h2>

            <p
              className="loginSub"
              style={{
                marginBottom: "18px",
              }}
            >
              Join Herbal Traceability and start managing herbal batches securely.
            </p>

            <form onSubmit={handleSignup}>

              {/* Full Name */}
                  <label className="fieldLabel" style={{ color: "white" }}>
                Full Name
              </label>

              <div className="inputBox">
                <FaUser />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
                 <label className="fieldLabel" style={{ color: "white" }}>
                Email
              </label>

              <div className="inputBox">
                <FaEnvelope />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <label className="fieldLabel">
                Password
              </label>

              <div className="inputBox">
                <FaLock />
                <input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Confirm Password */}
              <label className="fieldLabel">
                Confirm Password
              </label>

              <div className="inputBox">
                <FaLock />
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="loginBtn"
              >
                Create Account
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
              Already have an account?{" "}
              <Link to="/login">
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>

      {loading && <Loader />}

    </section>
  );
}