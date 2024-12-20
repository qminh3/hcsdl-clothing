import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = "http://localhost:8080/clothing-store";

 
  const [token, setToken] = useState("");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);


  const [userInfo, setUserInfo] = useState(null);


  const [finalTotal, setFinalTotal] = useState(0);



  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    console.log(1);
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.productId === product.productId
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId)
    );
  };
  const clearCart = () => {
    setCart([]);
  };
  const getCartItemsCount = () => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  };

  useEffect(() => {}, [cartItems]);

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/products`);
      if (response.data) {
        setProducts(response.data);
      } else {
        console.log("Failed to fetch products.");
      }
    } catch (error) {
      console.error("Error fetching products: ", error.message);
    }
  };

  const getProductColors = async (productId) => {
    try {
      const response = await axios.get(
        `${backendUrl}/products/colors/${productId}`
      );
      if (response.data) {
        setColors(response.data);
      } else {
        console.log("Failed to fetch colors.");
      }
    } catch (error) {
      console.error("Error fetching colors: ", error.message);
    }
  };
  const getProductSizes = async (productId) => {
    try {
      const response = await axios.get(
        `${backendUrl}/products/sizes/${productId}`
      );
      if (response.data) {
        setSizes(response.data);
      } else {
        console.log("Failed to fetch sizes.");
      }
    } catch (error) {
      console.error("Error fetching sizes: ", error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      log.console(error);
      toast.error(error.message);
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    // Lặp qua các sản phẩm trong giỏ hàng (mảng)
    cart.forEach((item) => {
      totalAmount += item.price * item.quantity; // Tính tổng giá trị (giá x số lượng)
    });

    return totalAmount; // Trả về tổng giá trị
  };
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    search,
    currency,
    delivery_fee,
    showSearch,
    backendUrl,
    cartItems,
    token,
    userInfo, // Exposing user info to context
    setUserInfo, // Exposing function to update user info
    setCartItems,
    setSearch,
    setShowSearch,
    getTotalCartAmount,
    getCartItemsCount,

    navigate,
    setToken,
    sizes,
    colors,
    getProductSizes,
    getProductColors,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    finalTotal,
    setFinalTotal,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
