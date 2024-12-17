import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartPlus,
  faBagShopping,
  faBars,
  faCircleChevronDown,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import BackToProduct from "../components/BackToProductButton";
import Reviews from "../components/Reviews";
import image1 from "../assets/shirt/shirt3.png";

const Product = () => {

  const { productId } = useParams(); // Lấy productId từ URL
  const {
    products,
    getProductSizes,
    getProductColors,
    sizes,
    colors,
    currency,
  } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  //2 mode giao hàng và liên lạc
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  //đánh giá sản phẩm
  const [isShowReview, setIsShowReview] = useState(false);
  const { cart,addToCart } = useContext(ShopContext);
  




  const fetchProductData = async () => {
    products.map((item) => {
      if (item.productId === productId) {
        setProductData(item);
        console.log(item);
        return null;
      }
    });
  };

  // gọi API product
  useEffect(() => {
    fetchProductData();
    getProductSizes(productId); // Lấy kích thước của sản phẩm
    getProductColors(productId); // Lấy màu sắc của sản phẩm
  }, [productId]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };
  const handleAddToCart = () => {
    console.log('Add to cart')
    
      addToCart(productData);
  };

  // Check if product data is available before rendering it
  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product data */}
      <BackToProduct />
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* hiển thị ảnh */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            <img
              src={image1}
              className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
            />
            <img
              src={image1}
              className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
            />
            <img
              src={image1}
              className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
            />
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image1} alt="" />
          </div>
        </div>
        {/* Product detail */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-black/80 dark:text-light">
            {productData?.name}
          </h1>

          {/* Sao đánh giá */}
          <div className="flex items-center gap-1 mt-2">
            <svg
              className="w-4 h-4 text-yellow-300 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-300 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-300 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-300 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
            <a
              href="#"
              className="text-sm font-medium text-gray-900 underline hover:no-underline text-secondary"
            >
              73 reviews
            </a>
          </div>
          <p className="mt-5 text-3xl font-medium text-black">
            {currency}
            {productData?.price}
          </p>
          <div className="flex flex-col gap-4 my-8 ">
            <p>Kích cỡ:</p>
            <div className="flex gap-2">
              {sizes.map((size, index) => (
                <button
                  key={index}
                  className={`w-12 h-6 bg-gray-500 text-white rounded-full hover:bg-gray-400 transition-all duration-300 ${
                    size.selected ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 my-8 border border-gray-200 rounded-lg p-6">
            <h2 className="font-semibold text-lg">Màu hiện có</h2>
            <div className="flex flex-wrap gap-3">
              {colors.length > 0 ? (
                colors.map((color, index) => (
                  <button
                    key={index}
                    className={`
            px-4 py-2 
            border border-gray-200 
            rounded-lg
            hover:border-gray-400
            active:bg-gray-100
            transition-all
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500
          `}
                    onClick={() => handleColorSelect(color)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color.color }}
                      />
                      <span>{color.color}</span>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-gray-500 italic">No colors available.</p>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-gray-900 text-white px-8 py-3 hover:bg-secondary rounded-xl"
          >
            Thêm vào giỏ
          </button>

          {/* show 1 */}
          <div>
            <div>
              <div className="border-t border-b py-4 mt-7 border-gray-200">
                <div
                  onClick={() => setShow(!show)}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <p className="text-base leading-4 text-secondary">
                    Giao hàng và đổi hàng
                  </p>
                  <button
                    className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                    aria-label="show or hide"
                  >
                    <svg
                      className={
                        "transform " + (show ? "rotate-180" : "rotate-0")
                      }
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 1L5 5L1 1"
                        stroke="#4B5563"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className={
                    "pt-4 text-base leading-normal pr-12 mt-4 text-black " +
                    (show ? "block" : "hidden")
                  }
                  id="sect"
                >
                  Đổi hàng miễn phí Trong 30 ngày kể từ ngày mua.
                </div>
              </div>
            </div>
          </div>
          {/* show2 */}
          <div>
            <div className="border-b py-4 border-gray-200">
              <div
                onClick={() => setShow2(!show2)}
                className="flex justify-between items-center cursor-pointer"
              >
                <p className="text-base leading-4 text-secondary">
                  Liên lạc với chúng tôi
                </p>
                <button
                  className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                  aria-label="show or hide"
                >
                  <svg
                    className={
                      "transform " + (show2 ? "rotate-180" : "rotate-0")
                    }
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 1L5 5L1 1"
                      stroke="#4B5563"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={
                  "pt-4 text-base leading-normal pr-12 mt-4 text-black " +
                  (show2 ? "block" : "hidden")
                }
                id="sect"
              >
                Nếu bạn có bất kỳ câu hỏi nào về cách trả lại sản phẩm cho chúng
                tôi, hãy liên hệ với chúng tôi.
              </div>
            </div>
          </div>
          {/* đánh giá khách hàng */}
          <div className="mt-20 max-w-4xl">
            <ul className="flex border-b">
              <li
                onClick={() => setIsShowReview(false)}
                className={
                  !isShowReview
                    ? "cursor-pointer border-b-2 border-secondary bg-gray-100 px-8 py-3 text-sm text-gray-800 transition-all"
                    : "cursor-pointer px-8 py-3 text-sm text-gray-500 transition-all hover:bg-gray-100"
                }
              >
                Mô tả
              </li>
              <li
                onClick={() => setIsShowReview(true)}
                className={
                  isShowReview
                    ? "cursor-pointer border-b-2 border-secondary bg-gray-100 px-8 py-3 text-sm text-gray-800 transition-all"
                    : "cursor-pointer px-8 py-3 text-sm text-gray-500 transition-all hover:bg-gray-100"
                }
              >
                Reviews
              </li>
            </ul>
            {isShowReview && <Reviews />}
            {!isShowReview && (
              <>
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800">
                    Mô tả sản phẩm
                  </h3>
                  <p className="mt-4 text-sm text-gray-500">
                    {productData?.description}
                  </p>
                </div>
                
                <ul className="mt-6 list-disc space-y-3 pl-4 text-sm text-gray-500">
                  <li>Tên sản phẩm: {productData?.name} </li>
                  <li>
                    Giá: {productData?.price} {currency}
                  </li>
                  <li>Số lượng màu: 2</li>
                  <img
                    src={image1} // Lấy ảnh đầu tiên trong mảng
                    key={0} // Chỉ cần key là 0 vì chỉ có 1 ảnh
                    alt="Product"
                    className="rounded-md object-cover object-top"
                  />
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
