import React from "react";
import {Link,  useNavigate } from "react-router-dom";
import { useClerk,useUser,UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  
  const navigate = useNavigate()
  const{openSignIn}=useClerk();
  const{user}=useUser();


  return (
    <nav className="w-full  top-0 left-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className=" mx-auto px-8 py-3 flex  items-center justify-between">

        <div onClick={()=>navigate("/")}>
          <img src=".././public/textlogo.png" className="w-24"/>
          
        </div>

        {user ? <UserButton/> : <button onClick={openSignIn}>Start Now</button>}
      </div>
    </nav>
  );
};

export default Navbar;
