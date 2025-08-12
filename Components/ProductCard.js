import Link from "next/link";
import React from "react";
import axios from "@/Axios/axios"; // import axios instance

const ProductCard = ({ i }) => {
  // Calculate discount percent if discountprice exists
  const hasDiscount = i?.discountprice && i?.discountprice < i?.price;
  const discountPercent = hasDiscount
    ? Math.round(((i.price - i.discountprice) / i.price) * 100)
    : null;

  // Helper to get image URL using axios instance baseURL
  const getImageUrl = () => {
    if (i?.image && i?.image[0]) {
      const { filename, mimetype } = i.image[0];
      const [type, subtype] = mimetype.split("/");
      // Use axios instance baseURL
      return `${axios.defaults.baseURL}admin/get/image/${filename}/${type}/${subtype}`;
    }
    return "/no-image.png";
  };

  return (
    <Link
      href={`/papapet/product/${i._id}`}
      className="no-underline w-full block"
      tabIndex={0}
    >
      <div
        className="
          w-full h-full bg-white rounded-lg border border-[#FFD36A] shadow-sm
          p-3 sm:p-4 flex gap-3 sm:gap-4
          transition hover:shadow-lg
          min-h-[180px]
        "
      >
        {/* Image on the left (top on mobile) */}
        <div className="flex-shrink-0 flex items-center justify-center mb-2 sm:mb-0">
       <img
  className="
    w-[100px] h-[100px] sm:w-[110px] sm:h-[110px]
    object-contain rounded
    mx-auto
  "
  src={getImageUrl()}
  alt={i?.name || 'Product'}
/>

        </div>
        {/* Text on the right (below image on mobile) */}
        <div className="flex flex-col flex-1 justify-between h-full">
          {/* Title and weight/size */}
          <div>
            <h2
              className="text-[15px] sm:text-[16px] font-semibold text-[#222] leading-tight mb-0.5"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {i?.name}
            </h2>
            <div className="text-[13px] sm:text-[14px] text-[#666] font-normal mb-1">
              {i?.weight || i?.size || ""}
            </div>
          </div>
          {/* Brand and Category Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs mb-1 gap-1">
            <span className="text-black/50 font-medium">
              Brand: <span className = "text-orange-400">{i?.brand || "Pedigree"}</span>
            </span>
            <span className="text-[#222] bg-[#F5F5F5] px-2 py-0.5 rounded w-fit">
              Category: {i?.categories || "Dry Food"}
            </span>
          </div>
          {/* Price Row */}
          <div className="flex items-center justify-start gap-2 mb-1 flex-wrap">
            <span className="text-[#1E90FF] text-[20px] sm:text-[22px] font-bold">
              Rs. {hasDiscount ? i.discountprice : i.price}
            </span>
            {hasDiscount && (
              <>
                <span className="text-[#888] text-[13px] line-through font-medium ml-2">
                  Rs.{i.price}
                </span>
                <span className="bg-[#FFD36A] text-[#222] text-[11px] font-semibold px-2 py-0.5 rounded">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>
          {/* Add to Cart Button */}
          <button
            className="
              w-full bg-[#FF7F2A] hover:bg-[#ff6600] text-white text-[15px] font-semibold rounded
              px-4 py-2 flex items-center justify-center gap-2 transition mt-2 sm:mt-auto
            "
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            ADD TO CART
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path
                d="M7.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM7.7 14.3a.75.75 0 01-.7-.5L4.1 6.6A.75.75 0 014.8 5.5h10.4a.75.75 0 01.7 1.1l-2.9 7.2a.75.75 0 01-.7.5H7.7z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
