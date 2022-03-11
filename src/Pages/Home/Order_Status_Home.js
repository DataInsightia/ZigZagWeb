import React from 'react';
import Navbar from "./Navbar";
import Contact from "./Contact";
import Footer from "./Footer";
import Order_Status from "../Dashboard/Admin/Order_Status";

const OrderStatusHome = () => {
    return (
        <div>
            <Navbar/>
            <div className="w-full justify-center mt-24 mb-8">
                <Order_Status/>
            </div>
            <Footer/>
        </div>
    );
};

export default OrderStatusHome;