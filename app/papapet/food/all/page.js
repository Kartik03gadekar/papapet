import CustomizedAccordions from "@/Components/Food/Filter";
import Footer from "@/Components/Footer/Footer";
import Nav from "@/Components/Nav/Nav";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import ProductCard from "@/Components/ProductCard";
import React from "react";

const page = () => {
  const data = [
    {
      type: "Type",
      dets: ["Dry Food", "Wet Food", "Fresh Food"],
    },
    {
      type: "Special Diet",
      dets: ["Grain-Free", "Hypoallergenic", "Low Grain"],
    },
    {
      type: "Price",
      dets: ["Low to High", "High to Low", "Fresh Food"],
    },
  ];
  const Product = [
    {
      image: [
        {
          filename: "0afc0b8f1f5e01489929adee3fe87aece1245357",
          mimetype: "image/jpeg",
          id: "661e1c1e14f7c7820a1590e3",
        },
        {
          filename: "0fa3a3ac8ee638dbd2ed0ad5c49b4ac455a4419e",
          mimetype: "image/jpeg",
          id: "661e1c1f14f7c7820a1590e5",
        },
      ],
      title: "Kitty Yums Dry Cat Food for Kittens - Ocean Fish",
      company: "Kitty Kums",
      price: "999",
    },
    {
      image: [
        {
          filename: "0afc0b8f1f5e01489929adee3fe87aece1245357",
          mimetype: "image/jpeg",
          id: "661e1c1e14f7c7820a1590e3",
        },
        {
          filename: "0fa3a3ac8ee638dbd2ed0ad5c49b4ac455a4419e",
          mimetype: "image/jpeg",
          id: "661e1c1f14f7c7820a1590e5",
        },
      ],
      title: "Kitty Yums Dry Cat Food for Kittens - Ocean Fish",
      company: "Kitty Kums",
      price: "999",
    },
    {
      image: [
        {
          filename: "0afc0b8f1f5e01489929adee3fe87aece1245357",
          mimetype: "image/jpeg",
          id: "661e1c1e14f7c7820a1590e3",
        },
        {
          filename: "0fa3a3ac8ee638dbd2ed0ad5c49b4ac455a4419e",
          mimetype: "image/jpeg",
          id: "661e1c1f14f7c7820a1590e5",
        },
      ],
      title: "Kitty Yums Dry Cat Food for Kittens - Ocean Fish",
      company: "Kitty Kums",
      price: "999",
    },
    {
      image: [
        {
          filename: "0afc0b8f1f5e01489929adee3fe87aece1245357",
          mimetype: "image/jpeg",
          id: "661e1c1e14f7c7820a1590e3",
        },
        {
          filename: "0fa3a3ac8ee638dbd2ed0ad5c49b4ac455a4419e",
          mimetype: "image/jpeg",
          id: "661e1c1f14f7c7820a1590e5",
        },
      ],
      title: "Kitty Yums Dry Cat Food for Kittens - Ocean Fish",
      company: "Kitty Kums",
      price: "999",
    },
    {
      image: [
        {
          filename: "0afc0b8f1f5e01489929adee3fe87aece1245357",
          mimetype: "image/jpeg",
          id: "661e1c1e14f7c7820a1590e3",
        },
        {
          filename: "0fa3a3ac8ee638dbd2ed0ad5c49b4ac455a4419e",
          mimetype: "image/jpeg",
          id: "661e1c1f14f7c7820a1590e5",
        },
      ],
      title: "Kitty Yums Dry Cat Food for Kittens - Ocean Fish",
      company: "Kitty Kums",
      price: "999",
    },
  ];
  return (
    <>
      <NavPapaPet />
      <div className="w-full min-h-screen flex translate-y-[10vh] p-10 py-20">
        <div className="h-fit w-[20%]">
          <div className="w-full text-left gap-2 flex flex-col text-4xl ml-5 font-semibold font-[gilroy]">
            Filter
          </div>
          <CustomizedAccordions data={data} />
        </div>
        <div className="h-fit w-[80%]  flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold">Dry Food</h1>
          <div className="w-full grid grid-cols-4 gap-4 p-5">
            {Product?.map((i, index) => (
              <ProductCard i={i} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
