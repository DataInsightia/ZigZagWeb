import React from 'react';
import DashboardHome from "../DHome";

export default function EditProfile() {
    return (

        <>
            <DashboardHome/>
            <div className="border"></div>
            <div className="flex justify-center flex-wrap mt-16">
                <div className="w-full lg:w-8/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-gradient-to-r from-rose-600 to-rose-400 mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-white text-xl font-bold">Edit account</h6>
                                <button
                                    className="bg-lightBlue-500 hover:bg-white hover:text-black text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                <div className="flex-auto bg-white px-4 lg:px-10 py-10 pt-0">
                    <form>
                        <br/>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block border-none uppercase text-black text-sm font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Profile Update
                                    </label>
                                    <div className="py-3 center mx-auto flex justify-center">
                                        <div className="bg-white px-4 py-5 rounded-lg shadow-lg text-center w-48">
                                            <div className="mb-4">
                                                <img className="w-auto mx-auto rounded-full object-cover object-center"
                                                     src="https://i1.pngguru.com/preview/137/834/449/cartoon-cartoon-character-avatar-drawing-film-ecommerce-facial-expression-png-clipart.jpg"
                                                     alt="Avatar Upload"/>
                                            </div>
                                            <label className="cursor-pointer mt-6">
                                                <span
                                                    className="mt-2 leading-normal px-4 py-2 bg-blue-500 text-white text-sm rounded-full">Select Avatar</span>
                                                <input type='file' className="hidden" multiple="multiple"
                                                accept="accept" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            User Information
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-black text-xs font-bold mb-2 border-none"
                                        htmlFor="username"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text" id="username"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue="Staff"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-black text-xs font-bold mb-2 border-none"
                                        htmlFor="email"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email" id="email"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue="staff@chettinadzigzag.in"
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-black text-xs font-bold mb-2 border-none"
                                        htmlFor="firstname"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text" id="firstname"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Ex:Abdul"
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-black text-xs font-bold mb-2 border-none"
                                        htmlFor="lastname"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text" id="lastname"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Contact Information
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-black text-xs font-bold mb-2 border-none"
                                        htmlFor="address"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text" id="address"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="EX:2/52 SouthStreet"
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-black text-xs font-bold mb-2 border-none"
                                        htmlFor="city"
                                    >
                                        City
                                    </label>
                                    <input
                                        type="text" id="city"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue="Karaikudi"
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-black text-xs font-bold mb-2 border-none"
                                        htmlFor="country"
                                    >
                                        Country
                                    </label>
                                    <input
                                        type="text" id="country"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue="India"
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-black text-xs font-bold mb-2 border-none"
                                        htmlFor="postal"
                                    >
                                        Postal Code
                                    </label>
                                    <input
                                        type="text" id="postal"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue="630001"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            About Me
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-black text-xs font-bold mb-2 border-none"
                                        htmlFor="aboutme"
                                    >
                                        About me
                                    </label>
                                    <textarea
                                        type="text" id="aboutme"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        rows="4"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                </div>
            </div>
        </>
    );
}
