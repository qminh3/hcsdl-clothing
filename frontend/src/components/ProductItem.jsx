import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

const ProductItem = ({ id, image, price, name }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer ">
      <div className="  md:bg-white shadow-md rounded-xl duration-500 hover:scale-110 transition ease-in-out hover:shadow-xl">
        {/* Hiển thị ảnh sản phẩm */}
        <img
          onClick={window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          })}
          className="h-[220px] w-[180px] object-cover object-cover mx-auto  "
          src={image}
          alt="Ten san pham"
        />
        {/* Thông tin sản phẩm */}
        <div className="px-4 py-3 w-72">
          <p className="text-lg font-bold text-black truncate block capitalize">
            {name}
          </p>
          <div className="flex items-center">
            {/* Hiển thị đánh giá sao */}
            <FaStar className="text-yellow-500" />
            <span className="ml-1">4.5</span>
            {/* Giá sản phẩm */}
            </div>
            <p className="text-lg font-semibold text-secondary cursor-auto my-3">
              {" "}
              {currency}
              {" "}
              {price}
            </p>
           
        </div>
      </div>

      
    </Link>
  );
};

export default ProductItem;
