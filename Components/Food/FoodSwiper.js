"use client";
import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
const contentStyle = {
  height: "100%",
  color: "#fff",
  textAlign: "center",
  background: "red",
  width: "100%",
  dispaly: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
  objectFit: "cover",
};
const FoodSwiper = () => {
  const data = [
    {
      text: "sdff",
      img:"/foodBanner1.png"
    },
    {
      text: "sdff",
      img:"/foodBanner2.png"

    },
    {
      text: "sdff",
      img:"/foodBanner3.png"
      
    },
    {
      text: "sdff",
      img:"/foodBanner4.png"
      
    }
  ];

  return (
  <div className="w-full">
      <Carousel autoplay autoplaySpeed={1200}>
      {data?.map((i, ind) => (
        <div id="page1" className="h-[70vh] w-full max-md:h-[20vh]">
          <img key={ind} style={contentStyle} src={i.img} alt="" className="w-full h-full object-contain" />
        </div>
      ))}
    </Carousel>
  </div>
  );
};

export default FoodSwiper;
