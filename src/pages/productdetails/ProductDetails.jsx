import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { getSingleProduct } from "../../services/api";
import { makeApiRequest } from "../../services/baseApi";
import { formatData } from "../../utils/formatter";
import Rating from "../../components/rating";
import CustomButton from "../../components/fields/CustomButton";
import { FiMinus, FiPlus } from "react-icons/fi";
import QuantitySymbol from "../../components/QuantitySymbol";
import Loader from "../../components/CustomLoader";
import { TailSpin } from "react-loader-spinner";
import { MdKeyboardArrowLeft } from "react-icons/md";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { singleProduct, setSingleProduct,user } = useAppContext();

  const [loading, setLoading] = useState(false);

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

  const onAddToCart = () => {
if(!!user) {

}else{
    navigate('/authentication')
}
  }

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
            icon={MdKeyboardArrowLeft }
            styleProps={{
              backgroundColor: "",
              radius: "rounded-xl",
              width:'w-[100px]',
              weight:'bold'
            }}
            onClick={()=>navigate('/')}
          />
        </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="h-full bg-white">
              <img
                src={singleProduct?.image}
                alt={singleProduct?.title}
                className="h-[600px] object-contain"
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
                Category:  <span className="font-medium">{formatData.capitalize(singleProduct?.category)}</span>
                </p>
                <Rating initialRating={singleProduct?.rating?.rate} />
                <div className={`grid ${!!user?'grid-cols-2':'grid-cols-1'}  gap-4 w-full md:w-[60%] place-content-center m-auto mt-8`}>
                  <div>
                    <CustomButton
                      text="Add to Cart"
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
                  {!!user ? <div className="flex flex-col items-center">
                    <p className="font-extrabold text-[14px] mb-1">Quantity</p>
                    <div className="flex items-center gap-4">
                      <QuantitySymbol
                        icon={FiMinus}
                        onUpdateQuantity={() => {}}
                      />
                      <div>
                        <p className="font-medium text-[14px]">1</p>
                      </div>
                      <QuantitySymbol
                        icon={FiPlus}
                        onUpdateQuantity={() => {}}
                      />
                    </div>
                  </div>:null}
             
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
