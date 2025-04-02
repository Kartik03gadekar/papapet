import React from "react";
import PetWalkerCard from "./PetWalkerCard";

const PetwalkerList = () => {
  const walkers = [
    { name: "Abhinav Jain", city: "City-Based", experience: 5 },
    { name: "Abhinav Jain", city: "City-Based", experience: 5 },
    { name: "Abhinav Jain", city: "City-Based", experience: 5 },
    { name: "Abhinav Jain", city: "City-Based", experience: 5 },
    { name: "Abhinav Jain", city: "City-Based", experience: 5 },
    { name: "Abhinav Jain", city: "City-Based", experience: 5 },
    { name: "Abhinav Jain", city: "City-Based", experience: 5 },
    { name: "Abhinav Jain", city: "City-Based", experience: 5 },
    { name: "Abhinav Jain", city: "City-Based", experience: 5 },
    { name: "Abhinav Jain", city: "City-Based", experience: 5 },
    { name: "Abhinav Jain", city: "City-Based", experience: 5 },
    { name: "Abhinav Jain", city: "City-Based", experience: 5 },
    { name: "Abhinav Jain", city: "City-Based", experience: 5 },
    { name: "Abhinav Jain", city: "City-Based", experience: 5 },
    { name: "Abhinav Jain", city: "City-Based", experience: 5 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-center text-2xl font-bold mb-4">Best Pet Walkers Connected With Us</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6">
        {walkers.map((walker, index) => (
          <PetWalkerCard key={index} {...walker} />
        ))}
      </div>
    </div>
  );
};

export default PetwalkerList;
