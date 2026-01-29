import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGripLines } from "react-icons/fa";
// import { useState } from 'react';
import { useSelector } from "react-redux"
const Navbar = () => {
    const links=[
        {
        title: "Home",
        link: "/"
        },
        {
            title: "All Books",
            link: "/all-books",
            },
        {
            title: "Cart",
            link: "/cart",
            },
        {
            title: "Profile",
            link: "/profile",
            },
        {
            title: "Admin Profile",
            link: "/profile",
            },
    ]
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn )
    const role = useSelector((state) => state.auth.role )
    if(!isLoggedIn)
    {
        links.splice(2, 3)
    }
    if(isLoggedIn == true && role === "user") 
    {
        links.splice(4, 1 )
    }
    if(isLoggedIn == true && role === "admin")
    {
        links.splice(3, 1 )
    }
    const [MobileNav, setMobileNav] = useState("hidden");
  return (
    <>
    <nav className="z-50 relative flex bg-sky-400 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center" >
            <img 
        className="h-10 me-4"
        src="https://cdn-icons-png.flaticon.com/128/2702/2702184.png" alt="logo"/>
            <h1 className="text-2xl font-semibold">InkyReads</h1></Link>
        <div className="nav-links-InkyReads block md:flex items-center gap-4 ">
         <div className="hidden md:flex gap-4">
            {
            links.map((items, i)=>(
               <div className="flex items-center justify-center">
               { items.title === "Profile" || 
               items.title === "Admin Profile" ? (<Link to={items.link} 
               className="px-4 py-1  bg-white font-semibold text-black 
        rounded hover:bg-black hover:text-white transition-all duration-300" 
                key={i}
                >
                    {items.title}{""}
                    </Link> ) : (
                         <Link to={items.link} className="hover:text-black transition-all duration-300 font-semibold" 
                key={i}
                >
                    {items.title}</Link>
                    )  }
               </div>
            ))}
            </div>
     { isLoggedIn ===false && (
         <div className="hidden md:flex gap-4">
        <Link to="/LogIn" className="px-4 py-1  bg-white font-semibold text-black 
        rounded hover:bg-black hover:text-white transition-all duration-300">LogIn</Link>
        <Link to="/SignUp" className="px-4 py-1 bg-white  font-semibold  
         rounded hover:bg-black hover:text-white transition-all duration-300 text-black ">SignUp</Link>
      </div>
     )}

      <button className="block md:hidden text-white text-2xl hover:text-sky-500" 
      onClick={()=> 
      MobileNav === "hidden" 
      ? setMobileNav("block") 
      : setMobileNav("hidden")
      }><FaGripLines /></button>
      </div>
    </nav>
    <div className={`${MobileNav} bg-white h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`} >{
            links.map((items, i)=>(
                <Link to={items.link} 
                className={`${MobileNav} text-sky-500 text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300`} 
                key={i}
                onClick={()=> 
                    MobileNav === "hidden" 
                        ? setMobileNav("block") 
                         : setMobileNav("hidden")
      }
                >
                    {items.title}{" "}</Link>
            ))}
       {isLoggedIn === false ? (<> <Link to="/LogIn" className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 border border-sky-500 
       rounded text-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-300`}>LogIn</Link>
        <Link to="/SignUp" className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 bg-sky-500 
        rounded hover:bg-white hover:text-sky-500 transition-all duration-300 text-white `}>SignUp</Link>
       </>
       ):(<></>)}
            </div>
    </>
  )
}

export default Navbar
