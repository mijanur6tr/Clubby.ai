import Creations from '../components/Creations';
import { useEffect, useState } from 'react';
import axios from "axios"
import { useAuth, useUser } from '@clerk/clerk-react';
import toast from "react-hot-toast"


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {

  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchUserCreations = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/user/all-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message || "Failed to fetch creations.");
      }

    } catch (error) {
      console.log("Error fetching creations", error);
      toast.error(error?.response?.message || "Something went wrong during fetching");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserCreations();
    }
  }, [user]);

  return (
    <div className="relative">
      <p className='px-4 py-2 text-2xl font-bold mb-6 border border-r-cyan-300 border-l-amber-300 border-t-blue-300 border-b-amber-300 rounded-sm border-gray inline'>
        Creations: {loading ? "..."  : creations.length}
      </p>

      {loading ? (
        <div className="w-full flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <Creations creations={creations} setCreations={setCreations} />
      )}
    </div>
  );
}

export default Dashboard;
