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


// {"use client";
// import React, { useState } from "react";
// import "antd/dist/reset.css";
// import { Card, Checkbox, DatePicker, Select } from "antd";
// import dayjs from "dayjs";

// const Bookcare = ({ id }) => {
//   const [date, setDate] = useState(null);
//   const [timeFrom, setTimeFrom] = useState(null);
//   const [timeTo, setTimeTo] = useState(null);
//   const [service, setService] = useState([]);
//   const [pickupDrop, setPickupDrop] = useState(false);
//   const [availableTimes, setAvailableTimes] = useState([]);

//   // Define available slots
//   const availableSlots = {
//     "2025-05-01": ["10:00", "12:00", "14:00"],
//     "2025-05-02": ["09:00", "11:00", "15:00", "17:00"],
//     "2025-05-03": ["08:00", "10:30", "13:00"],
//   };

//   const onDateChange = (value, dateString) => {
//     setDate(dateString);
//     const slots = availableSlots[dateString] || [];
//     setAvailableTimes(slots);
//     setTimeFrom(null); // Reset previous time
//     setTimeTo(null);
//   };

//   const disabledDate = (current) => {
//     const formatted = dayjs(current).format("YYYY-MM-DD");
//     return !availableSlots.hasOwnProperty(formatted);
//   };

//   const handleBooking = () => {
//     console.log({
//       bookingDate: date,
//       timeFrom,
//       timeTo,
//       selectedServices: service,
//       pickupAndDropNeeded: pickupDrop,
//     });
//   };

//   return (
//     <div className="w-full px-4 py-6 md:p-8">
//       {/* Top Section */}
//       <div className="w-full flex flex-col gap-4">
//         <div className="w-full flex flex-col md:flex-row border-2 rounded-2xl shadow-sm gap-4 p-2">
//           <img
//             src="/groomimage1.png"
//             className="w-full md:w-[30%] h-60 object-cover rounded-2xl"
//           />
//           <div className="flex flex-col justify-start gap-1 md:mt-6">
//             <h2 className="text-4xl md:text-4xl font-bold">Pawfect Spa</h2>
//             <p className="text-gray-600 text-sm md:text-base">
//               📍 Maple Paw Avenue, Sunnybrook City • ⏱ 30 min • 📏 1km away • ⭐ 4.4
//             </p>
//             <p className="text-gray-700 text-sm md:text-base">
//               Professional grooming services to keep your pet clean, stylish, and feeling their absolute best.
//             </p>
//           </div>
//         </div>

//         <div className="w-full flex flex-col md:flex-row gap-4">
//           {/* Date Picker */}
//           <Card className="w-full md:w-[40%] bg-[#F9E0AA]">
//             <h3 className="font-semibold text-lg mb-2">Select Date</h3>
//             <DatePicker
//               onChange={onDateChange}
//               format="YYYY-MM-DD"
//               className="w-full"
//               disabledDate={disabledDate}
//               dateRender={(current) => {
//                 const formatted = dayjs(current).format("YYYY-MM-DD");
//                 const isAvailable = availableSlots[formatted];
//                 return (
//                   <div className="ant-picker-cell-inner">
//                     {current.date()}
//                     {isAvailable && (
//                       <div className="w-1 h-1 bg-green-500 rounded-full mx-auto mt-1" />
//                     )}
//                   </div>
//                 );
//               }}
//             />
//           </Card>

//           {/* Time Selector */}
//           <Card className="w-full md:w-[40%] bg-[#F9E0AA] rounded-xl shadow-md">
//             <h3 className="font-semibold text-lg mb-4">Select Time</h3>
//             <div className="flex flex-col gap-4">
//               <Select
//                 className="w-full"
//                 placeholder="From Time"
//                 value={timeFrom}
//                 onChange={(value) => setTimeFrom(value)}
//                 options={availableTimes.map((time) => ({
//                   value: time,
//                   label: time,
//                 }))}
//               />
//               <Select
//                 className="w-full"
//                 placeholder="To Time"
//                 value={timeTo}
//                 onChange={(value) => setTimeTo(value)}
//                 options={availableTimes.map((time) => ({
//                   value: time,
//                   label: time,
//                 }))}
//               />
//             </div>
//           </Card>

//           {/* Pickup & Drop Option */}
//           <Card className="w-full md:w-[40%] bg-[#F9E0AA] rounded-xl shadow-md">
//             <h3 className="font-semibold text-lg mb-4">Pickup & Drop</h3>
//             <div className="flex flex-col gap-4">
//               <Checkbox
//                 checked={pickupDrop}
//                 onChange={(e) => setPickupDrop(e.target.checked)}
//               >
//                 Need Pickup & Drop
//               </Checkbox>
//             </div>
//           </Card>
//         </div>

//         {/* Book Now Button */}
//         <div className="w-full flex justify-center">
//           <button
//             onClick={handleBooking}
//             className="w-full md:w-[20%] py-3 bg-[#FD890E] hover:bg-[#fb7e00] text-white font-semibold rounded-xl transition duration-300"
//           >
//             BOOK NOW
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Bookcare;
// }
