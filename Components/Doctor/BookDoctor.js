"use client";
import { useState } from "react";

export default function BookDoctor({ doctor, onBack }) {
  const [pet, setPet] = useState(doctor.petTypes[0] ?? "");
  const [consultation, setConsultation] = useState(
    doctor.consultationType[0] ?? ""
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

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

  const submit = (e) => {
    e.preventDefault();
    if (!date || !time || !consultation) return;
    alert(
      `Booked ${consultation} with ${doctor.name} on ${date} at ${time} for ${pet}. Fees: ₹${doctor.fees}`
    );
    onBack?.();
  };

  return (
    <main className="">
      <section className=" mx-auto px-6">
        <button onClick={onBack} className="text-amber-700 hover:underline">
          ← Back
        </button>

        <h1 className="mt-3 text-3xl font-bold">{doctor.name}</h1>
        <p className="text-amber-700 font-medium">{doctor.qualification}</p>
        <p className="text-gray-600">{doctor.experience}+ years experience</p>
        <p className="text-gray-600">Timings: {doctor.timings}</p>

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
              {doctor.consultationType.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setConsultation(c)}
                  className={`rounded-xl border p-4 text-left ${
                    consultation === c
                      ? "border-amber-500 bg-amber-50"
                      : "border-amber-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
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

            {/* Fees & Submit */}
            <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-xl border">
              <div>
                <p className="text-sm">Consultation Fees</p>
                <p className="text-xl font-semibold">₹{doctor.fees}</p>
              </div>
              <button
                type="submit"
                disabled={!date || !time}
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
