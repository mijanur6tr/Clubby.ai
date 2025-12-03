import Creations from '../components/Creations';
// import { dummyCreationData } from '../assets/assets';
import { useEffect, useState } from 'react';
import axios from "axios"
import { useAuth,useUser } from '@clerk/clerk-react';
import toast from "react-hot-toast"

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard= (props) => {

 const [creations,setCreations] = useState([]);

   const { user } = useUser();
  const { getToken } = useAuth();

  const fetchUserCreations = async () => {

    try {

      const { data } = await axios.get("/api/user/all-creations",{
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


  useEffect(() => {
    if (user) {
      fetchUserCreations();
    }
  }, [user]);

  return(
    <div className='relative'>
      <p className='mx-8 px-8 py-3  text-2xl font-bold mb-6 border border-gray inline'> Creations: {creations.length}</p>
      <Creations creations={creations} setCreations={setCreations} />
    </div>
   
   )
  }

  
export default Dashboard;
