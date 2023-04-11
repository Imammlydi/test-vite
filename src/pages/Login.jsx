import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BackButton } from "../components";

export default function Login() {
    const LoginForm = () => {
        return (
            <div class="w-full max-w-md rounded bg-white shadow-md">
                <div className="flex justify-center">
                    <h2 className="text-gray-700 my-4 block font-Bitter text-xl font-bold">
                        Login
                    </h2>
                </div>
                <form class="mb-4   px-8 pb-8 pt-6 ">
                    <div class="mb-4">
                        <label
                            class="text-gray-700 text-md mb-2 block font-Bitter "
                            for="username"
                        >
                            Username
                        </label>
                        <input
                            className="border-1 text-slate-50 focus:ring-sky-500 mb-3 w-full appearance-none   rounded border border-graydisable     px-3 py-2 font-Bitter leading-tight  focus:border-primary focus:outline-none focus:ring-1 "
                            id="username"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div class="mb-6">
                        <label
                            class="text-gray-700 text-md mb-2 block font-Bitter "
                            for="password"
                        >
                            Password
                        </label>
                        <input
                            className="border-1 focus:ring-sky-900 mb-3 w-full appearance-none   rounded border   border-graydisable   px-3  py-2 font-Bitter leading-tight text-primary  focus:border-primary focus:outline-none focus:ring-1  "
                            id="password"
                            type="password"
                            placeholder="password"
                        />
                        <p class="text-red-500 font-Bitter text-xs  italic">
                            Please choose a password.
                        </p>
                    </div>
                    <div class="flex items-center justify-between">
                        <button
                            class="focus:shadow-outline rounded bg-primary px-4 py-2 font-Bitter font-bold text-white hover:bg-textPrimary  focus:outline-none"
                            type="button"
                        >
                            Sign In
                        </button>
                        <a
                            class="text-blue-500 hover:text-blue-800 inline-block align-baseline font-Bitter text-sm font-bold"
                            href="#"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className=" min-h-screen  w-full w-screen bg-secondary ">
            <div className="  py-5 pl-2 md:pl-4 lg:pl-5 xl:pl-5 ">
                <BackButton href={"/"} />
            </div>
            <div className="  xl:px6  mx-auto flex justify-center px-2 md:px-6 ">
                <LoginForm />
            </div>
            {/* <div className="  mx-auto  grid grid-cols-1 gap-1 px-4 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-2 lg:gap-1">
                <LoginForm />
                <div className="xs:hidden ">
                    <img
                        src="https://images.unsplash.com/photo-1680457405591-5b20bbf782dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        alt="new"
                    />
                </div>
            </div> */}
        </div>
    );
}
