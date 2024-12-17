import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import Img1 from "../assets/shirt/shirt.png";

const List = ({token}) => {
  const [list, setList] = useState([]);
  const [sizelist, setSizeList] = useState([]);
  const [colorlist, setColorList] = useState([]);

  const fetchList = async () => {

    try {
      const [productsResponse, colorResponse, sizeResponse] = await Promise.all([
         axios.get(backendUrl + '/products',{headers:{token}}),
         axios.get(backendUrl + '/products/colors',{headers:{token}}),
         axios.get(backendUrl + '/products/sizes',{headers:{token}})
      ]);
      if(productsResponse.status === 200) 
      {
        setList(productsResponse.data);
      } else {
        alert("Failed get products");
      }

      if(sizeResponse.status === 200) 
      {
        setSizeList(sizeResponse.data);
      } else {
        alert("Failed get sizes");
      }
      
      if(colorResponse.status === 200) 
      {
        setColorList(colorResponse.data);
      } else {
        alert("Failed get colors");
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
      const response = await axios.delete(backendUrl + '/products/' + id, {headers:{token}});
      if(response.status === 200) {
        toast.success("Xóa thành công");
        await fetchList();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }
  return (
    <>
      <b className="mb-2 text-gray-900 text-2xl">Tất cả sản phẩm</b>
      <div className="flex flex-col gap-2 ">
        
        <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center  py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Color</b>
          <b>Size</b>
          <b>Price</b>
          <b>Description</b>
          <b className="text-center">Action</b>

        </div>
        {
          list.map((item, index) => {
             // Tìm màu sắc và kích thước tương ứng với productId của sản phẩm hiện tại
            const productColors = colorlist.filter((color) => color.productId === item.productId);
            const productSizes = sizelist.filter((size) => size.productId === item.productId); 
            console.log(productColors);
            console.log(productSizes);
            return (  
              <div key={index} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 items-center  py-1 px-2 border bg-white text-sm">
                <img src={Img1} alt={item.name} className="w-12 h-10" />
                <p>{item.name}</p>
                <p>{productColors.map(color => color.color).join(', ')}</p>
                <p>{productSizes.map(size => size.size).join(', ')}</p>
                <p>{currency} {item.price}</p>
                <p>{item.description}</p>
                <p onClick={()=>handleDelete(item.productId) } className='md:text-center text-right cursor-pointer '>Delete</p>

                {/* <div className="md:text-center text-right cursor-auto text-lg">
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div> */}
              </div>
            );
          })
        }
      </div>
    </>
  );
};

export default List;
