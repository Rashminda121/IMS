"use client";
import { db } from "@/lib/db";
import Link from "next/link";
import React, { useState } from "react";
import ManagerNavbar from "../navbar/page";

export default async function ViewMerchants() {
  const merchants = await db.merchant.findMany();

  return (
    <>
      <ManagerNavbar />

      <div className="flex min-h-screen justify-center items-center px-6 py-12 lg:px-8 mb-10 mt-10">
        <div className="w-full">
          <div className="mx-auto">
            <img
              alt="Your Company"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 mb-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              View Merchants
            </h2>
          </div>

          <div className="overflow-x-auto overflow-y-auto mt-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-700 text-white">
                <tr className="text-center">
                  <th className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Mail
                  </th>
                </tr>
              </thead>

              <tbody className="bg-gray-100 divide-y divide-gray-200 text-center">
                {merchants.map((merch) => (
                  <tr key={merch.id} className="border shadow-md">
                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                      {merch.name}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                      {merch.email}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                      {merch.phone}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                      {merch.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                      <Link
                        href={`./editUsers/${merch.id}`}
                        className="btn-edit block w-full rounded-md border-0 px-3 py-1.5 text-white bg-green-600 sm:text-sm sm:leading-6"
                      >
                        Mail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Return link */}
          <div className="mt-5 text-center">
            <a
              href="./"
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
