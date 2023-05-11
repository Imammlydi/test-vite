import React from "react";
import Button1 from "./Button1";

const CardItem2 = ({ title, desc, image, date, href, state }) => {
    const IcApprove = () => {
        return (
            <div className="absolute">
                <svg
                    width="29"
                    height="28"
                    viewBox="0 0 29 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g filter="url(#filter0_d_314_74)">
                        <path
                            d="M24 13.4955L21.7818 10.9718L22.0909 7.63115L18.8091 6.88677L17.0909 4L14 5.32537L10.9091 4L9.19091 6.88677L5.90909 7.62207L6.21818 10.9627L4 13.4955L6.21818 16.0191L5.90909 19.3688L9.19091 20.1132L10.9091 23L14 21.6656L17.0909 22.9909L18.8091 20.1042L22.0909 19.3598L21.7818 16.0191L24 13.4955ZM12.1818 18.0344L8.54545 14.4032L9.82727 13.1233L12.1818 15.4654L18.1727 9.48304L19.4545 10.7721L12.1818 18.0344Z"
                            fill="#405EFF"
                        />
                    </g>
                    <defs>
                        <filter
                            id="filter0_d_314_74"
                            x="0.5"
                            y="0.5"
                            width="28"
                            height="27"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dx="0.5" dy="0.5" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.19 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_314_74"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_314_74"
                                result="shape"
                            />
                        </filter>
                    </defs>
                </svg>
            </div>
        );
    };

    const Avatar = ({ imageUrl, altText }) => {
        return (
            <div className="mx-1 inline-block h-7 w-7 overflow-hidden rounded-full shadow-lg">
                <img
                    src={imageUrl}
                    alt={altText}
                    className="h-full w-full object-cover"
                />
            </div>
        );
    };

    return (
        <div className="relative   max-w-sm overflow-hidden rounded bg-white shadow-lg">
            <IcApprove />
            <img className="h-40 w-full object-cover " src={image} alt="new" />
            <div class="px-6 py-2">
                <div class="text-md mb-0 font-Bitter font-bold">{title}</div>
                <p class="text-gray-700 font-Bitter text-base">{desc}</p>
                <p class="text-gray-700 font-Bitter text-base">{date}</p>
            </div>
            <div class="flex justify-between px-3 pb-2 pt-1">
                {/* <span class="bg-gray-200 text-gray-700 mr-2 mb-2 inline-block rounded-full px-2 py-1 text-sm font-semibold">
                    #photography
                </span>
                <span class="bg-gray-200 text-gray-700 mr-2 mb-2 inline-block rounded-full px-2 py-1 text-sm font-semibold">
                    #travel
                </span> */}
                {/* <button className="rounded border-none bg-primary py-2 px-4 font-bold text-textWhite hover:bg-textPrimary">
                    Button
                </button> */}
                <div className="flex items-center">
                    <Avatar
                        imageUrl={
                            "https://media.istockphoto.com/id/1423181290/id/foto/potret-headshot-wanita-muda-yang-serius-menatap-kamera-berpose-di-dalam-ruangan.jpg?s=612x612&w=0&k=20&c=sFeH7Heb93ju2Hj8_4Sf3Kmtfyf2-jZ-Q3bE01VVw04="
                        }
                        altText={"avatar"}
                    />
                    <div>
                        <h4 className="font-Bitter text-sm">Almira</h4>
                    </div>
                </div>
                <Button1 Title={"Go"} href={href} state={state} />
            </div>
        </div>
    );
};

export default CardItem2;
