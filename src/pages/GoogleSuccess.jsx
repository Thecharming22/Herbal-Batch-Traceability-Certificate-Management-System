import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function GoogleSuccess() {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      toast.success("Logging you in...");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1200);
    } else {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "28px",
        fontWeight: "bold",
      }}
    >
    
    </div>
  );
}