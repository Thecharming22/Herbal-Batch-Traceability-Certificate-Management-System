// src/pages/Profile.jsx
import Loader from "../components/ui/Loader";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import "./Profile.css";
import MountainBg from "../assets/mountain.jpg";
export default function Profile() {
const [profileImage, setProfileImage] = useState("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(null);
useEffect(() => {

  const fetchProfile = async () => {

    try {

      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      if (!token) {
        throw new Error("You are not authenticated.");
      }

      const res = await fetch(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to load profile"
        );
      }

      setProfile(data);

      if (data.profileImage) {
        setProfileImage(data.profileImage);
      }

    } catch (err) {

      console.error("Error fetching profile:", err);

      setError(
        err.message || "Failed to load profile"
      );

    } finally {

      setLoading(false);

    }

  };

  fetchProfile();

}, []);



  return (

 <div className="flex flex-col md:flex-row min-h-screen">

  {/* Desktop Sidebar */}
  <div className="hidden md:flex md:w-64">
    <Sidebar />
  </div>

  {/* Mobile Sidebar */}
  {sidebarOpen && (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40 md:hidden"
        onClick={() => setSidebarOpen(false)}
      />

      <div className="fixed top-0 left-0 h-full z-50 md:hidden">
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>
    </>
  )}

 <div className="flex-1 relative">

  {/* Hamburger */}
  <div className="absolute top-4 left-4 md:hidden z-50">
    <button
      onClick={() => setSidebarOpen(true)}
      className="text-white text-4xl"
    >
      ☰
    </button>
  </div>

  <div
    className="profile-container"
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${MountainBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >

       <div className="cont">

  {loading && (
    <div className="flex justify-center items-center h-full">
      <Loader />
    </div>
  )}

  {error && !loading && (
    <div className="flex flex-col justify-center items-center h-full px-6 text-center">
      <p className="text-red-600 font-semibold">
        ❌ {error}
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-4 bg-green-700 text-white px-5 py-2 rounded-lg"
      >
        Retry
      </button>
    </div>
  )}

  {!loading && !error && profile && (
    <>

<label
  className="profile"
  style={{
    backgroundImage: `url(${profileImage})`
  }}
>

  <input
    type="file"
    accept="image/*"
    hidden
    onChange={async (e)=>{

      const file = e.target.files[0];

      if(file){

        const reader = new FileReader();
reader.onloadend = async () => {

setProfileImage(reader.result);


const token =
  localStorage.getItem("token") ||
  sessionStorage.getItem("token");

await fetch(
  "http://localhost:5000/api/users/profile-image",
  {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      profileImage: reader.result,
    }),
  }
);

};
        reader.readAsDataURL(file);

      }

    }}
  />

</label>



          <div className="info">


            <h3>
              {profile?.name}
            </h3>


            <p>

              Email:
              <br/>
              {profile?.email }


              <br/><br/>


              Role:
              <br/>
              {profile?.role || "Production Manager"}


              <br/><br/>


              Organization:
              <br/>
              {profile?.organization || "Alaknanda Herbal & Essential"}


            </p>


          </div>
<button
  onClick={() => {
localStorage.removeItem("token");
sessionStorage.removeItem("token");
window.location.href="/login";
  }}
  className="logout-btn"
>
  Logout
</button>
</>
  )}
 </div>
    </div>

  </div>

</div>

  );
}