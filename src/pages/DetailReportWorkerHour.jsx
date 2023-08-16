import React, { useEffect, useState } from "react";
import { BackButton, CardItem2, CardItem4 } from "../components";
import { useLocation } from "react-router-dom";
import { fetchGetReportById } from "../services";
import CardItem5 from "../components/CardItem5";

const DetailReportWorkerHour = () => {
    // const { state } = useLocation();
    // const idReport = state;
    // const [image,setImage]=useState([])
    // // `http://localhost:5000/${image.imageUrl}`
    // const fetchGetReportById = async () => {
    //     try {
    //         const response = await fetch(
    //             `http://localhost:5000/report/viewReport/${idReport}`
    //         );
    //         const data = await response.json();
    //         // console.log('----',data.data[0].image);
    //         setImage(data.data[0].image)
    //         // console.table(data.data[0]);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchGetReportById();
    //     console.log(image)
    // }, [idReport]);

    return (
        <div className=" min-h-screen  w-full w-screen  ">
            <div className="  py-5 pl-2 md:pl-4 lg:pl-5 xl:pl-5 ">
                <BackButton href={"/report"} />
            </div>

            <h2>WorkerHour</h2>
        </div>
    );
};

export default DetailReportWorkerHour;
