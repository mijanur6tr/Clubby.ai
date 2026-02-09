import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {  useUser,  UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import navLogo from '/navLogo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  // const { session } = useSession();  

  // useEffect(() => {
  //   if (!session) return;

  //   const alreadyRedirected = sessionStorage.getItem("redirectedAfterSignIn");

  //   if (!alreadyRedirected && session.status === "active") {
  //     sessionStorage.setItem("redirectedAfterSignIn", "true");
  //     navigate("/ai/article");
  //   }
  // }, [session, navigate]);

  // useEffect(() => {
  //   if (!user) {
  //     sessionStorage.removeItem("redirectedAfterSignIn");
  //   }
  // }, [user]);
  

  return (
    <nav className="w-full  bg-[#ffffff00]">
      <div className="mx-auto px-2 lg:px-8 py-3  flex items-center justify-between">

        <div
          className={`${user ? 'mx-2 sm:mx-6' : 'mx-0'} lg:mx-0 flex items-center justify-center`}
          onClick={() => navigate("/")}
        >
          <img src={navLogo} className="w-15" alt="Clubby AI Logo" />
          <p className="text-2xl font-serif">Clubby Ai</p>
        </div>

        {user ? (
          <UserButton />
        ) : (
         <NavLink to={"/ai/article"}>
              <button
           
            className="lg:px-6 px-3 py-1.5 text-white font-semibold font-serif border-none rounded-lg shadow-md transition
                     bg-linear-to-r from-cyan-400 to-purple-600
                     hover:to-purple-500 hover:from-cyan-400"
          >
            Sign In
          </button>
         </NavLink>
     
       
         
        )}
      </div>
    </nav>
  );
};

export default Navbar;
