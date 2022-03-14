import React from 'react';

const Scroll = () => {
    return (
        <div className="flex flex-wrap">
            {/*product 1*/}
            <div className="w-full md:w-1/2 lg:w-1/3">
                <div className="w-80 bg-white shadow rounded mx-auto transform transition duration-500 hover:scale-125">
                    <div
                        className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                'url(' +
                                'https://www.polaroidfotobar.com/wp-content/uploads/2018/10/How-to-Start-Tailoring-Shop.jpg' +
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
                            Hammond robotics
                        </p>
                        <h1 className="text-gray-800 text-center mt-1">Item name</h1>
                        <p className="text-center text-gray-800 mt-1">€1299</p>
                        <div className="inline-flex items-center mt-2">
                            {/*<button*/}
                            {/*    className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"*/}
                            {/*>*/}
                            {/*    <svg*/}
                            {/*        xmlns="http://www.w3.org/2000/svg"*/}
                            {/*        className="h-6 w-4"*/}
                            {/*        fill="none"*/}
                            {/*        viewBox="0 0 24 24"*/}
                            {/*        stroke="currentColor"*/}
                            {/*    >*/}
                            {/*        <path*/}
                            {/*            stroke-linecap="round"*/}
                            {/*            stroke-linejoin="round"*/}
                            {/*            stroke-width="2"*/}
                            {/*            d="M20 12H4"*/}
                            {/*        />*/}
                            {/*    </svg>*/}
                            {/*</button>*/}
                            {/*<div*/}
                            {/*    className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none"*/}
                            {/*>*/}
                            {/*    2*/}
                            {/*</div>*/}
                            {/*<button*/}
                            {/*    className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"*/}
                            {/*>*/}
                            {/*    <svg*/}
                            {/*        xmlns="http://www.w3.org/2000/svg"*/}
                            {/*        className="h-6 w-4"*/}
                            {/*        fill="none"*/}
                            {/*        viewBox="0 0 24 24"*/}
                            {/*        stroke="currentColor"*/}
                            {/*    >*/}
                            {/*        <path*/}
                            {/*            stroke-linecap="round"*/}
                            {/*            stroke-linejoin="round"*/}
                            {/*            stroke-width="2"*/}
                            {/*            d="M12 4v16m8-8H4"*/}
                            {/*        />*/}
                            {/*    </svg>*/}
                            {/*</button>*/}
                        </div>

                        <div className="flex justify-between w-full mt-4">
                        </div>
                    </div>
                </div>
            </div>

            {/*product 2*/}

            <div className="w-full md:w-1/2 lg:w-1/3 transform transition duration-500 hover:scale-125">
                <div className="w-80 bg-white shadow rounded mx-auto ">
                    <div
                        className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                'url(' +
                                'https://www.lifesavvy.com/p/uploads/2019/04/8b557fcb.jpg?height=200p&trim=2,2,2,2' +
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
                            Hammond robotics
                        </p>
                        <h1 className="text-gray-800 text-center mt-1">Item name</h1>
                        <p className="text-center text-gray-800 mt-1">€1299</p>
                        <div className="inline-flex items-center mt-2">
                            {/*<button*/}
                            {/*    className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"*/}
                            {/*>*/}
                            {/*    <svg*/}
                            {/*        xmlns="http://www.w3.org/2000/svg"*/}
                            {/*        className="h-6 w-4"*/}
                            {/*        fill="none"*/}
                            {/*        viewBox="0 0 24 24"*/}
                            {/*        stroke="currentColor"*/}
                            {/*    >*/}
                            {/*        <path*/}
                            {/*            stroke-linecap="round"*/}
                            {/*            stroke-linejoin="round"*/}
                            {/*            stroke-width="2"*/}
                            {/*            d="M20 12H4"*/}
                            {/*        />*/}
                            {/*    </svg>*/}
                            {/*</button>*/}
                            {/*<div*/}
                            {/*    className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none"*/}
                            {/*>*/}
                            {/*    2*/}
                            {/*</div>*/}
                            {/*<button*/}
                            {/*    className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"*/}
                            {/*>*/}
                            {/*    <svg*/}
                            {/*        xmlns="http://www.w3.org/2000/svg"*/}
                            {/*        className="h-6 w-4"*/}
                            {/*        fill="none"*/}
                            {/*        viewBox="0 0 24 24"*/}
                            {/*        stroke="currentColor"*/}
                            {/*    >*/}
                            {/*        <path*/}
                            {/*            stroke-linecap="round"*/}
                            {/*            stroke-linejoin="round"*/}
                            {/*            stroke-width="2"*/}
                            {/*            d="M12 4v16m8-8H4"*/}
                            {/*        />*/}
                            {/*    </svg>*/}
                            {/*</button>*/}
                        </div>

                        <div className="flex justify-between w-full mt-4">
                        </div>
                    </div>
                </div>
            </div>

            {/*product 3*/}

            <div className="w-full md:w-1/2 lg:w-1/3">
                <div className="w-80 bg-white shadow rounded mx-auto transform transition duration-500 hover:scale-125">
                    <div
                        className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                'url(' +
                                'https://storage.googleapis.com/tc46storage/2021/04/hero-image-1.jpg' +
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
                            Hammond robotics
                        </p>
                        <h1 className="text-gray-800 text-center mt-1">Item name</h1>
                        <p className="text-center text-gray-800 mt-1">€1299</p>
                        <div className="inline-flex items-center mt-2">
                            {/*<button*/}
                            {/*    className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"*/}
                            {/*>*/}
                            {/*    <svg*/}
                            {/*        xmlns="http://www.w3.org/2000/svg"*/}
                            {/*        className="h-6 w-4"*/}
                            {/*        fill="none"*/}
                            {/*        viewBox="0 0 24 24"*/}
                            {/*        stroke="currentColor"*/}
                            {/*    >*/}
                            {/*        <path*/}
                            {/*            stroke-linecap="round"*/}
                            {/*            stroke-linejoin="round"*/}
                            {/*            stroke-width="2"*/}
                            {/*            d="M20 12H4"*/}
                            {/*        />*/}
                            {/*    </svg>*/}
                            {/*</button>*/}
                            {/*<div*/}
                            {/*    className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none"*/}
                            {/*>*/}
                            {/*    2*/}
                            {/*</div>*/}
                            {/*<button*/}
                            {/*    className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"*/}
                            {/*>*/}
                            {/*    <svg*/}
                            {/*        xmlns="http://www.w3.org/2000/svg"*/}
                            {/*        className="h-6 w-4"*/}
                            {/*        fill="none"*/}
                            {/*        viewBox="0 0 24 24"*/}
                            {/*        stroke="currentColor"*/}
                            {/*    >*/}
                            {/*        <path*/}
                            {/*            stroke-linecap="round"*/}
                            {/*            stroke-linejoin="round"*/}
                            {/*            stroke-width="2"*/}
                            {/*            d="M12 4v16m8-8H4"*/}
                            {/*        />*/}
                            {/*    </svg>*/}
                            {/*</button>*/}
                        </div>
                        <div className="flex justify-between w-full mt-4">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Scroll;