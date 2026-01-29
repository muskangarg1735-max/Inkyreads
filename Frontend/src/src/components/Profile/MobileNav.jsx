import React from 'react'
import { Link } from "react-router-dom" 
import {useSelector } from 'react-redux';

const MobileNav = () => {
const role = useSelector((state) => state.auth.role);
  return (
    <>
    {role === "user" && (
    <div className="w-full flex lg:hidden items-center justify-between mt-4 ">
         <Link 
                    to="/profile"
                    className="text-white font-semibold w-full text-center rounded hover:bg-sky-400 transition-all duration-300">
                        Favourites
                    </Link> 
                    <Link 
                    to="/profile/orderHistory"
                    className="text-white font-semibold w-full text-center rounded hover:bg-sky-400 transition-all duration-300">
                        Order History
                    </Link> 
                    <Link 
                    to="/profile/settings"
                    className="text-white font-semibold w-full text-center rounded hover:bg-sky-400 transition-all duration-300">
                        Settings
                    </Link> 
    </div>
    )}
    {role === "admin" && (
    <div className="w-full flex lg:hidden items-center justify-between mt-4 ">
         <Link 
                    to="/profile"
                    className="text-white font-semibold w-full text-center rounded hover:bg-sky-400 transition-all duration-300">
                        All Orders
                    </Link> 
                    <Link 
                    to="/profile/add-book"
                    className="text-white font-semibold w-full text-center rounded hover:bg-sky-400 transition-all duration-300">
                        Add Book
                    </Link> 
                    
    </div>
    )}
    </>
  )
}

export default MobileNav

