import Link from 'next/link';
import React from 'react'

const BoardingList = () => {
// Dummy Data
const boardlist =[
  {
    "name": "Cozy Paws Inn",
    "address": "Maple Paw Avenue, Sunnybrook City",
    "description": "A safe, comfortable stay where pets feel at home while you’re away.",
    "action": "Book",
    "image":"/boardingimage1.png"
  },
  {
    "name": "Furry Retreat",
    "address": "432 Barkshire Lane, Pawsville",
    "description": "Spacious, stress-free boarding with 24/7 care and personalized attention.",
    "action": "Book",
     "image":"/boardingimage2.png"
  },
  {
    "name": "Tail Haven Boarding",
    "address": "Whisker Way, Greenfield Heights",
    "description": "Trusted pet boarding with cozy spaces, playtime, and loving care.",
    "action": "Book",
     "image":"/boardingimage3.png"
  }
]

  return (
    <div className="w-full px-10 py-10 max-md:px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">Find a Pet Daycare Near You</h2>
      
      <div className="flex flex-col gap-6">
        {boardlist.map((daycare) => (
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

                  <Link href={`/papapet/boarding/${daycare.id}`} >
            <button className="bg-[#FFA500] text-white  w-[10vw] px-4 py-2 rounded-lg font-medium hover:bg-[#FF8C00] max-md:w-full">
              Book
            </button>
            </Link>
            </div>

        
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardingList
