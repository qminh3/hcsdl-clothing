import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

import ProductItem from "../components/ProductItem";
import image1 from "../assets/shirt/shirt3.png";

const Collection = () => {
  const { products, colors, sizes, getProductDetails } =
    useContext(ShopContext);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-9 pt-10 border-t mb-10">
      {/* san pham */}
      <div className="flex-1 ">
        <div className="flex justify-between text-base sm:text-2xl mb-5">
          {/* <Title text1={"ALL"} text2={"COLLECTION"} /> */}

          <p className="text-2xl font-bold text-black ">ALL COLLECTION </p>
          {/* SAP XEP DANH SACH */}
          <select
            name=""
            id=""
            className="border-2 border-gray-400 text-sm px-2 text-color"
          >
            <option value="relavent">Liên quan</option>
            <option value="low-hight">Thấp đến cao</option>
            <option value="hight-low">Cao đến thấp</option>
          </select>
        </div>

        {/* product list */}
        <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6  gap-4 flex flex-wrap  ">
          {products.map((product) => {
            return (
              <ProductItem
                id={product.productId}
                name={product.name}
                price={product.price}
                image={image1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
