import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { addCart, getSingleProduct } from "../../services/api";
import { makeApiRequest } from "../../services/baseApi";
import { formatData } from "../../utils/formatter";
import Rating from "../../components/rating";
import CustomButton from "../../components/fields/CustomButton";
import { FiMinus, FiPlus } from "react-icons/fi";
import QuantitySymbol from "../../components/QuantitySymbol";
import Loader from "../../components/CustomLoader";
import { TailSpin } from "react-loader-spinner";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { dateFormatter } from "../../utils/dateUtils";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { singleProduct, setSingleProduct, cartItems, setCartItems } =
    useAppContext();

  const defaultQuantity = cartItems?.find((data) => {
    return (data.products || [])[0]?.productId === Number(id);
  });

  const [quantity, setQuantity] = useState(
    defaultQuantity ? defaultQuantity?.products[0]?.quantity : 1
  );
  const [isAddingCart, setIsAddingToCart] = useState(false);

  const updateQuantity = (isAddition = true) => {
    if (isAddition) {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity === 1) {
        return;
      }
      setQuantity((prev) => prev - 1);
    }
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("userCart");
    setCartItems(storedCart !== null ? JSON.parse(storedCart) : []);
  }, []);

  useEffect(() => {
    async function getProduct() {
      setLoading(true);
      try {
        const res = await makeApiRequest({
          url: getSingleProduct(id),
        });
        setSingleProduct(res);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, []);

  const onAddToCart = async () => {
    if (!!token) {
      const data = {
        userId: 2,
        date: dateFormatter.datestringformat(),
        products: [{ productId: singleProduct.id, quantity }],
      };

      try {
        setIsAddingToCart(true);
        await makeApiRequest({
          url: addCart(),
          method: "POST",
          data,
        });

        let updatedCart = [...cartItems];
        if (updatedCart.length) {
          const existingItemIndex = updatedCart.findIndex((data) =>
            (data.products || []).find(
              (product) => product.productId === singleProduct.id
            )
          );

          if (existingItemIndex !== -1) {
            updatedCart[existingItemIndex].products.find(
              (product) => product.productId === singleProduct.id
            ).quantity = quantity;
          } else {
            updatedCart.push(data);
          }
        } else {
          updatedCart.push(data);
        }
        localStorage.setItem("userCart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      } catch (e) {
        console.log(e);
      } finally {
        setIsAddingToCart(false);
      }
    } else {
      navigate("/authentication");
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[100vh]">
          <Loader component={TailSpin} color="#bbbbbb" />
        </div>
      ) : (
        <>
          <div>
            <CustomButton
              text="Go back"
              icon={MdKeyboardArrowLeft}
              styleProps={{
                backgroundColor: "",
                radius: "rounded-xl",
                width: "w-[100px]",
                weight: "bold",
              }}
              onClick={() => navigate("/")}
            />
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="h-full w-full md:w-[80%] bg-white flex items-center justify-center">
              <img
                src={singleProduct?.image}
                alt={singleProduct?.title}
                className="w-full h-[500px] object-contain mix-blend-multiply"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div>
                <p className="font-extrabold text-[48px]">
                  {" "}
                  {formatData.currencyAmount(singleProduct?.price, "USD")}
                </p>
                <p className="font-bold text-[16px]">{singleProduct?.title}</p>
                <p className="font-medium text-[13px]">
                  {singleProduct?.description}
                </p>
                <p className="font-bold text-[14px] my-2">
                  Category:{" "}
                  <span className="font-medium">
                    {formatData.capitalize(singleProduct?.category)}
                  </span>
                </p>
                <Rating initialRating={singleProduct?.rating?.rate} />
                <div
                  className={`grid ${
                    !!token ? "grid-cols-2" : "grid-cols-1"
                  }  gap-4 w-full lg:w-[80%] xl:w-[60%] place-content-center m-auto mt-8`}
                >
                  <div>
                    <CustomButton
                      text={
                        !isAddingCart ? (
                          "Add to Cart"
                        ) : (
                          <Loader
                            component={TailSpin}
                            width={25}
                            height={25}
                            color="white"
                          />
                        )
                      }
                      styleProps={{
                        backgroundColor: "red-500",
                        radius: "rounded-xl",
                        height: "h-12",
                        width: "w-full",
                        color: "white",
                        weight: "bold",
                      }}
                      onClick={onAddToCart}
                    />
                  </div>
                  {!!token ? (
                    <div className="flex flex-col items-center">
                      <p className="font-extrabold text-[14px] mb-1">
                        Quantity
                      </p>
                      <div className="flex items-center gap-4">
                        <QuantitySymbol
                          icon={FiMinus}
                          onUpdateQuantity={() => updateQuantity(false)}
                        />
                        <div>
                          <p className="font-medium text-[14px]">{quantity}</p>
                        </div>
                        <QuantitySymbol
                          icon={FiPlus}
                          onUpdateQuantity={() => updateQuantity()}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
