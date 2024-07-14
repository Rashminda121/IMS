"use client";

import Navbar from "@/app/(routes)/components/navbar";
import React, { useState } from "react";
import type { Item, Merchant } from "@prisma/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import { SendEmail } from "@/app/api/mail/route";

const SendMail = ({
  merchant,
  items,
}: {
  merchant: Merchant;
  items: Item[];
}) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<
    { itemId: string; quantity: number }[]
  >([]);
  const [itemQuantities, setItemQuantities] = useState<{
    [key: string]: number;
  }>(
    items.reduce((acc, item) => {
      acc[item.id] = item.quantity || 1;
      return acc;
    }, {} as { [key: string]: number })
  );

  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { itemId: "", quantity: 1 }]);
  };

  const handleItemChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newItems = [...selectedItems];

    if (field === "itemId") {
      const itemId = value as string;
      newItems[index] = {
        ...newItems[index],
        itemId,
        quantity: itemQuantities[itemId],
      };
    } else {
      newItems[index] = { ...newItems[index], [field]: value };
    }

    setSelectedItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);
  //   const data = {
  //     id: merchant.id,
  //     email: formData.get("email") as string,
  //     subject: formData.get("subject") as string,
  //     message: formData.get("message") as string,
  //     items: selectedItems,
  //   };

  //   try {
  //     const response = await fetch("/api/mail", {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const result = await response.json();

  //     if (response.ok) {
  //       setAlertMessage(`Success: ${result.message}`);

  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 2000);
  //     } else {
  //       setAlertMessage(`Error: ${result.message}`);
  //     }
  //   } catch (error) {
  //     setAlertMessage("Error: Something went wrong");
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      items: selectedItems,
    };

    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        setAlertMessage(`Success: ${result.message}`);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setAlertMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setAlertMessage("Error: Something went wrong");
      console.error("Error sending email:", error);
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
            Send Email
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
          <form
            onSubmit={handleSubmit}
            // action={async (formData) => {
            //   await SendEmail(formData);
            // }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Receiver Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  defaultValue={merchant.email}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Subject
              </label>
              <div className="mt-2">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  defaultValue={"Inventory Report"}
                  autoComplete="subject"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Message
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  id="message"
                  name="message"
                  required
                  autoComplete="current-message"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  rows={4}
                ></textarea>
              </div>
            </div>

            {selectedItems.map((item, index) => (
              <div key={index} className="flex space-x-4 items-center">
                <div className="flex-1">
                  <label
                    htmlFor={`item-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Item
                  </label>
                  <div className="mt-2">
                    <select
                      id={`item-${index}`}
                      name={`item-${index}`}
                      required
                      value={item.itemId}
                      onChange={(e) =>
                        handleItemChange(index, "itemId", e.target.value)
                      }
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">Select an item</option>
                      {items.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex-1">
                  <label
                    htmlFor={`quantity-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Quantity
                  </label>
                  <div className="mt-2">
                    <input
                      id={`quantity-${index}`}
                      name={`quantity-${index}`}
                      type="number"
                      required
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="mt-6 rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400"
                >
                  Remove
                </button>
              </div>
            ))}

            <div>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex w-full justify-center mt-6 rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
              >
                Add Item
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center mt-6 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send mail
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            <a
              href="../merchants"
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

export default SendMail;
