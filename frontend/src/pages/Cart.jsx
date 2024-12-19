import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import axios from "axios";

// Add API base URL configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

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
    cart, 
    removeFromCart, 
    clearCart
  } = useContext(ShopContext);

  const [promotions, setPromotions] = useState([]);
  const [showPromotions, setShowPromotions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPromotions = async (retryCount = 0) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching promotions...'); // Debug log
      
      const response = await axios.get(`${API_BASE_URL}/promotions`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 5000 // 5 second timeout
      });

      console.log('Response:', response); // Debug log

      if (response.status === 200 && response.data) {
        setPromotions(response.data);
      } else {
        throw new Error('Invalid response format');
      }
      
    } catch (error) {
      console.error('Error details:', error);
      
      // Implement retry logic (max 3 attempts)
      if (retryCount < 3) {
        console.log(`Retrying... Attempt ${retryCount + 1}`);
        setTimeout(() => fetchPromotions(retryCount + 1), 1000);
        return;
      }

      setError(error.response?.data?.message || 'Failed to fetch promotions');
    } finally {
      setIsLoading(false);
    }
  };

  // Load promotions when component mounts
  useEffect(() => {
    if (showPromotions) {
      fetchPromotions();
    }
  }, [showPromotions]);

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
          <div className="mt-4">
            <button
              onClick={() => {
                setShowPromotions(!showPromotions);
                if (!promotions.length) {
                  fetchPromotions();
                }
              }}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Xem khuyến mãi
            </button>

            {showPromotions && (
              <div className="mt-4 bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold mb-4">Danh sách khuyến mãi</h3>
                {promotions.length > 0 ? (
                  <div className="space-y-3">
                    {promotions.map((promo) => (
                      <div key={promo.promotion_id} className="border-b pb-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <p><span className="font-medium">ID:</span> {promo.promotion_id}</p>
                          <p><span className="font-medium">Tên:</span> {promo.name}</p>
                          <p><span className="font-medium">Giảm giá:</span> {promo.discount}%</p>
                          <p><span className="font-medium">Bắt đầu:</span> {new Date(promo.start_date).toLocaleDateString('vi-VN')}</p>
                          <p><span className="font-medium">Kết thúc:</span> {new Date(promo.end_date).toLocaleDateString('vi-VN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Không có khuyến mãi</p>
                )}
              </div>
            )}
          </div>
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
