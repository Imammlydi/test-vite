import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HomeIcon, UserIcon, SettingsIcon } from "@heroicons/react/outline";

const SideNav = ({ title, icon, link, active }) => {
    return (
        <Link
            to={link}
            className={`flex items-center gap-4 rounded-lg p-4 ${
                active
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-200"
            }`}
        >
            {icon}
            <span className="text-lg font-medium">{title}</span>
        </Link>
    );
};

const App = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setOpen(true);
            } else {
                setOpen(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Router>
            <div className="bg-gray-50 flex h-screen">
                <div
                    className={`fixed top-0 left-0 z-10 h-full w-64 transform bg-white shadow-lg transition duration-300 ease-in-out ${
                        open ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <div className="flex items-center justify-between border-b p-4">
                        <h1 className="text-gray-800 text-xl font-bold">
                            Minimals
                        </h1>
                        <button
                            className="text-gray-600 focus:outline-none"
                            onClick={() => setOpen(!open)}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 p-4">
                        <SideNav
                            title="Home"
                            icon={<HomeIcon className="h-6 w-6" />}
                            link="/"
                            active
                        />
                        <SideNav
                            title="Profile"
                            icon={<UserIcon className="h-6 w-6" />}
                            link="/profile"
                        />
                        <SideNav
                            title="Settings"
                            icon={<SettingsIcon className="h-6 w-6" />}
                            link="/settings"
                        />
                    </div>
                </div>
                <div className="flex flex-1 flex-col overflow-hidden">
                    <div className="flex items-center justify-between border-b p-4">
                        <button
                            className="text-gray-600 focus:outline-none lg:hidden"
                            onClick={() => setOpen(!open)}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-800">Hello, User</span>
                            <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="User"
                                className="h-8 w-8 rounded-full"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        <Switch>
                            <Route exact path="/">
                                <h1 className="text-gray-800 text-3xl font-bold">
                                    Home
                                </h1>
                                <p className="text-gray-600 mt-4">
                                    This is the home page content.
                                </p>
                            </Route>
                            <Route path="/profile">
                                <h1 className="text-gray-800 text-3xl font-bold">
                                    Profile
                                </h1>
                                <p className="text-gray-600 mt-4">
                                    This is the profile page content.
                                </p>
                            </Route>
                            <Route path="/settings">
                                <h1 className="text-gray-800 text-3xl font-bold">
                                    Settings
                                </h1>
                                <p className="text-gray-600 mt-4">
                                    This is the settings page content.
                                </p>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
