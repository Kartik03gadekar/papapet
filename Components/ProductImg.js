"use client";
import { Image } from "antd";
import gsap from "gsap";
import React, { useState } from "react";
import LazyImage from "./LazyImage";

const ProductImg = ({ img }) => {
  const [ind, setInd] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

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
              index === ind
                ? "border-2 border-orange-500"
                : "border border-gray-300"
            } overflow-hidden rounded-md max-md:h-[5vh] max-md:w-[5vh]`}
            onClick={() => slide(index)}
          >
            <LazyImage
              src={i}
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
            <div
              key={index}
              className="h-full w-full shrink-0 flex items-center justify-center"
            >
              <div
                key={index}
                className="h-full w-full shrink-0 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setPreviewIndex(index);
                  setIsPreviewOpen(true);
                }}
              >
                <LazyImage
                  src={i}
                  className="object-contain h-full w-full"
                  alt={`Image ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* {isPreviewOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
          
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setIsPreviewOpen(false)}
          >
            ✕
          </button>

          
          <button
            className="absolute left-5 text-white text-4xl"
            onClick={() =>
              setPreviewIndex((previewIndex - 1 + img.length) % img.length)
            }
          >
            ‹
          </button>

         
          <button
            className="absolute right-5 text-white text-4xl"
            onClick={() => setPreviewIndex((previewIndex + 1) % img.length)}
          >
            ›
          </button>

        
          <button
            className="absolute bottom-5 right-5 bg-white/20 px-4 py-2 rounded-lg text-white"
            onClick={() => setRotation((r) => r + 90)}
          >
            🔄 Rotate
          </button>

        
          <div className="max-w-5xl max-h-[80vh] overflow-hidden">
            <img
              src={img[previewIndex]}
              alt="Preview"
              className="transition-transform duration-300 cursor-move"
              style={{
                transform: `rotate(${rotation}deg) scale(1)`,
              }}
              onWheel={(e) => {
                e.currentTarget.style.transform = `rotate(${rotation}deg) scale(${
                  e.deltaY < 0 ? 1.2 : 1
                })`;
              }}
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ProductImg;
