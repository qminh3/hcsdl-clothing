import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const ListEmployee = ({token}) => {
  const [list, setList] = useState([]);
    // Hàm chuyển đổi ngày sang định dạng dd/mm/yyyy
  // const formatDate = (dateStr) => {
  //   const date = new Date(dateStr);
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/employees',{headers:{token}});
      console.log(response.data);
      if(response.status === 200) 
      {
        setList(response.data);
      } else {
        alert("Failed get employees");
      }

    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  
  };
  useEffect(() => {
    fetchList();
  }, []);
  const handleDelete = async (id) =>{
    try {
      const response = await axios.delete(backendUrl + '/employees/' + id, {headers:{token}});
      if(response.status === 200) {
        toast.success(response.data);
        await fetchList();
      } else {
        alert("Failed to delete employees");
      }
    } catch (error) {
      console.error(error);
      toast.error("Nhân viên đang có đơn hàng cần xử lý");
    }
  }
  return (
    <>
      <b className="mb-2 text-gray-900 text-2xl">Tất cả nhân viên</b>
      <div className="flex flex-col gap-2 ">
        
        <div className="hidden md:grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] items-center  py-1 px-2 border bg-gray-100 text-sm">
          <b>ID</b>
          <b>First Name</b>
          <b>Last Name</b>
          <b>Salary</b>
          <b>Position</b>
          <b className="text-center">Action</b>

        </div>
        {
          list.map((item, index) => {
            // const formattedStartDate = formatDate(item.startDate);
            // const formattedEndDate = formatDate(item.endDate);
            return (  
              <div key={index} className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-2 items-center  py-1 px-2 border bg-white text-sm">
                <p>{item.id}</p>
                <p>{item.user.firstName}</p>
                <p>{item.user.lastName}</p>
                <p>{item.salary}</p>
                <p>{item.position}</p>
                {/* <p>{typeof item.supervisor === 'string' ? item.supervisor: '0'}</p> */}
                
                {/* <p>{item.name}</p>
                <p>{item.discount} {"%"} </p>
                <p>{formattedStartDate}</p>
                <p>{formattedEndDate}</p> */}
                <p onClick={()=>handleDelete(item.id) } className='md:text-center text-right cursor-pointer text-red-500 hover:bg-red-600 hover:text-white p-1 rounded'>Delete</p>

                {/* { <div className="md:text-center text-right cursor-auto text-lg">
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div> } */}
              </div>
            );
          })
        }
      </div>
    </>
  );
};

export default ListEmployee;
