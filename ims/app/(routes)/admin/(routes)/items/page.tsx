// Import necessary modules and components
"use client";
import Navbar from "@/app/(routes)/components/navbar";
import { db } from "@/lib/db";
import Link from "next/link";

// ViewItem component definition
export default async function ViewItem() {
  // Fetch items from the database
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
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
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
                  <th className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Edit
                  </th>
                  <th className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>

              <tbody className="bg-gray-100 divide-y divide-gray-200 text-center">
                {items.map((item) => (
                  <tr key={item.id}>
                    {/* Name column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={item.name}
                        className="input-cell block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </td>
                    {/* Code column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-500">
                      <input
                        id="code"
                        name="code"
                        type="text"
                        required
                        value={item.code}
                        className="input-cell block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </td>
                    {/* Price column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-500">
                      <input
                        id="price"
                        name="price"
                        type="number"
                        required
                        value={
                          item.price !== null && item.price !== undefined
                            ? item.price.toString()
                            : ""
                        }
                        className="input-cell block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </td>
                    {/* Quantity column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-500">
                      <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        required
                        value={
                          item.quantity !== null && item.quantity !== undefined
                            ? item.quantity.toString()
                            : ""
                        }
                        className="input-cell block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </td>
                    {/* Edit button column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-500">
                      <Link
                        href={`./editItems/${item.id}`}
                        className="btn-edit block w-full rounded-md border-0 px-3 py-1.5 text-white bg-indigo-600 sm:text-sm sm:leading-6"
                      >
                        Edit
                      </Link>
                    </td>
                    {/* Delete button column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-500">
                      <input
                        id="delete"
                        name="delete"
                        type="submit"
                        required
                        value={"Delete"}
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-white bg-red-500 sm:text-sm sm:leading-6"
                      />
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
