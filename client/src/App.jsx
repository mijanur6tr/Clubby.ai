import { Route, Routes } from "react-router-dom";
import {Toaster} from "react-hot-toast"
// import { useAuth } from "@clerk/clerk-react";
// import { useEffect } from "react";

// Import all pages
import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Article from "./pages/Article.jsx";
import Community from "./pages/Community.jsx";
import GenerateIdea from "./pages/GenerateIdea.jsx";
import GenerateImage from "./pages/GenerateImage.jsx";
import RemoveBackground from "./pages/RemoveBackground.jsx";
import RemoveObject from "./pages/RemoveObject.jsx";
import ReviewResume from "./pages/ReviewResume.jsx";
import Subscription from "./pages/Subscription.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {

  // const {getToken} = useAuth()


  // useEffect(()=>{
  //   getToken().then((token)=>console.log(token))
  // },[])

  return (
    <>
    <Toaster/>
    <Navbar/>
      <Routes>

        {/* Public route */}
        <Route path="/" element={<Home />} />

        {/* All routes under /ai */}
        <Route path="/ai" element={<Layout />}>

          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="article" element={<Article />} />
          <Route path="community" element={<Community />} />
          <Route path="generate-idea" element={<GenerateIdea />} />
          <Route path="generate-image" element={<GenerateImage />} />
          <Route path="remove-bg" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<ReviewResume />} />
         <Route path="subscription" element={<Subscription />} />

        </Route>
 
      </Routes>
    </>
  );
}

export default App;
