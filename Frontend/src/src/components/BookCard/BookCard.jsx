import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const BookCard = ({ data, favourite }) => {
  const headers ={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:data._id,
  }
  const handleRemoveBook =async () => {
    const response =await axios.put("http://localhost:1000/api/v1/deletebookfromfavourite",
      {},
      {headers}
    ) 
    alert(response.data.message)
  }
  return (
    <div className="bg-pink-300 rounded p-4 flex flex-col drop-shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.4)] transition duration-300">
      <Link to={`/view-book-details/${data._id}`}>
      <div className="">
        <div className="bg-white rounded flex items-center justify-center p-2  ">
          <img src={data.url} alt="/" className="h-[25vh] shadow-xl  " />
        </div>
        <h2 className="mt-4 text-xl text-black font-semibold" >{data.title}</h2>
        <p className="mt-2 text-zinc-700 font-semibold" >by {data.author}</p>
        <p className="mt-2 text-xl text-black font-semibold" >₹ {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button className="bg-white px-4 py-2 rounded border border-fuchsia-900 text-fuchsia-900 mt-4"
        onClick={handleRemoveBook}
        >
          Remove your favourite
        </button>
      )}
    </div >
  ) 
}
  
export default BookCard 