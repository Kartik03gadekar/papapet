import FoodContainer from "@/Components/Food/FoodContainer";
import FoodSwiper from "@/Components/Food/FoodSwiper";
import Nav from "@/Components/Nav/Nav";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import React from "react";

const page = () => {
  return (
    <>
      <NavPapaPet />

      <div className="container translate-y-[10vh]">
        <FoodSwiper />
        <FoodContainer />
      </div>
    </>
  );
};

export default page;
