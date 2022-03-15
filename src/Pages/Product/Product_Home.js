import React, {useEffect, useState} from 'react';
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import axios from "axios";
import API from "../../api";
import Scroll from "../Home/Scroll";

export default function Product_Home() {
    const [product,setProduct] = useState([{}]);
    useEffect(() => {
        axios.get(`${API}/api/product_display/`).then(res => {setProduct(res.data)}).catch(err=>console.log(err))
    },[]);
    return (
        <div>
            <Navbar/>
            <div className="container px-5 py-2 mx-auto lg:pt-24 lg:px-32">
                <div className="flex flex-wrap -m-1 md:-m-2">
                    <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                        Products Gallery
                    </h1>
                    <div className="w-full mb-4">
                        <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                    </div>
                                {/*<div className="flex flex-wrap w-1/2">*/}

                                {/*    {*/}
                                {/*        product.map(e => <>*/}

                                {/*    <div className="w-1/2 p-1 md:p-2  transform transition duration-500 hover:scale-125">*/}
                                {/*        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"*/}
                                {/*             src={`${API}${e.picture}`}/>*/}
                                {/*    </div>*/}
                                {/*            </>*/}
                                {/*        )}*/}
                                {/*</div>*/}



                    {/*<div className="flex flex-wrap w-1/2">*/}
                    {/*    <div className="w-full p-1 md:p-2">*/}
                    {/*        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"*/}
                    {/*             src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"/>*/}
                    {/*    </div>*/}
                    {/*    <div className="w-1/2 p-1 md:p-2">*/}
                    {/*        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"*/}
                    {/*             src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"/>*/}
                    {/*    </div>*/}
                    {/*    <div className="w-1/2 p-1 md:p-2">*/}
                    {/*        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"*/}
                    {/*             src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(77).webp"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className="mt-16">

                    <Scroll/>
                    <br/>
                    <br/>
                    <Scroll/>
                </div>

            </div>

                <Footer/>
        </div>
    );
};
