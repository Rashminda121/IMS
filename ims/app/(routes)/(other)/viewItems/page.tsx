// Import necessary modules and components
"use client";

import { db } from "@/lib/db";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "../../components/navbar";

export default async function ViewItem() {
  const items = await db.item.findMany();

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen justify-center items-center px-6 py-12 lg:px-8 mb-10 mt-10">
        <div className="w-full">
          <div className="mx-auto">
            <img
              alt="Your Company"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              View Items
            </h2>
          </div>

          <div className="overflow-x-auto overflow-y-auto mt-5">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-700 text-white">
                <tr className="text-center">
                  <th className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Price(Rs)
                  </th>
                  <th className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Quantity
                  </th>
                </tr>
              </thead>

              <tbody className="bg-gray-100 divide-y divide-gray-200 text-center">
                {items.map((item) => (
                  <tr key={item.id} className="border shadow-md">
                    {/* Name column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                      {item.name}
                    </td>
                    {/* Code column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-500">
                      {item.code}
                    </td>
                    {/* Price column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-500">
                      {item.price}
                    </td>
                    {/* Quantity column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-500">
                      {item.quantity}
                    </td>
                    {/* Edit button column */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Return link */}
          <div className="mt-5 text-center">
            <a
              href="./userHome"
              className="block px-5 py-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500 bg-gray-200 rounded-lg"
            >
              Return
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
