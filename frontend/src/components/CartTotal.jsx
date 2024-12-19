import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import selectedPromotions from "../pages/Cart.jsx";
const CartTotal = () => {
  const { currency, finalTotal } = useContext(ShopContext);
  
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"ORDER"} text2={"TOTALS"}></Title>
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <hr/>
        <hr/>
        <div className="flex justify-between">
          <p>Tổng</p>
          <p>{currency}{finalTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
