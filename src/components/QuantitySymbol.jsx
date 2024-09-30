import React from "react";

const QuantitySymbol = ({
  icon: IconComponent,
  onUpdateQuantity,
  ...props
}) => {
  return (
    <div
      className="w-6 h-6 bg-[#cccccc] rounded-full flex items-center justify-center cursor-pointer"
      onClick={onUpdateQuantity}
    >
      <p>
        <IconComponent {...props} />
      </p>
    </div>
  );
};

export default QuantitySymbol;
