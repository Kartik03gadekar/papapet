import React from "react";
import Loading from "./loading";
import ProductImg from "./ProductImg";
import ProductExtraInfo from "./ProductExtraInfo";
import ProductDetail from "./ProductDetail";


const ProductView = ({ data, imgLink, loading }) => {


  
  return (
    <div className="w-full min-h-screen flex flex-col p-4 max-md:mt-[10vh] gap-6">
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Top section: Image and Details */}
          <div className="flex gap-6 max-md:flex-col mt-10">
            <ProductImg img={data?.image} imgLink={imgLink} />
            <div className="w-full md:w-[40%] py-12 px-4">
              <ProductDetail product={data} />
            </div>
          </div>

          {/* Bottom section: Description + Features + Related */}
          <ProductExtraInfo food={data}/>
        </>
      )}
    </div>
  );
};

export default ProductView;
