// src/pages/Profile.jsx

import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import "./Profile.css";
import MountainBg from "../assets/mountain.jpg";
export default function Profile() {
const [profileImage, setProfileImage] = useState("");
  const [profile, setProfile] = useState(null);


  useEffect(() => {

  const fetchProfile = async () => {

    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    setProfile(data);

    if (data.profileImage) {
      setProfileImage(data.profileImage);
    }
  };

  fetchProfile();

}, []);



  return (

    <div className="flex min-h-screen">


      {/* Sidebar same rahega */}
      <Sidebar />



      {/* Profile Area */}

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


const token = localStorage.getItem("token");

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
    window.location.href = "/login";
  }}
  className="logout-btn"
>
  Logout
</button>

        </div>


      </div>


    </div>

  );

}