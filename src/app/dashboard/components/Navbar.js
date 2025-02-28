"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa"

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <nav className=" fixed inset-0 w- full h-[80px] bg-white shadow-md shadow-[rgba(240,240,240,1)] px -6 py-3 flex items-center justify-between">
                 <div className="flex items-center justify-between w-full px-4">
                   {/* Left Section: Logo & Filter Button */}
                   <div className="flex items-center gap-6">
                     {/* CG Logo (Properly Positioned) */}
                     <img
                       src="/CG logo.webp"
                       alt="Logo"
                       className="w-[71px] h-[71px] ml-[10px]" // Adjusted left margin so it doesn't overlap
                     />
                     {/* Search Bar & Filter Button */}
                     <div className="flex items-center border border-[rgba(240,240,240,1)] rounded-full overflow-hidden bg-[rgba(236,236,236,1)] w-[1000px] h-[45px] px-3">
                       {/* Filter Button */}  
                       <button
                         className="px-4 py-2 rounded-full font-[Inter] font-medium text-[14px] leading-[15.8px] tracking-[0%]  text-[rgba(104,104,104,1)]  flex items-center gap-2 ml-[-10px]"
                       >
                         Filter
                         <div className="w-[12px] h-[12px]  border-[rgba(104,104,104,1)]">
                         <FaChevronDown className="text-[rgba(104,104,104,1)] text-sm" />
                         </div>
                       </button>
                       {/* Separator Line (|) */}
                       <span className="text-gray-400 px-3 text-lg">|</span>
                       {/* Search Input */}
                       <input
                         type=" text-[rgba(104,104,104,1)]"
                         placeholder="Search"
                         value={search}
                         onChange={(e) => setSearch(e.target.value)}
                         className="w-full text-sm outline-none bg-transparent px-3"
                       />
                       <button> ✕  </button>
                       <span className="text-gray-400 px-3 text-lg">|</span>
                   {/* Search Icon Button */}
                   <button className="text-background: var(--P-Color-2, rgba(104, 104, 104, 1));" >
                     <svg
                       width="20"
                       height="20"
                       viewBox="0 0 24 24"
                       fill="none"
                       stroke="currentColor"
                       strokeWidth="2"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                     >
                       <circle cx="11" cy="11" r="8"></circle>
                       <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                     </svg>
                   </button>
                 </div>
               </div>
             </div>
             <button
                   className="w-[150px] h-[40px] bg-[rgba(23,6,69,1)] text-[rgba(255,225,0,1)] rounded-[20px] shadow-[0px_4px_36px_0px_rgba(23,6,69,0.5)] 
                   flex items-center justify-center px-2 py-1 gap-1 transition-all ml-[-400px] mr-[6px]"
                   onClick={() => router.push("/dashboard/uploadphoto")} // Adjust navigation as needed
                 >
                   Search
             </button>
                   {/* Right Section: Profile Icon */}
                   <button className="w-9 h-10 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden ml-[-150]">
                     <img src="/pro.png" alt="User Profile" className="w-full h-full object-cover" />
             </button>
           </nav>
  );
}
