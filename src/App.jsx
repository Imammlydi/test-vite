import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Navbar, Router } from "./components";

export default function App() {
    const [url, setUrl] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setUrl(location.pathname);
        console.log(url);
    }, [location]);

    return (
        <>
            <div className="relative">
                {/* {location.pathname !== "/login"  && <Navbar />} */}
                {location.pathname !== "/login" &&
                location.pathname !== "/detail_report" ? (
                    <Navbar />
                ) : (
                    <div />
                )}

                <main className="min-h-screen ">
                    <Router />
                </main>
            </div>
        </>
    );
}
