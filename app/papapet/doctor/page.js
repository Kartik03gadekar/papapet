"use client";
import React, { useState, lazy, Suspense } from "react";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import axiosInstance from "@/Axios/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LuMessageCircleMore } from "react-icons/lu";
import { LuShare } from "react-icons/lu";
import { LuPhoneCall } from "react-icons/lu";
import { LuMap } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import Footer from "@/Components/Footer/Footer";
import ShareDoctor from "@/Components/ShareDoctor";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ComponentLoader from "@/Components/loader/ComponentLoader";
import LazyImage from "@/Components/LazyImage";
import Appointment from "@/Components/Doctor/Appointment";
import DoctorBooking from "@/Components/Doctor/DoctorBooking";

const Page = () => {
  const router = useRouter();
  const services = [
    {
      img: "/doctorimage2.png",
      name: "Find Doctors Near You",
      p: "Confirmed Appointment",
    },
    {
      img: "/doctorimage1.png",
      name: "Instant Video Consultation",
      p: "Connect Within 30 sec",
    },

    {
      img: "/doctorimage3.png",
      name: "In-Clinic / Home Services",
      p: "Best clinic near you",
    },
  ];

  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeService, setActiveService] = useState("Find Doctors Near You");

  const icons = [
    <LuMessageCircleMore key="chat" />,
    <LuShare key="share" />,
    <LuPhoneCall key="call" />,
    <LuMap key="location" />,
  ];

  const handleGetNearby = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLoading(true);
        try {
          const res = await axiosInstance.post("/AI/getNearbyPlaces", {
            lat,
            lng,
            keyword: "veterinary clinic pet hospital pet shop",
            radius: 10000, // 3km radius
          });

          setShops(res.data);
        } catch (err) {
          console.error("Error fetching places:", err);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.warn("Please enable location access to use this feature.");
      }
    );
  };

  const redirectToGenerator = () => {
    router.push("/papapet/doctor/healthreport");
  };

  const posters = [
    { img: "/posters/doctor1.png" },
    { img: "/posters/doctor2.png" },
  ];
  return (
    <div className="w-full overflow-x-hidden">
      <NavPapaPet />

      {/* Hero Section */}
      <section
        className="relative w-full h-screen max-md:h-auto max-md:pb-6 text-white flex flex-col md:flex-row justify-between items-center 
      px-8 gap-4"
      >
        {/* Left Content */}
        <div
          className="w-full md:w-1/3 flex flex-col items-start justify-start gap-[5vw] max-md:gap-[2vw] max-md:w-full max-md:text-center 
        max-md:items-center max-md:pt-[16vw]"
        >
          {/* Desktop Heading */}
          <h1 className="hidden md:block text-5xl whitespace-nowrap lg:text-6xl font-bold leading-[1.1] text-black text-left px-[1vw]">
            <span className="text-black block pb-4">The Perfect</span>
            <span className="text-teal-400 block pb-4">Pet Match,</span>
            <span className="text-black block pb-4">Just a Click</span>
            <span className="text-black block pb-4">Away!</span>
          </h1>

          {/* Mobile Heading */}
          <h1 className="max-md:block max-md:pb-1 hidden text-3xl leading-tight font-bold text-black text-center px-[4vw]">
            The Perfect
            <span className="text-[#0D9899] block pb-1 pt-1">Pet Match,</span>
            Just a Click Away!
          </h1>

          {/* Button */}
          <button className="bg-[#FFAD22] px-6 py-3 rounded-full text-black font-semibold shadow-lg">
            Book Now
          </button>
        </div>

        {/* Middle - Image */}
        <div className="w-full md:w-1/3 flex justify-center relative ">
          <img
            src="/GirlDoctor.png"
            alt="Veterinarian with Pet"
            className="rounded-lg  w-[60vw] md:w-[18vw] max-md:w-[48vw] "
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-start gap-[8vw] max-md:w-full max-md:items-center max-md:gap-[8vw]">
          <div className="cursor-pointer bg-[#FFAD22] p-4 rounded-lg shadow-lg flex items-center space-x-3 max-md:w-[80%]">
            <p className="text-sm font-medium text-gray-700">
              Generate your Pet’s Health Report in just a few clicks
              <span>
                <button
                  className=" ml-2 px-2 py-1 rounded-full bg-[#77C5C6]"
                  onClick={redirectToGenerator}
                >
                  Generate Now &rarr;
                </button>
              </span>
            </p>

            <img
              src="/FloatingBanner.png"
              alt="Health Report"
              width={40}
              height={40}
            />
          </div>

          {/* Existing Appointment Form (unchanged) */}
          <div className="bg-[#77C5C6] w-full md:h-auto rounded-xl flex flex-col items-center px-4 py-2 pb-5">
            <form className="w-full flex flex-col items-start justify-center gap-4">
              <label className="block text-gray-800 font-semibold text-lg">
                Owner Name
              </label>
              <input
                type="text"
                placeholder="Kartik"
                className="w-full md:max-w-[100%] outline-none h-10 placeholder:pl-2 pl-2 border rounded-lg text-gray-700 shadow-sm"
              />
              <label className="block text-gray-800 font-semibold text-lg">
                Category
              </label>
              <select className="w-full md:max-w-[100%] outline-none h-10 pl-2 border rounded-lg text-gray-700 shadow-sm">
                <option>DOG</option>
                <option>CAT</option>
              </select>
              <label className="block text-gray-800 font-semibold text-lg">
                Appointment Date
              </label>
              <input
                type="date"
                className="w-full md:max-w-[100%] outline-none h-10 pl-2 border rounded-lg text-gray-700 shadow-sm"
              />
            </form>
          </div>
        </div>
      </section>

      {/* Services Section */}

      <section className="py-8 text-center bg-[#F4EEE1]">
        <div className="grid grid-cols-1 md:flex md:items-center md:justify-around px-6 max-md:px-3 max-md:grid-cols-2 max-md:gap-4">
          {services.map((service, index) => {
            const isActive = activeService === service.name;
            return (
              <div
                onClick={() => setActiveService(service.name)}
                key={index}
                className={`cursor-pointer w-[18vw] h-[13vw] max-md:w-[45vw] max-md:h-[42vw] rounded-lg shadow-md flex flex-col items-center justify-center border-2 border-[#FFAD22] p-2 transition
            ${
              isActive
                ? "bg-[#FFAD22] text-white"
                : "bg-white text-gray-800 hover:bg-orange-100"
            }`}
              >
                <img
                  src={service.img}
                  alt={service.name}
                  className="rounded w-[10vw] max-md:w-[25vw]"
                />
                <h3
                  className={`mt-2 font-medium text-[1vw] max-md:text-[3.7vw] ${
                    isActive ? "text-white" : "text-gray-800"
                  }`}
                >
                  {service.name}
                </h3>
                <p
                  className={`text-xs max-md:text-[3vw] ${
                    isActive ? "text-orange-100" : "text-gray-400"
                  }`}
                >
                  {service.p}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        {activeService === "Instant Video Consultation" && (
          <section className="py-14 px-6 rounded-xl">
            <Appointment />
          </section>
        )}

        {activeService === "Find Doctors Near You" && (
          <section className="py-14 px-6 bg-[#F4EEE1]">
            <div className="container mx-auto">
              {/* Header */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-white px-10 py-5 rounded-xl border-2 border-[#FFAD22]">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left">
                  Nearby Veterinary Clinics
                </h2>
                <button
                  onClick={handleGetNearby}
                  className="bg-[#FFAD22] hover:bg-[#c2800e] text-white px-5 py-2 rounded-full shadow-md transition"
                >
                  Use My Location
                </button>
              </div>

              {/* Loader */}
              {loading && (
                <div className="flex justify-center items-center py-10">
                  <ComponentLoader />
                </div>
              )}

              {/* Clinics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
                {shops.slice(0, visibleCount).map((shop, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
                  >
                    {/* Image */}
                    <LazyImage
                      src={
                        shop.photos?.length > 0 &&
                        shop.photos[0]?.photo_reference
                          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${shop.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
                          : "https://placehold.co/400x300?text=No+Image"
                      }
                      alt={shop.name}
                      className="w-full h-48 sm:h-56 object-cover"
                    />

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      {/* Title + Rating */}
                      <div className="flex justify-between items-start">
                        <div className="flex-1 pr-2">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2">
                            {shop.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-1">
                            {shop.types?.slice(0, 3).join(", ")}
                          </p>
                        </div>

                        {shop.rating && (
                          <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-md">
                            <FaStar className="text-yellow-500 text-sm" />
                            <span className="font-medium text-sm">
                              {shop.rating}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Address */}
                      <div className="mt-3 flex items-start gap-2 text-sm text-gray-600 line-clamp-2">
                        <IoLocationOutline className="text-lg flex-shrink-0 text-orange-500" />
                        <span>{shop.vicinity}</span>
                      </div>

                      <div className="flex-grow"></div>
                    </div>

                    <Suspense fallback={<ComponentLoader />}>
                      <section>
                        <div className="h-auto w-full">
                          <Swiper
                            pagination={true}
                            autoplay={{
                              delay: 2500, // time between slides (ms)
                              disableOnInteraction: false, // keep autoplay after user swipes
                            }}
                            speed={1000} // smooth transition speed
                            modules={[Pagination, Autoplay]}
                            className="mySwiper h-auto w-screen "
                          >
                            {posters.map((poster, index) => {
                              return (
                                <SwiperSlide
                                  key={index}
                                  className="flex justify-center items-center text-center text-[18px]"
                                >
                                  <div className="h-auto max-md:w-screen max-md:flex max-md:items-center max-md:justify-center p-5 mb-5">
                                    <LazyImage
                                      className="rounded-2xl h-full w-full object-cover"
                                      src={poster.img}
                                      alt=""
                                    />
                                  </div>
                                </SwiperSlide>
                              );
                            })}
                          </Swiper>
                        </div>
                      </section>
                    </Suspense>

                    {/* Footer */}
                    <div className="px-4 py-2 border-t flex justify-around items-center bg-orange-500 text-white">
                      <button
                        onClick={() => {
                          if (shop.phone_number) {
                            let phone = shop.phone_number.trim();

                            // Remove leading 0 if present
                            if (phone.startsWith("0")) {
                              phone = phone.substring(1);
                            }

                            // Ensure it has +91 prefix
                            if (!phone.startsWith("+91")) {
                              phone = `+91${phone}`;
                            }

                            window.location.href = `tel:${phone}`;
                          } else {
                            toast.error("Phone number not available");
                          }
                        }}
                        className="flex flex-col items-center hover:text-orange-700 transition"
                      >
                        <LuPhoneCall className="text-xl" />
                        <span className="text-xs mt-1">Call</span>
                      </button>

                      <button
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${shop.geometry?.location.lat},${shop.geometry?.location.lng}`,
                            "_blank"
                          )
                        }
                        className="flex flex-col items-center hover:text-orange-700 transition"
                      >
                        <LuMap className="text-xl" />
                        <span className="text-xs mt-1">Map</span>
                      </button>

                      <button className="flex flex-col items-center hover:text-orange-700 transition">
                        <ShareDoctor product={shop} />
                        <span className="text-xs mt-1">Share</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < shops.length && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => setVisibleCount(visibleCount + 8)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow-md transition"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {activeService === "In-Clinic / Home Services" && (
          <section className="py-14 px-6">
            <DoctorBooking />
          </section>
        )}
      </section>

      <Suspense fallback={<ComponentLoader />}>
        <section>
          <div className="h-auto w-full">
            <Swiper
              pagination={true}
              autoplay={{
                delay: 2500, // time between slides (ms)
                disableOnInteraction: false, // keep autoplay after user swipes
              }}
              speed={1000} // smooth transition speed
              modules={[Pagination, Autoplay]}
              className="mySwiper h-auto w-screen "
            >
              {posters.map((poster, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className="flex justify-center items-center text-center text-[18px]"
                  >
                    <div className="h-auto max-md:w-screen max-md:flex max-md:items-center max-md:justify-center p-5 mb-5 rounded-2xl">
                      <LazyImage
                        className="rounded-2xl h-full w-full object-cover"
                        src={poster.img}
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>
      </Suspense>

      <Footer />

      {/* Hero Section */}
      {/* <section className="relative w-full h-screen max-md:h-auto max-md:pb-6 text-white flex flex-col md:flex-row justify-between items-center px-8 gap-4"> */}

      {/* Left Content */}
      {/* <div className="w-full md:w-1/3 flex flex-col items-start justify-start gap-[5vw] 
  max-md:gap-[2vw] max-md:w-full max-md:text-center max-md:items-center max-md:pt-[20vw]"> */}

      {/* Desktop Heading */}
      {/* <h1 className="hidden md:block text-6xl font-bold leading-[1.2] text-black text-left px-[1vw]">
    <span className="text-black block pb-4">The Perfect</span> 
    <span className="text-teal-400 block pb-4">Pet Match,</span> 
    <span className="text-black block pb-4">Just a Click</span>
    <span className="text-black block pb-4">Away!</span>
  </h1> */}

      {/* Mobile Heading */}
      {/* <h1 className="max-md:block max-md:pb-1 hidden text-3xl leading-tight font-bold text-black text-center px-[4vw] "> */}
      {/* The Perfect */}
      {/* <span className="text-teal-400 block pb-1 pt-1">Pet Match,</span>   */}
      {/* Just a Click Away! */}
      {/* </h1> */}

      {/* Button */}
      {/* <button className="bg-[#FFAD22] px-6 py-3 rounded-full text-black font-semibold shadow-lg">
    Book Now
  </button> */}

      {/* </div> */}

      {/* Middle - Image */}
      {/* <div className="w-full md:w-1/3 flex justify-center relative">
    <img
      src="/GirlDoctor.png" // Replace with actual img path
      alt="Veterinarian with Pet"
      className="rounded-lg w-[60vw] md:w-[20vw]  max-md:w-[55vw] "
    />
  </div> */}

      {/* Right Section */}
      {/* <div className="w-full md:w-1/3 flex flex-col items-center justify-start gap-[8vw] max-md:w-full max-md:items-center max-md:gap-[6vw]"> */}

      {/* <div className="bg-[#FFAD22] p-4 rounded-lg shadow-lg flex items-center space-x-3 max-md:w-[80%]">
      <p className="text-sm font-medium text-gray-700">
        Generate your Pet’s Health Report in just a few clicks
      </p>
      <img
        src="/FloatingBanner.png" // Replace with actual icon path
        alt="Health Report"
        width={40}
        height={40}
      />
    </div> */}
      {/*   
    <div className="bg-[#77C5C6] w-[90%] np  h-[20vw] max-md:h-auto rounded-xl flex flex-col items-center px-4 py-2">
      <form className="w-full flex flex-col items-start justify-center gap-4">
        <label className="block text-gray-800 font-semibold text-lg">Owner Name</label>
        <input
          type="text"
          placeholder="Kartik"
          className="w-full max-md:w-[80%]  outline-none h-10 placeholder:pl-2 pl-2 border rounded-lg text-gray-700 shadow-sm"
        />
        <label className="block text-gray-800 font-semibold text-lg">Category</label>
        <select className="w-full max-md:w-[80%]  outline-none h-10 pl-2 border rounded-lg text-gray-700 shadow-sm">
          <option>DOG</option>
          <option>CAT</option>
        </select>
        <label className="block text-gray-800 font-semibold text-lg">Appointment Date</label>
        <input
          type="date"
          className="w-full max-md:w-[80%] outline-none h-10 pl-2 border rounded-lg text-gray-700 shadow-sm"
        />
      </form>
    </div>

  </div>
</section> */}

      {/* Services Section */}
      {/* <section className="py-8 text-center bg-[#F4EEE1]"> */}
      {/* Grid structure for mobile view (2 services per row) */}
      {/* <div className="grid grid-cols-1 md:flex md:items-center md:justify-around  px-6 max-md:px-3 max-md:grid-cols-2 max-md:gap-4">
    {services.map((service, index) => (
      <div 
        key={index} 
        className="bg-white w-[18vw] h-[13vw] max-md:w-[45vw] max-md:h-[42vw] 
        rounded-lg shadow-md flex flex-col items-center justify-center p-2"
      >
        <img 
          src={service.img} 
          alt={service.name}  
          className="rounded w-[10vw] max-md:w-[25vw]"
        />
        <h3 className="mt-2 font-medium text-[1vw] max-md:text-[3.7vw] ">
          {service.name}
        </h3>
        <p className="text-xs text-gray-400 max-md:text-[3vw]">
          {service.p}
        </p>
      </div>
    ))}
  </div>
</section> */}

      {/* Trusted Doctors Section */}
      {/* <section className="py-10 px-6 text-center bg-[#F4EEE1]">
        <h2 className="text-3xl font-semibold">Trusted Doctors Near You</h2>
        <input
          type="text"
          placeholder="Search Top doctors around here..."
          className="mt-4 p-2 w-full md:w-1/2 border border-gray-300 rounded-md placeholder:pl-2"
        />
      </section> */}

      {/* Best Doctors Section */}
      {/* <section className="py-10 px-6 bg-white"> */}
      {/* <h2 className="text-3xl font-semibold text-center">Best Doctors Connected With Us</h2> */}

      {/* Updated Grid Layout */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 max-md:grid-cols-2">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="bg-white px-4 py-2 rounded-lg border border-orange-300 text-center">
        <img src="/doctorimagepng (1).png" alt="Doctor" width={80} height={80} className="mx-auto" />
        <h3 className="mt-2 font-medium max-md:text-[4vw]">Dr. Abhinav Jain</h3>
        <h4 className="text-sm max-md:text-[3vw]">City-Bhopal</h4>
        <p className="text-sm text-gray-500 max-md:text-[2.5vw]">Connect Within 60 sec</p>
      </div>
    ))}
  </div> */}
      {/* </section> */}
    </div>
  );
};

export default Page;
