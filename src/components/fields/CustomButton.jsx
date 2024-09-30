import React from "react";

const CustomButton = ({
  children,
  text,
  icon: IconComponent,
  disabled,
  styleProps = {},
  iconProps,
  ...props
}) => {
  const {
    backgroundColor = "transparent",
    width = "h-full",
    height = "h-full",
    border = "none",
    color = "black",
    size = "sm",
    weight = "normal",
    padding = "3",
    margin = "0",
    radius,
  } = styleProps;

  const className = [
    "flex",
    "items-center",
    "justify-center",
    "cursor-pointer",
    `text-${size}`,
    `font-${weight}`,
    `text-${color}`,
    `bg-${backgroundColor} hover:bg-${backgroundColor}-200`,
    `${width}`,
    `${height}`,
    `   ${border}`,
    disabled ? "opacity-50" : "",
    `p-${padding}`,
    `m-${margin}`,
    radius ? `${radius}` : "",
  ].join(" ");

  return (
    <button className={className} disabled={disabled} {...props}>
      {children}
      {IconComponent && <IconComponent {...iconProps} />}
      {text}
    </button>
  );
};

export default CustomButton;
