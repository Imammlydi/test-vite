import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const ChartOlapDrillDown = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/olap/drill-down",
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
        const series = data.map((item) => item.report.length);

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
            },
            series: [
                {
                    data: series,
                },
            ],
        };
    };

    return (
        <div className="mx-auto w-full max-w-lg">
            <Chart
                options={formatData().options}
                series={formatData().series}
                type="bar"
                height={400}
            />
        </div>
    );
};

export default ChartOlapDrillDown;
