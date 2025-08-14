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
  const { isAuthencticated } = useSelector((state) => state.auth);
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

    if (!isAuthencticated) {
      router.replace("/mediensure/auth");
    } else {
      router.replace("/");
    }
  }, [loading, isAuthencticated, router]);

  if (loading) return <div></div>;

  return children;
};

export default Layout;
