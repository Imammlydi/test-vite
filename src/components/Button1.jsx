import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Button1 = ({ href, Title, state }) => {
    return (
        <Link
            to={href}
            state={state}
            className="rounded border-none bg-primary px-4 py-2 font-bold text-textWhite hover:bg-textPrimary"
        >
            <h4>{Title}</h4>
        </Link>
    );
};

export default Button1;
