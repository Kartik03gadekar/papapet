"use client";


import NavPapaPet from '@/Components/Nav/NavPapaPet';
import ProductCard from '@/Components/ProductCard';
import { getFood } from '@/store/Action/others';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {
  const { category } = useParams();

  const data = [
    {
      name: "Dog",
      img: "/Dogtype.png",
      title: "Everything Your Dog Desires",
      description: "Find premium food, toys, and accessories for your buddy."
    },
    {
      name: "Cat",
      img: "/Cattype.png",
      title: "Shop for Your Feline Friend",
      description: "The best food, toys, and essentials for happy cats."
    },
    {
      name: "Fish",
      img: "/Fishtype.png",
      title: "Shop for a Thriving Aquarium",
      description: "Quality tanks, food, and accessories for happy fish."
    }
  ];
  const { load, food, imgLink } = useSelector((state) => state.others);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getFood());
  }, [dispatch]);

  // Find the data that matches the category parameter
  const categoryData = data.find(item => item.name.toLowerCase() === category.toLowerCase());

  return (
    <div className="w-full">
      <div className='w-full  h-[5.2vw]' > 
      <NavPapaPet />
      </div>
   
   <div className='pt-[2vw]'>
   {categoryData ? (
        <div className="  w-full h-[12vw]  flex items-center justify-center pl-[10vw] gap-[4vw]  ">
          <div className='flex flex-col items-center gap-[1vw]  '> 
          <h1 className="text-3xl font-bold">{categoryData.title}</h1>
          <p className='text-[1.2vw] '>{categoryData.description}</p>
          <button className='border-2 border-[#FEBC28]  rounded-full px-[2vw] py-[0.4vw] font-bold '>{categoryData.name} </button>
          </div>
         
          <img src={categoryData.img} alt={categoryData.name} className="w-[10vw]" />
         
        </div>
      ) : (
        <div className="p-4">
          <h1 className="text-2xl font-bold">Category Not Found</h1>
          <p>The category you are looking for does not exist.</p>
        </div>
      )}
   </div>
   <div className="flex flex-col items-center justify-center py-20 bg-[#F4EEE1] gap-10">
   <div className="w-full grid grid-cols-4 gap-6 px-10 max-md:grid-cols-2 max-md:gap-4 max-md:px-4 max-md:rounded-xl">
          {food?.map((i, index) => (
            <ProductCard key={index} i={i} imgLink={imgLink} />
          ))}
        </div>
        </div>
    </div>
  );
};

export default Page;
