import React from "react";

const Footer = () => {
  return (
    <>
      <div className="h-fit flex w-full max-md:hidden bg-[#fef8ea] border-t-2 text-black">
        <footer className="footer p-10  flex gap-28 text-base-content">
          <nav className="flex w-fit gap-1  flex-col text-black pl-20 ">
            <header className="footer-title text-xl font-bold">
              About PaPaPet
            </header>
            <a className="link link-hover mt-5 ">Who We Are</a>
            <a className="link link-hover">Blog</a>
            <a className="link link-hover">Work With Us</a>
            <a className="link link-hover">Investor Relationship</a>
          </nav>
          <nav className="flex flex-col text-black gap-1   w-40">
            <header className="footer-title text-xl font-bold">
              PetaVerse
            </header>
            <a className="link link-hover mt-5 ">PaPaPet</a>
            <a className="link link-hover">Feeding India</a>
            <a className="link link-hover">Hyperpure</a>
            <a className="link link-hover">Contact</a>
            {/* <a className="link link-hover">Jobs</a> 
    <a className="link link-hover">Press kit</a> */}
          </nav>
          <nav className="flex flex-col text-black gap-1  w-40 ">
            <header className="footer-title text-xl font-bold">
              For Sellers
            </header>
            <a className="link link-hover mt-5">Partner With Us</a>
            <a className="link link-hover">Website For You</a>
        
          </nav>
          <nav className="flex flex-col text-black gap-1  w-40 ">
            <header className="footer-title text-xl font-bold">
              Learn More
            </header>
            <a className="link link-hover mt-5">Privacy</a>
            <a className="link link-hover">Security</a>
            <a className="link link-hover">Terms</a>
          </nav>

          <nav>
            <header className="footer-title text-black  flex items-center justify-center gap-5 ">
              FOLLOW US
            </header>
            <div className="grid grid-flow-col pt-5   flex-col gap-4 ">
              <a className="" style={{ color: "black" }}>
              <i className="ri-twitter-x-line text-xl cursor-pointer"></i>
              </a>
              <a className="" style={{ color: "black" }}>
              <i className="ri-youtube-fill text-xl cursor-pointer "></i>
              </a>
              <a className="" style={{ color: "black" }}>
              <i className="ri-facebook-fill text-xl cursor-pointer"></i>
              </a>
              <a className="" style={{ color: "black" }}>
              <i className="ri-instagram-line text-xl cursor-pointer"></i>              </a>
            </div>
          </nav>
        </footer>
      </div>
    </>
  );
};

export default Footer;
