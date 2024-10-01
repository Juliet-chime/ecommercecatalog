import React from "react";
import { FaTimes } from "react-icons/fa";
import { formatData } from "../utils/formatter";
import SingleCartItem from "./SingleCartItem";
import EmptyState from "./emptyState";
import CustomButton from "./fields/CustomButton";

const ShoppingCart = ({
  userCart,
  toggle,
  cartData,
  removeItem,
  totalValue,
}) => {
  return (
    <div className="shadow-sm bg-white w-full md:w-[400px] h-[100vh] overflow-scroll fixed z-50 right-0 top-20 transition-all ease-linear duration-75 py-8 px-6">
      <div className="flex items-center justify-end cursor-pointer">
        <div
          className="w-6 h-6 rounded-full bg-[#cccccc] flex items-center justify-center"
          onClick={toggle}
        >
          <span>
            <FaTimes fontSize={14} color="black" fontWeight={400} />
          </span>
        </div>
      </div>
      <h1 className="text-md font-bold mb-6 mt-4">
        Shopping Cart ({userCart.length})
      </h1>

      {!cartData.length ? (
        <EmptyState text={`You haven't added product to cart`} />
      ) : (
        <>
          {cartData.map((data, idx) => {
            return (
              <SingleCartItem
                key={idx}
                data={data}
                removeItem={() => removeItem(data.id)}
              />
            );
          })}
          <div className="flex justify-end items-center">
            <p>
              <span className="font-bold">Total: </span>
              <span> {formatData.currencyAmount(totalValue, "USD")} </span>
            </p>
          </div>
          <div className="w-[50%] m-auto mt-6">
            <CustomButton
              type="submit"
              text={"CHECK OUT"}
              styleProps={{
                backgroundColor: "red-500",
                radius: "rounded-xl",
                height: "h-12",
                width: "w-full",
                color: "white",
                weight: "bold",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
