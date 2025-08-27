"use client";

import React, { useState } from "react";

const PetHealthReport = () => {
  const [selectedPet, setSelectedPet] = useState("Dog");
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    pounds: "",
    ounces: "",
  });

  const petTypes = ["Dog", "Cat", "Fish"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenerate = () => {
    console.log("Generating report for:", { selectedPet, ...formData });
    // 🚀 Add API call or logic for report generation here
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form Section */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Create a Pet Health Report
            </h1>

            {/* Pet Type Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {petTypes.map((pet) => (
                <button
                  key={pet}
                  onClick={() => setSelectedPet(pet)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedPet === pet
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {pet}
                </button>
              ))}
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground transition-colors"
                />
              </div>

              {/* Breed */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Breed
                </label>
                <input
                  type="text"
                  placeholder="Enter breed"
                  value={formData.breed}
                  onChange={(e) => handleInputChange("breed", e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground transition-colors"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Age
                </label>
                <input
                  type="text"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground transition-colors"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Weight
                </label>
                <div className="space-y-3">
                  {/* Pounds */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Pounds
                    </label>
                    <input
                      type="number"
                      placeholder="Enter pounds"
                      value={formData.pounds}
                      onChange={(e) =>
                        handleInputChange("pounds", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground transition-colors"
                    />
                  </div>

                  {/* Ounces */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Ounces
                    </label>
                    <input
                      type="number"
                      placeholder="Enter ounces"
                      value={formData.ounces}
                      onChange={(e) =>
                        handleInputChange("ounces", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Generate */}
              <button
                onClick={handleGenerate}
                className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Generate
              </button>
            </div>
          </div>

          {/* Illustration Section */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetHealthReport;
