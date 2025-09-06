"use client";
import { Image } from "antd";
import gsap from "gsap";
import React, { useState } from "react";
import LazyImage from "./LazyImage";

const ProductImg = ({ img }) => {
  const [ind, setInd] = useState(0);

  const slide = (i) => {
    const value = "-" + i * 100 + "%";
    setInd(i);
    gsap.to(".PimgWrapper", {
      x: value,
      duration: 0.7,
      ease: "Expo.easeInOut",
    });
  };

  return (
    <div className="h-[80vh] w-1/2 flex items-start justify-end p-2 gap-4 max-md:h-1/2 max-md:w-full max-md:justify-center max-md:items-center max-md:flex-col-reverse">
      {/* Thumbnails */}
      <div className="flex flex-col gap-3 max-md:flex-row">
        {img?.map((i, index) => (
          <div
            key={index}
            className={`h-[15vh] w-[5vw] bg-gray-100 relative cursor-pointer ${
              index === ind ? "border-2 border-orange-500" : "border border-gray-300"
            } overflow-hidden rounded-md max-md:h-[5vh] max-md:w-[5vh]`}
            onClick={() => slide(index)}
          >
            <LazyImage
              src={`https://papapetbackend-oaiw.onrender.com/api/v1/admin/get/image/${
                i?.filename
              }/${i?.mimetype.split("/")[0]}/${i?.mimetype.split("/")[1]}`}
              className="h-full w-full object-cover"
              alt={`Thumbnail ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Main Image Slider */}
      <div className="h-[50vh] md:w-[50vw] overflow-hidden relative rounded-lg flex z-20">
        <div className="PimgWrapper flex h-full w-full">
          {img?.map((i, index) => (
            <div key={index} className="h-full w-full shrink-0 flex items-center justify-center">
              <LazyImage
                src={`https://papapetbackend-oaiw.onrender.com/api/v1/admin/get/image/${
                  i?.filename
                }/${i?.mimetype.split("/")[0]}/${i?.mimetype.split("/")[1]}`}
                className="object-contain h-full w-full"
                alt={`Image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImg;
