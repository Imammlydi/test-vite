import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Button1 = ({ href, Title }) => {
    return (
        <Link
            to={href}
            className="rounded border-none bg-primary py-2 px-4 font-bold text-textWhite hover:bg-textPrimary"
        >
            <h4>{Title}</h4>
        </Link>
    );
};

export default Button1;
