import React from "react";

const CardItem3 = () => {
    return (
        <div className="max-w-sm   overflow-hidden rounded bg-red shadow-lg">
             
            <div class="px-6 py-4">
                <div class="mb-2 text-xl font-bold">The Coldest Sunset</div>
                <p class="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus quia, nulla! Maiores et perferendis eaque,
                    exercitationem praesentium nihil.
                </p>
            </div>
            <div class="px-3 pt-1 pb-2 flex flex-row-reverse">
                {/* <span class="bg-gray-200 text-gray-700 mr-2 mb-2 inline-block rounded-full px-2 py-1 text-sm font-semibold">
                    #photography
                </span>
                <span class="bg-gray-200 text-gray-700 mr-2 mb-2 inline-block rounded-full px-2 py-1 text-sm font-semibold">
                    #travel
                </span> */}
                <button className="bg-primary hover:bg-textPrimary border-none text-textWhite font-bold py-2 px-4 rounded">
                    Button
                    </button>
            </div>
        </div>
    );
};

export default CardItem3;
