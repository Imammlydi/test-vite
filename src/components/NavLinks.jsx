import React from "react";
import { Link,NavLink} from "react-router-dom";
import  './navbar.css'
export default function NavLinks({ href, children }) {
    return (
        <NavLink 
        
            className= {({ isActive }) => "hover:text-white" + isActive ? " inline-flex px-4 py-2 text-textPrimary" : ""}
            to={href}
        >
            {children}
        </NavLink >
        // <NavLink 
        
        //     className="inline-flex px-4 py-2 text-textPrimary hover:text-white " 
        //     to={href}
        // >
        //     {children}
        // </NavLink >
    );
}
