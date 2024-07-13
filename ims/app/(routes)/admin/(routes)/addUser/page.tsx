"use client";
import Navbar from "@/app/(routes)/components/navbar";
import { User } from "@prisma/client";
import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Define EditUsers component
const AddUsers = () => {
  // State variables
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [access, setAccess] = useState<boolean>(false);

  // Effect to log the state after it's updated
  useEffect(() => {
    console.log(access); // Log the current state after update
  }, [access]);

  // Function to toggle access state
  const handleToggle = () => {
    setAccess((prevAccess) => !prevAccess);
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create FormData object from form data
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as string,
      access: access.toString(), // Convert access boolean to string
    };

    try {
      // Send POST request to update user API endpoint
      const response = await fetch("/api/addUser", {
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
            AddUser account
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
                User Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
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
                User Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  User Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="text"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  User Role
                </label>
              </div>
              <div className="mt-2">
                <select
                  id="role"
                  name="role"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="access"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Access
              </label>
              <div className="mt-2">
                <input
                  type="checkbox"
                  id="access"
                  name="access"
                  checked={access}
                  onChange={handleToggle}
                  className="hidden"
                />
                <label
                  htmlFor="access"
                  className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer ${
                    access ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
                      access ? "translate-x-6" : "translate-x-1"
                    }`}
                  ></span>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center mt-6 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add account
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            <a
              href="./users"
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
export default AddUsers;
