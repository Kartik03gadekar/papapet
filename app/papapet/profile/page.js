"use client";
import Nav from '@/Components/Nav/Nav';
import NavPapaPet from '@/Components/Nav/NavPapaPet';
import ConsultationHistory from '@/Components/Setting/ConsultationHistory';
import OfflineConsult from '@/Components/Setting/OfflineConsult';
import Profile from '@/Components/Setting/Profile';
import Sidebar from '@/Components/Setting/Sidebar'
import { checkUser, getAllConsultation, getAllOfflineConsultation } from '@/store/Action/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const page = () => {
  const [open, setopen] = useState(0);
const {user,message,loading,consult,ofconsult} = useSelector((state)=>state.auth);
const dispatch = useDispatch();
useEffect(() => {
  dispatch(checkUser());
dispatch(getAllConsultation())
dispatch(getAllOfflineConsultation())
  if (message) {
    toast.success(message);
    dispatch(clearSuccessMsg());
  }
}, [message, loading]);
  return (
    <>
   <div className='w-full  h-2' >   <NavPapaPet/> </div>
 
    <div className="w-full flex relative overflow-hidden translate-y-[10vh]" style={{ height: "calc(100vh - 15vh)" }}>
  {/* Sidebar (fixed height, non-scrollable) */}
  <div className="w-[250px] h-full  shadow-lg z-10">
    <Sidebar setopen={setopen} />
  </div>

  {/* Main Content Area (scrollable) */}
  <div className="flex-1 overflow-y-auto bg-gray-50 p-5">
    {open === 0 ? (
      <Profile user={user} />
    ) : open === 1 ? (
      <ConsultationHistory data={consult} />
    ) : open === 4 ? (
      <OfflineConsult data={ofconsult} />
    ) : null}
  </div>
</div>

    </>
  )
}

export default page