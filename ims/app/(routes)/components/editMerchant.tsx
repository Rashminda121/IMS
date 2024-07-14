"use client";

import { Merchant } from "@prisma/client";
import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Nav from "./nav";

// Define EditUsers component
const EditMerchant = ({ merchant }: { merchant: Merchant }) => {
  // State variables
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create FormData object from form data
    const formData = new FormData(event.currentTarget);
    const data = {
      id: merchant.id,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
    };

    try {
      // Send POST request to update user API endpoint
      const response = await fetch("/api/updateMerchant", {
        method: "POST",
        body: new URLSearchParams(data), // Send form data as URLSearchParams
      });

      // Parse response JSON
      const result = await response.json();

      // Check if response is successful
      if (response.ok) {
        // Display success message
        setAlertMessage(`Success: ${result.message}`);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        // Display error message
        setAlertMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      // Handle fetch errors
      setAlertMessage("Error: Something went wrong");
    }
  };

  // Render EditUsers component
  return (
    <>
      <Nav />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mb-10 mt-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edit Merchant account
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
                Merchant Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={merchant.name}
                  required
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Merchant Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  defaultValue={merchant.email}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Merchant Phone
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  defaultValue={merchant.phone}
                  autoComplete="current-phone"
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Merchant Address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  defaultValue={merchant.address}
                  autoComplete="current-address"
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center mt-6 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update merchant
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            <a
              href="../merchants"
              className="font-semibold leading-6 text-black hover:text-indigo-500"
            >
              <i className="fa-solid fa-arrow-left pr-2"></i> Back
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

// Export EditUsers component
export default EditMerchant;
