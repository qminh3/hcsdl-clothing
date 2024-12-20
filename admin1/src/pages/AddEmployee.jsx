import { assets } from "../assets/assets";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const AddEmployee = ({ token }) => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [salary, setSalary] = useState("");
  const [position, setPosition] = useState("");
  const [supervisor, setSup] = useState(null);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const employeeData = {
        firstName: fname,
        lastName: lname,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        salary: salary,
        position: position,
        supervisorID: supervisor, 
      };
      const response = await axios.post(
        backendUrl + "/employees",
        employeeData,
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
        setSalary("");
        setPosition("");
        setSup("");
      } else {
        toast.error("Failed to create employee");
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
      <b className="mb-2 text-gray-900 text-2xl">Thêm nhân viên</b>
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
      <div className="w-[300px]">
        <p className="mb-2">Salary</p>
        <input
          className="w-[200px] px-3 py-2"
          type="text"
          placeholder="Enter salary"
          onChange={(e) => setSalary(e.target.value)}
          value={salary}
          required
        />
      </div>
      <div className="w-[300px]">
        <p className="mb-2">Positon</p>
        <input
          className="w-[200px] px-3 py-2"
          type="text"
          placeholder="Enter position"
          onChange={(e) => setPosition(e.target.value)}
          value={position}
          required
        />
      </div>
      <div className="w-[300px]">
        <p className="mb-2">Supervisor</p>
        <input
          className="w-[200px] px-3 py-2"
          type="text"
          placeholder="Enter supervisor id"
          onChange={(e) => setSup(e.target.value)}
          value={supervisor || ""}
        />
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

export default AddEmployee;
