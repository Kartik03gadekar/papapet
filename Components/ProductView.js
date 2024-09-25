import React from "react";
import Loading from "./loading";
import ProductImg from "./ProductImg";
import ProductDetail from "./ProductDetail";

const ProductView = ({data,imgLink,loading}) => {

 
  return (
    <div className="w-full min-h-screen flex p-10 px-5 max-md:flex-col max-md:mt-[10vh] max-md:gap-4 max-md:h-fit">
      {loading ? (
        <Loading />
      ) : (
        <>
          <ProductImg img={data?.image} imgLink={imgLink} />
          <div className="w-[40%] max-md:w-full ">
            <ProductDetail product={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductView;
