"use client";
import Image from "next/image";
import { useState } from "react";

const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse rounded-md">
          <i className="ri-image-2-line text-2xl text-gray-400" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "contain" }}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-300 rounded-md ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        priority={false}
      />
    </div>
  );
};

export default LazyImage;
