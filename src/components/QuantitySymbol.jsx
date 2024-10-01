import React from "react";
import CustomButton from "./fields/CustomButton";

const QuantitySymbol = ({ icon, onUpdateQuantity, disabledBtn }) => {
  return (
    <div>
      <CustomButton
        styleProps={{
          backgroundColor: "[#cccccc]",
          radius: "rounded-full",
          height: "h-8",
          width: "w-8",
        }}
        icon={icon}
        onClick={onUpdateQuantity}
        disabled={disabledBtn}
      />
    </div>
  );
};

export default QuantitySymbol;
