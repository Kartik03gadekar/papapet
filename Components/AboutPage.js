import React from "react";

const AboutPage = () => {
  return (
    <div className="w-full h-screen flex items-center relative justify-center flex-col font-[gilroy] text-white gap-5">
      <img
        src="/aboutBG.png"
        className="h-[80%] w-[80%] max-md:w-[100%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        alt=""
      />
      <h1 className="relative z-10 text-white font-semibold text-5xl max-md:text-center max-md:text-2xl">
        About us in numbers
      </h1>
      <p className="relative z-10 w-[60%] text-center">
        Papapet, established in 2020, is a global pet products company offering
        over 150 high-quality items to pet owners in more than 30 countries.
        With a team of 50 dedicated employees, the company has proudly served
        over 100,000 satisfied customers, focusing on enhancing the happiness
        and well-being of pets. Papapet’s mission is to provide innovative,
        safe, and reliable products, ensuring pets get the best care possible.
        Alongside its diverse product range, the company offers 24/7 customer
        support, ensuring seamless service. Papapet also maintains an active
        presence on five major social media platforms, engaging with pet lovers
        worldwide.
      </p>
    </div>
  );
};

export default AboutPage;
