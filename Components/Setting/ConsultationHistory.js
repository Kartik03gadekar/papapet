"use client";

import React, { useEffect, useState } from "react";
import axios from "@/Axios/axios"; // your axios instance
import Link from "next/link";
import { Tag } from "antd";
import { useSelector } from "react-redux";

const ConsultationHistory = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Correct selector (adjust if your slice is different)
  const user = useSelector((state) => state.auth?.user);

  // ✅ Fetch consultations
  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const { data } = await axios.get("/consultations/details");

        // Adjust if API returns { consultations: [...] }
        const consultationsArray = Array.isArray(data)
          ? data
          : data.consultations;

        // Filter consultations for this user
        const filtered = consultationsArray?.filter(
          (c) => c.user?._id === user?._id
        );

        setConsultations(filtered || []);
      } catch (error) {
        console.error("Error fetching consultations:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchConsultations();
  }, [user?._id]);

  if (loading)
    return <p className="text-center p-6">Loading consultations...</p>;

  if (!consultations || consultations.length === 0) {
    return (
      <div className="w-full flex justify-center p-6">
        <Tag color="volcano" className="p-2">
          No consultations found
        </Tag>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 p-6">
      {consultations.map((dets) => (
        <div
          key={dets._id}
          className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg rounded-xl p-6 flex flex-col gap-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0D9899] to-[#1AC6C6]">
              {dets?.doctor?.name || "Doctor"}
            </h3>

            <div className="pt-2">
              <Tag
                color={
                  dets?.status?.toLowerCase() === "completed"
                    ? "green"
                    : "orange"
                }
                className="px-3 py-2 rounded-md font-semibold tracking-wide"
              >
                {dets?.status?.toUpperCase() || "PENDING"}
              </Tag>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex items-center justify-between gap-2 text-sm">
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Date:</span>{" "}
              {dets.date ? new Date(dets.date).toLocaleDateString() : "N/A"}
            </p>
            {dets?.fees && (
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Fees:</span> ₹
                {dets.fees}
              </p>
            )}

            <Tag
              color="blue"
              className="rounded-full px-3 py-1 font-medium text-xs"
            >
              {dets.petType}
            </Tag>
          </div>

          {/* <div>
            {dets?.prescription ? (
              <Link href={`/mediensure/prescription/${dets.prescription._id}`}>
                <Tag
                  color="green"
                  className="px-3 py-2 rounded-md cursor-pointer hover:bg-green-200 flex items-center gap-2 w-fit font-medium transition"
                >
                  Prescription
                  <img className="h-5 w-5" src="/prescriptionP.png" alt="" />
                </Tag>
              </Link>
            ) : (
              <Tag
                color="cyan"
                className="px-3 py-2 rounded-md flex items-center gap-2 w-fit bg-cyan-100 font-medium"
              >
                Not Submitted
                <img className="h-5 w-5" src="/prescriptionP.png" alt="" />
              </Tag>
            )}
          </div> */}

            <div className="flex items-center justify-between">
              <h1>Appointment Type:</h1>
              <Tag
                color="gold"
                className="px-3 py-2 rounded-md flex items-center gap-2 w-fit text-white bg-[#FFAD22] font-medium"
              >
                Video Call
              </Tag>
            </div>
        </div>
      ))}
    </div>
  );
};

export default ConsultationHistory;
