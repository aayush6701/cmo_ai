"use client";
import { Poppins } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins", // CSS Variable for Tailwind
});
export default function AuthPage() {
  const router = useRouter();
  const images = ["/CMpic.png", "/imgB.png"];
  const [currentImage, setCurrentImage] = useState(0);
  const [page, setPage] = useState("login");
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const correctOtp = ["1", "2", "3", "4", "5"];
  const otpRefs = useRef([]);
  
  // States for registration & profile update
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("Raipur");

  const chhattisgarhCities = [
    "Raipur", "Bilaspur", "Durg", "Jagdalpur", "Korba", "Ambikapur", "Rajnandgaon",
    "Raigarh", "Dhamtari", "Mahasamund", "Kanker", "Jashpur", "Balod", "Bemetara",
    "Baloda Bazar", "Kawardha", "Mungeli", "Sukma", "Bijapur", "Narayanpur", "Kondagaon",
    "Dantewada", "Gariaband"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        otpRefs.current[index + 1]?.focus();
      } else if (!value && index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    }
  };
  const handleProfileUpdate = () => {
    if (name && email) {
      alert("Profile updated!");
      router.push("/dashboard");
    } else {
      alert("Please fill all fields.");
    }
  };
  const handleSignUp = () => {
    setShowPopup(true); // Show success popup
  };
  const handleOtpVerification = () => {
    if (JSON.stringify(otp) === JSON.stringify(correctOtp)) {
      setPage("profile");
    } else {
      setErrorMessage("Invalid OTP. Please try again."); // Show error message for wrong OTP
    }
  };
  const handleAdminLogin = () => {
    // Sample credentials (Replace with actual backend validation)
    const adminUsername = "admin";
    const adminPassword = "password123";

    if (fullName === adminUsername && password === adminPassword) {
      sessionStorage.setItem("isAdmin", "true"); // Store admin session
      router.push("/admin/dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };
  return (
    <div className="  fixed inset-0  flex flex-col md:flex-row w-full h-screen items-center justify-center bg-[#ECECEC] p-10">
      <div className="relative flex flex-col items-center justify-start full-h-screen pt-[41px] "></div>
      <img src="/CG logo.webp" alt="Logo" className="w-[119px] h-[105px] absolute top-[2px] left-1/4 transform -translate-x-1/4" />
      <div className=" absolute fixed top w-[516px] h-[526px] 
             top-[120px] left-[90px] 
             radius-[16px] p-[48px] 
             pr-[40px] pb-[60px] pl-[40px] 
             gap-[24px] bg-white shadow-lg rounded-[30px]">
        {page === "login" ? (
          <>
          <div className={`${poppins.variable} font-sans`}></div>
            <h2 className="text-[32px] font-[Poppins] font-bold leading-[38.4px] tracking-[-0.8px] text-center text-[#170645] ">AI Based CMO Gallery</h2>
            <p className="text-[16px] font-[Poppins] font-normal leading-[25.6px] tracking-[0px] text-center text-[#170645]">One Click Download</p>
            <button className="flex items-center justify-center w-full border p-2 mt-4 rounded-full text-background: rgba(23, 6, 69, 1);-600 hover:bg-gray-200">
              <img src="/google%20pic.png" alt="Google" className="w-5 mr-2" />
              Sign In With Google
            </button>
            <div className="flex items-center my-6"><hr className="flex-grow border-t border-gray-300" /><span className="px-3 text-gray-500 text-center ">Or, Sign In With Phone No.</span><hr className="flex-grow border-t border-gray-300" /></div>
            <input
              type="text-[#170645] ;"
              placeholder="Mobile No."
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="border w-full p-2 rounded-full mb-9  bg-white text-[#170645] placeholder- [#170645] "
            />
            <button onClick={() => setPage("verification")} className="w-full bg-[#170645]  text-[#FFE100] p-2 rounded-full">
              Sign - In
            </button>
            <button onClick={() => setPage("admin")} className="w-full bg-[#170645]  text-[#FFE100] p-2 rounded-full mt-4">
              Admin Login -  In
            </button>
            <div className="text-center text-sm dark-black-600 mt-2">
              Not registered yet?{" "}
              <span className="text-rgb(9, 1, 31) cursor-pointer" onClick={() => setPage("register")}>
                Register Now
              </span>
              <div className="flex justify-center gap-4  w-full mt-4">
                <button className="text-[#170645] hover:underline">Customer Support</button>
                <button className="text-[#170645]hover:underline">Terms of Service</button>
            </div>
            </div>
            <div className="w-[204px] h-[30px] absolute top-[530px] left-[150px] bg-white-500 text-center text-black text-[14px] font-medium leading-[22.4px] tracking-[0px] font-inter whitespace-nowrap flex items-center justify-center mt-auto">
              Initiative By DPR Chhattisgarh
            </div>
          </>

          /* aayush  work in this admin part only*/
          ) : page === "admin" ? (
            <>
            <p className="text-[32px] font-[Poppins] font-bold leading-[38.4px] tracking-[-0.8px] text-center text-[#170645]">AI Based CMO Gallery</p>
              <h2 className="text-[32px] font-[Poppins] font-bold leading-[38.4px] tracking-[-0.8px] text-center text-[#170645]">Admin Login</h2>
              <div className="mt-4">
                <label className="block font-medium">Username</label>
                <input type="text" value ={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-2 border rounded mt-1" placeholder="Enter Username" />
              </div>
              <div className="mt-3">
                <label className="block font-medium">Password</label>
                <input type="password" value ={password}  onChange={(e) => setPassword(e.target.value)}  className="w-full p-2 border rounded mt-1" placeholder="Enter Password" />
              </div>
              <div className="mt-2 text-left text-sm">
                   <a href="/forgot-password" className="text-black-600 hover:underline">Forgot Password?</a>
                </div>
              <button onClick={handleAdminLogin} className= "w-full mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700">Sign In</button>
            </>
        ) : page === "register" ? (
          <>
          <p className="text-[32px] font-[Poppins] font-bold leading-[38.4px] tracking-[-0.8px] text-center text-[#170645] -mt-3">
              AI Based CMO Gallery
            </p>
            <h2 className="text-[16px] font-[Poppins] font-normal leading-[25.6px] tracking-[0px] text-center text-[#170645]">
              One Click Download
            </h2>
            {/* Google Sign Up Button */}
            <button className="flex items-center justify-center w-full border border-gray-300 rounded-full p-3 mt-5 text-[#170645] font-medium hover:bg-gray-100 transition">
              <img src="/google pic.png" alt="Google" className="w-5 h-5 mr-3" />
              Sign Up With Google
            </button>
            {/* Separator */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-3 text-gray-400">Or, Sign Up With Your Email</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Input Fields - Updated Layout */}
            <div className="space-y-4">
              <div className="flex space-x-3">
                <input
                  type="text [#170645]"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-1/2 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#170645]"
                />
                <input
                  type="text [#170645]"
                  placeholder="Mobile No."
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-1/2 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#170645]"
                />
              </div>
              <input
                type="email text [#170645]"
                placeholder="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#170645]"
              />
              <input
                type="password text [#170645]"
                placeholder="Create Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#170645]"
              />
            </div>
            {/* Sign Up Button */}
            <button
              onClick={() => setShowPopup(true)}
              className="w-full bg-[#170645]  text-[#FFE100] p-2 rounded-full mt-3"
            >
              Sign Up
            </button>
            {/* Sign In Link */}
            <p className="text-center text-gray-600 mt-2">
              Already Registered?{" "}
              <a href="/login" className="text-background: rgba(0, 0, 0, 1); font-bold">
                Sign In
              </a>
            </p>
            <div className="flex justify-center gap-4  w-full mt-2">
                <button className="text-[#170645] hover:underline">Customer Support</button>
                <button className="text-[#170645]hover:underline">Terms of Service</button>
            </div>
            
            {/* Success Popup */}
            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px] text-center">
                  <h2 className="text-xl font-bold text-blue-900">✅ Registration Successful!</h2>
                  <button
                    onClick={() => {
                      setShowPopup(false);
                      setPage("login");
                    }}
                    className="mt-6 w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
                  >
                    OK
                  </button>
                </div>
              </div>
              )}
          </>
        ) : page === "verification" ? (
          <>
            <h2 className="text-[32px] font-[Poppins] font-bold leading-[38.4px] tracking-[-0.8px] text-center text-[#170645]">Verification Code</h2>
            <p className="text-[20px] font-[Poppins] font-normal leading-[25.6px] tracking-[0px] text-center text-[#170645] p-2 rounded-md">We have sent a verification code to your {mobile}</p>
            <div className="flex justify-center my-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text [#170645]"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (otpRefs.current[index] = el)}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-10 h-10 border text-center text-xl rounded-md mx-1"
                />
              ))}
            </div>
            {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
            <button onClick={handleOtpVerification} className="w-full bg-[#170645] text-[#FFE100] p-2 rounded-full">
              Confirm
            </button>
          </>
        ) : page === "profile" ? (
          <>
            <h2 className="text-[32px] font-[Poppins] font-bold text-center leading-[38.4px] tracking-[-0.8px] text-[#170645] p-2 rounded-md">Update Profile</h2>
            <p className="text-[20px] font-[Poppins] font-normal leading-[25.6px] tracking-[0px] text-center text-[#170645] p-2 rounded-md">Update Below Details</p>
            <input type="text [#170645]" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="border w-full p-3 rounded-full mb-4" />
            <input type="email text [#170645]" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border w-full p-3 rounded-full mb-4" />
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="border w-full p-3 rounded-full mb-4">
              {chhattisgarhCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <button className="w-full bg-[#170645] text-[#FFE100] p-3 rounded-full" onClick={handleProfileUpdate}>
              Update Profile
            </button>
          </>
        ) : null}
      </div>
           <div className="hidden md:flex md:w-1/2 p-10 ">
        <img 
          src={images[currentImage]} 
          alt="Slideshow" 
          className="w-[750px] h-[600px] absolute top-[50px] left-[650px] 
                    rounded-tl-[30px] rounded-br-[30px] z-[0] bg-opacity-20 px-4 py-2 rounded-md 
                            cursor-pointer hover:bg-opacity-30 transition-all " 
             />
        {images[currentImage] === "/CMpic.png" &&
        (
          <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/play button.png"  // Replace with your play icon path
                  alt="Play Button" 
                  className=" absolute top-1/2 left-[75%]  transform -translate-x-1/2 w-20 h-20 opacity-90 cursor-pointer hover:opacity-100"
                />
          <div className="mt-[10px] absolute top-[450px] left-[680px] 
                          w-[641px] h-auto 
                          text-white font-bold 
                          text-[48px] leading-[48px] 
                          tracking-[-0.8px] 
                          flex flex-col items-center justify-center
                          font-[Poppins] 
                          bg-black bg-opacity-20  
                          px-6 py-4 rounded-lg z-[2]">
            {/* Main Text */}
            <span>CII Young Indians Conference</span>

            {/* View More Button */}
            <div className="mt-[-1px] ml-[-20px] text-[20px] font-medium text-white 
                            bg-opacity-20 px-800 py-0 rounded-md 
                            cursor-pointer hover:bg-opacity-30 transition-all justify-start">
              View More ›
            </div>
          </div>
          </div> 
        )}
      </div>
    </div>
  );
}
