"use client";
import React from "react";

const PetDaycareList = () => {
  // Dummy Data
  const daycares = [
    {
      id: 1,
      name: "PawHaven Daycare",
      location: "Maple Paw Avenue, Sunnybrook City",
      description: "A safe and fun daycare where pets play, socialize, and receive expert care.",
      image: "/daycareimage1.png",
    },
    {
      id: 2,
      name: "Furry Friends Playhouse",
      location: "432 Barkshire Lane, Pawsville",
      description: "Spacious play areas, loving staff, and tailored activities for happy pets.",
      image: "/daycareimage2.png",
    },
    {
      id: 3,
      name: "Happy Tails Academy",
      location: "Whisker Way, Greenfield Heights",
      description: "Reliable pet daycare ensuring comfort, safety, and endless tail wags.",
      image: "/daycareimage3.png",
    },
  ];

  return (
    <div className="w-full px-10 py-10 max-md:px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">Find a Pet Daycare Near You</h2>
      
      <div className="flex flex-col gap-6">
        {daycares.map((daycare) => (
          <div key={daycare.id} className="flex items-center gap-[6vw] bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg max-md:flex-col max-md:items-start max-md:gap-4">
           <div>
             {/* Image */}
             <img src={daycare.image} alt={daycare.name} className="w-[20vw] object-cover rounded-lg max-md:w-full" />

           </div>
            {/* Text Content */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">{daycare.name}</h3>
              <p className="text-gray-400 text-lg">{daycare.location}</p>
              <p className=" mt-3 mb-1">{daycare.description}</p>
                  {/* Button */}
            <button className="bg-[#FFA500] text-white  w-[10vw] px-4 py-2 rounded-lg font-medium hover:bg-[#FF8C00] max-md:w-full">
              Book
            </button>
            </div>

        
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetDaycareList;
