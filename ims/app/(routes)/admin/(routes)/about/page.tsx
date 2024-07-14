"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminNavbar from "../navbar/navbar";

const About = () => {
  return (
    <>
      <AdminNavbar />
      <div className="relative min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8">
        <div
          className="absolute inset-0 bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: "url('./img/shape.png')",
            backgroundSize: "60%",
          }}
        ></div>
        <div className="relative flex mt-10 flex-1 flex-col justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto "
            />
            <h1 className="mt-10  text-center text-4xl font-bold leading-9 tracking-tight text-indigo-900">
              Welcome to IMS
            </h1>
          </div>
          <div className="w-full p-10 rounded-lg ">
            <p className="text-center text-lg leading-7 text-black p-10 rounded-xl font-semibold shadow-xl">
              An effective Inventory Management System is crucial for any
              business, big or small. It helps you maintain optimal stock
              levels, reduce costs, and enhance customer satisfaction by
              ensuring that the right products are always available when needed.
              By automating inventory tracking and providing real-time data, our
              system saves you time and minimizes errors, allowing you to focus
              on growing your business.
            </p>
          </div>
          <div className="text-center justify-center w-full block">
            <a href="./" className="p-5 bg-indigo-900 text-white rounded-lg">
              Return
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
