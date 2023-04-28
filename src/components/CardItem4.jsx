import React from "react";

const CardItem1 = ({ title, value, type, bg }) => {
    const Chart1 = () => {
        return (
            <div className="absolute bottom-6 right-12">
                <svg
                    width="55"
                    height="55"
                    viewBox="0 0 90 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M80 0H10C4.5 0 0 4.5 0 10V80C0 85.5 4.5 90 10 90H80C85.5 90 90 85.5 90 80V10C90 4.5 85.5 0 80 0ZM25 70C22.25 70 20 67.75 20 65V40C20 37.25 22.25 35 25 35C27.75 35 30 37.25 30 40V65C30 67.75 27.75 70 25 70ZM45 70C42.25 70 40 67.75 40 65V25C40 22.25 42.25 20 45 20C47.75 20 50 22.25 50 25V65C50 67.75 47.75 70 45 70ZM65 70C62.25 70 60 67.75 60 65V55C60 52.25 62.25 50 65 50C67.75 50 70 52.25 70 55V65C70 67.75 67.75 70 65 70Z"
                        fill="white"
                    />
                </svg>
            </div>
        );
    };
    const Chart2 = () => {
        return (
            <div className="absolute bottom-6 right-12">
                <svg
                    width="55"
                    height="55"
                    viewBox="0 0 90 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M80 0H10C4.5 0 0 4.5 0 10V80C0 85.5 4.5 90 10 90H80C85.5 90 90 85.5 90 80V10C90 4.5 85.5 0 80 0ZM25 70C22.25 70 20 67.75 20 65V40C20 37.25 22.25 35 25 35C27.75 35 30 37.25 30 40V65C30 67.75 27.75 70 25 70ZM45 70C42.25 70 40 67.75 40 65V25C40 22.25 42.25 20 45 20C47.75 20 50 22.25 50 25V65C50 67.75 47.75 70 45 70ZM65 70C62.25 70 60 67.75 60 65V55C60 52.25 62.25 50 65 50C67.75 50 70 52.25 70 55V65C70 67.75 67.75 70 65 70Z"
                        fill="#1C0808"
                    />
                </svg>
            </div>
        );
    };
    return (
        <div
            className={
                bg === "white"
                    ? "relative   max-w-sm overflow-hidden rounded bg-blue1 shadow-lg"
                    : bg === "red"
                    ? "relative   max-w-sm overflow-hidden rounded bg-red1 shadow-lg"
                    : bg === "yellow"
                    ? "relative   max-w-sm overflow-hidden rounded bg-yellow1 shadow-lg"
                    : "relative   max-w-sm overflow-hidden rounded bg-blue1 shadow-lg"
            }
        >
            {type === "white" ? <Chart1 /> : <Chart2 />}
            <div class="px-6 py-4">
                <div
                    class={
                        type === "white"
                            ? "mb-2 font-Bitter text-xl font-bold text-white "
                            : "text-black mb-2 font-Bitter text-xl font-bold "
                    }
                >
                    {title}
                </div>
                <div
                    class={
                        type === "white"
                            ? "my-4 font-Bitter text-4xl font-bold text-white  "
                            : "text-black my-4 font-Bitter text-4xl font-bold  "
                    }
                >
                    {value}
                </div>
            </div>
        </div>
    );
};

export default CardItem1;
