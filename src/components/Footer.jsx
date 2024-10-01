import React from "react";
import logo from "../assets/images/logo/logo2.png";

export const Footer = () => {
  return (
    <div className="mt-10 py-4 border-t-[0.5px] border-[#cccccc]">
      <div className="flex items-center justify-between">
        <div className="w-8 h-8">
          <img src={logo} className="w-full h-full object-contain" />
        </div>
        <p className="font-medium text-sm">Made with ❤ by Chime Juliet</p>
        <p>©{new Date().getFullYear()}</p>
      </div>
    </div>
  );
};
