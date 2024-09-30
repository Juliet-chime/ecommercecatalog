import React, { useState } from "react";

import Login from "./Login";
import SignUp from "./SignUp";

export const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div
        className={`w-full ${
          isLogin ? "md:w-[80%] lg:w-[80%] xl:w-[30%]" : "lg:w-[50%]"
        } py-5 px-8 bg-white rounded-lg shadow-sm`}
      >
        <p className="text-center font-bold">LOGO</p>
        {isLogin ? <Login /> : <SignUp />}
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
  );
};
