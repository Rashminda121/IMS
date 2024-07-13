"use client";
import { db } from "@/lib/db";
import Navbar from "../../components/navbar";

export default async function ViewItem() {
  const items = await db.item.findMany();
  return (
    <>
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mb-10 mt-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            View Items
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-3xl">
          <table className="min-w-full divide-y divide-gray-200 mx-auto">
            <thead className="bg-indigo-700">
              <tr className="text-center ">
                <th className="px-6 py-3 text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-200 divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-500">
                    {item.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-500">
                    <span className="pr-2">Rs.</span>
                    {item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-500">
                    {item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-5 text-center text-sm text-gray-500 pt-5">
            <a
              href="./manager"
              className=" p-5 font-semibold leading-6 text-indigo-600 hover:text-indigo-500 bg-slate-200 rounded-lg"
            >
              Return
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
