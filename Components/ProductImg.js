"use client";
import { Image } from "antd";
import gsap from "gsap";
import React, { useState } from "react";

const ProductImg = ({ img, imgLink }) => {
  const [ind, setind] = useState(0);

  const slide = (i) => {
    var value = "-" + i * 100 + "%";
    setind(i);
    gsap.to(".Pimg", {
      x: value,
      duration: 0.7,
      ease: "Expo.easeInOut",
    });
  };
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };
  return (
    <div className="h-[80vh] w-1/2 flex items-start justify-end p-2 gap-4 max-md:h-1/2 max-md:w-full max-md:justify-center max-md:items-center max-md:flex-col-reverse">
      <div className="flex flex-col gap-3 max-md:flex-row">
        {img?.map((i, index) => (
          <div
            className={`h-[15vh] w-[5vw] bg-black relative ${
              index === ind ? "border-2 border-black" : "border-none"
            } overflow-hidden rounded-md max-md:h-[5vh] max-md:w-[5vh]`}

            key={index}
          >
            <img
              // src={`${imgLink}/${i?.filename}/${i?.mimetype}`}
              // src={`http://localhost:8080/api/v1/admin/get/image${i?.filename}/${i?.mimetype}`}
              src={`https://papapetbackend-1.onrender.com/api/v1/admin/get/image/${i?.filename}/${i?.mimetype.split("/")[0]}/${i?.mimetype.split("/")[1]}`}
              className={`h-full w-full object-contain  `}
              alt=""
              onClick={() => slide(index)}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div
        className="h-full w-[75%] overflow-hidden relative rounded-lg  flex z-20  no-scrollbar"
        // style={{ scrollSnapType: "x mandatory" }}
      >
        {img?.map((i, index) => (
          <div key={index} className="Pimg h-full w-full shrink-0">
            {/* {isLoading && <div className="skeleton w-full h-full "></div>} */}

            <Image
              //   src={`${imgLink}/${i?.filename}/${i?.mimetype}`}
             src={`https://papapetbackend-1.onrender.com/api/v1/admin/get/image/${i?.filename}/${i?.mimetype.split("/")[0]}/${i?.mimetype.split("/")[1]}`}
              style={{ height: "100%", width: "100%" }}
              height={"100%"}
              width={"100%"}
              className={`object-contain`}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImg;
