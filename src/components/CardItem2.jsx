import React from "react";

const CardItem2 = () => {
    return (
        <div className="max-w-sm   overflow-hidden rounded bg-white shadow-lg">
            <img
                src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                alt="new"
            />
            <div class="px-6 py-4">
                <div class="mb-2 text-xl font-bold">The Coldest Sunset</div>
                <p class="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus quia, nulla! Maiores et perferendis eaque,
                    exercitationem praesentium nihil.
                </p>
            </div>
            <div class="flex flex-row-reverse px-3 pt-1 pb-2">
                {/* <span class="bg-gray-200 text-gray-700 mr-2 mb-2 inline-block rounded-full px-2 py-1 text-sm font-semibold">
                    #photography
                </span>
                <span class="bg-gray-200 text-gray-700 mr-2 mb-2 inline-block rounded-full px-2 py-1 text-sm font-semibold">
                    #travel
                </span> */}
                <button className="rounded border-none bg-primary py-2 px-4 font-bold text-textWhite hover:bg-textPrimary">
                    Button
                </button>
            </div>
        </div>
    );
};

export default CardItem2;
