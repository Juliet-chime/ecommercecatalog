import React, { useState } from "react";

import Login from "./Login";
import SignUp from "./SignUp";
import { toast, ToastContainer } from "react-toastify";
import { signup } from "../../services/api";
import { makeApiRequest } from "../../services/baseApi";
import logo from "../../assets/images/logo/logo2.png";

export const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  const signupUser = async (values) => {
    const {
      email,
      username,
      password,
      firstname,
      lastname,
      city,
      street,
      number,
      zipcode,
      phone,
    } = values;
    try {
      const data = {
        email,
        username,
        password,
        name: {
          firstname,
          lastname,
        },
        address: {
          city,
          street,
          number,
          zipcode,
          geolocation: {
            lat: "",
            long: "",
          },
        },
        phone,
      };
      await makeApiRequest({
        method: "POST",
        url: signup(),
        data,
      });
      toast.success("successfully signed up, please log in", {});
      setIsLogin(!isLogin);
    } catch (e) {}
  };

  return (
    <>
      <ToastContainer />
      <div className="h-[100vh] flex items-center justify-center">
        <div
          className={`w-full ${
            isLogin ? "md:w-[80%] lg:w-[80%] xl:w-[30%]" : "lg:w-[50%]"
          } py-5 px-8 bg-white rounded-lg shadow-sm`}
        >
          <div className="flex items-center justify-center">
            <div className="w-8 h-8">
              <img src={logo} className="w-full h-full object-contain" />
            </div>
          </div>
          {isLogin ? <Login /> : <SignUp signupUser={signupUser} />}
          <div className="flex items-center justify-end mt-8">
            <p className="text-[12px] font-normal">
              {isLogin ? `  Don't have an account?` : `Already have an account`}
              <span
                className="text-red-500 cursor-pointer font-medium"
                onClick={() => setIsLogin(!isLogin)}
              >
                {" "}
                {isLogin ? "Sign up" : "Sign in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
