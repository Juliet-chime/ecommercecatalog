import React, { useEffect, useMemo } from "react";
import { BiCartDownload } from "react-icons/bi";
import CustomButton from "./fields/CustomButton";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ShoppingCart from "./ShoppingCart";
import logo from "../assets/images/logo/logo2.png";
import { makeApiRequest } from "../services/baseApi";
import { products } from "../services/api";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {
    showCart,
    setShowCart,
    allProduct,
    cartItems,
    setCartItems,
    setAllProduct,
  } = useAppContext();

  const cartData = useMemo(() => {
    return cartItems.map((data) => {
      const product = allProduct.find((products) => {
        return products?.id === (data?.products || [])[0]?.productId;
      });
      return { ...product, quantity: (data.products || [])[0].quantity };
    });
  }, [allProduct, cartItems]);

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

  useEffect(() => {
    const storedCart = localStorage.getItem("userCart");
    setCartItems(storedCart !== null ? JSON.parse(storedCart) : []);
  }, []);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await makeApiRequest({
          url: products(),
        });
        setAllProduct(res);
      } catch (e) {}
    }
    getProduct();
  }, []);

  return (
    <div className="flex justify-between items-center py-8 relative">
      <div className="w-10 h-10">
        <img src={logo} className="w-full h-full object-contain" />
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
