import React from "react";

const CardItem1 = () => {
    return (
        <div className="max-w-sm   overflow-hidden rounded bg-white shadow-lg">
            <div class="px-6 py-4">
                <div class="mb-2 text-xl font-bold ">The Coldest Sunset</div>
                <p class="text-gray-700 font-Bitter text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus quia, nulla! Maiores et perferendis eaque,
                    exercitationem praesentium nihil.
                </p>
            </div>
            <div class="px-3 pb-2 pt-4">
                <span class="bg-gray-200 text-gray-700 mb-2 mr-2 inline-block rounded-full px-2 py-1 text-sm font-semibold">
                    #photography
                </span>
                <span class="bg-gray-200 text-gray-700 mb-2 mr-2 inline-block rounded-full px-2 py-1 text-sm font-semibold">
                    #travel
                </span>
                <span class="bg-gray-200 text-gray-700 mb-2 mr-2 inline-block rounded-full px-2 py-1 text-sm font-semibold">
                    #winter
                </span>
            </div>
        </div>
    );
};

export default CardItem1;
