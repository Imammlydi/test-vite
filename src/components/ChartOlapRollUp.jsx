import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const ChartOlapRollUp = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/olap/roll-up",
                    {
                        //   headers: {
                        //     Authorization: `Bearer TOKEN_JWT_ANDA`,
                        //   },
                    }
                ); // Ganti 'URL_API_ANDA' dengan URL API yang sesuai
                setData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const formatData = () => {
        const categories = data.map((item) => item.discipline);
        const series = data.map((item) => item.total_reports);

        return {
            options: {
                chart: {
                    fontFamily: "Arial", // Ganti dengan gaya font yang diinginkan
                },
                xaxis: {
                    categories: categories,
                    labels: {
                        style: {
                            fontFamily: "Arial", // Ganti dengan gaya font yang diinginkan
                        },
                    },
                },
                plotOptions: {
                    bar: {
                        colors: {
                            ranges: [
                                {
                                    from: 0,
                                    to: 5,
                                    color: "#2ab850", // Warna untuk rentang 0-5
                                },
                                {
                                    from: 6,
                                    to: 10,
                                    color: "#2ab850", // Warna untuk rentang 6-10
                                },
                                {
                                    from: 11,
                                    to: 15,
                                    color: "#2ab850", // Warna untuk rentang 11-15
                                },
                            ],
                        },
                    },
                },
            },
            series: [
                {
                    data: series,
                },
            ],
        };
    };

    return (
        <div className="mx-auto w-full max-w-lg rounded-sm p-4 shadow-lg">
            <Chart
                options={formatData().options}
                series={formatData().series}
                type="bar"
                height={400}
            />
            <div className="rounded-md bg-green1 p-2 shadow-md">
                <p className="my-2 text-center font-Bitter text-white">
                    Laporan Berdasarkan Disiplin Pekerjaan
                </p>
            </div>
            <p className="my-2 font-Bitter  ">Metode OLAP - Roll Up </p>
        </div>
    );
};

export default ChartOlapRollUp;
