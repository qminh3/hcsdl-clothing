import { assets } from "../assets/assets";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const Add = ({ token }) => {
  // const [image1, setImage1] = useState(false);
  // const [image2, setImage2] = useState(false);
  // const [image3, setImage3] = useState(false);
  // const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("Men");
  // const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  // const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: name,
        price: price,
        description: description,
        sizes: sizes,
        colors: colors  // Nếu sizes là một mảng, nó sẽ được tự động chuyển thành JSON hợp lệ
        // Nếu có hình ảnh, bạn có thể thêm các trường như sau:
        // image1: image1,
        // image2: image2,
        // image3: image3,
        // image4: image4,
      };
      const response = await axios.post(
        backendUrl + "/products",
        productData,
        { headers: { token } }
      );
      // console.log(response.data);
      if (response.status === 201) {
        toast.success(response.data);
        setName("");
        setDescription("");
        // setImage1(false);
        // setImage2(false);
        // setImage3(false);
        // setImage4(false);
        setPrice("");
        setSizes([]);
        setColors([]);
        // setCategory("Men");

        // setSubCategory("Topwear");
        // setBestseller(false);
      } else {
        toast.error("Failed to create product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error connecting to server");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <b className="mb-2 text-gray-900 text-2xl">Thêm sản phẩm</b>
      {/* <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 cursor-pointer  "
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20 cursor-pointer"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20 cursor-pointer"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20 cursor-pointer "
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div> */}

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Enter product name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Description"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        {/* <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 "
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kid">Kid</option>
          </select>
        </div>
        <div>
          <p className="mb-2">SubCategory category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 "
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div> */}
        <div>
          <p className="mb-2">Product price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[200px] "
            type="number"
            placeholder="Enter product price"
            required
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={` ${
                sizes.includes("S")
                  ? "bg-blue-500 rounded-lg text-white"
                  : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={` ${
                sizes.includes("M")
                  ? "bg-blue-500 rounded-lg text-white"
                  : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={` ${
                sizes.includes("L")
                  ? "bg-blue-500 rounded-lg text-white"
                  : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={` ${
                sizes.includes("XL")
                  ? "bg-blue-500 rounded-lg text-white"
                  : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={` ${
                colors.includes("XXL")
                  ? "bg-blue-500 rounded-lg text-white"
                  : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-2">Product Colors</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setColors((prev) =>
                prev.includes("Red")
                  ? prev.filter((item) => item !== "Red")
                  : [...prev, "Red"]
              )
            }
          >
            <p
              className={` ${
                colors.includes("Red")
                  ? "bg-blue-500 rounded-lg text-white"
                  : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Red
            </p>
          </div>
          <div
            onClick={() =>
              setColors((prev) =>
                prev.includes("Green")
                  ? prev.filter((item) => item !== "Green")
                  : [...prev, "Green"]
              )
            }
          >
            <p
              className={` ${
                colors.includes("Green")
                  ? "bg-blue-500 rounded-lg text-white"
                  : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Green
            </p>
          </div>

          <div
            onClick={() =>
              setColors((prev) =>
                prev.includes("Blue")
                  ? prev.filter((item) => item !== "Blue")
                  : [...prev, "Blue"]
              )
            }
          >
            <p
              className={` ${
                colors.includes("Blue")
                  ? "bg-blue-500 rounded-lg text-white"
                  : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Blue
            </p>
          </div>

          <div
            onClick={() =>
              setColors((prev) =>
                prev.includes("Yellow")
                  ? prev.filter((item) => item !== "Yellow")
                  : [...prev, "Yellow"]
              )
            }
          >
            <p
              className={` ${
                colors.includes("Yellow")
                  ? "bg-blue-500 rounded-lg text-white"
                  : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Yellow
            </p>
          </div>

          <div
            onClick={() =>
              setColors((prev) =>
                prev.includes("Black")
                  ? prev.filter((item) => item !== "Black")
                  : [...prev, "Black"]
              )
            }
          >
            <p
              className={` ${
                colors.includes("Black")
                  ? "bg-blue-500 rounded-lg text-white"
                  : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Black
            </p>
          </div>

          <div
            onClick={() =>
              setColors((prev) =>
                prev.includes("White")
                  ? prev.filter((item) => item !== "White")
                  : [...prev, "White"]
              )
            }
          >
            <p
              className={` ${
                colors.includes("White")
                  ? "bg-blue-500 rounded-lg text-white"
                  : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              White
            </p>
          </div>

          <div
            onClick={() =>
              setColors((prev) =>
                prev.includes("Brown")
                  ? prev.filter((item) => item !== "Brown")
                  : [...prev, "Brown"]
              )
            }
          >
            <p
              className={` ${
                colors.includes("Brown")
                  ? "bg-blue-500 rounded-lg text-Brown"
                  : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Brown
            </p>
          </div>
        </div>
      </div>

      {/* <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          className="peer h-5 w-5 cursor-pointer transition-all appearance rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div> */}

      <button
        type="submit"
        className="w-28 py-3 bg-red-500 text-white rounded-lg"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
