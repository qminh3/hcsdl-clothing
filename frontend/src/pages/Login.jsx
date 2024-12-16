import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [email, setEmail] = useState("");
  const { setUserInfo } = useContext(ShopContext);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Dùng để điều hướng sau khi đăng nhập thành công

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (currentState === "Login") {
      try {
        const response = await axios.post(
          "http://localhost:8080/clothing-store/users/login",
          { email, password }
        );

        // Kiểm tra thành công
        if (response.status === 200) {
          setUserInfo(response.data);
          alert("Đăng nhập thành công!");
          // Chuyển hướng hoặc xử lý khác sau khi đăng nhập thành công
          navigate("/"); // Ví dụ chuyển hướng đến trang chủ
          console.log("User logged in", response.data);
        }
      } catch (err) {
        setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        addresses,
      };
      try {
        const response = await axios.post(
          "http://localhost:8080/clothing-store/users",
          userData
        );

        // Kiểm tra thành công
        if (response.status === 201) {
          // Chuyển hướng hoặc xử lý khác sau khi đăng ký thành công
          navigate("/"); // Ví dụ chuyển hướng đến trang đăng nhập
          toast.success("Đăng ký thành công. Vui lòng đăng nhập.");
        }
      } catch (err) {
        toast.error("Đăng ký thất bại! Vui lòng thử lại.");
        console.error("Error registering user:", error);
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-100 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray"
        >
          <img className="w-8 h-8 mr-2" src="logo.svg" alt="" />
          G4 Shop
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {currentState}
            </h1>
            <form
              onSubmit={onSubmitHandler}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              {currentState === "Sign up" ? (
                <div>
                  <div>
                    <label
                      for="firstName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First name
                    </label>
                    <input
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      type="text"
                      id="firstName"
                      class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="firstName"
                      required=""
                    ></input>
                  </div>
                  <div>
                    <label
                      for="lastName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last name
                    </label>
                    <input
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      type="text"
                      id="lastName"
                      class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="lastName"
                      required=""
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="phoneNumber">Số Điện Thoại</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      value={phoneNumber}
                      class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="addresses">Địa Chỉ</label>
                    <textarea
                     class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="addresses"
                      value={addresses}
                      onChange={(e) => setAddresses(e.target.value.split(","))}
                      placeholder="Nhập địa chỉ, cách nhau bởi dấu phẩy"
                      required
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  required=""
                ></input>
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                ></input>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                {currentState === "Login" ? (
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                ) : (
                  ""
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {currentState === "Login" ? "Sign in " : "Sign up"}
              </button>
              {currentState === "Login" ? (
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    onClick={() => setCurrentState("Sign up")}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              ) : (
                <p
                  onClick={() => setCurrentState("Login")}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                >
                  Login here
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
