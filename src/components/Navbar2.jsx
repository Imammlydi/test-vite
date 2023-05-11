import React from "react";

function Navbar2() {
    return (
        <nav className="bg-gray-900 fixed top-0 w-full p-4 text-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <a href="/" className="text-xl font-bold">
                    My Website
                </a>
                <ul className="flex">
                    <li>
                        <a href="/" className="mx-2">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/about" className="mx-2">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="/contact" className="mx-2">
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar2;
