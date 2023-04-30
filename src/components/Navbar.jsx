import React, { useState, useEffect } from "react";
import Case from "./Case";
import NavLinks from "./NavLinks";

import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
    const [navbar, setNavbar] = useState(false);
    const [url, setUrl] = useState(null);
    const location = useLocation();
    const width = window.innerWidth;
    useEffect(() => {
        setUrl(location.pathname);
        console.log(url, width);
    }, [location]);

    //     const location = useLocation();
    //   const locations = location.pathname;
    //   console.log(location.pathname);
    //   const getNavLinkClass = (path) => {
    //     return props.location.pathname === path ? " text-red-400" : "";
    //   };

    return (
        // <div className="bg-blue-600 w-screen py-2">
        //     <Case>
        //         <div className="flex items-center">
        //             <Link
        //                 className="mr-2 text-sm font-semibold uppercase text-white"
        //                 to="/"
        //             >
        //                 React Starter
        //             </Link>
        //             <NavLink href="/">Home</NavLink>
        //             <NavLink href="/about">About</NavLink>
        //             <NavLink href="/gallery">Gallery</NavLink>
        //         </div>
        //     </Case>
        // </div>

        <nav className="sticky top-0 w-full w-screen bg-white  shadow ">
            {width >= 1024 ? (
                <div className="mx-auto justify-between px-4 md:flex md:items-center md:px-8 lg:max-w-7xl   ">
                    <div>
                        <div className="flex items-center justify-between py-3 md:block md:py-5">
                            <a href="/">
                                <h2 className="text-2xl font-bold text-primary  hover:text-white">
                                    {" "}
                                    <NavLinks href="/">Report</NavLinks>
                                </h2>
                            </a>
                            <div className="md:hidden">
                                <button
                                    className="text-gray-700 focus:border-gray-400 rounded-md p-2 outline-none focus:border"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
                                navbar ? "block" : "hidden"
                            }`}
                        >
                            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                                <li>
                                    {/* <li className="text-gray-600 hover:text-blue-600"> */}
                                    <NavLinks href="/">Home</NavLinks>
                                    {/* <Link to="/" className={url === "/" ?" text-red-200" : "text-gray-600"}>Home</Link> */}
                                    {/* <Link to="/" className={`${url}` === "/" ?" text-red-600 " : ""}>Homes</Link> */}
                                </li>
                                <li>
                                    <NavLinks href="/report">Report</NavLinks>
                                    {/* <Link to="/about" className={"underline" + (url === "/about" ?" text-red-200" : "")}>About</Link> */}
                                </li>
                                {/* <li className="text-gray-600 hover:text-blue-600"> */}
                                <li>
                                    {/* <Link to="/gallery" className={"underline" + (url === "/gallery" ?" text-red-200" : "")}>Gallery</Link> */}
                                    <NavLinks href="/gallery">Gallery</NavLinks>
                                </li>
                                {/* <li className="text-gray-600 hover:text-blue-600"> */}
                                <li>
                                    <NavLinks href="/login">Login</NavLinks>
                                </li>
                                {/* <li>
                                <NavLinks href="/detail_report">Detail Report</NavLinks>
                            </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : null}
        </nav>
    );
}
