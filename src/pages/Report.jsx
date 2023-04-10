import React from "react";
import { CardItem1, CardItem2, CardItem3 } from "../components";

export default function Report() {
    const Search = () => {
        return (
            <form class="mb-4    pt-1 ">
                <div class="mb-1">
                    <input
                        className="border-1 text-slate-50 focus:ring-sky-500  appearance-none rounded   border border-graydisable py-3     px-3 font-Bitter leading-tight focus:border-primary  focus:outline-none focus:ring-1 lg:max-w-5xl "
                        id="search"
                        type="text"
                        placeholder="search"
                    />
                    <button
                        class="focus:shadow-outline ml-2 rounded bg-white py-2 px-4 font-Bitter font-bold text-white hover:bg-textPrimary  focus:outline-none"
                        type="button"
                    >
                        search
                    </button>
                </div>
            </form>
        );
    };

    return (
        <>
            <div className="mx-auto grid grid-cols-1 gap-4 px-4 pt-8 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-2 lg:gap-1 ">
                <Search />
            </div>
            <div className="mx-auto mb-3 flex gap-4 px-4 pt-8 md:px-8 lg:max-w-7xl ">
                <h5 className="text-textPrimary">Category1</h5>
                <h5 className="text-textPrimary">Category1</h5>
                <h5 className="text-textPrimary">Category1</h5>
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
