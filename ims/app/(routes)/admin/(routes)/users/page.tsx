// Import necessary modules and components
"use client";
import Navbar from "@/app/(routes)/components/navbar";
import { db } from "@/lib/db";
import Link from "next/link";
import React, { useState } from "react";


export default async function ViewUsers() {
  const users = await db.user.findMany();

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
              View Users
            </h2>
          </div>
          <div className="mt-7">
            <a
              href="./addUser"
              className="p-3 bg-indigo-700 text-white rounded-lg sm:text-sm md:text-md"
            >
              Add Users
            </a>
          </div>

          <div className="overflow-x-auto overflow-y-auto mt-5">
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
                    Password
                  </th>

                  <th className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Access
                  </th>
                  <th className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Edit
                  </th>
                  <th className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>

              <tbody className="bg-gray-100 divide-y divide-gray-200 text-center">
                {users.map((user) => (
                  <tr key={user.id} className="border shadow-md">
                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                      {user.name}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                      {user.password}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                      {user.access ? "Enabled" : "Disabled"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                      <Link
                        href={`./editUsers/${user.id}`}
                        className="btn-edit block w-full rounded-md border-0 px-3 py-1.5 text-white bg-indigo-600 sm:text-sm sm:leading-6"
                      >
                        Edit
                      </Link>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-500">
                      <Link
                        href={`./deleteUser/${user.id}`}
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-white bg-red-500 sm:text-sm sm:leading-6"
                      >
                        Delete
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
