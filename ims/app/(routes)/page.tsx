// LandingPage.tsx
"use client";
import React, { useState } from "react";
import "./(other)/userHome/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserNavbar from "./components/userNavbar";

const LandingPage: React.FC = () => {
  const [isLightMode, setIsLightMode] = useState(true);

  const toggleMode = () => {
    setIsLightMode((prevMode) => !prevMode);
  };

  return (
    <div className={`big-wrapper ${isLightMode ? "light" : "dark"}`}>
      <img
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="hello"
        className="shape"
      />

      <UserNavbar />

      <div className="showcase-area">
        <div className="container">
          <div className="left">
            <div className="big-title">
              <h1 className="text-indigo-700">Future is here,</h1>
              <h1 className="text-indigo-700">Start Exploring now.</h1>
            </div>
            <p className="text text-justify">
              Welcome to our Inventory Management System. This tool helps you
              track your stock easily and efficiently. Whether for a small
              business or a larger operation, our system keeps you organized and
              saves time. Thank you for choosing us.
            </p>
            <div className="cta">
              <a
                href="./about"
                className=" bg-indigo-700 text-white p-5 rounded-lg"
              >
                Get started
              </a>
            </div>
          </div>

          <div className="right">
            <img src="./img/person.png" alt="Person Image" className="person" />
          </div>
        </div>
      </div>

      <div className="bottom-area">
        <div className="container">
          <button className="toggle-btn" onClick={toggleMode}>
            <i className="far fa-moon"></i>
            <i className="far fa-sun"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
