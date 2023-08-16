import React from "react";
import Chart from "react-apexcharts";

const ChartVisual = () => {
    const BarChart = ({ data }) => {
        const options = {
            chart: {
                id: "barchart",
            },
            xaxis: {
                categories: data.map((item) => item.PeriodeWaktu),
            },
        };

        const series = [
            {
                name: "Total Engineer",
                data: data.map((item) => item.TotalEngineer),
            },
        ];

        return (
            <Chart options={options} series={series} type="bar" height={350} />
        );
    };

    const BarChart2 = ({ data, title, xaxisTitle, yaxisTitle }) => {
        const options = {
            chart: {
                id: "barchart",
            },
            xaxis: {
                categories: data.map((item) => item.label),
                title: {
                    text: xaxisTitle,
                    style: {
                        fontSize: "18px", // Ganti ukuran font sesuai kebutuhan
                    },
                },
            },
            yaxis: {
                title: {
                    text: yaxisTitle,
                    style: {
                        fontSize: "18px", // Ganti ukuran font sesuai kebutuhan
                        fontFamily: "Arial, sans-serif",
                    },
                },
            },
        };

        const series = [
            {
                name: title,
                data: data.map((item) => item.value),
            },
        ];

        return (
            <Chart options={options} series={series} type="bar" height={350} />
        );
    };

    const totalEngineerData = [
        { label: "Juli 2023", value: 5 },
        { label: "Agustus 2023", value: 7 },
    ];

    const totalEquipmentData = [
        { label: "Powerhouse", value: 8 },
        { label: "Tunnel", value: 6 },
        { label: "Regulating Dam", value: 4 },
    ];

    // const totalEngineerData = [
    //     { PeriodeWaktu: "Juli 2023", TotalEngineer: 5 },
    //     { PeriodeWaktu: "Agustus 2023", TotalEngineer: 7 },
    // ];

    // const totalEquipmentData = [
    //     { LokasiProyek: "Powerhouse", TotalEquipment: 8 },
    //     { LokasiProyek: "Tunnel", TotalEquipment: 6 },
    //     { LokasiProyek: "Regulating Dam", TotalEquipment: 4 },
    // ];

    return (
        <div>
            {/* <div className="container mx-auto mt-8 mb-2">
                <h1 className="mb-4 text-3xl font-bold">
                    Total Engineer yang Menyetujui Laporan
                </h1>
                <BarChart data={totalEngineerData} />

                <h1 className="my-4 text-3xl font-bold">
                    Total Equipment yang Terkait dengan Laporan
                </h1>
                <BarChart data={totalEngineerData} />
                <div className="grid grid-cols-2 gap-4">
                    {totalEquipmentData.map((item) => (
                        <div
                            key={item.LokasiProyek}
                            className="rounded-md bg-white p-4 shadow-md"
                        >
                            <h3 className="mb-2 text-xl font-bold">
                                {item.LokasiProyek}
                            </h3>
                            <p className="text-lg">{item.TotalEquipment}</p>
                        </div>
                    ))}
                </div>
            </div> */}

            <div className="container mx-auto mt-8">
                <h1 className="mb-4 font-Bitter text-2xl font-bold">
                    Total Engineer yang Menyetujui Laporan
                </h1>
                <BarChart2
                    data={totalEngineerData}
                    title="Total Engineer"
                    xaxisTitle="Periode Waktu"
                    yaxisTitle="Total Engineer"
                />

                <h1 className="font my-4 font-Bitter text-2xl font-bold">
                    Total Equipment yang Terkait dengan Laporan
                </h1>
                <BarChart2
                    data={totalEquipmentData}
                    title="Total Equipment"
                    xaxisTitle="Lokasi Proyek"
                    yaxisTitle="Total Peralatan"
                />
            </div>
        </div>
    );
};

export default ChartVisual;
