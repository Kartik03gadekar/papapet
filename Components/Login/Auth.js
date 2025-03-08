"use client"
import React, { useEffect, useState } from 'react';
import Login from './Login';
import Register from './Register';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from '@/store/Action/auth';
import { useRouter } from 'next/navigation';

const Auth = () => {
  const [open, setOpen] = useState(0);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(checkUser());
  }, []); // Run once on mount

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/mediensure/verifyauth');
    }
  }, [isAuthenticated]); // Run when authentication state changes

  return (
    <div className="h-screen w-full flex flex-col items-end justify-end">
      <div className="flex w-full flex-col justify-center items-center" style={{ height: 'calc(100vh - 75vh)' }}>
        <div className='h-20 w-full shadow-md flex items-center mt-10 pt-4 justify-center'>
          <button
            onClick={() => setOpen(0)}
            className={`bg-white rounded-full text-primary font-bold py-2 px-4 ${open === 0 ? 'border-b-2 border-primary' : ''}`}
          >
            LOGIN
          </button>
          <button
            onClick={() => setOpen(1)}
            className={`bg-white rounded-full text-primary font-bold py-2 px-4 ${open === 1 ? 'border-b-2 border-[#567237]' : ''}`}
          >
            REGISTER
          </button>
        </div>
      </div>
      {open === 0 && <Login />}
      {open === 1 && <Register />}
    </div>
  );
};

export default Auth;

