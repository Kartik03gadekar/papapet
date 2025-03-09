"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import ProductCard from "../ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { getFood } from "@/store/Action/others";
import Loading from "../loading";
import style from "./FoodContainer.module.css"

const FoodContainer = () => {
  const data = [
    {
      img: [
        "https://www.petsy.online/cdn/shop/products/1_7af4b746-8c3b-4edb-9e22-7b902102b029.jpg?v=1679985001&width=700",
        "https://www.petsy.online/cdn/shop/products/7_6bcd7945-ca69-4be5-97f7-792acea18c7d.png?v=1614676335&width=1080",
      ],
      title: "Kitty Yums Dry Cat Food for Kittens - Ocean Fish",
      company: "Kitty Kums",
      price: "999",
    },
    {
      img: [
        "https://www.petsy.online/cdn/shop/products/1_7af4b746-8c3b-4edb-9e22-7b902102b029.jpg?v=1679985001&width=700",
        "https://www.petsy.online/cdn/shop/products/7_6bcd7945-ca69-4be5-97f7-792acea18c7d.png?v=1614676335&width=1080",
      ],
      title: "Kitty Yums Dry Cat Food for Kittens - Ocean Fish",
      company: "Kitty Kums",
      price: "999",
    },
    {
      img: [
        "https://www.petsy.online/cdn/shop/products/1_7af4b746-8c3b-4edb-9e22-7b902102b029.jpg?v=1679985001&width=700",
        "https://www.petsy.online/cdn/shop/products/7_6bcd7945-ca69-4be5-97f7-792acea18c7d.png?v=1614676335&width=1080",
      ],
      title: "Kitty Yums Dry Cat Food for Kittens - Ocean Fish",
      company: "Kitty Kums",
      price: "999",
    },
    {
      img: [
        "https://www.petsy.online/cdn/shop/products/1_7af4b746-8c3b-4edb-9e22-7b902102b029.jpg?v=1679985001&width=700",
        "https://www.petsy.online/cdn/shop/products/7_6bcd7945-ca69-4be5-97f7-792acea18c7d.png?v=1614676335&width=1080",
      ],
      title: "Kitty Yums Dry Cat Food for Kittens - Ocean Fish",
      company: "Kitty Kums",
      price: "999",
    },
    {
      img: [
        "https://www.petsy.online/cdn/shop/products/1_7af4b746-8c3b-4edb-9e22-7b902102b029.jpg?v=1679985001&width=700",
        "https://www.petsy.online/cdn/shop/products/7_6bcd7945-ca69-4be5-97f7-792acea18c7d.png?v=1614676335&width=1080",
      ],
      title: "Kitty Yums Dry Cat Food for Kittens - Ocean Fish",
      company: "Kitty Kums",
      price: "999",
    },
  ];
  const brands = [
    { name: "Royal Canin", img: "/royal.webp" },
    { name: "Arden Grance", img: "/arden.png" },
    { name: "Sniffy", img: "/sniffy.jpg" },
    { name: "Drools", img: "/drools.png" },
    { name: "Happy Dog", img: "/happy.avif" },
    { name: "MERA", img: "/mera.webp" },
  ];
  const { load, food, imgLink } = useSelector((state) => state.others);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFood());
  }, []);
  const d = [
    {
      name: "Dry Food",
      img: "dry.png",
    },
    {
      name: "Wet Food",
      img: "wetF.jpg",
    },
    {
      name: "Treats",
      img: "treat.png",
    },
    {
      name: "Treats",
      img: "wet.png",
    },
  ];
  return (
    <div className="w-full min-h-screen text-black  py-6 mt-[5vh] ">
      {/* Browse By Brands */}
 <div className="flex flex-col gap-[4vw] items-center justify-center mt-2  ">
 <div className=" flex  items-center text-center justify-center">
    <h1 className="text-4xl font-semibold relative z-10 bg-white text-center max-md:text-3xl max-md:pb-6">
      Browse By Brands
    </h1>
  </div>
<div className="w-full  h-52 max-md:h-40 flex  items-center justify-center gap-8 py-2 ">
  
  <Swiper
    slidesPerView={3}
    spaceBetween={20}
    breakpoints={{
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 4 },
    }}
    navigation={window?.innerWidth > 768}
    pagination={{ clickable: true }}
    modules={[Pagination, Navigation]}
    className={`w-full  ${style.swiper}`}
  >
    {brands.map((brand, index) => (
      <SwiperSlide
        key={index}
       
      >

       <div className="w-[20vw]  max-md:w-[30vw] flex flex-col items-center justify-center ">
       <div className="h-[20vh] w-[20vh] max-md:h-[10vh] max-md:w-[10vh] rounded-full border-2 overflow-hidden
        flex  flex-col items-center justify-center  ">
          <img
            src={brand.img}
            className="w-full h-full object-cover  "
            alt={brand.name}
          />
           
        </div>
        <h1 className="font-semibold max-md:text-sm mt-2">{brand.name}</h1>
       </div>
       
      </SwiperSlide>
    ))}
  </Swiper>
