
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FaChevronDown } from "react-icons/fa";
import "./ToggleSwitch.css";

export default function AdminDashboard() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [currentTab, setCurrentTab] = useState("All Photos");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 0);
    }
  }, [router]);
  

  const [users, setUsers] = useState([
    { id: 1, name: "Sneha Roy", district: "Durg", mobile: "9235468505", email: "sneharoy17@gmail.com", status: "ON" },
    { id: 2, name: "Disha Sahu", district: "Bastar", mobile: "9235468505", email: "dishasahu65@gmail.com", status: "ON" },
    { id: 3, name: "Shyam Shing", district: "Balod", mobile: "9235468505", email: "shyamshing@gmail.com", status: "ON" },
    { id: 4, name: "Suriya Kumar", district: "Bijapur", mobile: "9235468505", email: "suriyakumar25@gmail.com", status: "ON" },
    { id: 5, name: "Leshika Tandan", district: "Durg", mobile: "9235468505", email: "leshikatandan156@gmail.com", status: "ON" },
    { id: 6, name: "Pratik Raj", district: "Bilaspur", mobile: "9235468505", email: "pratikraj11@gmail.com", status: "ON" },
    { id: 7, name: "Aditi Shign", district: "Dhamtari", mobile: "9235468505", email: "aditishign152@gmail.com", status: "ON" },
  ]);

  const eventNames = ["Rajyotsava", "Mahtarivandan Yojna", "Mor Awas Mor Adhikar"];
  
  const Switch = ({ checked, onChange }) => {
    return (
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider"></span>
      </label>
    );
  };
  
 
  const handleSelectAll = () => {
    if (selectedImages.length === eventNames.length) {
      setSelectedImages([]); // Deselect all
    } else {
      setSelectedImages(eventNames.map((_, i) => i)); // Select all
    }
  };

  const handleDownload = () => {
    if (selectedImages.length === 0) {
      alert("No images selected for download.");
      return;
    }
    alert(`Downloading ${selectedImages.length} images.`);
  };
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.district.toLowerCase().includes(search.toLowerCase()) ||
    user.mobile.includes(search) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );
  
  const stats = [
    { label: "Total User", count: "149", image: "/tuser.png", bg: "#A889FC80"  },
    { label: "Total Download", count: "378", image: "/tdownload.png", bg: "#A1C181" },
    { label: "Total Image", count: "72", image: "/timage.png", bg: "#90C0F6" },
    { label: "Total Event", count: "25", image: "/tevent.png", bg: "#F6CB90"},
  ];
  const toggleStatus = (id) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === id ? { ...user, status: !user.status } : user
      )
    );
  };

  return (
    <div className="min-h-screen bg-white ">
      {/* Navbar */}
      <nav className="w- full flex flex-col md:flex-row bg-white shadow-md shadow-[rgba(240,240,240,1)] px -6 py-3 gap-6 flex items-center justify-between ">
                   {/* <div className="flex items-center justify-start gap-3 w-full px-4"> */}
                      {/* Left Section: Logo & Filter Button */}
                      <div className="flex items-center gap-6">
                        {/* CG Logo (Properly Positioned) */}
                        <img
                          src="/CG logo.webp"
                          alt="Logo"
                          className="w-[71px] h-[71px] ml-[10px]" // Adjusted left margin so it doesn't overlap
                        />
                        </div>
                        {/* Search Bar & Filter Button */}
                        <div className="flex items-center border border-[rgba(240,240,240,1)] rounded-full overflow-hidden bg-[rgba(236,236,236,1)] w-full max-w-[1100px] flex-1 h-[45px] px-3">
                          {/* Filter Button */}  
                          <button
                            onClick={() => setShowFilter(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-full font-[Inter] font-medium text-[14px] leading-[15.8px] tracking-[0%]  text-[rgba(104,104,104,1)]  flex items-center gap-2 "
                          >
                            Filter
                            <div className=" h-[12px]  border-[rgba(104,104,104,1)]">
                            <FaChevronDown className="text-[rgba(104,104,104,1)] text-sm" />
                            </div>
                          </button>
                          {/* Separator Line (|) */}
                          <span className="text-gray-400 px-3 text-lg">|</span>
                          {/* Search Input */}
                          <input
                            type=" text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full flex-1 text-sm outline-none bg-transparent p-4"
                          />
                        
                          <button className="text-[#686868]"onClick={() => setSearch("")}> ✕  </button>
                          <span className="text-gray-400 px-3 text-lg">|</span>
                      {/* Search Icon Button */}
                      <button className="text-background: var(--P-Color-2, rgba(104, 104, 104, 1));" >
                        <img src="/Search_i.png" className="w-[20px] h-[16px] mr-[20px]"></img>
                      </button>
                  </div>
                
                <div className=" flex items-center gap-4 ml-auto">
                {/* <button
                      className="w-[150px] h-[40px] bg-[rgba(23,6,69,1)] text-[rgba(255,225,0,1)] rounded-[20px] shadow-[0px_4px_36px_0px_rgba(23,6,69,0.5)] 
                      flex items-center justify-center px-2 py-1 gap-1 transition-all ml-[-400px] mr-[6px]"
                      onClick={() => router.push("/dashboard/uploadphoto")} // Adjust navigation as needed
                    >
                      Search
                </button> */}
                
                      {/* Right Section: Profile Icon */}
                      
                      {/* <button className="w-9 h-10 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden ml-[-150]">
                        <img src="/pro.png" alt="User Profile" className="w-full h-full object-cover" />
                </button> */}
                
                </div>
               
                
              </nav>
              {showFilter && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-10 ">
                  <div className="bg-white p-6 rounded-[30px] shadow-lg w-full sm:w-full lg:w-[90%] xl:w-[80%] max-h-[90vh] overflow-y-auto">
                    {/* Close Button */}
                    <div className="flex justify-start mb-4">
                      <button
                        onClick={() => setShowFilter(false)}
                        className="text-xl text-gray-500"
                      >
                        ✖
                      </button>
                      <button
                        onClick={() => {
                          document
                            .querySelectorAll('input[type="checkbox"]')
                            .forEach((checkbox) => (checkbox.checked = false));
                          document
                            .querySelectorAll('input[type="date"]')
                            .forEach((input) => (input.value = ""));
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                      >
                        Clear All
                      </button>
                    </div>
                    

                    {/* Event Section */}
                    <div>
                      <p className="text-lg font-semibold mb-2 text-black">Event</p>
                      <div className="grid grid-cols-4 gap-4 text-[#686868]">
                        {[
                          "Azadi Ka Amrit Mahotsav",
                          "Rajim Kumbh Mela",
                          "Rajutsav 2025",
                          "Harihar Chhattisgarh",
                          "Mahatari Vandan Yojna",
                          "Chhattisgarh Yojna",
                        ].map((event, index) => (
                          <label
                            key={index}
                            className="flex items-center gap-2 bg-gray-100 p-2 rounded-full border border-gray-300 hover:border-[#170645] cursor-pointer"
                          >
                            <input type="checkbox" className="w-4 h-4" />
                            {event}
                          </label>
                        ))}
                      </div>
                      <div className="border-b border-gray-300 my-4"></div>
                    </div>

                    {/* Category Section */}
                    <div className="mt-2">
                      <p className="text-lg font-semibold mb-2 text-black">Category</p>
                      <div className="grid grid-cols-4 gap-4 text-[#686868]">
                        {[
                          "Azadi Ka Amrit Mahotsav",
                          "Rajim Kumbh Mela",
                          "Rajutsav 2025",
                          "Harihar Chhattisgarh",
                          "Mahatari Vandan Yojna",
                          "Chhattisgarh Yojna",
                          "Ujjwala Yojna",
                        ].map((category, index) => (
                          <label
                            key={index}
                            className="flex items-center gap-2 bg-gray-100 p-2 rounded-full border border-gray-300 hover:border-[#170645] cursor-pointer"
                          >
                            <input type="checkbox" className="w-4 h-4" />
                            {category}
                          </label>
                        ))}
                      </div>
                      <div className="border-b border-gray-300 my-4"></div>
                    </div>

                    {/* District Section */}
                    <div className="mt-2">
                      <p className="text-lg font-semibold mb-2 text-black">Districts</p>
                      <div className="grid grid-cols-4 gap-4 text-[#686868]">
                        {[
                          "Balod",
                          "Sukma",
                          "Dantewada",
                          "Bastar",
                          "Kondagaon",
                          "Narayanpur",
                          "Kanker",
                          "Kawardha",
                          "Baloda Bazar",
                          "Balrampur",
                          "Bemetara",
                          "Bijapur",
                          "Bilaspur",
                          "Dhamtari",
                          "Durg",
                          "Gariaband",
                          "Gaurela-Pendra-Marwahi",
                          "Janjgir-Champa",
                          "Jashpur",
                          "Korba",
                          "Koriya",
                          "Mahasamund",
                          "Mungeli",
                          "Raigarh",
                          "Raipur",
                          "Rajnandgaon",
                          "Surajpur",
                          "Surguja",
                        ].map((district, index) => (
                          <label
                            key={index}
                            className="flex items-center gap-2 bg-gray-100 p-2 rounded-full border border-gray-300 hover:border-[#170645] cursor-pointer"
                          >
                            <input type="checkbox" className="w-4 h-4" />
                            {district}
                          </label>
                        ))}
                      </div>
                      <div className="border-b border-gray-300 my-4"></div>
                    </div>

                    {/* Date Range Section */}
                    <div className="mt-4">
                      <p className="text-lg font-semibold mb-2 text-black">Date</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#686868]">Date From</label>
                          <input
                            type="date"
                            className="border p-2 w-full rounded-md text-[#686868]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#686868]">Date To</label>
                          <input
                            type="date"
                            className="border p-2 w-full rounded-md text-[#686868]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Clear All Button */}
                    <div className="flex justify-start mt-4">
                      
                    </div>
                  </div>
                </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#1a0645] via-[#170645] to-[#000000ee] text-white p-6 md:p-12 flex flex-col md:flex-row justify-between items-center rounded-b-[100px]">
        
        <div>
          <h1 className="text-5xl font-bold">Welcome To CMO Gallery</h1> {/*font-family: Inter; font-weight: 700; font-size: 54.96px;  CMO--> line-height: 88.49px;letter-spacing: 0%; font-family: Inter;font-weight: 500;font-size: 30.53px; line-height: 49.16px; letter-spacing: 0%;*/}
          <p className="text-lg mt-2 mb-4">Here's Everything You Need To Know To Get Started.</p> {/*font-family: Inter; font-weight: 500;font-size: 30.53px; line-height: 49.16px; letter-spacing: 0%; */}
          <p className="text-xl font-semibold mt-6">Rajyotsava 2024 New Raipur</p>
        </div>
        <img src="/CM.png" alt="admin" className="w-[345px] h-[365px] drop-shadow-lg transition-transform duration-300 hover:scale-105" style={{
    WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
    maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
  }} />
      </div>
      {/* hero Section ends */}

        <div className="p-6 flex flex-col lg:flex-row gap-6 justify-center items-center">
        <div className="flex flex-col  flex-1"  >
        {/* Heading: Overview */}
        <h2 className="text-2xl font-semibold text-[#170645] mb-4 ">Overview</h2>
      {/* Overview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-6" style={{ paddingLeft: "160px" }}>
        {stats.map((item, index) => (
          <div
            key={index}
            className={`w-[194px] h-[194px] ${item.bg} rounded-[25px] flex flex-col items-center justify-center shadow-md transition-all duration-300 hover:border-2 hover:border-[#170645]`}
            style={{ backgroundColor: item.bg }}
          >
            <img src={item.image} alt={item.label} className="w-12 h-12 mb-2" style={{ width: "24px", height: "24px" }} />
            <p className="text-3xl font-bold text-[#170645]">{item.count}</p>
            <h3 className="text-lg font-semibold text-[#170645]">{item.label}</h3>
          </div>
        ))}
      </div>
      </div>
      <div className="flex-1 flex justify-center" style={{ marginTop: "51px" }}>
        {/* Graph Section */}
        <CustomGraph />
      </div>
      </div>

  
      {/* Tabs & Gallery */}
      <div className="p-6">
        <div className="flex items-center border-b pb-2">
        <div className="flex space-x-8">
          {["All Photos", "All Users", "Profile Update"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-semibold text-[#170645]  ${
                currentTab === tab ? "border-b-2 border-[#170645] font-bold" : "font-light"
              }`}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </button>
           ))}
           </div>
           <div className="flex items-center gap-6 ml-auto">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="selectAll" className="w-4 h-4 cursor-pointer" onChange={handleSelectAll} />
            <label htmlFor="selectAll" className="text-sm cursor-pointer text-[#686868]">Select All</label>
          </div>
          <button className="bg-[#170645] text-[#FFE100] w-[174px] h-[54px] rounded-lg  font-normal "
           onClick={handleDownload}>  Download</button>

        </div>
        </div>
        {/* Image Gallery */}
        {currentTab === "All Photos" && (
        <div className="grid grid-cols-4 gap-6 mt-4">
        <div className="flex justify-start items-end w-80 h-[404px] mt-5  border border-[#686868] rounded-[25px]">
  
  <div className="flex flex-col items-center ">
    {/* Create Folder Icon */}
    <img src="/create_F.png" alt="Create Folder" className="w-[34px] h-[34px] mr-[70px] mb-1" />

    {/* Create Folder Text */}
    <p className="text-[#170645] text-[18px] font-medium mt-1 mb-1 ">Create Folder</p>

    {/* Example Folder Text */}
    <p className="text-[#686868] text-[14px] mt-1 mb-6 ml-6">Example: New Folder</p>
  </div>
</div>
          {eventNames.map((event, i) => (
            <div key={i} className="p-4   rounded-lg">
              <img src="/F4.png" alt="Gallery Item" className="rounded-lg w-80 h-[404px] object-cover" />
              <p className="text-start font-bold text-[18px] text-black mt-2">{event}</p>
              <div className="flex justify-start space-x-4 mt-1 w-full">
              <button className="flex items-center gap-2 py-2  text-white rounded-lg ">
              <img src="/Group 210.png" alt="Share" className="w-[30px] h-[30px]" />
            </button>
            <button className="flex items-center gap-2  py-2  text-white rounded-lg ">
            <img src="/Group 211.png" alt="Link" className="w-[30px] h-[30px]" />
            </button>
            <button className="flex items-center gap-2 py-2 text-white rounded-lg ">
            <img src="/Group 212.png" alt="Download" className="w-[30px] h-[30px]" />
            </button>
            </div>
            </div>
          ))}
        </div>
        )}
        {currentTab === "All Users" && (
        <div className="mt-4 p-4  ">
          <table className="w-full border-collapse border-black" >
            <thead>
              <tr className="bg-[#D9D9D9] text-center text-[#170645] " style={{ height: "60px",}}>
                <th className="p-2 border">No.</th>
                <th className="p-2 border">Full Name</th>
                <th className="p-2 border">District</th>
                <th className="p-2 border">Mobile No.</th>
                <th className="p-2 border">Email Id</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="text-[#170645] text-center" style={{ borderBottom: " 1px solid black"}}>
                  <td className="p-2 border-0">{index + 1}</td>
                  <td className="p-2 border-0">{user.name}</td>
                  <td className="p-2 border-0">{user.district}</td>
                  <td className="p-2 border-0">{user.mobile}</td>
                  <td className="p-2 border-0">{user.email}</td>
                  <td className="p-2 border-0 text-center">
                  <Switch checked={user.status} onChange={() => toggleStatus(user.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
      {currentTab === "Profile Update" && (
        <div className="mt-4  p-6 rounded-lg max-w-md mx-auto text-center">
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
              className="w-full p-3 border rounded-full focus:outline-none"
            />
            <select className="w-full p-3 border text-[#170645] rounded-full focus:outline-none">
              <option>Raipur</option>
              <option>Bhilai</option>
              <option>Durg</option>
            </select>
            <button className="w-full p-3 bg-[#170645] text-[#FFE100] rounded-full font-semibold">Update</button>
          </div>
        </div>
      )}
    </div>
  
  );
  };

  const CustomGraph = () => {
    const [chartData, setChartData] = useState([]);
  
    useEffect(() => {
      const data = [
        { day: "1", value: 50 },
        { day: "2", value: 20 },
        { day: "3", value: 75 },
        { day: "4", value: 90 },
        { day: "5", value: 55 },
        { day: "6", value: 10 },
        { day: "7", value: 100 },
      ];
  
      console.log("Chart Data:", JSON.stringify(data)); // Debugging
      setChartData(data);
    }, []);
  
    return (
      <div >
        <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold text-[#170645] ml-[50px]">Total User</h2>
      <p className="text-green-600 font-semibold mr-[60px]">75% ↑</p>
    </div>
        <div className="mt-4 bg-[#ECECEC] pt-6 rounded-[28.84px] shadow-md w-[641px] h-[370px]">
          <ResponsiveContainer width="95%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="6 6" strokeWidth={1.6} stroke="#686868" vertical={false}/>
              <XAxis
                dataKey="day"
                tick={{ fill: "#686868", fontSize: 14 }}
                tickFormatter={(tick) => `${tick}`} // ✅ Fix: Ensure it returns a string
                tickLine={false}
              />
              <YAxis tick={{ fill: "#686868", fontSize: 14 }} tickLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#170645" radius={[5, 5, 0, 0]} barSize={35.26} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
