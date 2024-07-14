"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";

import React, { useState } from "react";
import Link from "next/link";
import { getItemCount, getMerchantCount } from "@/lib/counts";
import ManagerNavbar from "./(routes)/navbar/page";

const Manager = async () => {
  const merchantCount = await getMerchantCount();
  const itemCount = await getItemCount();
  return (
    <>
      <ManagerNavbar />
      <div className="flex mt-10 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h1 className="mt-10 mb-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Greetings, Manager
          </h1>
        </div>

        <div className="text-center mt-10 w-full justify-center relative mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 text-center mx-5">
            <div className="p-10 bg-slate-100 border border-gray-200 shadow-md hover:shadow-xl hover:scale-105 transition duration-300 rounded-lg w-full">
              <p className="text-2xl sm:text-xl md:text-2xl text-black font-bold">
                <i className="fa-solid fa-bag-shopping pr-4"></i>Items
              </p>
              <h1 className="text-2xl text-indigo-700 font-bold mt-2">
                - {itemCount} -
              </h1>
            </div>
            <div className="p-10 bg-slate-100 border border-gray-200 shadow-md hover:shadow-xl hover:scale-105 transition duration-300 w-full">
              <p className="text-2xl sm:text-xl md:text-2xl text-black font-bold ">
                <i className="fa-solid fa-person pr-4"></i>Merchants
              </p>
              <h1 className="text-2xl text-indigo-700 font-bold mt-2">
                - {merchantCount} -
              </h1>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 text-center">
            <a href="./manager/items">
              <div className="p-5 bg-indigo-600 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300 ">
                <h2 className="text-md sm:text-xl md:text-2xl text-white font-semibold">
                  <i className="fa-solid fa-eye pr-4"></i> View Items
                </h2>
              </div>
            </a>
            <div className="p-5 bg-indigo-600 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300">
              <a href="./manager/merchants">
                <h2 className="text-sm sm:text-xl md:text-2xl text-white font-semibold">
                  <i className="fa-solid fa-person pr-4"></i>Merchants
                </h2>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
