"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../ProductCard';
import { getFood } from '@/store/Action/others';

const AccessoiresProduct = () => {
    const { load, food, imgLink } = useSelector((state) => state.others);
    const dispatch = useDispatch();
  
  
    useEffect(() => {
      dispatch(getFood());
    }, [dispatch]);
  
  return (
    <div>
          <div className="flex flex-col items-center justify-center py-10 gap-10">
        <h1 className="text-4xl font-semibold max-md:text-3xl ">
          Explore our all Products
        </h1>
        <div className="w-full grid grid-cols-4 px-10 max-md:grid-cols-2 max-md:w-full max-md:rounded-xl max-md:gap-4 max-md:px-4">
          {food?.map((i, index) => (
            <ProductCard key={index} i={i} imgLink={imgLink} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AccessoiresProduct
