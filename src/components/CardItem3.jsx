import React from "react";

const CardItem3 = () => {
    return (
        <div className="bg-red   max-w-sm overflow-hidden rounded shadow-lg">
            <div class="px-6 py-4">
                <div class="mb-2 text-xl font-bold">The Coldest Sunset</div>
                <p class="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus quia, nulla! Maiores et perferendis eaque,
                    exercitationem praesentium nihil.
                </p>
            </div>
            <div class="flex flex-row-reverse px-3 pb-2 pt-1">
                {/* <span class="bg-gray-200 text-gray-700 mr-2 mb-2 inline-block rounded-full px-2 py-1 text-sm font-semibold">
                    #photography
                </span>
                <span class="bg-gray-200 text-gray-700 mr-2 mb-2 inline-block rounded-full px-2 py-1 text-sm font-semibold">
                    #travel
                </span> */}
                <button className="rounded border-none bg-primary px-4 py-2 font-bold text-textWhite hover:bg-textPrimary">
                    Button
                </button>
            </div>
        </div>
    );
};

export default CardItem3;
