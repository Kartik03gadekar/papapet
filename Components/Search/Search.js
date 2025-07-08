"use client";

import { useState, useEffect, useRef } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "Dog Food",
    description: "Nutritious food for your dog",
    image: "/images/products/dog-food.jpg",
    type: "Dog",
  },
  {
    id: 2,
    name: "Cat Toy",
    description: "Fun toy for your cat",
    image: "/images/products/cat-toy.jpg",
    type: "Cat",
  },
  {
    id: 3,
    name: "Bird Cage",
    description: "Spacious cage for birds",
    image: "/images/products/bird-cage.jpg",
    type: "Bird",
  },
  {
    id: 4,
    name: "Fish Tank",
    description: "Aquarium for your fish",
    image: "/images/products/fish-tank.jpg",
    type: "Fish",
  },
  {
    id: 5,
    name: "Rabbit Hutch",
    description: "Comfortable hutch for rabbits",
    image: "/images/products/rabbit-hutch.jpg",
    type: "Rabbit",
  },
  {
    id: 6,
    name: "Dog Leash",
    description: "Durable leash for walking dogs",
    image: "/images/products/dog-leash.jpg",
    type: "Dog",
  },
  {
    id: 7,
    name: "Cat Litter",
    description: "Odor control litter",
    image: "/images/products/cat-litter.jpg",
    type: "Cat",
  },
  {
    id: 8,
    name: "Hamster Wheel",
    description: "Exercise wheel for hamsters",
    image: "/images/products/hamster-wheel.jpg",
    type: "Hamster",
  },
];

export default function Search({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(PRODUCTS);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        inputRef.current && inputRef.current.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered(PRODUCTS);
    } else {
      setFiltered(
        PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query]);

  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose && onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center"
      style={{
        backdropFilter: "blur(8px)",
        background: "rgba(0,0,0,0.25)",
        transition: "backdrop-filter 0.2s",
      }}
      onClick={handleOverlayClick}
    >
      <div
        className="w-full max-w-3xl mt-14 pt-10 md:pt-20 bg-white rounded-xl shadow-lg p-6 relative"
        style={{ minHeight: "300px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-7 left-1/2 -translate-x-1/2 md:top-0 md:right-0 md:left-auto md:translate-x-0
             bg-white text-gray-400 hover:text-gray-700 rounded-full shadow-lg md:shadow-none
             h-12 w-12 flex items-center justify-center text-3xl"
          onClick={onClose}
          aria-label="clove"
          style={{}}
        >
          &times;
        </button>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFAD22] text-lg mb-6"
        />
        <div className="overflow-y-auto" style={{ maxHeight: "450px" }}>
          {filtered.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              No products found.
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filtered.map((product) => (
                <li key={product.id} className="py-4 flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-[#0D9899] flex items-center gap-2">
                      {product.name}
                      <span className="ml-2 text-xs bg-[#FFAD22]/20 text-[#FFAD22] px-2 py-0.5 rounded-full">
                        {product.type}
                      </span>
                    </span>
                    <span className="text-gray-600 text-sm">
                      {product.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}