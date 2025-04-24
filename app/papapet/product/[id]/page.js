"use client";
import Footer from "@/Components/Footer/Footer";
import Nav from "@/Components/Nav/Nav";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import ProductView from "@/Components/ProductView";
import { getFoodById } from "@/store/Action/others";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {item,load,imgLink} = useSelector((state)=>state.others)
  useEffect(() => {
    dispatch(getFoodById(id));
  }, []);
  return (
    <>
      <div className="w-full">
        <NavPapaPet />
        <div className="w-full min-h-screen translate-y-[10vh] pb-10">
          <ProductView data={item} loading={load} imgLink={imgLink} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default page;
