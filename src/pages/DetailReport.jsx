import React, { useEffect } from "react";
import { BackButton, CardItem2, CardItem4 } from "../components";
import { useLocation } from "react-router-dom";
import { fetchGetReportById } from "../services";
import CardItem5 from "../components/CardItem5";

const DetailReport = () => {
    const { state } = useLocation();
    const idReport = state;

    const fetchGetReportById = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/report/viewReport/${idReport}`
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // console.log(state)
        fetchGetReportById();
    }, [idReport]);

    return (
        <div className=" min-h-screen  w-full w-screen  ">
            <div className="  py-5 pl-2 md:pl-4 lg:pl-5 xl:pl-5 ">
                <BackButton href={"/report"} />
            </div>

            <CardItem5 title={idReport} />
        </div>
    );
};

export default DetailReport;
