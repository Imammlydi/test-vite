import React, { useState, useEffect } from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import { BackButton } from "../components";
import { createItem, createItemLogin, fetchLogin } from "../services";
import { urlAuthLogin } from "../services/url";
import jwt_decode from "jwt-decode";

export default function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const initialFormState = {
        // id: "",
        email: "",
        password: "",
    };

    const fetchLogin = async () => {
        try {
            const response = await fetch(urlAuthLogin, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const datax = await response.json();
            var decoded = jwt_decode(datax.token);
            console.table(decoded);
            // alert(datax);
        } catch (error) {
            console.error(error);
        }
    };

    const [data, setData] = useState(initialFormState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setData({ ...data, [name]: value });
    };
    const sendData = () => {
        console.log("called", data);

        fetchLogin(data);
    };

    const onSubmitData = (event) => {
        event.preventDefault();
        // seFetcReports(idInspector,datas)
        console.log("called", data);
    };

    ///Login

    function Login() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const handleEmailChange = (event) => {
            setEmail(event.target.value);
        };

        const handlePasswordChange = (event) => {
            setPassword(event.target.value);
        };

        const handleFormSubmit = (event) => {
            event.preventDefault();

            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            };
            console.log(requestOptions);

            fetch(urlAuthLogin, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    var decoded = jwt_decode(data.token);
                    setIsLoggedIn(true);
                    console.log(data.token);
                    console.log(decoded.exp);
                    const expToken = decoded.exp;
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("exp", JSON.stringify(expToken));

                    // if (decoded.exp < Date.now() / 1000) {
                    //     // token sudah kadaluarsa
                    //     console.log("Token sudah kadaluarsa");
                    // } else {
                    //     // token masih berlaku
                    //     console.log("Token masih berlaku");
                    // }
                })
                .catch((error) => console.error(error));
        };

        if (isLoggedIn) {
            return <Navigate to="/" replace />;
        }

        return (
            <div className="w-full max-w-md rounded bg-white shadow-md">
                <div className="w-full max-w-lg space-y-8 rounded-lg bg-white p-8 shadow-lg">
                    <h2 className="text-gray-700 my-4 block text-center font-Bitter text-xl font-bold">
                        Login
                    </h2>

                    <form onSubmit={handleFormSubmit}>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="text-gray-700 text-md mb-2 block font-Bitter"
                            >
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                className="border-1 text-slate-50 focus:ring-sky-500 mb-3 w-full appearance-none   rounded border border-graydisable     px-3 py-2 font-Bitter leading-tight  focus:border-primary focus:outline-none focus:ring-1"
                            />
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="text-gray-700 text-md mb-2 block font-Bitter"
                            >
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="border-1 text-slate-50 focus:ring-sky-500 mb-3 w-full appearance-none   rounded border border-graydisable     px-3 py-2 font-Bitter leading-tight  focus:border-primary focus:outline-none focus:ring-1"
                            />
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                className="bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600 w-full rounded-md py-2 px-4 font-bold text-primary focus:outline-none"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // const LoginForm = () => {
    //     return (
    //         <div class="w-full max-w-md rounded bg-white shadow-md">
    //             <div className="flex justify-center">
    //                 <h2 className="text-gray-700 my-4 block font-Bitter text-xl font-bold">
    //                     Login
    //                 </h2>
    //             </div>
    //             <form class="mb-4   px-8 pb-8 pt-6 " onSubmit={onSubmitData}>
    //                 <div class="mb-4">
    //                     <label
    //                         class="text-gray-700 text-md mb-2 block font-Bitter "
    //                         for="username"
    //                     >
    //                         Username
    //                     </label>
    //                     <input
    //                         className="border-1 text-slate-50 focus:ring-sky-500 mb-3 w-full appearance-none   rounded border border-graydisable     px-3 py-2 font-Bitter leading-tight  focus:border-primary focus:outline-none focus:ring-1 "
    //                         // id="email"
    //                         type="email"
    //                         name="email"
    //                         value={data.email}
    //                         placeholder="Email"
    //                         onChange={handleInputChange}
    //                     />
    //                 </div>
    //                 <div class="mb-6">
    //                     <label
    //                         class="text-gray-700 text-md mb-2 block font-Bitter "
    //                         for="password"
    //                     >
    //                         Password
    //                     </label>
    //                     <input
    //                         className="border-1 focus:ring-sky-900 mb-3 w-full appearance-none   rounded border   border-graydisable   px-3  py-2 font-Bitter leading-tight text-primary  focus:border-primary focus:outline-none focus:ring-1  "
    //                         // id="password"
    //                         type="password"
    //                         name="password"
    //                         value={data.password}
    //                         placeholder="password"
    //                         onChange={handleInputChange}
    //                     />
    //                     <p class="text-red-500 font-Bitter text-xs  italic">
    //                         Please choose a password.
    //                     </p>
    //                 </div>
    //                 <div class="flex items-center justify-between">
    //                     <button
    //                         class="focus:shadow-outline rounded bg-primary px-4 py-2 font-Bitter font-bold text-white hover:bg-textPrimary  focus:outline-none"
    //                         type="button"
    //                         onClick={sendData}
    //                     >
    //                         Sign In
    //                     </button>
    //                     <a
    //                         class="text-blue-500 hover:text-blue-800 inline-block align-baseline font-Bitter text-sm font-bold"
    //                         href="#"
    //                     >
    //                         Forgot Password?
    //                     </a>
    //                 </div>
    //             </form>
    //         </div>
    //     );
    // };

    return (
        <div className=" min-h-screen  w-full w-screen bg-secondary ">
            <div className="  py-5 pl-2 md:pl-4 lg:pl-5 xl:pl-5 ">
                <BackButton href={"/"} />
            </div>
            <div className="  xl:px6  mx-auto flex justify-center px-2 md:px-6 ">
                {/* <LoginForm /> */}
                <Login />
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
