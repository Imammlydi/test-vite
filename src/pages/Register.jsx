import React from "react";
import Case from "../components/Case";
export default function Register() {
    return (
        // <Case>
        <div className="mx-auto px-4 md:items-center md:px-8 lg:max-w-7xl ">
            <h4 className="text-2xl">Register</h4>
            <div class="w-full max-w-xs">
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
            <p className="text-gray-400 text-lg leading-relaxed">
                The best, you are the best...
            </p>
        </div>
        // </Case>
    );
}
