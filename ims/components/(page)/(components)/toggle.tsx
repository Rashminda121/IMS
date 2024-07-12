import React, { useState } from "react";

function ToggleSwitch() {
  const [access, setAccess] = useState(false);

  const handleToggle = () => {
    setAccess((prevAccess) => {
      const newAccess = !prevAccess;
      return newAccess;
    });
  };

  // Effect to log the state after it's updated
  React.useEffect(() => {
    console.log(access); // Log the current state after update
  }, [access]); // Dependency array ensures this effect runs whenever `access` changes

  return (
    <div className="mt-4">
      <label
        htmlFor="access"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Provide Access
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
  );
}

export default ToggleSwitch;
