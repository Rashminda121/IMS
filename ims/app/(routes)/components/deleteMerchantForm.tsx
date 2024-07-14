"use client";

import { Merchant } from "@prisma/client";
import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Nav from "./nav";

// Define DeleteUser component
const DeleteMerchant = ({ merchant }: { merchant: Merchant }) => {
  // State variables
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmation(false);

    try {
      // Send POST request to delete user API endpoint
      const response = await fetch("/api/deleteMerchant", {
        method: "POST",
        body: new URLSearchParams({ id: merchant.id }), // Send form data as URLSearchParams
      });

      // Parse response JSON
      const result = await response.json();

      // Check if response is successful
      if (response.ok) {
        // Display success message
        setAlertMessage(`Success: ${result.message}`);
        // Redirect or handle success action
        window.location.href = "../merchants";
      } else {
        // Display error message
        setAlertMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      // Handle fetch errors
      console.error("Fetch error:", error);
      setAlertMessage("Error: Something went wrong");
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // You can handle any other form submission logic here if needed
  };

  // Render DeleteUser component
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
            Delete Merchant Account
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
                  disabled
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
                Merchant Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  defaultValue={merchant.email}
                  disabled
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
                  disabled
                  autoComplete="current-password"
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
                  disabled
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleDeleteClick}
                className="flex w-full justify-center mt-6 rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Delete Account
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

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h3 className="text-lg font-medium text-gray-900">
              Confirm Deletion
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete the user "{merchant.name}"?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleCancelDelete}
                className="rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Export DeleteUser component
export default DeleteMerchant;
