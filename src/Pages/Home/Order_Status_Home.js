import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomerOrderStatus from '../Dashboard/Customer/CustomerOrderStatus';

const OrderStatusHome = () => {
    return (
        <div>
            <Navbar/>
            <div className="w-full justify-center mt-24 mb-8">
                <CustomerOrderStatus />
            </div>
            <Footer/>
        </div>
    );
};

export default OrderStatusHome;