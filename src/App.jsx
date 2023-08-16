import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { BottomNavbar, Navbar, Router } from "./components";
import Navbar2 from "./components/Navbar2";

export default function App() {
    const [url, setUrl] = useState(null);
    const location = useLocation();
    const [token, seToken] = useState(null);
    const width = window.innerWidth;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setUrl(location.pathname);
        console.log(url);
    }, [location, token]);

    return (
        <>
            <div>{token}</div>

            <div className="relative">
                {/* {location.pathname !== "/login"  && <Navbar />} */}

                {location.pathname !== "/login2" &&
                location.pathname !== "/reportdetail2" &&
                location.pathname !== "/gallery" &&
                location.pathname !== "/detail_image" &&
                location.pathname !== "/reportdetail3" ? (
                    // && width >= 768 && width >= 1024
                    <Navbar />
                ) : null}
                {/* <Navbar2/> */}
                <main className="min-h-screen ">
                    <Router />
                </main>
                {/* {location.pathname !== "/login"  && <Navbar />} */}

                {width < 768 || width < 1024 ? <BottomNavbar /> : null}
            </div>
            {/* } */}
        </>
    );
}
