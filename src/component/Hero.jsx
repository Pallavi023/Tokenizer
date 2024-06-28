import React from "react";
import LoginButton from "./loginButton";  // Ensure the correct casing
import SignupButton from "./SignupButton";  // Ensure the correct casing

function Hero() {
  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url("/img/bg.jpg")`, // Adjust the path as per your project structure
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center space-y-4 p-4 rounded-lg">
        <div className="border border-gray-300 rounded-lg px-4 py-2">
          <LoginButton />
        </div>
        <div className="border border-gray-300 rounded-lg px-4 py-2">
          <SignupButton />
        </div>
      </div>
    </div>
  );
}

export default Hero;
