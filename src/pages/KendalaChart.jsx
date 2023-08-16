import React from "react";
import Chart from "react-apexcharts";

const KendalaChart = ({ data }) => {
    const categories = data.map((item) => item.name);
    const series = [
        {
            name: "Occurrences",
            data: data.map((item) => item.report_id.length), // Menggunakan panjang id sebagai contoh, sesuaikan dengan data yang ingin ditampilkan
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
            width: 1,
        },
    };

    return (
        <div className="mt-2 rounded-md border p-2 shadow-lg">
            <p className="p-2 font-Bitter font-bold">Kendala</p>
            <Chart
                options={options}
                series={series}
                type="bar"
                height={150}
                width={500}
            />
        </div>
    );
};

export default KendalaChart;
