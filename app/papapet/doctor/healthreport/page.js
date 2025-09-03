"use client";

import React, { useState } from "react";
import NavPapaPet from "@/Components/Nav/NavPapaPet";
import axiosInstance from "@/Axios/axios";
import { FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import ReactToPrint from "react-to-print";
import { GoArrowRight } from "react-icons/go";

const PetHealthReport = () => {
  const [activeTab, setActiveTab] = useState("Cat");
  const [infoModal, setInfoModal] = useState({ open: false, field: "" });
  const [showModal, setShowModal] = useState(false);

  const openModal = (field) => {
    setInfoModal({ open: true, field });
  };

  const closeModal = () => {
    setInfoModal({ open: false, field: "" });
  };
  const [form, setForm] = useState({
    name: "",
    breed: "",
    height: "", // Dog only
    lim: "", // Cat only
    ribcage: "", // Cat only
    weight: "",
    gender: "",
    age: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let endpoint =
        activeTab === "Dog" ? "/AI/AnimalHealth_dog" : "/AI/AnimalHealth_cat";

      const { data } = await axiosInstance.post(endpoint, form);
      setResult(data);
      setShowModal(true);
      toast.success("Health report generated!");
    } catch (err) {
      toast.error("Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="lg:overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <NavPapaPet />
      </div>
      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center">
        <div className=" max-md:h-screen w-full">
          <div className="relative h-screen w-full">
            <img
              className="h-full w-full object-cover"
              src="/healthreport/Hero.webp"
              alt=""
            />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 flex items-end justify-start p-5 2xl:p-10">
              <div>
                <button className="lg:hidden bg-[#FEAC22]/60 border px-5 py-3 rounded-full mb-10">
                  <a href="#generator">
                    <div className=" flex items-center justify-center gap-5">
                      Generate Now <GoArrowRight className="text-2xl" />
                    </div>
                  </a>
                </button>

                <h1 className="text-2xl xl:text-3xl font-bold bg-gradient-to-l from-[#0D9899] to-white bg-clip-text text-transparent">
                  Generate your Pet's AI Health Report with PaPaPet AI
                </h1>
                <p className="text-white text-xl xl:text-2xl mt-2 pr-12 2xl:max-w-2xl">
                  Measures body fat based on weight and
                  height. It’s one of many measures to check how in shape your
                  pet is.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          id="generator"
          className="h-full w-full flex flex-col items-center justify-center p-3 md:p-5 mt-20"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-2">
            <img
              className="object-contain h-8 md:h-10"
              src="/logo.png"
              alt="logo"
            />
            <h1 className="lg:text-xl xl:text-2xl font-semibold text-[#0D9899]">
              PaPaPet
            </h1>
          </div>

          {/* Title */}
          <div className="mt-2 text-center px-4">
            <h1 className="text-base md:text-sm font-medium">
              Generate your Pet’s Health Report in just a few clicks!
            </h1>
          </div>

          {/* Tabs */}
          <div className="w-full max-w-xs md:max-w-sm xl:mt-5 mt-3">
            <div className="flex items-center justify-center bg-[#0D9899] rounded-full mx-auto mb-5 p-1">
              <button
                onClick={() => setActiveTab("Cat")}
                className={`w-1/2 py-2 rounded-full transition text-sm md:text-base ${
                  activeTab === "Cat"
                    ? "bg-white text-black font-bold"
                    : "text-white"
                }`}
              >
                Cat
              </button>
              <button
                onClick={() => setActiveTab("Dog")}
                className={`w-1/2 py-2 rounded-full transition text-sm md:text-base ${
                  activeTab === "Dog"
                    ? "bg-white text-black font-bold"
                    : "text-white"
                }`}
              >
                Dog
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="w-full md:max-w-lg lg:max-w-3xl mt-3 px-2 sm:px-6 md:px-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 p-4 md:p-5 rounded-xl shadow-xl bg-white text-black"
            >
              <input
                type="text"
                name="name"
                placeholder="Pet Name"
                value={form.name}
                onChange={handleChange}
                className="border px-3 py-2 md:py-3 rounded-lg text-sm md:text-base"
                required
              />

              <input
                type="text"
                name="breed"
                placeholder="Breed"
                value={form.breed}
                onChange={handleChange}
                className="border px-3 py-2 md:py-3 rounded-lg text-sm md:text-base"
              />

              {activeTab === "Dog" && (
                <div className="relative">
                  <input
                    type="text"
                    name="height"
                    placeholder="Height to Shoulder (cm)"
                    value={form.height}
                    onChange={handleChange}
                    className="border px-3 py-2 md:py-3 rounded-lg w-full text-sm md:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => openModal("height")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FEAC22]"
                  >
                    <FaInfoCircle className="text-lg md:text-xl" />
                  </button>
                </div>
              )}

              {activeTab === "Cat" && (
                <>
                  <div className="relative">
                    <input
                      type="text"
                      name="lim"
                      placeholder="LIM (cm)"
                      value={form.limbLength}
                      onChange={handleChange}
                      className="border px-3 py-2 md:py-3 rounded-lg w-full text-sm md:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => openModal("limb")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FEAC22]"
                    >
                      <FaInfoCircle className="text-lg md:text-xl" />
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="ribcage"
                      placeholder="Ribcage Measurement (cm)"
                      value={form.ribcage}
                      onChange={handleChange}
                      className="border px-3 py-2 md:py-3 rounded-lg w-full text-sm md:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => openModal("ribcage")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FEAC22]"
                    >
                      <FaInfoCircle className="text-lg md:text-xl" />
                    </button>
                  </div>
                </>
              )}

              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={form.weight}
                onChange={handleChange}
                className="border px-3 py-2 md:py-3 rounded-lg text-sm md:text-base"
              />

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="border px-3 py-2 md:py-3 rounded-lg text-sm md:text-base"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <input
                type="number"
                name="age"
                placeholder="Age (years)"
                value={form.age}
                onChange={handleChange}
                className="border px-3 py-2 md:py-3 rounded-lg text-sm md:text-base"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-[#FEAC22] hover:bg-orange-600 text-white font-semibold py-2 md:py-3 rounded-lg transition text-sm md:text-base"
              >
                {loading ? "Generating..." : "Generate Report"}
              </button>

              {/* Modal */}
              {infoModal.open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-sm md:max-w-md relative">
                    <button
                      onClick={closeModal}
                      className="absolute top-2 right-2 text-gray-600 hover:text-black"
                    >
                      ✖
                    </button>
                    <h2 className="text-base md:text-lg font-semibold mb-3">
                      {infoModal.field === "height" &&
                        "How to Measure Height to Shoulder"}
                      {infoModal.field === "limb" && "How to Measure LIM"}
                      {infoModal.field === "ribcage" &&
                        "How to Measure Ribcage"}
                    </h2>
                    <img
                      src={
                        infoModal.field === "height"
                          ? "/healthreport/dog/height_helper.png"
                          : infoModal.field === "limb"
                          ? "/healthreport/cat/lim_helper.png"
                          : "/healthreport/cat/ribcage_helper.png"
                      }
                      alt="Measurement Guide"
                      className="w-full rounded-md"
                    />
                  </div>
                </div>
              )}
              {showModal && result && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
                    {/* Close button */}
                    <button
                      onClick={() => setShowModal(false)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                    >
                      ✖
                    </button>

                    {/* Title */}
                    <div id="health-report">
                      <h2 className="text-2xl font-bold mb-4 text-[#0D9899]">
                        {result.petName}’s Health Report
                      </h2>

                      {/* Summary */}
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-[#FEAC22]">
                          Summary
                        </h3>
                        <p className="mt-1">
                          <span className="font-semibold">Status:</span>{" "}
                          {result.summary?.healthStatus}
                        </p>
                        <p className="mt-1 text-gray-700">
                          {result.summary?.overallAssessment}
                        </p>
                      </div>

                      {/* Body Condition */}
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-[#FEAC22]">
                          Body Condition
                        </h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>
                            <span className="font-semibold">BMI:</span>{" "}
                            {result.bodyCondition?.BMI}
                          </li>
                          <li>
                            <span className="font-semibold">Ideal BMI:</span>{" "}
                            {result.bodyCondition?.idealBMI}
                          </li>
                          <li>{result.bodyCondition?.currentWeightAnalysis}</li>
                        </ul>
                      </div>

                      {/* Food & Products */}
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-[#FEAC22]">
                          Food & Nutrition
                        </h3>
                        <p className="mt-1 text-gray-700">
                          {result.food?.dietaryGuideline}
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          {result.food?.recommendedProducts?.map((p, idx) => (
                            <li key={idx} className="text-gray-700">
                              <span className="font-semibold">{p.brand}:</span>{" "}
                              {p.productName}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Exercise Plan */}
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-[#FEAC22]">
                          Exercise Plan
                        </h3>
                        <p className="mt-1 text-gray-700">
                          {result.exercisePlan?.recomendation}
                        </p>
                      </div>

                      {/* Potential Risks */}
                      {result.potentialHealthRisks &&
                        result.potentialHealthRisks.length > 0 && (
                          <div className="mb-4">
                            <h3 className="text-lg font-semibold text-[#FEAC22]">
                              Potential Health Risks
                            </h3>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                              {result.potentialHealthRisks.map((risk, idx) => (
                                <li key={idx} className="text-gray-700">
                                  {risk}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end mt-4 gap-3">
                      <ReactToPrint
                        trigger={() => (
                          <button
                            type="button"
                            className="bg-[#FEAC22] text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                          >
                            Download PDF
                          </button>
                        )}
                        content={() => document.getElementById("health-report")}
                      />
                      <button
                        type="button" // ✅ prevent form submit
                        onClick={() => setShowModal(false)}
                        className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetHealthReport;
