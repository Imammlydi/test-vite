import React from "react";
import Button1 from "./Button1";

const CardItem2 = ({ title, desc, image }) => {
    return (
        <div className="max-w-sm   overflow-hidden rounded bg-white shadow-lg">
            <img className="h-40 w-full" src={image} alt="new" />
            <div class="px-6 py-4">
                <div class="text-md mb-2 font-bold">{title}</div>
                <p class="text-gray-700 text-base">{desc}</p>
            </div>
            <div class="flex flex-row-reverse px-3 pb-2 pt-1">
                {/* <span class="bg-gray-200 text-gray-700 mr-2 mb-2 inline-block rounded-full px-2 py-1 text-sm font-semibold">
                    #photography
                </span>
                <span class="bg-gray-200 text-gray-700 mr-2 mb-2 inline-block rounded-full px-2 py-1 text-sm font-semibold">
                    #travel
                </span> */}
                {/* <button className="rounded border-none bg-primary py-2 px-4 font-bold text-textWhite hover:bg-textPrimary">
                    Button
                </button> */}
                <Button1 Title={"Go"} href={"/detail_report"} />
            </div>
        </div>
    );
};

export default CardItem2;
