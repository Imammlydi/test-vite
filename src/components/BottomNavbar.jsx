import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ModalReportFAB from "./ModalReportFAB";

const BottomNavbar = () => {
    const [url, setUrl] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setUrl(location.pathname);
        console.log(url);
    }, [location]);

    const ButtonFAB = ({ title, onClick }) => {
        return (
            <div>
                <button
                    className="absolute -top-20 left-20 rounded border-none bg-primary px-4 py-2 font-bold text-textWhite hover:bg-textPrimary"
                    onClick={onClick}
                >
                    {title}
                </button>
            </div>
        );
    };

    const Home = () => {
        return (
            <div className="flex justify-center">
                {url === "/" ? (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 6V0H18V6H10ZM0 10V0H8V10H0ZM10 18V8H18V18H10ZM0 18V12H8V18H0Z"
                            fill="#00AEEF"
                        />
                    </svg>
                ) : (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 6V0H18V6H10ZM0 10V0H8V10H0ZM10 18V8H18V18H10ZM0 18V12H8V18H0Z"
                            fill="#d7d7d9"
                        />
                    </svg>
                )}
            </div>
        );
    };
    const Report = () => {
        return (
            <div className="flex justify-center ">
                {url === "/report" ? (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM6 14H4V7H6V14ZM10 14H8V4H10V14ZM14 14H12V10H14V14Z"
                            fill="#00AEEF"
                        />
                    </svg>
                ) : (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM6 14H4V7H6V14ZM10 14H8V4H10V14ZM14 14H12V10H14V14Z"
                            fill="#d7d7d9"
                        />
                    </svg>
                )}
            </div>
        );
    };
    const Profile = () => {
        return (
            <div className="flex justify-center">
                {url === "/gallery" ? (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 17.2C7.5 17.2 5.29 15.92 4 14C4.03 12 8 10.9 10 10.9C12 10.9 15.97 12 16 14C15.3389 14.9844 14.4459 15.7912 13.3996 16.3492C12.3533 16.9072 11.1858 17.1994 10 17.2ZM10 3C10.7956 3 11.5587 3.31607 12.1213 3.87868C12.6839 4.44129 13 5.20435 13 6C13 6.79565 12.6839 7.55871 12.1213 8.12132C11.5587 8.68393 10.7956 9 10 9C9.20435 9 8.44129 8.68393 7.87868 8.12132C7.31607 7.55871 7 6.79565 7 6C7 5.20435 7.31607 4.44129 7.87868 3.87868C8.44129 3.31607 9.20435 3 10 3ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 4.47 15.5 0 10 0Z"
                            fill="#00AEEF"
                        />
                    </svg>
                ) : (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 17.2C7.5 17.2 5.29 15.92 4 14C4.03 12 8 10.9 10 10.9C12 10.9 15.97 12 16 14C15.3389 14.9844 14.4459 15.7912 13.3996 16.3492C12.3533 16.9072 11.1858 17.1994 10 17.2ZM10 3C10.7956 3 11.5587 3.31607 12.1213 3.87868C12.6839 4.44129 13 5.20435 13 6C13 6.79565 12.6839 7.55871 12.1213 8.12132C11.5587 8.68393 10.7956 9 10 9C9.20435 9 8.44129 8.68393 7.87868 8.12132C7.31607 7.55871 7 6.79565 7 6C7 5.20435 7.31607 4.44129 7.87868 3.87868C8.44129 3.31607 9.20435 3 10 3ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 4.47 15.5 0 10 0Z"
                            fill="#d7d7d9"
                        />
                    </svg>
                )}
            </div>
        );
    };

    return (
        <>
            {/* {location.pathname !== "/login"  && <Navbar />} */}
            {location.pathname !== "/login" &&
            location.pathname !== "/detail_report" ? (
                // && width >= 768 && width >= 1024

                <nav className="fixed bottom-0 left-0 z-10 w-full bg-white shadow-lg ">
                    <div className="relative mx-auto max-w-screen-lg bg-white px-4 shadow">
                        {/* {  url === "/report" &&<ModalReportFAB/>} */}
                        <div className="flex justify-between px-6 ">
                            <Link to={"/"} className="p-4 ">
                                <Home />
                                <h5
                                    className={
                                        url === "/"
                                            ? "mt-1 text-center font-Bitter text-xs font-bold text-blue1"
                                            : "mt-1 text-center font-Bitter text-xs font-bold text-graydisable"
                                    }
                                >
                                    Home
                                </h5>
                            </Link>
                            <Link to={"/report2"} className="p-4">
                                <Report />
                                <h5
                                    className={
                                        url === "/report"
                                            ? "mt-1 text-center font-Bitter text-xs font-bold text-blue1"
                                            : "mt-1 text-center font-Bitter text-xs font-bold text-graydisable"
                                    }
                                >
                                    Report
                                </h5>
                            </Link>
                            <Link to={"/gallery"} className="p-4">
                                <Profile />
                                <h5
                                    className={
                                        url === "/gallery"
                                            ? "mt-1 text-center font-Bitter text-xs font-bold text-blue1"
                                            : "mt-1 text-center font-Bitter text-xs font-bold text-graydisable"
                                    }
                                >
                                    Profile
                                </h5>
                            </Link>
                        </div>
                    </div>
                </nav>
            ) : null}
        </>
    );
};

export default BottomNavbar;
