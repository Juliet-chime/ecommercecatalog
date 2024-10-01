import React from "react";
import { MdHourglassEmpty } from "react-icons/md";

const EmptyState = ({ text }) => {
  return (
    <div className="w-[50%] h-[50vh] m-auto flex flex-col items-center justify-center py-20">
      <div className="w-20 h-20 bg-[#cccccc] rounded-full flex items-center justify-center">
        <MdHourglassEmpty fontSize={30} />
      </div>
      <p className="font-light text-[10px] mt-2">{text}</p>
    </div>
  );
};

export default EmptyState;
