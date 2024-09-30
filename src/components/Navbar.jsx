import React from "react";
import { BiCartDownload } from "react-icons/bi";
import CustomButton from "./fields/CustomButton";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ShoppingCart from "./ShoppingCart";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { showCart, setShowCart, allProduct, cartItems, setCartItems } =
    useAppContext();

  const cartData = cartItems.map((data) => {
    const product = allProduct.find(
      (product) => product?.id === (data?.products || [])[0]?.productId
    );
    return { ...product, quantity: (data.products || [])[0].quantity };
  });

  const totalValue = cartData
    .reduce((accu, currentValue) => {
      const e = currentValue.price * currentValue.quantity;
      return accu + e;
    }, 0)
    .toFixed(2);

  const onViewCart = () => {
    if (!!token) {
      setShowCart(!showCart);
    } else {
      navigate("/authentication");
    }
  };

  const removeItem = (id) => {
    if (!cartItems || !cartItems.length) return;

    const newItemList = cartItems.filter(
      (data) => !data.products?.some((product) => product.productId === id)
    );
    localStorage.setItem("userCart", JSON.stringify(newItemList));
    setCartItems(newItemList);
  };

  return (
    <div className="flex justify-between items-center py-8 relative">
      <div>
        <p> LOGO</p>
        {/* <img src={logo} className="w-full h-full object-contain" /> */}
      </div>
      <div className="flex gap-4 items-center">
        <div className="relative cursor-pointer" onClick={onViewCart}>
          <BiCartDownload fontSize={25} color={"black"} className="" />
          <div className="w-6 h-3 absolute -top-2 -right-1 rounded-md flex items-center justify-center bg-red-500">
            <span className="text-[10px] font-semibold text-white">
              {cartItems.length}
            </span>
          </div>
        </div>

        {!!token ? (
          <div>
            <CustomButton
              text="Sign Out"
              styleProps={{
                backgroundColor: "",
                border: "border border-black",
                radius: "rounded-xl",
                height: "h-10",
                width: "w-[100px]",
              }}
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            />
          </div>
        ) : (
          <div>
            <CustomButton
              text="Login"
              styleProps={{
                backgroundColor: "",
                border: "border border-black",
                radius: "rounded-xl",
                height: "h-10",
                width: "w-[100px]",
              }}
              onClick={() => navigate("/authentication")}
            />
          </div>
        )}

        {/* {!user ? null : (
          <div>
            <p className="font-bold text-[16px]"> Emeka 👋</p>
          </div>
        )} */}
      </div>
      {showCart ? (
        <ShoppingCart
          userCart={cartItems}
          toggle={() => setShowCart(!showCart)}
          cartData={cartData}
          totalValue={totalValue}
          removeItem={removeItem}
        />
      ) : null}
    </div>
  );
};

export default Navbar;
