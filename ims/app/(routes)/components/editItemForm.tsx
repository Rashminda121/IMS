"use client";

import Navbar from "@/app/(routes)/components/navbar";
import React, { useState } from "react";
import type { Item } from "@prisma/client";
import "@fortawesome/fontawesome-free/css/all.min.css";

const EditItem = ({ item }: { item: Item }) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      id: item.id,
      name: formData.get("name") as string,
      code: formData.get("code") as string,
      price: formData.get("price") as string,
      quantity: formData.get("quantity") as string,
    };

    try {
      const response = await fetch("/api/updateItem", {
        method: "POST",
        body: new URLSearchParams(data),
      });

      const result = await response.json();

      if (response.ok) {
        setAlertMessage(`Success: ${result.message}`);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setAlertMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setAlertMessage("Error: Something went wrong");
    }
  };

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
            Edit items
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {alertMessage && (
            <div
              role="alert"
              className={`mb-4 p-4 rounded ${
                alertMessage.startsWith("Success")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {alertMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Item Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  defaultValue={item.name}
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Item Code
              </label>
              <div className="mt-2">
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  autoComplete="code"
                  defaultValue={item.code}
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Item Price
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  required
                  autoComplete="current-price"
                  defaultValue={
                    item.price !== null && item.price !== undefined
                      ? item.price.toString()
                      : ""
                  }
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Item Qauntity
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  required
                  autoComplete="quantity"
                  defaultValue={
                    item.quantity !== null && item.quantity !== undefined
                      ? item.quantity.toString()
                      : ""
                  }
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center mt-6 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            <a
              href="../items"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              <i className="fa-solid fa-arrow-left pr-2"></i> Back
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default EditItem;
