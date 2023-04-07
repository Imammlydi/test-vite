import React from "react";
import { CardItem1, CardItem2, CardItem3 } from "../components";

export default function Report() {
    const Search = () => {
        return (
            <form class="mb-4    pt-1 pb-2 ">
                <div class="mb-4">
                    <input
                        className="border-1 text-slate-50 focus:ring-sky-500 mb-3 w-full appearance-none   rounded border border-graydisable     py-2 px-3 font-Bitter leading-tight  focus:border-primary focus:outline-none focus:ring-1 "
                        id="search"
                        type="text"
                        placeholder="search"
                    />
                </div>
                {/* <div class="flex items-center justify-between">
                        <button
                            class="focus:shadow-outline rounded bg-primary py-2 px-4 font-Bitter font-bold text-white hover:bg-textPrimary  focus:outline-none"
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
                    </div> */}
            </form>
        );
    };

    return (
        <>
            <div className="mx-auto grid grid-cols-1 gap-4 px-4 pt-8 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-2 lg:gap-1">
                <Search />
            </div>
            <div class="mx-auto grid grid-cols-1 gap-4 px-4 pt-1 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-4 lg:gap-1">
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
                <CardItem2 />
            </div>
        </>
    );
}
