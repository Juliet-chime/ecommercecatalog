import React from "react";

// background: ${(props) => props.bg || 'transparent'};
// width: ${(props) => props.width};
// border: ${(props) => props.border || 'none'};
// display: flex;
// justify-content: center;
// align-items: center;
// text-transform: ${(props) => props.upperCase && 'Uppercase'};
// color: ${(props) => props.color};
// font-size: ${(props) => props.fontSize};
// font-weight: ${(props) => props.fontWeight};
// height: ${(props) => props.height};
// opacity: ${(props) => props.disabled && '0.5'};
// outline: none;
// border-radius: 3px;
// margin: ${(props) => props.margin};
// padding: ${(props) => props.padding};
// @media (max-width: 1024px) {
//   width: ${(props) => props.responsiveWidth};
// }

// const CustomButton = ({ children, ...props }) => {
//   const {
//     text,
//     icon,
//     disabled,
//     bg,
//     width,
//     height,
//     border,
//     color,
//     size,
//     weight,
//     padding,
//     margin,
//     radius,
//     iconProps,
//   } = props;
//   const IconComponent = icon;
//   return (
//     <button
//       className={`flex items-center justify-center ${size || "text-sm"} ${
//         weight || "font-normal"
//       } ${color || "text-black"} ${bg || "bg-transparent"} ${
//         width || "w-full"
//       } ${height || "h-full"} ${border || "border-none"}  ${
//         disabled ? "opacity-5" : "opacity-0"
//       } ${padding || "p-3"} ${margin || "m-0"}`}
//       {...props}
//     >
//       {children}
//       {!!icon && <IconComponent {...iconProps} />}
//       {!!text && text}
//     </button>
//   );
// };

const CustomButton = ({
  children,
  text,
  icon: IconComponent,
  disabled,
  styleProps={},
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
    // iconProps,
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
    // `border-${borderColor}`,
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
