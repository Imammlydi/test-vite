import React, { useEffect, useState } from "react";
import { CardItem4 } from "../components";
import { urlGetAllReport } from "../services/url";
import { fetchDataWithJWT } from "../services";
import { handleLogins } from "../services/login";
import {
    getAllReports,
    getReportApproveByIdInspector,
} from "../services/reports";
import ConstructionProject from "../components/ConstructionProject";
import { getTotalJam } from "../services/jamKerja";
import Chart from "react-apexcharts";
import ChartOlapSlice from "../components/ChartOlapSlice";
import ChartOlapDice from "../components/ChartOlapDice";
import ChartOlapRollUp from "../components/ChartOlapRollUp";
import ChartOlapDrillDown from "../components/ChartOlapDrillDown";
import ChartSlice_Dice from "../components/ChartSlice_Dice";
import ChartVisual from "../components/ChartVisual";
import ReactPivots from "../components/ReactPivots";
// import ReactPivots from "../components/ReactPivots";

export default function Home() {
    const [token, seToken] = useState(null);
    const [approve, setApprove] = useState(null);

    // async function fetchDataWithJWT(url, tokenx) {
    //   try {
    //     const response = await fetch(url, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "auth_token": tokenx
    //       }
    //     });
    //     return await response.json();
    //   } catch (error) {
    //     console.error('There was a problem with the fetch operation:', error);
    //   }
    // }

    useEffect(() => {
        const tokens = localStorage.getItem("token");
        const name = localStorage.getItem("name");
        const field = localStorage.getItem("field");
        const id_inspector = localStorage.getItem("id_inspector");
        seToken(tokens);
        getReportApproveByIdInspector(id_inspector, tokens).then((x) => {
            console.log(x), setApprove(x);
        });
        getAllReports(tokens).then((x) => {
            console.log(x);
        });

        var jamMasuk = "19:36";
        var jamKeluar = "01:45";

        var totalJam = getTotalJam(jamMasuk, jamKeluar);
        console.log("Totalm jam : -----", totalJam);

        console.log(
            "---------",
            token,
            "----",
            id_inspector,
            "---",
            name,
            field
        );
    }, [token]);

    const [options, setOptions] = useState({
        chart: {
            id: "basic-bar",
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
    });

    const [series, setSeries] = useState([
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
    ]);

    return (
        // <div className="  mx-auto px-4 pt-1 md:items-center md:px-8 lg:max-w-7xl mb-6  ">
        <>
            <div className=" ">
                <ReactPivots />
                {/* <div>kjij</div> */}
                {/* <ChartSlice_Dice />
            <ChartOlapSlice />
            <ChartOlapDice token={token} />
            <ChartOlapRollUp />
            <ChartOlapDrillDown />
            <ChartVisual/> */}
                {/* <CardItem4
                title={"Progress Powerhouse Area"}
                value={"50%"}
                type={"white"}
                bg={"white"}
            />
            <CardItem4
                title={"Progress Powerhouse Area"}
                value={"50%"}
                bg={"red"}
                type={"white"}
            />
            <CardItem4
                title={"Progress Powerhouse Area"}
                value={"50%"}
                bg={"yellow"}
            /> */}
                {/* <ConstructionProject /> */}
            </div>
            {/* <div className="mx-auto flex grid grid-cols-1 gap-4 px-4 pt-8 md:grid-cols-2 md:px-8 lg:max-w-7xl lg:grid-cols-3 lg:gap-1  ">
            <ReactPivots />
   
        </div> */}
        </>

        // </div>
    );
}
