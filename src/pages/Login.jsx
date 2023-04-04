import React from "react";
import Case from "../components/Case";
export default function Login() {
    const LoginForm = () => {
        return (
            <div class="w-full max-w-md ">
                <form class="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
                    <div class="mb-4">
                        <label
                            class="text-gray-700 mb-2 block text-sm font-bold"
                            for="username"
                        >
                            Username
                        </label>
                        <input
                            className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight shadow focus:outline-none"
                            id="username"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div class="mb-6">
                        <label
                            class="text-gray-700 mb-2 block text-sm font-bold"
                            for="password"
                        >
                            Password
                        </label>
                        <input
                            className="border-red-500 text-gray-700 focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight shadow focus:outline-none"
                            id="password"
                            type="password"
                            placeholder="******************"
                        />
                        <p class="text-red-500 text-xs italic">
                            Please choose a password.
                        </p>
                    </div>
                    <div class="flex items-center justify-between">
                        <button
                            class="focus:shadow-outline rounded bg-primary py-2 px-4 font-bold text-white hover:bg-secondary focus:outline-none"
                            type="button"
                        >
                            Sign In
                        </button>
                        <a
                            class="text-blue-500 hover:text-blue-800 inline-block align-baseline text-sm font-bold"
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
        // <Case>
        <div className="mt-8 w-full   w-screen">
            <div className="  mx-auto  grid grid-cols-1 gap-1 px-4 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-2 lg:gap-1">
                <LoginForm />
                <div className="xs:hidden ">
                    <img
                        src="https://images.unsplash.com/photo-1680457405591-5b20bbf782dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        alt="new"
                    />
                </div>
            </div>
        </div>
        // </Case>
    );
}
