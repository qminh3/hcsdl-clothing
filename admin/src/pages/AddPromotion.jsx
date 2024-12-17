import { assets } from "../assets/assets";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const AddPromotion = ({ token }) => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const promotionData = {
        name: name,
        discount: discount,
        startDate: startDate,
        endDate: endDate 
      };
      const response = await axios.post(
        backendUrl + "/promotions",
        promotionData,
        { headers: { token } }
      );
      // console.log(response.data);
      if (response.status === 201) {
        toast.success(response.data);
        setName("");
        setDiscount("");
        setStartDate("");
        setEndDate([]);
      } else {
        toast.error("Failed to create promotion");
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
      <b className="mb-2 text-gray-900 text-2xl">Thêm khuyến mãi</b>
      <div className="w-full">
        <p className="mb-2">Promotion Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Enter product name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Promotion discount</p>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            className="w-full px-3 py-2 sm:w-[200px] "
            type="number"
            placeholder="Enter promtion discount"
            required
          />
        </div>
      </div>

       {/* Start Date */}
       <div>
        <p className="mb-2">Start Date</p>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full max-w-[200px] px-3 py-2"
          placeholder="dd/mm/yy"
          required
        />
      </div>

      {/* End Date */}
      <div>
        <p className="mb-2">End Date</p>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full max-w-[200px] px-3 py-2"
          placeholder="dd/mm/yy"
          required
        />
      </div>

      <button
        type="submit"
        className="w-28 py-3 bg-red-500 text-white rounded-lg"
      >
        ADD
      </button>
    </form>
  );
};

export default AddPromotion;
