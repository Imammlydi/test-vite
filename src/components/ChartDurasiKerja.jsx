import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getWorkerHoursByReportId } from "../services/wokerHours";

const ChartDurasiKerja = ({ idReport, tokens, durasikerja, fetchDurasi }) => {
    // const [durasikerja, setDurasikerja] = useState([]);

    // const fetchDurasi = async (idReport, tokens) => {
    //     const data = await getWorkerHoursByReportId(idReport, tokens);
    //     console.log('durasinya ----',data);
    //     //  onDataUpdated();
    //     setDurasikerja(data);

    // };

    // useEffect(() => {
    //     console.log('==========betaya')
    //     fetchDurasi(idReport, tokens)
    // }, [])

    const categories = durasikerja.map((item) => item.working_name);
    const series = [
        {
            name: "Length",
            data: durasikerja.map((item) => item.length),
        },
    ];

    const options = {
        chart: {
            type: "bar",
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 5,
            },
        },
        xaxis: {
            categories,
        },
        stroke: {
            width: 1, // Atur nilai ini sesuai keinginan Anda
        },
    };

    return (
        <>
            <div className="mt-2 rounded-md border p-2 shadow-lg">
                <p className="p-2 font-Bitter font-bold">Working Duration</p>
                <Chart
                    options={options}
                    series={series}
                    type="bar"
                    height={150}
                    width={500}
                />
            </div>
            {/* <button onClick={fetchDurasi}>Refresh</button> */}
        </>
    );
};

export default ChartDurasiKerja;
