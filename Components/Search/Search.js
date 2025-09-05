"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFood } from "@/store/Action/others";
import axios from "@/Axios/axios";

export default function Search({ open, onClose, i }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const { food = [], load } = useSelector((state) => state.others);
  const { imgLink } = useSelector((state) => state.others);
  // Fetch food list once when modal opens
  useEffect(() => {
    if (open && food.length === 0) {
      dispatch(getFood());
    }
  }, [open, food.length, dispatch]);

  // Autofocus on open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery(""); // reset search on close
      setFiltered([]); // clear results on close
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Update results only if query has value
  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]); // ✅ don’t show all products by default
    } else {
      setFiltered(
        food.filter(
          (p) =>
            p.name?.toLowerCase().includes(query.toLowerCase()) ||
            p.description?.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, food]);

  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  // const getImageUrl = () => {
  //   if (i?.image && i?.image[0]) {
  //     const { filename, mimetype } = i.image[0];
  //     const [type, subtype] = mimetype.split("/");
  //     return `${axios.defaults.baseURL}admin/get/image/${filename}/${type}/${subtype}`;
  //   }
  //   return "/no-image.png";
  // };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center"
      style={{
        backdropFilter: "blur(8px)",
        background: "rgba(0,0,0,0.25)",
      }}
      onClick={handleOverlayClick}
    >
      <div
        className="w-full max-w-3xl mt-14 pt-10 md:pt-20 bg-white rounded-xl shadow-lg p-6 relative"
        style={{ minHeight: "300px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute -top-7 left-1/2 -translate-x-1/2 md:top-0 md:right-0 md:left-auto md:translate-x-0
             bg-white text-gray-400 hover:text-gray-700 rounded-full shadow-lg md:shadow-none
             h-12 w-12 flex items-center justify-center text-3xl"
          onClick={onClose}
          aria-label="close"
        >
          &times;
        </button>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFAD22] text-lg mb-6"
        />

        {/* Results */}
        <div className="overflow-y-auto" style={{ maxHeight: "450px" }}>
          {load && query ? (
            <div className="text-gray-500 text-center py-8">Loading...</div>
          ) : query && filtered.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              No products found.
            </div>
          ) : (
            query && (
              <ul className="divide-y divide-gray-100">
                {filtered.map((product) => (
                  <li
                    key={product._id}
                    className="py-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 rounded-lg px-2"
                  >
                    <img
                      src={
                        product.image?.length
                          ? `${imgLink}/${product.image[0].filename}`
                          : "/no-image.png"
                      }
                      alt={product.name}
                    />
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-[#0D9899] flex items-center gap-2">
                        {product.name}
                        {product.animalCategory && (
                          <span className="ml-2 text-xs bg-[#FFAD22]/20 text-[#FFAD22] px-2 py-0.5 rounded-full">
                            {product.animalCategory}
                          </span>
                        )}
                      </span>
                      <span className="text-gray-600 text-sm line-clamp-1">
                        {product.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      </div>
    </div>
  );
}
