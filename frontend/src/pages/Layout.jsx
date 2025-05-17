import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
     
        <Outlet /> {/* This will render the current page */}
      <Footer />
    
    </>
  );
};

export default Layout;
