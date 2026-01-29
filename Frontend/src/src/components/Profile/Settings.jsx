import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
const Settings = () => {
  const [Value, setValue] = useState({address: ""})
  const [ProfiileData, setProfileData] = useState();
  const headers ={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  const change = (e) => {
    const { name, value} = e.target;
    setValue({ ...Value, [name] : value })
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user-info",
        { headers }
      );
      setProfileData(response.data)
      setValue({ address: response.data.address })
    }
    fetch();
  }, [])

  const submitAddress = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/update-address",Value ,{ headers })
    alert(response.data.message)
    console.log(response)
  }
  return (
    <>
      {!ProfiileData && <div className="w-full h-[100%] flex items-center justify-center"><Loader/></div>}
      {ProfiileData && (
        <div className="h-[60vh] p-0 md:p-4 text-black">
          <h1 className="text-3xl md:test-5xl font-semibold  text-black mb-8 ">
            Settings
          </h1>
          <div className="flex gap-12">
          <div className="">
            <label htmlFor="" className="text-black font-semibold">Username</label>
            <p className="p-2 rounded bg-pink-300 mt-2 font-semibold">
              {ProfiileData.username}
            </p>
            </div>
             <div className="">
            <label htmlFor="" className="text-black font-semibold">Email</label>
            <p className="p-2 rounded bg-pink-300 mt-2 font-semibold">
              {ProfiileData.email}
            </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
          <label htmlFor="" className="text-black font-semibold">Address</label>
          <textarea
            className="p-2 rounded bg-pink-300 mt-2 font-semibold"
            rows="5"
            placeholder="Address"
            name="address" 
            value={Value.address}
            onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-end" >
            <button className="bg-sky-400 text-black font-semibold px-3 py-2 rounded  hover:bg-pink-300 transition-all duration-300"
            onClick={submitAddress}>
                Update
            </button>
          </div>
      </div>
        )}  
    </>
  )
}

export default Settings