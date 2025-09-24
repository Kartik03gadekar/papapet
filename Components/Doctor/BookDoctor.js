"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "@/Axios/axios"; // your pre-configured axios instance
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function BookDoctor({ doctor, onBack }) {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  const [pet, setPet] = useState(doctor.petTypes[0] ?? "");
  const [consultation, setConsultation] = useState(
    doctor.consultationType[0]?.toLowerCase() ?? "clinic"
  ); // ensure lowercase for backend
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState(""); // for home consultation
  const [notes, setNotes] = useState("");
  const [savedAddresses, setSavedAddresses] = useState(user?.addresses || []); // assume user may have saved addresses
  const [useNewAddress, setUseNewAddress] = useState(false); // toggle for new address

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

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
  ];

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

    if (!date || !time || !consultation) return alert("Please fill all fields");
    if (consultation === "home" && !address)
      return alert("Please enter address");

    try {
      const loaded = await loadRazorpay();
      if (!loaded) return alert("Razorpay SDK failed to load. Are you online?");

      // 1. Create Razorpay order
      const { data: order } = await axios.post("/payment/create-order", {
        amount: doctor.fees * 100,
      });

      // 2. Setup Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "PaPaPet",
        description: "PaPaPet Doctor Consultation",
        order_id: order.id,
        handler: async function (response) {
          // 3. Verify payment
          const verifyRes = await axios.post("/payment/verify", response);

          if (verifyRes.data.success) {
            // 4. Add consultation in DB
            await axios.post("/consultations/addcunsulation", {
              user: user._id,
              doctor: doctor._id,
              petType: pet,
              date,
              time,
              fees: doctor.fees,
              address,
              notes,
              consultationType: consultation,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("Booking successful ✅");
            onBack?.();
          } else {
            alert("Payment verification failed ❌");
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
      alert("Something went wrong while booking ❌");
    }
  };

  return (
    <main>
      <section className="mx-auto px-6">
        <button onClick={onBack} className="text-white font-bold bg-[#FFAD22] px-5 py-2 rounded-full ">
          ← Back
        </button>

        <div className="flex max-md:flex-col items-start justify-start gap-5 mt-5">
          <div className="h-40 w-40 rounded-xl">
            <img src={doctor.image} className="h-full w-full object-cover rounded-xl" alt="" />
          </div>
          <div className="max-md:text-center">
            <h1 className="text-3xl font-bold">{doctor.name}</h1>
            <p className="text-amber-700 font-medium">{doctor.qualification}</p>
            <p className="text-gray-600">
              {doctor.experience}+ years experience
            </p>
            <p className="text-gray-600">Timings: {doctor.timings}</p>
          </div>
        </div>

        <form onSubmit={submit} className="mt-10 space-y-8">
          {/* Pet selection */}
          <section>
            <h3 className="text-lg font-semibold">Select Pet</h3>
            <div className="mt-4 flex gap-2">
              {doctor.petTypes.map((p) => (
                <button
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
                const type = c.toLowerCase();
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setConsultation(type)}
                    className={`rounded-xl border p-4 text-left ${
                      consultation === type
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
                {savedAddresses.length > 0 && !useNewAddress && (
                  <div className="flex flex-col gap-2 mt-2">
                    {savedAddresses.map((a, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setAddress(a)}
                        className={`border p-2 rounded ${
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
                      className="mt-2 text-amber-600 underline"
                      onClick={() => setUseNewAddress(true)}
                    >
                      Add new address
                    </button>
                  </div>
                )}
                {useNewAddress && (
                  <input
                    type="text"
                    placeholder="Enter new address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-2 w-full border p-2 rounded"
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

            {/* Notes */}
            <textarea
              placeholder="Any additional notes?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-4 w-full border p-2 rounded"
            />

            {/* Fees & Submit */}
            <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-xl border">
              <div>
                <p className="text-sm">Consultation Fees</p>
                <p className="text-xl font-semibold">₹{doctor.fees}</p>
              </div>
              <button
                type="submit"
                disabled={
                  !date || !time || (consultation === "home" && !address)
                }
                className="bg-amber-500 text-white px-6 py-2 rounded-lg"
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
