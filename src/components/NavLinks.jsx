import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./navbar.css";
export default function NavLinks({ href, children }) {
    const [url, setUrl] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setUrl(location.pathname);
        console.log(url);
    }, [location]);

    return (
        <Link
            className={
                `${url}` === `${href}`
                    ? " font-Bitter font-bold text-textPrimary"
                    : "font-Bitter font-light text-primary"
            }
            to={href}
        >
            {children}
        </Link>
        // <NavLink

        //     className="inline-flex px-4 py-2 text-textPrimary hover:text-white "
        //     to={href}
        // >
        //     {children}
        // </NavLink >
    );
}
