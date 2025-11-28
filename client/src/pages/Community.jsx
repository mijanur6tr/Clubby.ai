import React, { useEffect, useState } from 'react';
import { dummyPublishedCreationData } from '../assets/assets';
import { useUser } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';

const Community = (props) => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();

  const fetchCreations = async () => {
  
    setCreations(dummyPublishedCreationData);
  };


  const handleLike = (creationId) => {
    if (!user) return; 

    setCreations(prevCreations => 
      prevCreations.map(creation => {
        if (creation.id === creationId) {
          const userId = user.id;
          const isLiked = creation.likes.includes(userId);

        
          if (isLiked) {
            return {
              ...creation,
              likes: creation.likes.filter(id => id !== userId),
            };
          } else {
            return {
              ...creation,
              likes: [...creation.likes, userId],
            };
          }
        }
        return creation;
      })
    );
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
          const isLiked = creation.likes.includes(user?.id);

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
                        ${isLiked 
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