</div>
 </div>

{/* Browse By Category */}
<div className="flex flex-col gap-[4vw] items-center justify-center mt-[10vw] max-md:mt-[14vw] ">
 <div className=" flex  items-center text-center justify-center">
    <h1 className="text-4xl font-semibold relative z-10 bg-white text-center max-md:text-3xl max-md:pb-6">
      Browse By Category
    </h1>
  </div>
<div className="w-full  h-52 max-md:h-40 flex  items-center justify-center gap-8 py-2 ">
  
<Swiper
    slidesPerView={3}
    spaceBetween={20}
    breakpoints={{
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 4 },
    }}
    navigation={window?.innerWidth > 768}
    pagination={{ clickable: true }}
    modules={[Pagination, Navigation]}
    className={`w-full  ${style.swiper}`}
  >
    {d.map((category, index) => (
      <SwiperSlide
        key={index}
        className="flex flex-col items-center justify-center text-center"
      >
      <div className="w-[20vw]  max-md:w-[30vw] flex flex-col items-center justify-center ">
       <div className="h-[20vh] w-[20vh] max-md:h-[10vh] max-md:w-[10vh] rounded border-2 overflow-hidden
        flex  flex-col items-center justify-center  ">
          <img
            src={`/${category.img}`}
            className="h-full w-full object-contain"
            alt={category.name}
          />
        </div>
        <h1 className="font-semibold max-md:text-sm mt-2">{category.name}</h1>
   </div>
      </SwiperSlide>
    ))}
  </Swiper>

  </div>
  </div>


      {/* <div className="hidden w-full px-[10vh] h-[60vh]  items-center justify-center  mt-[2vw] max-md:mt-[4vw] max-md:flex-col max-md:px-[4v h]"  >
        <div className="flex flex-col gap-4 max-md:w-full">
          <h1 className="text-5xl font-semibold max-md:text-4xl">
            Explore All Our <span className="text-[#0D9899]">Products</span>
          </h1>
          <p className="w-[80%] max-md:w-full">
            Sweet roll ice cream powder candy canes ice cream donut pudding
            biscuit ice cream. Cupcake tootsie roll sugar plum danish pudding
            fruitcake cheesecake jelly-o. Pie muffin topping cake. Pudding
            biscuit caramels topb
          </p>
        </div>
        <img src="/explore.png" alt="" />
      </div> */}
      <div className="flex flex-col items-center justify-center py-10 gap-10">
        <h1 className="text-4xl font-semibold max-md:text-3xl ">Explore our all Products</h1>
        <div className="w-full grid grid-cols-4 px-10 max-md:grid-cols-2 max-md:w-full max-md:rounded-xl max-md:gap-4 max-md:px-4">
          {food?.map((i, index) => (
            <ProductCard key={index} i={i} imgLink={imgLink} />
          ))}
        </div>
      </div>
      {/* <h1 className="text-5xl font-bold font-[poppins]">Trending Food</h1> */}
      {/* {
        load ? <Loading/> : 
        <>
         <div className="w-full grid grid-cols-6 gap-4 py-4 items-center h-[42vh] max-md:grid-cols-1">

     
        <div className="w-full h-full gap-2 flex items-center justify-center cursor-pointer">
          <div className="w-12 h-12 shrink-0 flex items-center p-2 justify-center border-[1px] border-gray-600 rounded-full">
            <i className="ri-arrow-right-line text-gray-500"></i>
          </div>
          <h3 className="font-semibold text-sm text-gray-500">View All</h3>
        </div>
      </div>
        </>
      } */}
    </div>
  );
};

export default FoodContainer;
