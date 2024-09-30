import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const CustomInputField = ({
  label,
  labelStyle,
  type,
  fieldStyleProps = {},
  disabled,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const {
    backgroundColor = "bg-transparent",
    width = "w-full",
    height = "h-[50px]",
    border = "none",
    color = "text-black",
    size = "text-sm",
    weight = "font-normal",
    radius = "rounded-lg",
  } = fieldStyleProps;

  const className = [
    `${size}`,
    `${weight}`,
    `${color}`,
    `${backgroundColor}`,
    `${width}`,
    `${height}`,
    `${border}`,
    disabled ? "opacity-5" : "opacity-1",
    `p-3`,
    `outline-0`,
    `${radius}`,
  ].join(" ");
  return (
    <>
      <div className="flex flex-col">
        {!!label && <label className={labelStyle}>{label}</label>}
        <div className="relative">
          <input
            className={className}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            disabled={disabled}
            {...props}
          />
          {type === "password" && (
            <div
              className="absolute right-[10px] top-[16px] cursor-pointer"
              onClick={onShowPassword}
            >
              {showPassword ? (
                <AiFillEyeInvisible fontSize={18} />
              ) : (
                <AiFillEye fontSize={18} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomInputField;
