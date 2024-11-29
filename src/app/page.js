"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL; 

  useEffect(() => {
    async function fetchMakes() {
      try {
        const response = await fetch(`${API_URL}/GetMakesForVehicleType/car?format=json`);
        const data = await response.json();
        setMakes(data.Results || []);
      } catch (error) {
        console.error("Error fetching vehicle makes:", error);
      }
    }
    fetchMakes();
  }, [API_URL]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);

  const isNextEnabled = selectedMake && selectedYear;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Vehicle Selector</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Select Vehicle Make and Model Year
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Vehicle Make
              </label>
              <select
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
              >
                <option value="">Select a make</option>
                {makes.map((make) => (
                  <option key={make.MakeId} value={make.MakeId}>
                    {make.MakeName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Model Year
              </label>
              <select
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Select a year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="mt-6 text-right">
          <Link
            href={
              isNextEnabled
                ? `/result/${selectedMake}/${selectedYear}`
                : "#"
            }
            className={`inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded transition ${
              isNextEnabled
                ? "hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (!isNextEnabled) e.preventDefault();
            }}
          >
            Next
          </Link>
        </section>
      </main>
    </div>
  );
}
