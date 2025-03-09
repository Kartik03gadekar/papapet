"use client";
import { Badge } from "antd";
import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductDetail = ({ product }) => {
  const [quantity, setquantity] = useState(1);
  const [size, setsize] = useState(product?.stock[0]?.value);
  const decrease = () => {
    if (quantity > 1) {
      setquantity((prevquantity) => prevquantity - 1);
    }
  };

  const increase = () => {
    if (quantity < 10) {
      setquantity((prevquantity) => prevquantity + 1);
    } else if (quantity == 10) {
      toast.error("Max Limit of quantity is 10");
    }
  };
  const priceAnimation = (i) => {
    setsize(`${i?.value}`);
    gsap.from(".selling", {
      opacity:0,
      duration:0.5,
    });
    gsap.to(".line", {
      width: "95%",
      duration: 1,
    });
    gsap.to("#skl", {
      backgroundColor: "transparent",
      delay: 2,
      duration:1
    });
  };
  
  useEffect(() => {
    gsap.from(".selling", {
      opacity:0,
      duration: .5,
    });
    gsap.to(".line", {
      width: "95%",
      duration: 1,
    });
    gsap.to("#skl", {
      backgroundColor: "transparent",
      delay: 2,
      duration:1
    });
  }, [size]);
  return (
    <Badge.Ribbon
      id="pop"
      text={`Dry Food`}
      className="font-semibold flex gap-2 p-2 font-[poppins]"
    >
      <div className="w-full h-fit flex flex-col items-start gap-4 font-medium p-10">
        <h1 className="text-lg">PaPaPet</h1>
        <h1 id="mon" className="text-3xl w-[80%]">
          {product?.name}
        </h1>
        <h1
          id="gil"
          className="text-lg text-red-500 w-[80%] font-[gilroy] font-normal"
        >  
        
          <span className="font-extralight text-black">by</span>{" "}
          {product?.brand}
        </h1>
        <div className="flex gap-6">
          {product?.stock?.map((i, index) => (
            <button
              className={`btn btn-square ${
                size === `${i?.value}` ? "btn-neutral" : "btn-shadow"
              }  ${i?.quantity === 0 ? "line-through disabled" : ""}`}
              disabled={`${i?.quantity === 0 ? "disabled" : ""}`}
              onClick={() => priceAnimation(i)}
            >
              {i?.value}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-4 font-normal font-[poppins]">
          <h1>Quantity :</h1>
          <button
            className="flex border-2 rounded-lg items-center justify-between border-gray-300 p-3"
            style={{ width: "9vw", fontSize: "1vw" }}
          >
            <i className="ri-subtract-line" onClick={decrease}></i>
            <h1 className="text-lg">{quantity}</h1>
            <i className="ri-add-fill" onClick={increase}></i>
          </button>
        </div>
        <div className="flex flex-col font-medium text-xl font-[poppins]">
          {product?.stock?.map((i, index) =>
            i?.value === size ? (
              <>
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl relative z-20 bg-white">
                    ₹{i?.price}
                    .00
                    <span
                      className="line w-[0%] h-[2px] -rotate-[8deg] bg-orange-500 absolute top-1/2 left-0"
                      style={{ transformOrigin: "left bottom" }}
                    ></span>
                  </h2>
                  <div id="skl" className="skeleton h-fit w-fit rounded-none opacity-100">
                    <h2 className="selling text-2xl opacity-100">
                      ₹{i?.sellingprice}
                      .00
                    </h2>
                  </div>
                </div>
              </>
            ) : (
              ""
            )
          )}

          <h2 className="font-thin text-sm">
            {"("} incl. of all taxes {")"}{" "}
          </h2>
        </div>
        <div className="divider"></div>
        <button className="cartbtn uppercase p-4 w-[80%] rounded-sm bg-gray-200 relative overflow-hidden">
          <h1 className="relative z-40">Add to cart</h1>
        </button>
        <button className="uppercase p-4 w-[80%] rounded-sm mt-4 bg-black text-white relative overflow-hidden">
          <h1 className="relative z-40">Proceed to buy</h1>
        </button>
        <div className="flex gap-2 cursor-pointer mt-3 font-thin text-lg text-gray-400 items-center justify-center">
          <h2 className="font-thin">Share</h2>
          <i className="ri-whatsapp-line"></i>
          <i className="ri-facebook-line"></i>
          <i className="ri-instagram-line"></i>
          <i className="ri-telegram-line"></i>
        </div>
      </div>
    </Badge.Ribbon>
  );
};

export default ProductDetail;
