import React, {useEffect, useState} from 'react';
import axios from "axios";
import API from "../../api";

const Scroll = () => {
    const [new_arrivals,setNewArrivals] = useState([{}]);
    useEffect(() => {
        axios.get(`${API}/api/new_arrivals/`).then(res => {setNewArrivals(res.data)}).catch(err=>console.log(err))
    },[]);
    return (
        <div className="flex flex-wrap">
            {/*product 1*/}

            {
                new_arrivals.map(e => <>
                    <div className="w-full md:w-1/2 lg:w-1/3">
                        <div className="w-80 bg-white shadow rounded mx-auto transform transition duration-500 hover:scale-125">
                            <div
                                className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        'url(' +
                                        `${API}${e.picture}` +
                                        ')',
                                }}
                            >
                                <div className="flex justify-between">
                                    <input type="checkbox" />
                                    <button className="text-white hover:text-blue-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div>
                    <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
                      booknow
                    </span>
                                </div>
                            </div>
                            <div className="p-4 flex flex-col items-center">
                                <p className="text-gray-400 font-light text-xs text-center">
                                    {
                                        `${e.product_name}`
                                    }
                                </p>
                                <h1 className="text-gray-800 text-center mt-1">{`${e.product_name}`}</h1>
                                {/*<p className="text-center text-gray-800 mt-1">€1299</p>*/}
                                <div className="inline-flex items-center mt-2">

                                </div>

                                <div className="flex justify-between w-full mt-4">
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
            }

            {/*product 2*/}
        </div>

    );
};

export default Scroll;