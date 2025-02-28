"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCloudUploadAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function UploadPhotoPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [eventCategory, setEventCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState({
    month: "April",
    day: "17",
    year: "2024",
  });

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 50 }, (_, i) => 2000 + i);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleProceed = () => {
    if (!eventCategory || !selectedDate || !selectedFile) {
      alert("Please select an event, date, and upload an image before proceeding.");
      return;
    }

    sessionStorage.setItem("eventCategory", eventCategory);
    sessionStorage.setItem("eventDate", `${selectedDate.month} ${selectedDate.day}, ${selectedDate.year}`);

    const reader = new FileReader();
    reader.onload = () => {
      sessionStorage.setItem("uploadedImage", reader.result);
      router.push("/dashboard/search");
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="full-h-screen bg -[rgb(244, 240, 240)] ">
      <Navbar />
      <main className=" flex flex-col items-center justify-center w-full px-4 py-10 bg-[rgb(244, 240, 240)]">
        <div className="   rounded-2xl px-8 py-6 w-full max-w-lg text-center relative  pt-12  ">
          <h2 className=" text-2xl font-extrabold text-[#170645]">Upload Photo</h2>
          <p className="text-[#170645] text-sm mt-1"> & Event Details</p>
          <div className="flex items-center my-6"><hr className="flex-grow border-t border-gray-300" /><span className="px-3 text-gray-500 text-center ">Event Details</span><hr className="flex-grow border-t border-gray-300" /></div>
          <div className="mt-6 relative">
          <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#170645] pointer-events-none" />
            <select
               className="border border-[#170645] p-3 pl-10 w-full rounded-full text- [#170645] appearance-none focus:outline-none focus:ring-2 focus:ring-[#170645] bg- [#170645]"
               value={eventCategory}
               onChange={(e) => setEventCategory(e.target.value)}
             >
               <option value="">Select Event Category</option>
               <option value="rajutsav2024">Rajutsav 2024</option>
               <option value="bastar_olympics">Bastar Olympics 2024</option>
               <option value="cm_jan_darshan">CM Jan Darshan 2024</option>
               <option value="mahtari_vandana">Mahtari Vandana Yojana</option>
               <option value="mor_awas">Mor Awas Mor Adhikar</option>
            </select>
          </div>
          <button className="mt-4 ml-[-290px] text-[#170645] ">
            Select Date
          </button>
          <div className="mt-7 flex justify-center space-x- -3 overflow-hidden relative">
             {/* Month Selection */}
                <div className="scroll-container w-1/4 text-center overflow-y-scroll h-32" style={{ scrollbarWidth: "none" }}>
                  {months.map((month) => (
                    <div
                      key={month}
                      className={`py-2 text-lg cursor-pointer transition-all duration-300 ${
                        month === selectedDate.month ? "font-bold bg-gray-300 rounded-md" : "text-[#170645]"
                      }`}
                      onClick={() => setSelectedDate((prev) => ({ ...prev, month }))}
                    >
                      {month}
                    </div>
                  ))}
                </div>
                {/* Day Selection */}
                <div className="scroll-container w-1/6 text-center overflow-y-scroll h-32" style={{ scrollbarWidth: "none" }}>
                  {days.map((day) => (
                    <div
                      key={day}
                      className={`py-2 text-lg cursor-pointer transition-all duration-300 ${
                        day === parseInt(selectedDate.day) ? "font-bold bg-gray-300 rounded-md" : "text-[#170645]"
                      }`}
                      onClick={() => setSelectedDate((prev) => ({ ...prev, day: day.toString() }))}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Year Selection */}
                <div className="scroll-container w-1/3 text-center overflow-y-scroll h-32" style={{ scrollbarWidth: "none" }}>
                  {years.map((year) => (
                    <div
                      key={year}
                      className={`py-2 text-lg cursor-pointer transition-all duration-300 ${
                        year === parseInt(selectedDate.year) ? "font-bold bg-gray-300 rounded-md" : "text-[#170645]"
                      }`}
                      onClick={() => setSelectedDate((prev) => ({ ...prev, year: year.toString() }))}
                    >
                      {year}
                </div>
            ))}
            </div>
          </div>

          <div className="flex items-center my-6"><hr className="flex-grow border-t border-gray-300" /><span className="px-3 text-gray-500 text-center ">Upload Photo</span><hr className="flex-grow border-t border-gray-300" /></div>
          <div className="mt-6 flex items-center justify-center">
              <label className="cursor-pointer w-full max-w-lg flex items-center justify-center border border-gray-300 bg-white rounded-full p-4 shadow-md hover:shadow-lg transition">
                <FaCloudUploadAlt className="text-[#170645] text-2xl mr-2" />
                <span className="text-[#170645] font-medium">Drag An Image Here Or Upload A File</span>
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
            {selectedFile && (
              <p className="mt-2 text-green-600 text-sm text-center">
                Selected File: {selectedFile.name}
              </p>
            )}
          <button
            onClick={handleProceed}
            className="mt-6 w-full bg-[#170645] text-yellow-400 p-3 rounded-full text-lg font-semibold "
          >
            Proceed
          </button>
        </div>
      </main>
    </div>
  );
}
