import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";

const ConstructionProject = () => {
    const MonthlyReportChart = ({ data }) => {
        const options = {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: {
                    position: "top",
                },
            },
        };

        return (
            <div>
                <Bar data={data} options={options} />
            </div>
        );
    };

    const ContractorReportChart = ({ data }) => {
        const options = {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: {
                    position: "top",
                },
            },
        };

        return (
            <div>
                <Bar data={data} options={options} />
            </div>
        );
    };

    // Data laporan pengawasan pekerjaan kontraktor
    const data2 = {
        labels: ["Tunnel", "Powerhouse", "Regulating Dam"],
        datasets: [
            {
                label: "Skill Worker",
                data: [10, 15, 5], // Jumlah pekerja skill worker per area
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
            {
                label: "Unskill Worker",
                data: [8, 12, 4], // Jumlah pekerja unskill worker per area
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
            {
                label: "HSE",
                data: [6, 10, 3], // Jumlah pekerja HSE per area
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Leader",
                data: [6, 10, 3], // Jumlah pekerja HSE per area
                backgroundColor: "rgba(239, 143, 242",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const data = {
        labels: ["Tunnel", "Powerhouse", "Regulating Dam"],
        datasets: [
            {
                label: "Civil",
                data: [10, 15, 5], // Jumlah pekerja per area
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
            {
                label: "Electrical",
                data: [8, 12, 4],
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
            {
                label: "Mechanical",
                data: [6, 10, 3],
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const EquipmentChart = () => {
        const [equipmentData, setEquipmentData] = useState({});

        useEffect(() => {
            fetchEquipmentData();
        }, []);

        const fetchEquipmentData = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/equipment",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`, // Menggunakan bearer token
                        },
                    }
                );
                setEquipmentData(response.data.equipmentData);
                console.log(response.data.equipmentData);
            } catch (error) {
                console.error(error);
            }
        };

        const labels = Object.keys(equipmentData);
        const quantities = Object.values(equipmentData);

        const data = {
            labels: labels,
            datasets: [
                {
                    label: "Total Quantity",
                    data: quantities,
                    backgroundColor: "#6366F1",
                },
            ],
        };

        const options = {
            indexAxis: "y",
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    max: Math.max(...quantities) + 5,
                },
            },
        };
        useEffect(() => {}, [equipmentData]);

        return (
            <div className="container mx-auto p-4">
                <h1 className="mb-4 text-2xl font-bold">
                    Equipment Data Chart
                </h1>
                <Bar data={data} options={options} />
            </div>
        );
    };

    const ChartWh = () => {
        const [data, setData] = useState(null);

        useEffect(() => {
            fetchData();
        }, []);

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/working-hours",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`, // Menggunakan bearer token
                        },
                    }
                );
                const workingHoursData = response.data;

                const labels = Object.keys(workingHoursData);
                const values = Object.values(workingHoursData);

                const chartData = {
                    labels: labels,
                    datasets: [
                        {
                            label: "Total Working Hours",
                            data: values,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderWidth: 1,
                        },
                    ],
                };

                setData(chartData);
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <div>
                <h2 className="mb-4 text-2xl font-bold">Working Hours Chart</h2>
                {data ? <Bar data={data} /> : <p>Loading...</p>}
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="mb-4 text-2xl font-bold">
                Laporan Pekerjaan Bulanan Proyek Konstruksi PLTA
            </h2>
            {/* <BarChart  /> */}
            {/* <Bar data={data} /> */}
            <EquipmentChart />
            <ChartWh />
            <ContractorReportChart data={data2} />
            <MonthlyReportChart data={data} />
        </div>
    );
};

export default ConstructionProject;
