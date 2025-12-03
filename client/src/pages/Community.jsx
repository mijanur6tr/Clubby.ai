import { useEffect, useState } from 'react';
// import { dummyPublishedCreationData } from '../assets/assets';
import { useUser } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';
import axios from "axios"
import { useAuth } from '@clerk/clerk-react';
import toast from "react-hot-toast"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const Community = (props) => {
  const [creations, setCreations] = useState([]);
  // const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchCreations = async () => {

    try {

      const { data } = await axios.get("/api/user/public-creations",{
         headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message || "error is the data success")
      }
    } catch (error) {
      console.log("Error in generating the article", error)
      toast.error(error?.response?.message || "Something went wrong during fetching")
    }
  };


  const handleLike = async (id) => {

    try {
      const { data } = await axios.post("/api/user/update-likes", { id }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      if (data.success) {
        toast.success(data.message)
        await fetchCreations();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log("Error in generating the article", error)
      toast.error(error?.response?.message || "Something went wrong during fetching")
    }
  };


  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">


      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 sm:mb-12 border-b pb-4">
        Clubby Community Creations ✨
      </h2>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {creations.map((creation) => {
         

          return (
            <div
              key={creation.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >


              <div className="relative aspect-square w-full">
                <img
                  src={creation.content}
                  alt={`Creation by ${creation.userName}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />


                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <p className="text-sm font-semibold text-white truncate">{creation.prompt}</p>

                </div>
              </div>


              <div className="flex items-center justify-between p-3">



                <div className="flex items-center space-x-1">
                  <span className="text-base font-semibold text-gray-700">{creation.likes.length}</span>
                  <button
                    onClick={() => handleLike(creation.id)}
                    className="p-1 rounded-full hover:bg-red-50 transition duration-150"
                    disabled={!user}
                  >
                    <Heart
                      size={20}
                      className={`
                        transition-colors duration-200
                        ${creation.likes.includes(user.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-400 hover:text-red-400'
                        }
                      `}
                    />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>



    </div>
  );
};

export default Community;