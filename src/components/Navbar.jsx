import React from "react";
import logo from "images/logo/cataloglogo.png";
import { BiCartDownload } from "react-icons/bi";
import CustomButton from "./fields/CustomButton";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useAppContext();
  return (
    <div className="flex justify-between items-center py-8">
      <div
      //   className="w-24 h-24"
      >
        <p> LOGO</p>
        {/* <img src={logo} className="w-full h-full object-contain" /> */}
      </div>
      <div className="flex gap-4 items-center">
        <div className="relative">
          <BiCartDownload fontSize={25} color={"black"} className="" />
          <div className="w-6 h-3 absolute -top-2 -right-1 rounded-md flex items-center justify-center bg-red-500">
            <span className="text-[10px] font-semibold text-white">1</span>
          </div>
        </div>

        {!!user ? null : (
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

        {!user ? null : (
          <div>
            <p className="font-bold text-[16px]"> Emeka 👋</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
