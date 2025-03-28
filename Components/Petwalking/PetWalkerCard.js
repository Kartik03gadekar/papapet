import React from "react";

const PetWalkerCard = ({ name, city, experience }) => {
  return (
    <div className="bg-white rounded-lg  py-4 text-center border-2 border-yellow-400">
      <img src="/petwalkingimage2.png" alt="Walker" className="w-[5vw] mx-auto mb-2" />
      <h3 className="font-bold">{name}</h3>
      <p className="text-gray-500">{city}</p>
      <p className="text-gray-500">{experience} Years of Experience</p>
    </div>
  );
};

export default PetWalkerCard;
