import React from "react";
import { Link } from "react-router-dom";
import  './navbar.css'
export default function NavLink({ href, children }) {
    return (
        <Link
        activeClassName="navbar__link--active"
            className="inline-flex px-4 py-2 text-textPrimary hover:text-white"
            to={href}
        >
            {children}
        </Link>
    );
}
