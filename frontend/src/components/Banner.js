// Banner.js
import React from "react";
import bannerImage from "./contoh1.png"; 

const Banner = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-600 text-white p-4 text-center">
      <img src={bannerImage} alt="Special Offer Banner" className="mb-4 mx-auto" />
      <h2 className="text-2xl font-bold">Special Offer!</h2>
      <p>Get 20% off on selected items. Limited time offer.</p>
    </div>
  );
};

export default Banner;
