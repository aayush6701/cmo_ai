import React, { useState } from "react";
import ModalPopup from "./ModalPopup"; // Importing Modal for 'Create Folder' functionality

const AllPhotos = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Modal state

  // Albums with multiple images
  const albums = [
    {
      name: "Rajyotsava 2024 New Raipur",
      cover: "/F4.png",
      images: ["/001.png", "/002.png", "/003.png", "/004.png", "/005.png", "/006.png"],
    },
    {
      name: "Mahtari Vandana Yojana",
      cover: "/F4.png",
      images: ["/image4.jpg", "/image5.jpg", "/image6.jpg"],
    },
    {
      name: "Mor Awas Mor Adhikar",
      cover: "/F4.png",
      images: ["/image7.jpg", "/image8.jpg", "/image9.jpg"],
    },
  ];

  return (
    <div className="mt-4">
      {/* If no album is selected, show album grid */}
      {selectedAlbum === null ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-4">
          {/* Create Folder Card */}
          <div
            onClick={() => setIsOpen(true)}
            className="flex justify-start items-end w-full h-[400px] border border-[#686868] rounded-[25px] p-4 cursor-pointer hover:shadow-lg transition mt-4"
          >
            <div className="flex flex-col items-start text-left pl-4">
              <img src="/create_F.png" alt="Create Folder" className="w-[34px] h-[34px] mb-1" />
              <p className="text-[#170645] text-[18px] font-medium mt-4 mb-1">Create Event</p>
              <p className="text-[#686868] text-[14px] mt-1 mb-6">Example: New Event</p>
            </div>
          </div>

          {/* Modal for Folder Creation */}
          <ModalPopup isOpen={isOpen} setIsOpen={setIsOpen} />

          {/* Album Cards */}
          {albums.map((album, i) => (
            <div key={i} className="p-4 rounded-lg cursor-pointer" onClick={() => setSelectedAlbum(album)}>
              <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[404px] rounded-[25px] overflow-hidden">
                <img src={album.cover} alt={album.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-start font-bold text-[18px] text-black mt-2">{album.name}</p>
              <div className="flex justify-start space-x-4 mt-1 w-full">
                <button className="pt-2 rounded-full hover:bg-gray-100">
                  <img src="/Group 210.png" alt="Share" className="w-[30px] h-[30px]" />
                </button>
                <button className="pt-2 rounded-full hover:bg-gray-100">
                  <img src="/Group 211.png" alt="Share" className="w-[30px] h-[30px]" />
                </button>
                <button className="pt-2 rounded-full hover:bg-gray-100">
                  <img src="/Group 212.png" alt="Share" className="w-[30px] h-[30px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        //photo section:
        <div>
          <button className="mb-4 px-4 py-2 bg-gray-300 rounded-lg" onClick={() => setSelectedAlbum(null)}>
            ← Back to Albums
          </button>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {selectedAlbum.images.map((image, index) => (
              <div key={index} className="p-2 rounded-lg border border-gray-300 overflow-hidden shadow-sm">
                <img src={image} alt={`Photo ${index + 1}`} className="w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[250px] object-cover rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPhotos;
