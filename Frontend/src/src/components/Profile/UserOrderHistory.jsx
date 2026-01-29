import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'

const UserOrderHistory = () => {
  const [OrderHistory , setOrderHistory ] = useState()
  const headers ={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:1000/api/v1/orderhistory ",{ headers })
      console.log(res.data)
      setOrderHistory(res.data.data)
    }
    fetch();
  }, [])
  // GET /api/v1/getorders
// app.get("/getorders", async (req, res) => {
//   const orders = await Order.find({ userId: req.user.id });
//   res.json({ data: orders });
// });

  return (
    <>
    {!OrderHistory && (<div className="flex items-center justify-center h-[100%]"><Loader/></div>)}
    {OrderHistory && OrderHistory.length === 0 && (
      <div className="h-[80vh] p-4 text-white">
        <div className="h-[100%] flex flex-col items-center justify-center">
          <h1 className="text-5xl font-semibold text-black mb-8">
              No order history
          </h1>
            <img
            src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png" 
            alt=""
            className="h-[20vh] mb-8"
            />
        </div>
      </div>
    )}
    {OrderHistory && OrderHistory.length > 0 && (
      <div className="h-[100%] p-0 md:p-4 text-black">
        <h1 className="text-3xl md:text-5xl font-semibold text-black mb-8">
            Your order history
        </h1>
        <div className="mt-4 bg-pink-400 w-full rounded py-2 px-4 flex gap-2 font-semibold">
          <div className="w-[3%]">
            <h1 className="text-center">Sr.
            </h1>
            </div>
            <div className="w-[22%]">
           <h1 className="">Books</h1>
          </div>
            <div className="w-[45%]">
           <h1 className="">Description</h1>
          </div>
            <div className="w-[9%]">
           <h1 className="">Price</h1>
          </div>
            <div className="w-[16%]">
           <h1 className="">Status</h1>
          </div>
            <div className="w-none md:w-[5%] hidden md:block">
           <h1 className="">Mode</h1>
          </div>
        </div>
        {OrderHistory.map((items, i) => items.book ? (
          <div key = {items._id || i} className="bg-pink-300 w-full rounded py-2 px-4 flex gap-4 hover:bg-sky-400  "> 
            <div className="w-[3%]">
              <h1 className="text-center"> {i + 1} </h1>
              </div>
              <div className="w-[22%]">
                <Link 
                to={`/view-book-details/${items.book._id}`}
                className="hover:text-black ">
                  {items.book.title}  
                </Link>
                </div>
                <div className="w-[45%]">
                  <h1 className=""> {items.book.desc.slice(0, 50)}...</h1>
                  </div>
                <div className="w-[9%]">
                  <h1 className="">₹ {items.book.price}</h1>
                  </div>
                <div className="w-[16%]">
                  <h1 className="font-semibold text-green-700">
                     {items.status === "Order Placed" ? (
                      <div className="text-purple-900">{items.status} </div>
                      ) : items.status === "Cancelled" ? (
                        <div className="text-red-600">{items.status}
                        </div> 
                      ) : (items.status )
                      
                     } 
                     </h1>
                  </div>
                     <div className="w-none md:w-[5%] hidden md:block">
                      <h1 className="text-sm text-black">{items.paymentMode}</h1>
            </div>
            </div>

        ) : null )}
      </div>
    )}
    </>
  )
}

export default UserOrderHistory