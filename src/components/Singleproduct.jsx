import React from "react";
import { formatData } from "../utils/formatter";

const Singleproduct = ({ data, onViewProductDetails }) => {
  const { currencyAmount, capitalize } = formatData;
  return (
    <div
      className="group cursor-pointer hover-product"
      onClick={onViewProductDetails}
    >
      <div className="w-full h-32 bg-white flex items-center justify-center group-hover:rounded-t-[4px]">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </div>
      <div className="py-3 group-hover:px-2">
        <p className="font-medium text-[9px]">{data.title}</p>
        <p className="font-extrabold text-[12px] mt-1">
          {" "}
          {currencyAmount(data.price, "USD")}
        </p>
        <p className="font-medium text-[8px] text-red-600">
          {capitalize(data.category)}
        </p>
      </div>
    </div>
  );
};

export default Singleproduct;
