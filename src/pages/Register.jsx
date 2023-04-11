import React from "react";
import Case from "../components/Case";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Register() {
    const RegisterForm = () => {
        return (
            <div class="w-full max-w-md rounded bg-white shadow-md">
                <div className="flex justify-center">
                    <h2 className="text-gray-700 my-4 block font-Bitter text-xl font-bold">
                        Register
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

    const BackButton = ({ href }) => {
        return (
            <Link to={href}>
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8.82826 19.6049L0.35315 10.9136C0.224739 10.7819 0.133567 10.6392 0.0796345 10.4856C0.025702 10.3319 -0.000836007 10.1673 2.00644e-05 9.99174C2.00644e-05 9.81616 0.0269866 9.65155 0.0809191 9.49792C0.134852 9.34428 0.225595 9.20162 0.35315 9.06993L8.82826 0.378553C9.06368 0.137125 9.35817 0.0111447 9.71173 0.000609745C10.0653 -0.00992526 10.37 0.116055 10.626 0.378553C10.8828 0.61998 11.0168 0.921984 11.0279 1.28456C11.0391 1.64714 10.9158 1.95968 10.6581 2.22218L4.36599 8.67487H18.7159C19.0797 8.67487 19.3849 8.80129 19.6315 9.05413C19.878 9.30697 20.0009 9.61951 20 9.99174C20 10.3649 19.8771 10.6778 19.6315 10.9307C19.3858 11.1835 19.0806 11.3095 18.7159 11.3086H4.36599L10.6581 17.7613C10.8935 18.0027 11.0168 18.31 11.0279 18.6831C11.0391 19.0562 10.9158 19.3635 10.6581 19.6049C10.4227 19.8683 10.1231 20 9.75924 20C9.39541 20 9.08508 19.8683 8.82826 19.6049Z"
                        fill="black"
                    />
                </svg>
            </Link>
        );
    };

    return (
        // <Case>
        <div className=" min-h-screen  w-full w-screen bg-secondary ">
            <div className="  py-5 pl-2 md:pl-4 lg:pl-5 xl:pl-5 ">
                <BackButton href={"/"} />
            </div>
            <div className="  xl:px6  mx-auto flex justify-center px-2 md:px-6 ">
                <RegisterForm />
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
        // </Case>
    );
}
