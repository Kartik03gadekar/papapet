"use client"


import { getFoodBycategory, getFoodById } from '@/store/Action/others';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';



const RelatedProduct = ({foodcategories}) => {
const dispatch= useDispatch();
const {food}= useSelector((state) => state.others)

// useEffect(()=>{
// dispatch(getFoodBycategory(foodcategories));
// },[foodcategories])
// console.log(food);
  return (

   <div>

        {/* <h2 className="text-lg font-semibold mb-4">RELATED PRODUCTS</h2> */}
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          
        </div>

      </div>

  )
}


export default RelatedProduct
