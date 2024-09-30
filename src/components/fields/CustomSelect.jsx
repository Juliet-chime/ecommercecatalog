import React from "react";

const CustomSelect = ({
  label,
  labelStyle,
  fieldStyleProps = {},
  disabled,
  children,
  ...props
}) => {
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
        <div>
          <select className={className} disabled={disabled} {...props}>
            {children}
          </select>
        </div>
      </div>
    </>
  );
};

export default CustomSelect;
