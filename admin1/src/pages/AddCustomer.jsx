import { assets } from "../assets/assets";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const AddCustomer = ({ token }) => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState([]);
  const [address, setAddress] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const addAddress = () => {
    if (newAddress.trim()) {
      setAddress([...address, newAddress]); // Thêm địa chỉ mới vào mảng
      setNewAddress(""); // Xóa nội dung trong input
    }
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const customerData = {
        firstName: fname,
        lastName: lname,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        registrationDate: date,
        addresses: address,
      };
      const response = await axios.post(
        backendUrl + "/customers",
        customerData,
        { headers: { token } }
      );
      // console.log(response.data);
      if (response.status === 201 || response.status === 200) {
        toast.success(response.data);
        setFName("");
        setLName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setDate([]);
        setAddress([]);
      } else {
        toast.error("Failed to create customer");
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
      <b className="mb-2 text-gray-900 text-2xl">Thêm khách hàng</b>
      <div className="w-[160px]">
        <p className="mb-2">First Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Enter first name"
          onChange={(e) => setFName(e.target.value)}
          value={fname}
          required
        />
      </div>
      <div className="w-[160px]">
        <p className="mb-2">Last Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Enter last name"
          onChange={(e) => setLName(e.target.value)}
          value={lname}
          required
        />
      </div>
      <div className="w-[500px]">
        <p className="mb-2">Email</p>
        <input
          className="w-[400px] px-3 py-2"
          type="text"
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>
      <div className="w-[300px]">
        <p className="mb-2">Phone Number</p>
        <input
          className="w-[200px] px-3 py-2"
          type="text"
          placeholder="Enter phone number"
          onChange={(e) => setPhone(e.target.value)}
          value={phoneNumber}
          required
        />
      </div>
      <div className="w-[300px]">
        <p className="mb-2">Password</p>
        <input
          className="w-[200px] px-3 py-2"
          type="text"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </div>
      <div>
        <p className="mb-2">Registration Date</p>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full max-w-[200px] px-3 py-2"
          placeholder="dd/mm/yy"
          required
        />
      </div>
      <div className="w-[300px]">
      <p className="mb-2">Address</p>
      <div className="flex items-center">
          <input
            className="w-[200px] px-3 py-2"
            type="text"
            placeholder="Enter address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <button
            className="ml-2 px-3 py-2 bg-blue-500 text-white hover:bg-blue-600"
            onClick={addAddress}
            type="button"
          >
            Add
          </button>
          </div>
          <ul className="mt-2">
            {address.map((addr, index) => (
              <li key={index}>{addr}</li>
            ))}
          </ul>
      </div>
      
      {/* <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
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
      </div> */}

       {/* Start Date
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
      </div> */}

      {/* End Date
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

export default AddCustomer;
