"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Profile = () => {
  const router = useRouter();

  const handleLogout = () => {
    // ✅ Clear authentication data
    localStorage.removeItem("authToken");
    sessionStorage.clear(); // Clear session storage as well

    // ✅ Prevent back button navigation
    window.history.pushState(null, null, "/");
    window.history.replaceState(null, null, "/");

    // ✅ Redirect and force logout
    window.location.href = "/"; // Forces full redirect
  };
  
  return (
    <div className="mt-4 p-6 rounded-lg max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold text-[#170645]">Profile Update</h2>
      <p className="text-[#170645] mb-4">Update Below Detail</p>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full p-3 border rounded-full text-[#170645] focus:outline-none"
        />
        <input
          type="text"
          placeholder="Contact"
          className="w-full p-3 border rounded-full focus:outline-none text-[#170645]"
        />
        <select className="w-full p-3 border text-[#170645] rounded-full focus:outline-none">
          <option>Raipur</option>
          <option>Bhilai</option>
          <option>Durg</option>
        </select>
        <button className="w-full p-3 bg-[#170645] text-[#FFE100] rounded-full font-semibold">
          Update
        </button>
        <button
          className="w-full p-3 text-red-600 font-normal mt-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};


export default Profile;
