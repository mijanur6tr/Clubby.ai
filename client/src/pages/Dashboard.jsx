import Creations from '../components/Creations';
import { dummyCreationData } from '../assets/assets';
import { useEffect, useState } from 'react';

const Dashboard= (props) => {

 const [creations,setCreations] = useState([]);

 useEffect(()=>{
  setCreations(dummyCreationData)
 },[])

  return(
    <div className='relative'>
      <p className='mx-8 px-8 py-3  text-2xl font-bold mb-6 border border-gray inline'> Creations: {dummyCreationData.length}</p>
       <Creations/>
    </div>
   
   )
  }

  
export default Dashboard;
