import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    navigate,
    products,
    currency,
    delivery_fee,
    showSearch,
    setSearch,
    setShowSearch,
    cartItems,
    
  
    cart, removeFromCart, clearCart
  } = useContext(ShopContext);

  
  if (cart.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    // <div>
    //   <h2>Your Cart</h2>
    //   <ul>
    //     {cart.map(item => (
    //       <li key={item.productId}>
    //         {item.name} - {item.quantity} x ${item.price}
    //         <button onClick={() => removeFromCart(item.productId)}>Remove</button>
    //       </li>
    //     ))}
    //   </ul>
    //   <button onClick={clearCart}>Clear Cart</button>
    //   <div>
    //     Total: ${cart.reduce((total, item) => total + item.quantity * item.price, 0)}
    //   </div>
    // </div>
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title
          text1={"Giỏ hàng"}
          text2={"của bạn"}
          className="text-2xl text-primary-10"
        />
      </div>

      <div>
        {cart.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] gap-4"
            >
              <div className="flex items-start gap-4">
                
                <div className="ml-4">
                  <p className="text-xs sm:text-lg font-medium">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-6 mt-3">
                    <p
                      className="text-black
                     text-xs sm:text-sm border-3"
                    > {currency} {" "}
                      {item.price}
                      
                    </p>
                   
                    <p className="text-gray-500 text-xs sm:text-sm">
                      x {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.productId)}>Remove</button>

              
            </div>
          );
        })}
      </div>
      <button onClick={clearCart}>Clear Cart</button>
      <div className="flex justify-end my-20 ">
        <div className="w-full sm:w-[450px]">
          <div className="text-2xl">
          <Title text1={"CART"} text2={"TOTALS"}></Title>
          </div>
          <div className="flex justify-between">
              <p>Tổng tiền</p>
              <p>{currency}{" "}{cart.reduce((total, item) => total + item.quantity * item.price, 0)}</p>
          </div>
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-[#fd5335] text-white mt-10 px-4 py-3 rounded-lg bg-gray-900"
            >
              Tiến hành thanh toán
            </button>
          </div>
          <div className=" mt-5 flex items-center justify-end gap-2">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {" "}
              hoặc{" "}
            </span>
            <a
              onClick={() => navigate("/collection")}
              href="#"
              title=""
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-600"
            >
              Tiếp tục mua hàng
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
