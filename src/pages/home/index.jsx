import React, { useEffect, useState } from "react";
import CustomInputField from "../../components/fields/CustomInputField";
import CustomSelect from "../../components/fields/CustomSelect";
import Singleproduct from "../../components/Singleproduct";
import { useAppContext } from "../../context/AppContext";
import { makeApiRequest } from "../../services/baseApi";
import Loader from "../../components/CustomLoader";
import { TailSpin } from "react-loader-spinner";
import {
  categories,
  getProductinspecificCategory,
  products,
} from "../../services/api";
import { formatData } from "../../utils/formatter";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const { allProduct, setAllProduct, allCategories, setAllCategories } =
    useAppContext();

  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const onChangeCategoryDropdown = async (e) => {
    const value = e.target.value;

    setLoading(true);
    try {
      const res = await makeApiRequest({
        url:
          value !== "all"
            ? getProductinspecificCategory(e.target.value)
            : products(),
      });
      setAllProduct(res);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getProduct() {
      setLoading(true);
      try {
        const res = await makeApiRequest({
          url: products(),
        });
        setAllProduct(res);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, []);

  useEffect(() => {
    async function getCategories() {
      setCategoriesLoading(true);
      try {
        const res = await makeApiRequest({
          url: categories(),
        });
        setAllCategories(res);
      } catch (e) {
      } finally {
        setCategoriesLoading(false);
      }
    }
    getCategories();
  }, []);

  const filteredProduct = !searchValue
    ? allProduct
    : allProduct.filter((val) =>
        Object.keys(val).some((k) =>
          String(val[k]).toLowerCase().includes(searchValue.toLowerCase())
        )
      );

  return (
    <div>
      <section className="py-20">
        <h1 className="text-5xl font-bold font-serif">Get Fabulous</h1>
        <p className="text-lg max-w-[600px]">
          Fashion is not just about clothes, it's about confidence, attitude,
          and embracing your unique style.
        </p>
      </section>

      <div className="w-full md:w-[70%] m-auto ">
        <h1 className="text-2xl font-bold font-serif">Browse Our Product</h1>
        <div className="grid grid-cols-2 gap-4 md:gap-32 py-4">
          <div className="">
            <CustomInputField
              type={"text"}
              placeholder="Filter by title, price, and category..."
              fieldStyleProps={{
                border: "border border-[#cccccc]",
              }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div>
            <CustomSelect
              fieldStyleProps={{
                border: "border border-[#cccccc]",
              }}
              onChange={onChangeCategoryDropdown}
            >
              <option defaultValue={""}>Select category</option>
              <option value={"all"}>All</option>
              {categoriesLoading
                ? "loading.."
                : allCategories.map((category, idx) => {
                    return (
                      <option value={category}>
                        {formatData.capitalize(category)}
                      </option>
                    );
                  })}
            </CustomSelect>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[20vh]">
            <Loader component={TailSpin} color="#bbbbbb" />
          </div>
        ) : (
          <>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 2xl:md:grid-cols-6 place-content-center gap-8">
              {filteredProduct?.map((data, idx) => {
                return (
                  <Singleproduct
                    key={idx}
                    data={data}
                    onViewProductDetails={() => {
                      navigate(`/product/${data.id}`);
                    }}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
