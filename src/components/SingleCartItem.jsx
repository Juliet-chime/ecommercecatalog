import React from "react";
import { formatData } from "../utils/formatter";
import { MdDelete } from "react-icons/md";

const SingleCartItem = ({ data, removeItem }) => {
  return (
    <div className="grid grid-cols-5 gap-4 mb-5">
      <div className="w-full h-12 bg-white flex items-center justify-center group-hover:rounded-t-[4px]">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </div>
      <div className="col-span-2">
        <p className="font-normal text-[10px]">{data?.title}</p>
        <p className="font-extrabold text-[10px]">
          {" "}
          {formatData.currencyAmount(data?.price, "USD")}
        </p>
      </div>
      <div className="justify-self-end">
        <p className="font-extrabold text-[10px]">
          {" "}
          <span>
            {formatData.currencyAmount(data?.price, "USD")} x {data.quantity}
          </span>
          <br />
          <span>
            {formatData.currencyAmount(data.price * data.quantity, "USD")}
          </span>
        </p>
      </div>
      <div className="justify-self-end">
        <MdDelete
          className="text-red-500 cursor-pointer"
          onClick={() => removeItem(data.id)}
        />
      </div>
    </div>
  );
};

export default SingleCartItem;
