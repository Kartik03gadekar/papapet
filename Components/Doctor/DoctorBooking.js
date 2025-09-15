import React, { useEffect, useState } from "react";
import axios from "@/Axios/axios";
import ListDoctors from "./ListDoctors";
import BookDoctor from "./BookDoctor";

export default function DoctorBooking() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("/doctor/adminDoctor/getAllDoctors");
        setDoctors(res.data.allDoctors);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) return <p>Loading doctors...</p>;

  return (
    <div className="p-6">
      {selectedDoctor ? (
        <BookDoctor
          doctor={selectedDoctor}
          onBack={() => setSelectedDoctor(null)}
        />
      ) : (
        <>
          <div className="text-4xl text-center font-bold mb-20">
            <h1>Our Trusted Doctors</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <ListDoctors
                key={doctor._id} // ✅ use MongoDB _id
                doctor={doctor}
                onSelect={setSelectedDoctor}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
