
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[20%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[18%] text-[15px]">
        <NavLink className='flex items-center border gap-3 border-gray-300 border-r-0 px-3 py-2 rounded-lg' to="/add ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p className="hidden md:block">Add Products</p>
        </NavLink>

        <NavLink className='flex items-center border gap-3 border-gray-300 border-r-0 px-3 py-2 rounded-lg' to="/list ">
          <svg className="h-8 w-8 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <polyline points="9 11 12 14 22 4" />  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
          <p className="hidden md:block">View Products</p>
        </NavLink>

        <NavLink className='flex items-center border gap-3 border-gray-300 border-r-0 px-3 py-2 rounded-lg' to="/add_promotion ">   
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="red" fill="none">
            <path d="M7.83152 21.3478L7.31312 20.6576C6.85764 20.0511 5.89044 20.1 5.50569 20.7488C4.96572 21.6595 3.5 21.2966 3.5 20.2523V3.74775C3.5 2.7034 4.96572 2.3405 5.50569 3.25115C5.89044 3.90003 6.85764 3.94888 7.31312 3.34244L7.83152 2.65222C8.48467 1.78259 9.84866 1.78259 10.5018 2.65222L10.5833 2.76076C11.2764 3.68348 12.7236 3.68348 13.4167 2.76076L13.4982 2.65222C14.1513 1.78259 15.5153 1.78259 16.1685 2.65222L16.6869 3.34244C17.1424 3.94888 18.1096 3.90003 18.4943 3.25115C19.0343 2.3405 20.5 2.7034 20.5 3.74774V20.2523C20.5 21.2966 19.0343 21.6595 18.4943 20.7488C18.1096 20.1 17.1424 20.0511 16.6869 20.6576L16.1685 21.3478C15.5153 22.2174 14.1513 22.2174 13.4982 21.3478L13.4167 21.2392C12.7236 20.3165 11.2764 20.3165 10.5833 21.2392L10.5018 21.3478C9.84866 22.2174 8.48467 22.2174 7.83152 21.3478Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
            <path d="M15 9L9 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 15H14.991M9.00897 9H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p className="hidden md:block">Add Promotions</p>
        </NavLink>

        <NavLink className='flex items-center border gap-3 border-gray-300 border-r-0 px-3 py-2 rounded-lg' to="/list_promotion ">
          <svg className="h-8 w-8 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <polyline points="9 11 12 14 22 4" />  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
          <p className="hidden md:block">View Promotions</p>
        </NavLink>

        <NavLink className='flex items-center border gap-3 border-gray-300 border-r-0 px-3 py-2 rounded-lg' to="/orders ">
          <svg className="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />  <rect x="9" y="3" width="6" height="4" rx="2" />  <line x1="9" y1="12" x2="9.01" y2="12" />  <line x1="13" y1="12" x2="15" y2="12" />  <line x1="9" y1="16" x2="9.01" y2="16" />  <line x1="13" y1="16" x2="15" y2="16" /></svg>
          <p className="hidden md:block text-base">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
