import Link from "next/link";
import React from "react";

const ProductCard = ({ i, imgLink }) => {
  return (
    <Link href={`/papapet/product/${i._id}`}>
      <div className="w-[80%] h-fit flex rounded-xl flex-col overflow-hidden  p-2 items-center justify-center bg-white gap-1 max-md:h-fit max-md:overflow-hidden max-md:w-full max-md:border-2 max-md:rounded-md">
        <div className="w-full h-[20vh]  relative ">
          <img
            className="h-full rounded-lg w-full object-contain"
            src={`http://localhost:8080/api/v1/admin/get/image/${i?.image[0]?.filename}/${i?.image[0]?.mimetype.split("/")[0]}/${i?.image[0]?.mimetype.split("/")[1]}`}
            alt=""
          />
        
        </div>

       <h1 className={`text-lg mb-1 font-semibold font-[poppins] ${i?.stock?.some(item => item.quantity > 0) ? 'text-green-700' : 'text-red-600'}`}>
  {i?.stock?.some(item => item.quantity > 0) ? 'Available' : 'Out of Stock'}
</h1>

        <h1 className="font-semibold text-xs capitalize   ">{i?.name}</h1>
        
      
        <h1 className="font-semibold text-xs max-md:hidden mb-2 capitalize">Category : {i?.categories}</h1>
        <button className="bg-red-500 max-md:hidden rounded-md text-xs px-4 py-2 text-white mb-1">
          Great Offer
        </button>
        <h1 className="text-2xl font-[poppins] max-md:text-2sm ">
          <span className="text-lg ">
          M.R.P
          </span> 
           &nbsp; ₹ {i?.price}  </h1>
        {/* <h3 className="text-xs opacity-80">
          Brand : <span className="font-semibold">{i?.brand}</span>
        </h3> */}
      </div>
    </Link>
  );
};

export default ProductCard;
