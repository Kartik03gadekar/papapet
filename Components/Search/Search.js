"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFood } from "@/store/Action/others";
 import Link from "next/link";

export default function Search({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(5); // Number of items shown
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const { food = [], load } = useSelector((state) => state.others);

  // Fetch food list only once
  useEffect(() => {
    if (open && food.length === 0) dispatch(getFood());
  }, [open, food.length, dispatch]);

  // Autofocus and body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setVisibleCount(5); // reset count when modal closes
    }
    return () => (document.body.style.overflow = "");
  }, [open]);

  // Filter by animalCategory
  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return food.filter((p) => p.name?.toLowerCase().includes(q));
  }, [query, food]);

  if (!open) return null;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5); // show 5 more items
  };

  const visibleItems = filtered.slice(0, visibleCount);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center"
      style={{ backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.25)" }}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className="w-full max-w-3xl mt-14 md:mt-20 bg-white rounded-xl shadow-lg p-6 relative"
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
          onChange={(e) => setQuery(e.target.value.replace(/\s+/g, " "))}
          placeholder="Search by animal category..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFAD22] text-lg mb-6 mt-10"
        />

        {/* Results */}
        <div className="overflow-y-auto h-auto" style={{ maxHeight: "450px" }}>
          {load && query ? (
            <div className="text-gray-500 text-center py-8">Loading...</div>
          ) : query && filtered.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              No products found.
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-100">
                {visibleItems.map((product) => (
                  <li
                    key={product._id}
                    className="py-4 flex items-center gap-4 hover:bg-gray-50 rounded-lg px-2"
                  >
                    <Link
                      href={`/papapet/product/${product._id}`}
                      className="flex items-center gap-4 w-full"
                    >
                      <div className="w-16 h-16 flex-shrink-0 relative">
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="rounded-md"
                        />
                      </div>

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
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Load More button */}
              {visibleCount < filtered.length && (
                <div className="text-center mt-4">
                  <button
                    onClick={handleLoadMore}
                    className="px-4 py-2 bg-[#FFAD22] text-white rounded-lg hover:bg-[#e69c1d]"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
