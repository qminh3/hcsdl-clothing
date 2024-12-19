import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { backendUrl} from "../App";
import axios from "axios";

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
    cart, removeFromCart, clearCart,
    setFinalTotal
  } = useContext(ShopContext);

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
  };
  
  const [selectedPromotions, setSelectedPromotions] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [showPromotions, setShowPromotions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPromotions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8080/clothing-store/promotions");
      setPromotions(response.data);
    } catch (error) {
      setError('Failed to load promotions');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePromotionSelect = (promo) => {
    if (selectedPromotions.some(p => p.promotionId === promo.promotionId)) {
      setSelectedPromotions(selectedPromotions.filter(p => p.promotionId !== promo.promotionId));
    } else {
      setSelectedPromotions([...selectedPromotions, promo]);
    }
  };

  const calculateTotal = () => {
    const originalTotal = cart.reduce((total, item) => total + item.quantity * item.price, 0);
    

    const totalDiscount = selectedPromotions.reduce((acc, promo) => {
      return acc + (promo.discount / 100);
    }, 0);
  
   
    const effectiveDiscount = Math.min(totalDiscount, 1);
    
    return (originalTotal * (1 - effectiveDiscount)).toFixed(2);
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  useEffect(() => {
    const total = calculateTotal();
    setFinalTotal(total);
  }, [cart, selectedPromotions]);

  if (cart.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
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
              onClick={() => setShowPromotions(!showPromotions)}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              {showPromotions ? 'Ẩn khuyến mãi' : 'Xem khuyến mãi'}
            </button>

            {showPromotions && (
              <div className="mt-4 bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold mb-4">Danh sách khuyến mãi</h3>
                {isLoading ? (
                  <p className="text-center py-4">Đang tải khuyến mãi...</p>
                ) : error ? (
                  <p className="text-red-500 text-center py-4">{error}</p>
                ) : promotions.length > 0 ? (
                  <div className="space-y-3">
                    {promotions.map((promo) => (
                      <div key={promo.promotionId} className="border-b pb-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <p><span className="font-medium">ID:</span> {promo.promotionId}</p>
                          <p><span className="font-medium">Tên:</span> {promo.name}</p>
                          <p><span className="font-medium">Giảm giá:</span> {promo.discount}%</p>
                          <p><span className="font-medium">Bắt đầu:</span> {formatDate(promo.startDate)}</p>
                          <p><span className="font-medium">Kết thúc:</span> {formatDate(promo.endDate)}</p>
                          <button 
                            onClick={() => handlePromotionSelect(promo)}
                            className={`flex items-center gap-2 text-white px-3 py-1 rounded-lg ${
                              selectedPromotions.some(p => p.promotionId === promo.promotionId)
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                          >
                            {selectedPromotions.some(p => p.promotionId === promo.promotionId)
                              ? 'Đã chọn'
                              : 'Áp dụng'}
                          </button>
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
              <p>{currency} {calculateTotal()}</p>
            </div>
            {selectedPromotions.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium">Khuyến mãi đã áp dụng:</p>
                {selectedPromotions.map(promo => (
                  <div key={promo.promotionId} className="flex justify-between text-sm text-green-600">
                    <p>{promo.name} (-{promo.discount}%)</p>
                    <button 
                      onClick={() => handlePromotionSelect(promo)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Hủy
                    </button>
                  </div>
                ))}
                <div className="text-sm text-gray-500 mt-1">
                  Tổng giảm giá: {selectedPromotions.reduce((acc, promo) => acc + promo.discount, 0)}%
                </div>
              </div>
            )}
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
