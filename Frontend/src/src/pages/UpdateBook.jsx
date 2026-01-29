import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom';

const UpdateBook = () => {
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
    });

 const { id } = useParams();
 const navigate = useNavigate()
 const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
};
const change = (e) => {
    const {name, value} = e.target;
    setData({...Data, [name]: value});
};
const submit = async () => {
    try{
        if(
            Data.url === ""||
            Data.title === ""||
            Data.author === ""||
            Data.price === ""||
            Data.desc === ""||
            Data.language === ""
        ){
            alert("All fields are required");
        }else{
            const response = await axios.put(
                "http://localhost:1000/api/v1/updatebook",
                Data,
                { headers }
            );
            setData({
                url:"",
                title:"",
                author:"",
                price:"",
                desc:"",
                language:"",
            });
            alert(response.data.message);
             navigate(`/view-book-details/${id}`)
        }
    } catch(error) {
        alert(error.reponse.data.message);
        
    }
};
useEffect(() => {
          const fetch = async() => {
             const response =  await axios.get(
              `http://localhost:1000/api/v1/getbookbyid/${id}`
          )
          setData(response.data.data)
          }
          fetch()
      }, []);
  return (
     <div className="h-[100%] p-0 md:p-4 bg-white">
        <h1 className="text-3xl md:text-5xl font-semibold text-black mb-8">Update Book</h1>
        <div className="p-4 bg-pink-300 rounded">
            <div>
                <label htmlFor="" className="text-black">
                    Image
                </label>
                <input 
                    type="text"
                    className="w-full mt-2 bg-sky-400 text-black p-2 outline-none"
                    placeholder="url of image"
                    name="url"
                    required
                    value={Data.url}
                    onChange={change}
                    />
            </div>
            <div className="mt-4">
                <label htmlFor="" className="text-black">
                    Title of book
                </label>
                <input 
                    type="text"
                    className="w-full mt-2 bg-sky-400 text-black p-2 outline-none"
                    placeholder="title of book"
                    name="title"
                    required
                    value={Data.title}
                    onChange={change}
                    />
            </div>
            <div className="mt-4">
                <label htmlFor="" className="text-black">
                    Author of book
                </label>
                <input 
                    type="text"
                    className="w-full mt-2 bg-sky-400 text-black p-2 outline-none"
                    placeholder="author of book"
                    name="author"
                    required
                    value={Data.author}
                    onChange={change}
                    />
            </div>
            <div className="mt-4 flex gap-4">
                <div className="w-3/6">
                <label htmlFor="" className="text-black">
                    Language
                </label>
                <input 
                    type="text"
                    className="w-full mt-2 bg-sky-400 text-black p-2 outline-none"
                    placeholder="language of book"
                    name="language"
                    required
                    value={Data.language}
                    onChange={change}
                    />
            </div>
            <div className="w-3/6">
                <label htmlFor="" className="text-black">
                    Price
                </label>
                <input 
                    type="number"
                    className="w-full mt-2 bg-sky-400 text-black p-2 outline-none"
                    placeholder="price of book"
                    name="price"
                    required
                    value={Data.price}
                    onChange={change}
                    />
            </div>
        </div>
        <div className="mt-4">
                <label htmlFor="" className="text-black">
                    Description of Book
                </label>
                <textarea 
                    className="w-full mt-2 bg-sky-400 text-black p-2 outline-none"
                    rowws="5"
                    placeholder="description of book"
                    name="desc"
                    required
                    value={Data.desc}
                    onChange={change}
                    />
            </div>
            <button 
                className=" mt-4 px-3 bg-white text-black font-semibold py-2 rounded hover:bg-black hover:text-white transition-all duration-300"
                onClick={submit}
                >
                    Update Book
                </button>
    </div>
    </div>
  )
}

export default UpdateBook