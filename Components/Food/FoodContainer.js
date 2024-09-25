"use client"
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
      }
      
  ];
  const {load,food,imgLink} = useSelector((state)=>state.others);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFood())
  }, [])
  
  return (
    <div className="bg w-full h-screen text-black px-14 py-10 ">
      <h1 className="text-5xl font-bold font-[poppins]">Trending Food</h1>
      {
        load ? <Loading/> : 
        <>
         <div className="w-full grid grid-cols-6 gap-4 py-4 items-center h-[42vh] max-md:grid-cols-1">
        {
            food?.map((i,index)=>(
            <ProductCard key={index} i={i} imgLink={imgLink}/>
              
            ))
        }
     
        <div className="w-full h-full gap-2 flex items-center justify-center cursor-pointer">
          <div className="w-12 h-12 shrink-0 flex items-center p-2 justify-center border-[1px] border-gray-600 rounded-full">
            <i className="ri-arrow-right-line text-gray-500"></i>
          </div>
          <h3 className="font-semibold text-sm text-gray-500">View All</h3>
        </div>
      </div>
        </>
      }
     
    </div>
  );
};

export default FoodContainer;
