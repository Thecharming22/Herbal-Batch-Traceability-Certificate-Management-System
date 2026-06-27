import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;   // ✅ protect route

  return (
    <section className="p-12">
      <h1 className="text-3xl font-bold text-green-600">Welcome to Dashboard</h1>
      <p className="mt-4">You are logged in successfully!</p>
    </section>
  );
}
