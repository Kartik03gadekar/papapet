import Auth from "@/Components/Login/Auth";
import Login from "@/Components/Login/Login";
import Nav from "@/Components/Nav/Nav";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import React from "react";

const page = () => {
  return (
    <div className=" w-full h-[100%]">

      
     <div className="h-[10%]"><NavPapaPet/></div>
    <div className="h-[80%]" >  <Auth /></div>
     
    </div>
  );
};

export default page;
