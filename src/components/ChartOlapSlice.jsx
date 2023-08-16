import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const ChartOlapSlice = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/olap/slice"
                ); // Ganti 'URL_API_ANDA' dengan URL API yang sesuai
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const formatData = () => {
        const categories = Object.keys(data);
        const series = Object.values(data).map((item) => item.length);

        return {
            options: {
                chart: {
                    horizontal: true,
                },
                xaxis: {
                    categories: categories,
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
                                    color: "#0000FF", // Warna untuk rentang 11-15
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
        <div className="mx-auto w-full max-w-lg p-4 shadow-lg">
            <Chart
                options={formatData().options}
                series={formatData().series}
                type="bar"
                height={400}
                // width={300}
            />
            <div className="rounded-md bg-green1 p-2 shadow-md">
                <p className="my-2 text-center font-Bitter text-white">
                    Data Semua Laporan{" "}
                </p>
            </div>
            <p className="my-2 font-Bitter  ">Metode OLAP - Slice </p>
        </div>
    );
};

export default ChartOlapSlice;
