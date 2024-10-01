import React from "react";

export const Errorcomponent = ({text}) => {
  return !!text? <span className="text-red-500 text-[11px]">{text}</span>:null;
};
