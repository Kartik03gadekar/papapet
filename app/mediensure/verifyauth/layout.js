// "use client"

// import { checkUser } from '@/store/Action/auth';
// import { useRouter } from 'next/navigation';
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// const layout = ({children}) => {
// const {user,isAuthencticated} = useSelector((state)=>state.auth);
// const dispatch = useDispatch();
// const router = useRouter();
// useEffect(() => {
//     const fetchData = async () => {
//       await dispatch(checkUser());
//       if (!isAuthencticated) {
//         setTimeout(() => {
//           router.push("/mediensure/auth");
//         }, 1000);
//       } else {
//         setTimeout(() => {
//           router.push("/");
//         }, 1000);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     children
//   )
// }

// export default layout

"use client";

import { checkUser } from "@/store/Action/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      await dispatch(checkUser());
      setLoading(false);
    };
    verifyUser();
  }, [dispatch]);

  useEffect(() => {
    if (loading) return;

<<<<<<< HEAD
    if (!isAuthencticated) {
      router.replace("/");
=======
    if (!isAuthenticated) {
      router.replace("/papapet/auth");
>>>>>>> 5e2bbdfd6c111e498341f951317cbaf1edd53d6d
    } else {
      router.replace("/");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return <div></div>;

  return children;
};

export default Layout;
