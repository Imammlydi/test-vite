import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Tunnel - Civil",
                data: [10, 15, 8, 12, 20, 18],
                backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
            {
                label: "Tunnel - Electrical",
                data: [5, 8, 6, 10, 12, 15],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Tunnel - Mechanical",
                data: [3, 5, 4, 6, 8, 10],
                backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
            {
                label: "Powerhouse - Civil",
                data: [8, 10, 12, 15, 14, 16],
                backgroundColor: "rgba(255, 206, 86, 0.5)",
            },
            {
                label: "Powerhouse - Electrical",
                data: [4, 6, 8, 10, 12, 14],
                backgroundColor: "rgba(153, 102, 255, 0.5)",
            },
            {
                label: "Powerhouse - Mechanical",
                data: [2, 3, 4, 5, 6, 8],
                backgroundColor: "rgba(255, 159, 64, 0.5)",
            },
            {
                label: "Regulating Dam - Civil",
                data: [12, 18, 15, 20, 22, 25],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Regulating Dam - Electrical",
                data: [6, 10, 8, 12, 14, 16],
                backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
            {
                label: "Regulating Dam - Mechanical",
                data: [4, 6, 5, 8, 10, 12],
                backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    return (
        <div className="h-80 w-full">
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
