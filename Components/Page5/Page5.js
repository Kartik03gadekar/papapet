import React from "react";

const Page5 = () => {
  return (
    <div className="w-full h-fit p-20 flex flex-col items-center justify-center">
      <img src="/aboutUs.png" className="w-full h-full object-contain" alt="" />
      <div className="flex items-center p-10 justify-center w-full gap-10">
        <div className="flex flex-col items-start text-2xl font-semibold">
          <h1>100+</h1>
          <h4>Product</h4>
        </div>
        <div className="flex flex-col items-start text-2xl font-semibold">
          <h1>99+</h1>
          <h4>Seller</h4>
        </div>
        <div className="flex flex-col items-start text-2xl font-semibold">
          <h1>220+</h1>
          <h4>Positive Review</h4>
        </div>
      </div>
    </div>
  );
};

export default Page5;
