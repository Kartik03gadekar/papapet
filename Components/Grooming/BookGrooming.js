
"use client";
import React, { useState } from "react";
import "antd/dist/reset.css";
import { Card, Checkbox, Radio, DatePicker } from "antd";
import dayjs from "dayjs";

const BookGrooming = ({ id }) => {
  const [date, setDate] = useState(null);
  const [service, setService] = useState([]);
  const [mode, setMode] = useState("atShop");

  const onDateChange = (value, dateString) => {
    setDate(dateString);
  };

  const handleServiceChange = (checkedValues) => {
    setService(checkedValues);
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const handleBooking = () => {
    console.log({
      bookingDate: date,
      selectedServices: service,
      selectedMode: mode,
    });
  };

  return (
    <div className="w-full px-4 py-6 md:p-8">
      {/* Top Section */}
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col md:flex-row border-2 rounded-2xl shadow-sm gap-4 p-4">
          <img
            src="/groomimage1.png"
            className="w-full md:w-[30%] h-60 object-cover rounded-2xl"
          />
          <div className="flex flex-col justify-center gap-2 md:mt-0">
            <h2 className="text-xl md:text-2xl font-bold">Pawfect Spa</h2>
            <p className="text-gray-600 text-sm md:text-base">
              📍 Maple Paw Avenue, Sunnybrook City • ⏱ 30 min • 📏 1km away • ⭐ 4.4
            </p>
            <p className="text-gray-700 text-sm md:text-base">
              Professional grooming services to keep your pet clean, stylish, and feeling their absolute best.
            </p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="w-full flex flex-col md:flex-row gap-4">
          {/* Date Picker */}
          <Card className="w-full md:w-[25%] bg-[#F9E0AA]">
            <h3 className="font-semibold text-lg mb-2">Select Date</h3>
            <DatePicker
              onChange={onDateChange}
              format="YYYY-MM-DD"
              className="w-full"
            />
          </Card>

          {/* Services */}
          <Card className="w-full md:w-[35%] bg-[#F9E0AA]">
            <h3 className="font-semibold text-lg mb-2">Select Service</h3>
            <div className="flex flex-col gap-2">
              {["Bathing", "Furr Styling", "Nail Trimming"].map((option) => (
                <Checkbox
                  key={option}
                  value={option}
                  checked={service.includes(option)}
                  onChange={(e) =>
                    handleServiceChange(
                      e.target.checked
                        ? [...service, option]
                        : service.filter((s) => s !== option)
                    )
                  }
                >
                  {option}
                </Checkbox>
              ))}
            </div>
          </Card>

          {/* Mode */}
          <Card className="w-full md:w-[35%] bg-[#F9E0AA]">
            <h3 className="font-semibold text-lg mb-2">Select Mode</h3>
            <Radio.Group value={mode} onChange={handleModeChange}>
              <div className="flex flex-col gap-2">
                <Radio value="home">At Home</Radio>
                <Radio value="atShop">At Shop</Radio>
                <Radio value="pickup">Pickup</Radio>
              </div>
            </Radio.Group>
          </Card> 
          
        </div>

        {/* Book Now Button */}
        <div className="w-full flex justify-center mt-4">
          <button
            className="w-full max-md:w-full md:w-[10%] py-3 bg-[#FD890E] text-white text-sm md:text-base rounded-xl"
            onClick={handleBooking}
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookGrooming;
