import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import React, { useEffect } from 'react'

const Home = () => {
  var p = "PaPaPet";
    // useEffect(() => {
    //   gsap.from("#papa span",{
    //     opacity:0,
    //     y:-20,
    //     stagger:0.05
    //   })
    
    // }, [])
    useGSAP(()=>{
         gsap.from("#papa span",{
        opacity:0,
        y:-50,
        stagger:0.1,
        duration:0.08
      })
    })
  return (
    <>
    <div className="w-full relative h-screen  overflow-hidden gap-6 bg-[#EEEFEB] flex items-center justify-start  flex-col" >
        <h3 className='tex relative z-10 text-6xl mt-[25vh] font-[poppins]' id='papa'>
        {p.split("").map((e, index) => (
          <span key={index}>{e}</span>
        ))}
        </h3>
        <h1 className='san text-6xl relative z-10 max-md:text-xl'>Gateway to stress-free pet ownership</h1>
       <button className='p-2 px-6 text-xl border-2 relative z-10 border-black max-md:text-sm'>Explore Now</button>
       <img src="/dogBg.png" className='h-[60%] w-[70%] object-cover absolute bottom-0 left-1/2 -translate-x-1/2 max-md:w-fit max-md:object-contain' alt="" />
    </div>
    </>
  )
}

export default Home