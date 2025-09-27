"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "@/Axios/axios"; // your pre-configured axios instance
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function BookDoctor({ doctor, onBack }) {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  // Helper to map schema consultation types to backend-friendly keys
  const getConsultationKey = (type) => {
    const lowercasedType = type.toLowerCase();
    if (lowercasedType.includes("home")) return "home";
    if (lowercasedType.includes("video")) return "videocall";
    if (lowercasedType.includes("person")) return "clinic";
    return "clinic";
  };

  const [pet, setPet] = useState(doctor.petTypes[0] ?? "");
  const [consultation, setConsultation] = useState(
    getConsultationKey(doctor.consultationType[0] ?? "")
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [savedAddresses, setSavedAddresses] = useState(user?.addresses || []);
  const [useNewAddress, setUseNewAddress] = useState(
    savedAddresses.length === 0
  );
  const generateTimeSlots = (startTimeStr, endTimeStr) => {
    if (!startTimeStr || !endTimeStr) {
      return [];
    }

    const startHour = parseInt(startTimeStr.trim().split(":")[0]);
    const endHour = parseInt(endTimeStr.trim().split(":")[0]);

    const slots = [];

    for (let hour = startHour; hour < endHour; hour++) {
      const ampm = hour >= 12 ? "PM" : "AM";
      let displayHour = hour % 12;
      if (displayHour === 0) displayHour = 12;

      const paddedHour = displayHour.toString().padStart(2, "0");
      const timeString = `${paddedHour}:00 ${ampm}`;

      slots.push(timeString);
    }

    return slots;
  };

  if (!doctor) {
    return (
      <div className="p-6">
        <p className="text-gray-700">Doctor not found.</p>
        <button onClick={onBack} className="text-amber-600 underline">
          Back to list
        </button>
      </div>
    );
  }

  const formatTimings = (timings) => {
    if (!timings || !timings.days || timings.days.length === 0) {
      return "N/A";
    }
    const startDay = timings.days[0].slice(0, 3);
    const endDay = timings.days[timings.days.length - 1].slice(0, 3);
    const dayRange = startDay === endDay ? startDay : `${startDay} - ${endDay}`;
    return `${dayRange}, ${timings.startTime.trim()} - ${timings.endTime.trim()}`;
  };

  const timeSlots = generateTimeSlots(
    doctor.timings?.startTime,
    doctor.timings?.endTime
  );

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!user) {
      return toast.warning("Please login to book an appointment.");
    }

    if (!date || !time || !consultation) return toast.warn("Please fill all fields");
    if (consultation === "home" && !address)
      return toast.warn("Please enter an address for the home visit.");

    try {
      const loaded = await loadRazorpay();
      if (!loaded) return alert("Razorpay SDK failed to load. Are you online?");

      const { data: order } = await axios.post("/payment/create-order", {
        amount: doctor.fees * 100,
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "PaPaPet",
        description: "PaPaPet Doctor Consultation",
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await axios.post("/payment/verify", response);

          if (verifyRes.data.success) {
            await axios.post("/consultations/addcunsulation", {
              user: user._id,
              doctor: doctor._id,
              petType: pet,
              date,
              time,
              fees: doctor.fees,
              address: consultation === "home" ? address : "", // Only send address if it's a home visit
              notes,
              consultationType: consultation, // e.g., "home", "clinic"
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            toast.success("Booking successful ✅");
            router.push("/papapet/order/consultation");
            onBack?.();
          } else {
            toast.error("Payment verification failed ❌");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone,
        },
        theme: { color: "#F59E0B" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while booking ❌");
    }
  };

  return (
    <main>
      <section className="mx-auto px-6">
        <button
          onClick={onBack}
          className="text-white font-bold bg-[#FFAD22] px-5 py-2 rounded-full "
        >
          ← Back
        </button>

        <div className="flex max-md:flex-col items-start justify-start gap-5 mt-5">
          <div className="h-40 w-40 rounded-xl">
            <img
              src={doctor.image}
              className="h-full w-full object-cover rounded-xl"
              alt={doctor.name}
            />
          </div>
          <div className="max-md:text-center">
            <h1 className="text-3xl font-bold">{doctor.name}</h1>
            <p className="text-amber-700 font-medium">{doctor.qualification}</p>
            <p className="text-gray-600">
              {doctor.experience}+ years experience
            </p>
            <p className="text-gray-600">
              Timings: {formatTimings(doctor.timings)}
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="mt-10 space-y-8">
          {/* Pet selection */}
          <section>
            <h3 className="text-lg font-semibold">Select Pet</h3>
            <div className="mt-4 flex gap-2">
              {doctor.petTypes.map((p) => (
                <button
                  required
                  key={p}
                  type="button"
                  onClick={() => setPet(p)}
                  className={`rounded-full border px-4 py-1.5 text-sm ${
                    pet === p
                      ? "border-amber-500 bg-amber-500 text-white"
                      : "border-amber-200 bg-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </section>

          {/* Consultation selection */}
          <section>
            <h3 className="text-lg font-semibold">Select Consultation Type</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {doctor.consultationType.map((c) => {
                const typeKey = getConsultationKey(c);
                return (
                  <button
                    required
                    key={c}
                    type="button"
                    onClick={() => setConsultation(typeKey)}
                    className={`rounded-xl border p-4 text-left ${
                      consultation === typeKey
                        ? "border-amber-500 bg-amber-50"
                        : "border-amber-200"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            {/* Address selection for home visit */}
            {consultation === "home" && (
              <div className="mt-4">
                <h4 className="font-semibold">Select Address</h4>
                {savedAddresses.length > 0 && !useNewAddress ? (
                  <div className="flex flex-col gap-2 mt-2">
                    {savedAddresses.map((a, i) => (
                      <button
                        required
                        key={i}
                        type="button"
                        onClick={() => setAddress(a)}
                        className={`border p-2 rounded text-left ${
                          address === a
                            ? "bg-amber-500 text-white border-amber-500"
                            : "border-gray-200"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="mt-2 text-amber-600 underline text-left"
                      onClick={() => {
                        setUseNewAddress(true);
                        setAddress(""); // Clear selection
                      }}
                    >
                      Add new address
                    </button>
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter new address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-2 w-full border p-2 rounded"
                    required
                  />
                )}
              </div>
            )}
          </section>

          {/* Booking details */}
          <section>
            <h3 className="text-lg font-semibold">Booking Details</h3>
            <label className="block mt-4">
              Date:
              <input
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="ml-2 border p-1 rounded"
              />
            </label>

            <p className="mt-4 text-sm">Available Time Slots:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {timeSlots.map((t) => (
                <button
                  required
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={`px-3 py-1.5 rounded border ${
                    time === t
                      ? "bg-amber-500 text-white border-amber-500"
                      : "border-gray-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <textarea
              placeholder="Any additional notes?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-4 w-full border p-2 rounded"
            />

            <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-xl border">
              <div>
                <p className="text-sm">Consultation Fees</p>
                <p className="text-xl font-semibold">₹{doctor.fees}</p>
              </div>
              <button
                type="submit"
                // disabled={
                //   !date || !time || (consultation === "home" && !address)
                // }
                className="bg-amber-500 text-white px-6 py-2 rounded-lg disabled:bg-gray-400"
              >
                Book Now
              </button>
            </div>
          </section>
        </form>
      </section>
    </main>
  );
}
