import Link from "next/link";
import React from "react";

const ProductCard = ({ i, imgLink }) => {
  return (
    <Link href={`/papapet/product/${i._id}`}>
      <div className="w-[80%] h-fit flex rounded-xl flex-col overflow-hidden items-start justify-center p-2 items-center justify-center bg-[#FEF8EA] gap-2 max-md:h-fit max-md:overflow-hidden">
        <div className="w-full h-[30vh] relative">
          <img
            className="h-full rounded-lg w-full object-contain"
            src={`${imgLink}/${i?.image[0]?.filename}/${i?.image[0]?.mimetype}`}
            alt=""
          />
          <img
            className="h-full absolute top-0 left-0 opacity-0 rounded-lg w-full object-contain"
            src={`${imgLink}/${i?.image[0]?.filename}/${i?.image[0]?.mimetype}`}
            alt=""
          />
        </div>

        <h1 className="text-2xl font-[poppins] ">₹ {i?.price}</h1>
        <h1 className="font-semibold text-xs">{i?.name}</h1>
        <h3 className="text-xs opacity-80">Brand : <span className="font-semibold">{i?.brand}</span></h3>
      </div>
    </Link>
  );
};

export default ProductCard;
