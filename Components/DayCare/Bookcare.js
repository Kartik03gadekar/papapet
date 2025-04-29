"use client";
import React, { useState } from "react";
import "antd/dist/reset.css";
import { Card, Checkbox, DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";

const Bookcare = ({ id }) => {
  const [date, setDate] = useState(null);
  const [timeFrom, setTimeFrom] = useState(null);
  const [timeTo, setTimeTo] = useState(null);
  const [service, setService] = useState([]);
  const [pickupDrop, setPickupDrop] = useState(false);

  const onDateChange = (value, dateString) => {
    setDate(dateString);
  };

  const onTimeFromChange = (time, timeString) => {
    setTimeFrom(timeString);
  };

  const onTimeToChange = (time, timeString) => {
    setTimeTo(timeString);
  };

  const handleServiceChange = (checkedValues) => {
    setService(checkedValues);
  };

  const handleBooking = () => {
    console.log({
      bookingDate: date,
      timeFrom,
      timeTo,
      selectedServices: service,
      pickupAndDropNeeded: pickupDrop,
    });
  };

  return (
    <div className="w-full px-4 py-6 md:p-8">
    {/* Top Section */}
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col md:flex-row border-2 rounded-2xl shadow-sm gap-4 p-2">
        <img
          src="/groomimage1.png"
          className="w-full md:w-[30%] h-60 object-cover rounded-2xl"
        />
        <div className="flex flex-col justify-start gap-1 md:mt-6">
          <h2 className="text-4xl md:text-4xl font-bold">Pawfect Spa</h2>
          <p className="text-gray-600 text-sm md:text-base">
            📍 Maple Paw Avenue, Sunnybrook City • ⏱ 30 min • 📏 1km away • ⭐ 4.4
          </p>
          <p className="text-gray-700 text-sm md:text-base">
            Professional grooming services to keep your pet clean, stylish, and feeling their absolute best.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        {/* Booking Section */}
      
                {/* Date Picker */}
                <Card className="w-full md:w-[40%] bg-[#F9E0AA]">
                  <h3 className="font-semibold text-lg mb-2">Select Date</h3>
                  <DatePicker
                    onChange={onDateChange}
                    format="YYYY-MM-DD"
                    className="w-full"
                  />
                </Card>
      

     

          {/* Time Picker */}
          <Card className="w-full md:w-[40%] bg-[#F9E0AA] rounded-xl shadow-md">
            <h3 className="font-semibold text-lg mb-4">Select Time</h3>
            <div className="flex flex-col gap-4">
              <TimePicker
                className="w-full"
                format="HH:mm"
                onChange={onTimeFromChange}
                placeholder="From Time"
              />
              <TimePicker
                className="w-full"
                format="HH:mm"
                onChange={onTimeToChange}
                placeholder="To Time"
              />
            </div>
          </Card>

     

        {/* Pickup & Drop Option */}
     
          <Card className="w-full md:w-[40%] bg-[#F9E0AA] rounded-xl shadow-md">
            <h3 className="font-semibold text-lg mb-4">Pickup & Drop</h3>
            <div className="flex flex-col gap-4">
              <Checkbox checked={pickupDrop} onChange={(e) => setPickupDrop(e.target.checked)}>
                Need Pickup & Drop
              </Checkbox>
            </div>
          </Card>
        

        </div>
        {/* Book Now Button */}
        <div className="w-full flex justify-center">
          <button
            onClick={handleBooking}
            className="w-full md:w-[20%] py-3 bg-[#FD890E] hover:bg-[#fb7e00] text-white font-semibold rounded-xl transition duration-300"
          >
            BOOK NOW
          </button>
        </div>

      </div>
    </div>
  );
};

export default Bookcare;
