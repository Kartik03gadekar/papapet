'use client';
import NavPapaPet from '@/Components/Nav/NavPapaPet';
import History from '@/Components/Setting/History';
import Profile from '@/Components/Setting/Profile';
import ShoppingCart from '@/Components/Setting/ShoppingCart';
import Sidebar from '@/Components/Setting/Sidebar';
import TrackOrder from '@/Components/Setting/TrackOrder';
import { checkUser, getAllConsultation, getAllOfflineConsultation } from '@/store/Action/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import { clearSuccessMsg } from '@/store/Action/clearMsg'; // <-- make sure this action exists

const Page = () => {
  const [open, setopen] = useState(0);
  const { user, message, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
    dispatch(getAllConsultation());
    dispatch(getAllOfflineConsultation());

    if (message) {
      toast.success(message);
      // dispatch(clearSuccessMsg());
    }
  }, [message, loading]);

  return (
    <>
      <div className="w-full h-2 max-md:w-screen">
        <NavPapaPet />
      </div>

      <div className="w-full flex  relative overflow-hidden translate-y-[10vh]" style={{ height: 'calc(100vh - 15vh)' }}>
        {/* Sidebar */}
        <div className="w-[250px] h-full shadow-lg z-10 max-md:w-fit ">
          <Sidebar setopen={setopen} activeIndex={open} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-5">
          {open === 0 ? (
            <Profile user={user} />
          ) : open === 1 ? (
            <History  user={user} />
          ) : open === 2 ? (
            <TrackOrder user={user} />
          )  : open === 3 ? (
            <ShoppingCart  user={user} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Page;
