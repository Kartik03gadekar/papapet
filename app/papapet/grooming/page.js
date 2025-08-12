"use client"
import Footer from '@/Components/Footer/Footer'
import GroomingList from '@/Components/Grooming/GroomingList'
import HeroSection from '@/Components/Grooming/HeroSection'
import NavPapaPet from '@/Components/Nav/NavPapaPet'

import React from 'react'

const page = () => {
    const services = [
        {
        
          title: 'Bathing & Shampooing',
          image: '/groomimage4.png',
          actionText: 'Contact within 24 hrs',
    
        },
        {
      
          title: 'Nail Trimming & Filing',
          image: '/groomimage5.png',
          actionText: 'Confirm Appointment',
        
        },
        {
         
          title: 'Teeth Brushing',
          image: '/groomimage6.png',
          actionText: 'See price near you',
        
        },
        {
         
          title: 'Haircut & Styling',
          image: '/groomimage7.png',
          actionText: 'Best Home Services',
       
        }
      ];
  return (
    <div className='w-full h-screen overflow-x-hidden '>

     <NavPapaPet/> 
     <HeroSection/>
               <div className="w-full h-[28vw] flex items-center justify-center  ">

  <img 
   className="w-[80%] h-[80%] max-md:w-[90%]  max-md:h-[90%]"
   src={"/12.png"} alt="" />
</div>
     {/* Trusted Doctors Section */}

<div className='w-full bg-[#F4EEE1]'>
<div className="max-w-4xl mx-auto p-6 bg-cream-50">
      <h2 className="text-2xl font-bold text-center mb-8">Our Best Services</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="w-40 h-40 max-md:w-[40vw]  max-md:h-[40vw]  rounded-lg overflow-hidden mb-3">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 className="font-medium text-sm max-md:text-[4vw] mb-2">{service.title}</h3>
            
            <button>
              {service.actionText}
            </button>
          </div>
        ))}
      </div>
    </div>
<section className="py-20 px-6 text-center bg-[#F4EEE1]">
        <h2 className="text-3xl font-semibold">Explore Grooming Services Near you</h2>
        <input
          type="text"
          placeholder="Search Top grooming services Near you..."
          className="mt-4 p-2 w-full md:w-1/2 border border-gray-300 rounded-md placeholder:pl-2"
        />
      </section> 
</div>
  
      <GroomingList/>
      <Footer/>
    </div>
  )
}

export default page
