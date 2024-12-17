"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import ProductCard from "../ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getFood } from "@/store/Action/others";
import Loading from "../loading";

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
    <div className="w-full min-h-screen text-black  py-10 mt-[10vh]">
      <div className="flex flex-col items-center justify-center gap-8 py-10 px-10">
        <div className="flex relative">
          <h1 className="text-4xl font-semibold relative z-10 bg-white">
            Browse By brands
          </h1>
          <img
            src="/dog.png"
            className="absolute h-20 -top-10 left-1/2 -translate-x-1/2"
            alt=""
          />
        </div>
        <div className="flex w-full items-center justify-between overflow-y-auto ">
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="h-[20vh] max-md:h-[10vh] max-md:w-[10vh] w-[20vh] rounded-full relative overflow-hidden">
              <img
                src="/royal.webp"
                className="h-full w-full object-contain"
                alt=""
              />
            </div>
            <h1  className="font-semibold max-md:text-sm">Royal Canin</h1>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="h-[20vh] max-md:h-[10vh] max-md:w-[10vh] w-[20vh] rounded-full border-2 relative overflow-hidden">
              <img
                src="/arden.png"
                className="h-full w-full object-contain"
                alt=""
              />
            </div>
            <h1  className="font-semibold max-md:text-sm">Arden Grance</h1>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="h-[20vh] max-md:h-[10vh] max-md:w-[10vh] w-[20vh] rounded-full relative overflow-hidden">
              <img
                src="/sniffy.jpg"
                className="h-full w-full object-contain"
                alt=""
              />
            </div>
            <h1  className="font-semibold max-md:text-sm">Sniffy</h1>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="h-[20vh] max-md:h-[10vh] max-md:w-[10vh] w-[20vh] rounded-full relative overflow-hidden">
              <img
                src="/drools.png"
                className="h-full w-full object-contain"
                alt=""
              />
            </div>
            <h1  className="font-semibold max-md:text-sm">Drools</h1>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="h-[20vh] max-md:h-[10vh] max-md:w-[10vh] w-[20vh] rounded-full relative overflow-hidden">
              <img
                src="/happy.avif"
                className="h-full w-full object-contain"
                alt=""
              />
            </div>
            <h1  className="font-semibold max-md:text-sm">Happy Dog</h1>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="h-[20vh] max-md:h-[10vh] max-md:w-[10vh] w-[20vh] rounded-full relative border-2 overflow-hidden">
              <img
                src="/mera.webp"
                className="h-full w-full object-contain"
                alt=""
              />
            </div>
            <h1  className="font-semibold max-md:text-sm">MERA</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 py-10 px-10">
        <h1 className="text-4xl font-semibold">Browse By Category</h1>
        <div className="flex w-full items-center justify-between overflow-y-auto">
          {d?.map((i, index) => (
            <div className="flex cursor-pointer flex-col bg-white px-10 py-2 rounded-3xl border-2 border-[#FEBC28] gap-2 items-center justify-center">
              <div className="h-[20vh] max-md:h-[10vh] max-md:w-[10vh] w-[20vh] rounded-full relative overflow-hidden">
                <img
                  src={`/${i.img}`}
                  className="h-full w-full object-contain"
                  alt=""
                />
              </div>
              <h1  className="font-semibold max-md:text-sm">{i.name}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-[10vh] h-[60vh] flex items-center justify-center max-md:flex-col max-md:px-[4vh]">
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
      </div>
      <div className="flex flex-col items-center justify-center py-10 gap-10">
        <h1 className="text-4xl font-semibold">Explore our all Products</h1>
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
