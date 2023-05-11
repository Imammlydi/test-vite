import React from "react";
import Button1 from "./Button1";
import ModalReportWorker from "./ModalReportWorker";

const CardItem5 = ({ title, desc, image, date, href, state }) => {
    const ButtonDelete = (onClick) => {
        return (
            <>
                <button
                    className="flex justify-center rounded border-none bg-white hover:bg-blue1"
                    onClick={onClick}
                >
                    <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8 10.9L9.9 12.8C10.1 12.9833 10.3377 13.075 10.613 13.075C10.8883 13.075 11.1173 12.9833 11.3 12.8C11.5 12.6 11.6 12.3623 11.6 12.087C11.6 11.8117 11.5 11.5827 11.3 11.4L9.4 9.5L11.3 7.6C11.5 7.4 11.6 7.16234 11.6 6.887C11.6 6.61167 11.5 6.38267 11.3 6.2C11.1167 6 10.8873 5.9 10.612 5.9C10.3367 5.9 10.0993 6 9.9 6.2L8 8.1L6.1 6.2C5.91667 6 5.68734 5.9 5.412 5.9C5.13667 5.9 4.89934 6 4.7 6.2C4.51667 6.38334 4.425 6.61267 4.425 6.888C4.425 7.16334 4.51667 7.40067 4.7 7.6L6.6 9.5L4.7 11.4C4.51667 11.5833 4.425 11.8127 4.425 12.088C4.425 12.3633 4.51667 12.6007 4.7 12.8C4.9 12.9833 5.13767 13.075 5.413 13.075C5.68834 13.075 5.91734 12.9833 6.1 12.8L8 10.9ZM3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999337 16.5493 1 16V3C0.71667 3 0.479004 2.904 0.287004 2.712C0.0950036 2.52 -0.000663206 2.28267 3.4602e-06 2C3.4602e-06 1.71667 0.0960036 1.479 0.288004 1.287C0.480004 1.095 0.717337 0.999337 1 1H5C5 0.71667 5.096 0.479003 5.288 0.287003C5.48 0.0950034 5.71734 -0.000663206 6 3.46021e-06H10C10.2833 3.46021e-06 10.521 0.0960036 10.713 0.288004C10.905 0.480004 11.0007 0.717337 11 1H15C15.2833 1 15.521 1.096 15.713 1.288C15.905 1.48 16.0007 1.71734 16 2C16 2.28334 15.904 2.521 15.712 2.713C15.52 2.905 15.2827 3.00067 15 3V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3Z"
                            fill="#ED1C24"
                        />
                    </svg>
                </button>
            </>
        );
    };

    const Item = ({
        title,
        type,
        subtype,
        value1,
        value2,
        bacColor,
        textColor,
    }) => {
        return (
            <>
                <div className={` ${bacColor} py-1  `}>
                    <h5
                        className={`text-center font-Bitter text-sm font-bold text-${textColor} `}
                    >
                        {title}
                    </h5>
                </div>
                <div className=" mx-2 mt-1 mb-4 flex justify-between rounded-md border border-graydisable2 px-10 py-2 ">
                    <div className="">
                        <div>
                            <p className="font-Bitter text-xs  font-bold underline">
                                {type}
                            </p>
                        </div>
                        <div>
                            <p className="whitespace-pre-line font-Bitter text-xs ">
                                {value1}
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <div>
                            <p className="font-Bitter text-xs  font-bold underline">
                                {subtype}
                            </p>
                        </div>
                        <div>
                            <p className="whitespace-pre-line text-center font-Bitter text-xs">
                                {value2}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <ModalReportWorker />
                        <ButtonDelete />
                    </div>
                </div>
            </>
        );
    };
    const Items = ({}) => {
        return (
            <>
                <Item
                    title={"Worker"}
                    type={"Type of Worker"}
                    value1={"Foreman"}
                    subtype={"Qty"}
                    value2={5}
                    bacColor={"bg-blue1"}
                    textColor={"white"}
                />
                <Item
                    title={"Worker Hours"}
                    type={"Type of Worker"}
                    value1={"Foreman"}
                    subtype={"Qty"}
                    value2={5}
                    bacColor={"bg-secondary"}
                    textColor={"white"}
                />
                <Item
                    title={"Equipment"}
                    type={"Type of Worker"}
                    value1={"Foreman"}
                    subtype={"Qty"}
                    value2={5}
                    bacColor={"bg-red1"}
                    textColor={"white"}
                />
                <Item
                    title={"Weather"}
                    type={"Type of Worker"}
                    value1={"Foreman"}
                    subtype={"Qty"}
                    value2={5}
                    bacColor={"bg-yellow1"}
                />
            </>
        );
    };
  

    return (
        <div className="mx-auto grid grid-cols-1 gap-4 px-4 pt-1 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-3 lg:gap-2">
            <div className="rounded   bg-white pb-2 shadow-lg">
                <Items />
            </div>
        </div>
    );
};

export default CardItem5;
