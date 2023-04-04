import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Router from "./components/Router";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function App() {
    const [url, setUrl] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setUrl(location.pathname);
        console.log(url);
    }, [location]);

    return (
        <>
            {location.pathname !== "/login" && <Navbar />}

            <main className="min-h-screen bg-primary pt-8">
                <Router />
            </main>
        </>
    );
}
