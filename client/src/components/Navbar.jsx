import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useClerk, useUser, useSession, UserButton } from "@clerk/clerk-react";
import navLogo from '../../public/navLogo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { session } = useSession();  

  useEffect(() => {
    if (!session) return;

    const alreadyRedirected = sessionStorage.getItem("redirectedAfterSignIn");

    if (!alreadyRedirected && session.status === "active") {
      sessionStorage.setItem("redirectedAfterSignIn", "true");
      navigate("/ai/article");
    }
  }, [session, navigate]);

  useEffect(() => {
    if (!user) {
      sessionStorage.removeItem("redirectedAfterSignIn");
    }
  }, [user]);

  return (
    <nav className="w-full top-0 left-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="mx-auto px-8 py-3 flex items-center justify-between">

        <div
          className={`${user ? 'mx-2 sm:mx-6' : 'mx-0'} lg:mx-0 flex items-center justify-center`}
          onClick={() => navigate("/")}
        >
          <img src={navLogo} className="w-15" alt="Clubby AI Logo" />
          <p className="text-2xl">Clubby Ai</p>
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className="lg:px-6 px-3 py-2 text-white font-semibold border-none rounded-lg shadow-md transition
                     bg-linear-to-r from-cyan-500 to-purple-600
                     hover:to-purple-500 hover:from-cyan-400"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
