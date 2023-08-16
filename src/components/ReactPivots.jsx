import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPivottableUI from "react-pivottable";
// import ReactPivot from '/node_modules/react-pivot/index.jsx';
import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import ReactApexChart from "react-apexcharts";

const PlotlyRenderers = createPlotlyRenderers(Plot);

import PivotTableUI from "react-pivottable";
import "react-pivottable/pivottable.css";

const ReactPivots = () => {
    const [chartData, setChartData] = useState([]);
    const [chartAll, setChartAll] = useState([]);
    const [chartEqAll, setChartEqAll] = useState([]);
    const [chartKendala, setChartKendala] = useState([]);
    const [chartKendalas, setChartKendalas] = useState([]);
    const [chartDurasi, setChartDurasi] = useState([]);
    const [chartCommonKendalaCuaca, setChartCommonKendalaCuaca] = useState([]);
    const [chartCuacaDurasi, setChartCuacaDurasi] = useState([]);
    const [chartWorkerEq, setchartWorkerEq] = useState([]);
    const [chartWorkingName, setChartWorkingName] = useState([]);

    const getToken = () => {
        const token = localStorage.getItem("token");
        return token ? `Bearer ${token}` : "";
    };

    const [pivotConfig, setPivotConfig] = useState({
        rows: [],
        cols: [],
        aggregatorName: "Count",
        vals: [],
    });

    const bearerToken = getToken();

    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const token = "Your_JWT_Token"; // Ganti dengan token JWT yang Anda miliki
    const apiUrl = "http://127.0.0.1:8000/api/reports"; // Ganti dengan URL API yang sesuai

    function sumQuantitiesPerReport(report) {
        const equipment = report;
        let totalQty = 0;

        equipment.forEach((item) => {
            totalQty += item.qty;
        });

        return totalQty;
    }
    function sumQuantitiesPerReport2(report) {
        const pekerja = report;
        let totalQty = 0;

        pekerja.forEach((item) => {
            totalQty += item.qty;
        });

        return totalQty;
    }
    function sumQuantitiesPerReport3(report) {
        const pekerja = report;
        let totalQty = 0;

        pekerja.forEach((item) => {
            totalQty += item.length;
        });

        return totalQty;
    }

    const flattenedData = reports.map((item) => ({
        // id: item.id,
        Judul: item.title,
        Deskripsi: item.description,
        Shift: item.shift,
        Tanggal: item.date,
        Jumlah_Peralatan: sumQuantitiesPerReport(item.equipment),
        Jumlah_Pekerja: sumQuantitiesPerReport2(item.worker),
        Durasi_Pekerjaan: sumQuantitiesPerReport3(item.working_hours),
        Nama_inspector: item.inspector.name,
        Disiplin: item.inspector.discipline,
        area: item.area,
        status: item.status,
        // Jumlah_Peralatan: item.equipment.length,
        // Jumlah_Perkerja: item.worker.length,
    }));

    useEffect(() => {
        // Fungsi untuk fetch data menggunakan Axios dengan token sebagai Authorization header
        const fetchReports = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: bearerToken,
                    },
                });
                setReports(response.data.data);
                setChartData(response.data.Shift);
                setChartAll(response.data.Area);
                setChartEqAll(response.data.EquipmentPerArea);
                setChartKendala(response.data.KendalaPerArea);
                setChartKendalas(response.data.Kendalas);
                setChartCuacaDurasi(response.data.Weatherduration);
                setchartWorkerEq(response.data.WorkeRep);
                setChartWorkingName(response.data.WH);
                console.log(response.data.WH, "======****");
                setChartDurasi(
                    response.data.RerataDurasi.map((item) => ({
                        ...item,
                        average_hours: Math.round(item.average_hours), // Memasukkan nilai yang sudah dibulatkan
                    }))
                );

                console.log(response.data.Shift, "----Shift");
                // console.log(response.data.Shift, "----");
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };
        fetchReports();
    }, [bearerToken]);

    const options = {
        chart: {
            type: "bar",
        },
        xaxis: {
            categories: ["", 2, 3, 4],
            title: {
                text: "Jenis Shift",
                style: {
                    fontSize: "15px", // Ganti ukuran font sesuai kebutuhan
                },
            },
            // categories: ['Siang - Di Setujui', 'Siang - Belum Di Setujui', 'Malam - Di Setujui', 'Malam - Belum Di Setujui'],
        },
        yaxis: {
            title: {
                text: "Total Laporan",
                style: {
                    fontSize: "18px", // Ganti ukuran font sesuai kebutuhan
                    fontFamily: "Arial, sans-serif",
                },
            },
        },
        colors: ["#00E396", "#FEB019", "#FF4560", "#775DD0"],
    };
    const series = [
        {
            name: "Day - Already approved",
            data: [chartData[0]?.total],
            color: "#00E396", // Warna untuk Siang - Di Setujui
        },
        {
            name: "Day - Not yet approved",
            data: [chartData[1]?.total],
            color: "#FEB019", // Warna untuk Siang - Belum Di Setujui
        },
        {
            name: "Night - Already approved",
            data: [chartData[2]?.total],
            color: "#FF4560", // Warna untuk Malam - Di Setujui
        },
        {
            name: "Night - Not yet approved",
            data: [chartData[3]?.total],
            color: "#775DD0", // Warna untuk Malam - Tidak Di Setujui
        },
    ];

    // Total Area Per Laporan

    const colors = [
        "#FF5733",
        "#36A2EB",
        "#4CAF50",
        "#FFC300",
        "#9B59B6",
        "#E74C3C",
        "#3498DB",
        "#2ECC71",
        "#F39C12",
        "#8E44AD",
    ]; // Ganti dengan warna yang Anda inginkan, sesuai dengan jumlah area

    const options2 = {
        chart: {
            type: "bar",
        },
        xaxis: {
            categories: chartAll.map((item) => item.area),
            title: {
                text: "Area",
                style: {
                    fontSize: "15px", // Ganti ukuran font sesuai kebutuhan
                },
            },
        },
        yaxis: {
            title: {
                text: "Total Laporan",
                style: {
                    fontSize: "18px", // Ganti ukuran font sesuai kebutuhan
                    fontFamily: "Arial, sans-serif",
                },
            },
        },
        colors: colors.slice(0, chartAll.length),
    };

    const series2 = [
        {
            name: "Total Laporan",
            data: chartAll.map((item, index) => ({
                x: item.area,
                y: item.total,
                fillColor: colors[index % colors.length], // Gunakan warna yang berbeda pada setiap batang
            })),
        },
    ];

    // Equipment Per area
    const chartEq = {
        options: {
            chart: {
                type: "bar",
            },
            xaxis: {
                categories: chartEqAll.map((item) => item.area),
                title: {
                    text: "Area",
                    style: {
                        fontSize: "15px", // Ganti ukuran font sesuai kebutuhan
                    },
                },
            },
            yaxis: {
                title: {
                    text: "Total Peralatan",
                    style: {
                        fontSize: "18px", // Ganti ukuran font sesuai kebutuhan
                        fontFamily: "Arial, sans-serif",
                    },
                },
            },
        },
        series: [
            {
                name: "Total Peralatan",
                data: chartEqAll.map((item, index) => ({
                    x: item.area,
                    y: item.total,
                    fillColor: colors[index % colors.length], // Gunakan warna yang berbeda pada setiap batang
                })),
            },
        ],
    };
    //   Kendala
    const chartDataKendala = {
        options: {
            chart: {
                type: "bar",
            },
            xaxis: {
                categories: chartKendala.map((item) => item.area),
                title: {
                    text: "Area",
                    style: {
                        fontSize: "15px", // Ganti ukuran font sesuai kebutuhan
                    },
                },
            },
            yaxis: {
                title: {
                    text: "Total Kendala",
                    style: {
                        fontSize: "18px", // Ganti ukuran font sesuai kebutuhan
                        fontFamily: "Arial, sans-serif",
                    },
                },
            },
        },
        series: [
            {
                name: "Total Kendala",
                data: chartKendala.map((item, index) => ({
                    x: item.area,
                    y: item.total,
                    fillColor: colors[index % colors.length], // Gunakan warna yang berbeda pada setiap batang
                })),
            },
        ],
    };

    //   Durasi
    const chartDataDurasi = {
        options: {
            chart: {
                type: "bar",
            },
            xaxis: {
                categories: chartDurasi.map((item) => item.area),
                title: {
                    text: "Area",
                    style: {
                        fontSize: "18px", // Ganti ukuran font sesuai kebutuhan
                        fontFamily: "Arial, sans-serif",
                    },
                },
            },
            yaxis: {
                title: {
                    text: "Rerata jam Kerja",
                    style: {
                        fontSize: "18px", // Ganti ukuran font sesuai kebutuhan
                        fontFamily: "Arial, sans-serif",
                    },
                },
            },
        },
        series: [
            {
                name: "Rata Rata Jam Kerja",
                data: chartDurasi.map((item, index) => ({
                    x: item.area,
                    y: item.average_hours,
                    fillColor: colors[index % colors.length], // Gunakan warna yang berbeda pada setiap batang
                })),
            },
        ],
    };

    //   Kendala
    const chartDataKendalas = {
        options: {
            chart: {
                type: "bar",
            },
            xaxis: {
                categories: chartKendalas.map((item) => item.name),
                title: {
                    text: "Nama Kendala",
                    style: {
                        fontSize: "18px", // Ganti ukuran font sesuai kebutuhan
                        fontFamily: "Arial, sans-serif",
                    },
                },
            },
            yaxis: {
                title: {
                    text: "Total Kendala",
                    style: {
                        fontSize: "18px", // Ganti ukuran font sesuai kebutuhan
                        fontFamily: "Arial, sans-serif",
                    },
                },
            },
        },
        series: [
            {
                name: "Total Occurrences",
                data: chartKendalas.map((item, index) => ({
                    x: item.name,
                    y: item.total,
                    fillColor: colors[index % colors.length], // Gunakan warna yang berbeda pada setiap batang
                })),
            },
        ],
    };

    // Chart Cuaca
    const chartDataCuaca = {
        options: {
            chart: {
                type: "bar",
            },
            xaxis: {
                categories: chartCuacaDurasi.map((item) => item.cuaca),
                title: {
                    text: "Cuaca",
                    style: {
                        fontSize: "18px", // Ganti ukuran font sesuai kebutuhan
                        fontFamily: "Arial, sans-serif",
                    },
                },
            },
            yaxis: {
                title: {
                    text: "Rerata Jam Kerja",
                    style: {
                        fontSize: "18px", // Ganti ukuran font sesuai kebutuhan
                        fontFamily: "Arial, sans-serif",
                    },
                },
            },
        },
        series: [
            {
                name: "Rata-rata Jam Kerja",
                data: chartCuacaDurasi.map((item, index) => ({
                    x: item.cuaca,
                    y: item.avg_length,
                    fillColor: colors[index % colors.length], // Gunakan warna yang berbeda pada setiap batang
                })),
            },
        ],
    };

    //   Worker eq

    const chartDataWorkerEq = {
        options: {
            chart: {
                type: "scatter",
                zoom: {
                    enabled: true,
                    type: "xy",
                },
            },
            xaxis: {
                title: {
                    text: "Total Peralatan",
                },
            },
            yaxis: {
                title: {
                    text: "Total Pekerja",
                },
            },
            tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    const { title, qty_workers, qty_equipment } =
                        data[dataPointIndex]; // Ganti sesuai dengan properti yang sesuai dari data
                    return `<div>
                    <span>${title}</span><br>
                    <span>Workers: ${qty_workers}</span><br>
                    <span>Equipment: ${qty_equipment}</span>
                  </div>`;
                },
            },
            markers: {
                size: 10,
                colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
            },
        },
        series: [
            {
                data: chartWorkerEq.map((item) => ({
                    x: item.total_equipment,
                    y: item.total_workers,
                    name: item.title,
                })),
            },
        ],
    };
    const categories = Object.keys(chartWorkingName);

    const chartDataWH = {
        options: {
            chart: {
                type: "bar",
            },
            xaxis: {
                categories: Object.keys(chartWorkingName),
                title: {
                    text: "Nama Pekerjaan",
                },
            },
            yaxis: {
                title: {
                    text: "Frekuensi",
                },
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        position: "top", // Menampilkan nilai di atas batang
                    },
                },
            },
            colors: colors.slice(0, categories.length),
        },
        series: [
            {
                name: "Frequency",
                data: Object.values(chartWorkingName),
            },
        ],
    };

    useEffect(() => {
        console.log("Chart", "====", chartData);
        console.log("flattenedData", flattenedData, "====", series);
    }, [chartData, flattenedData]);

    const data = reports;

    function getUniqueFields(data) {
        const fieldSet = new Set();
        data.forEach((record) => {
            Object.keys(record).forEach((field) => fieldSet.add(field));
        });
        return Array.from(fieldSet);
    }

    // Convert the data into a format compatible with react-pivottable
    function convertDataForPivotTable(data) {
        const uniqueFields = getUniqueFields(data);

        const convertedData = data.map((record) => {
            const convertedRecord = {};
            uniqueFields.forEach((field) => {
                convertedRecord[field] = record[field] || "";
            });
            return convertedRecord;
        });

        return convertedData;
    }

    // Get the data in the format required for react-pivottable
    const pivotTableData = convertDataForPivotTable(reports);

    const [pivotState, setPivotState] = useState({});

    // Convert the data into a format suitable for the pivot table
    const pivotData = {
        pivotTableData,
        rows: ["area", "shift", "date", "status"],
        cols: ["description"],
        aggregatorName: "Count",
        vals: ["id"], // Counting the number of occurrences based on ID
        rendererName: "Table",
    };

    const handlePivotStateChange = (newState) => {
        setPivotState(newState);
    };

    const [settings, setSettings] = useState({});

    const Table = ({ data }) => {
        return (
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="border-gray-200 overflow-hidden border-b shadow sm:rounded-sm">
                            <table className="divide-gray-200 min-w-full divide-y">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-2 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Shift
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-2 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-2 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-gray-200 divide-y bg-white">
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap px-6 py-2">
                                                {item.shift}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-2">
                                                {item.status}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-2">
                                                {item.total}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const Table2 = ({ data }) => {
        return (
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="border-gray-200 overflow-hidden border-b shadow sm:rounded-sm">
                            <table className="divide-gray-200 min-w-full divide-y">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-2 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Area
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-2 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-gray-200 divide-y bg-white">
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap px-6 py-2">
                                                {item.area}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-2">
                                                {item.total}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const Table3 = ({ data }) => {
        return (
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="border-gray-200 overflow-hidden border-b shadow sm:rounded-sm">
                            <table className="divide-gray-200 min-w-full divide-y">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-2 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Area
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-2 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-gray-200 divide-y bg-white">
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap px-6 py-2">
                                                {item.area}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-2">
                                                {item.total}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const Table4 = ({ data }) => {
        return (
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="border-gray-200 overflow-hidden border-b shadow sm:rounded-sm">
                            <table className="divide-gray-200 min-w-full divide-y">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-2 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Area
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-2 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Average Hours
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-gray-200 divide-y bg-white">
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap px-6 py-2">
                                                {item.area}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-2">
                                                {item.average_hours}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const Table5 = ({ data }) => {
        return (
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="border-gray-200 overflow-hidden border-b shadow sm:rounded-sm">
                            <table className="divide-gray-200 min-w-full divide-y">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-2 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-2 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-gray-200 divide-y bg-white">
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap px-6 py-2">
                                                {item.name}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-2">
                                                {item.total}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const Table6 = ({ data }) => {
        return (
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="border-gray-200 overflow-hidden border-b shadow sm:rounded-sm">
                            <table className="divide-gray-200 min-w-full divide-y">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-2 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Cuaca
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-2 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Average Length
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-gray-200 divide-y bg-white">
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap px-6 py-2">
                                                {item.cuaca}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-2">
                                                {item.avg_length}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const Table7 = ({ data }) => {
        return (
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="border-gray-200 overflow-hidden border-b shadow sm:rounded-sm">
                            <table className="divide-gray-200 min-w-full divide-y">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-2 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Aktivitas
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-gray-500 px-6 py-2 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Jumlah
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-gray-200 divide-y bg-white">
                                    {Object.entries(data).map(
                                        ([aktivitas, jumlah], index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap px-6 py-2">
                                                    {aktivitas}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-2">
                                                    {jumlah}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full ">
            <div className="md:grid-cols- mx-auto grid   grid-cols-1 gap-4 rounded-md border px-4 pt-8 md:px-8 lg:max-w-6xl lg:grid-cols-2 lg:gap-1 ">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="bar"
                    height={350}
                />

                <Table data={chartData} />
            </div>
            <div className="md:grid-cols- mx-auto mt-2 grid grid-cols-1 gap-4 rounded-md border px-4 pt-8 md:px-8 lg:max-w-6xl lg:grid-cols-2 lg:gap-1 ">
                <ReactApexChart
                    options={options2}
                    series={series2}
                    type="bar"
                    height={350}
                />

                <Table2 data={chartAll} />
            </div>
            <div className="md:grid-cols- mx-auto mt-2 grid grid-cols-1 gap-4 rounded-md border px-4 pt-8 md:px-8 lg:max-w-6xl lg:grid-cols-2 lg:gap-1">
                <ReactApexChart
                    options={chartEq.options}
                    series={chartEq.series}
                    type="bar"
                    height={350}
                />

                <Table3 data={chartEqAll} />
            </div>
            <div className="md:grid-cols- mx-auto mt-2 grid grid-cols-1 gap-4 rounded-md border px-4 pt-8 md:px-8 lg:max-w-6xl lg:grid-cols-2 lg:gap-1 ">
                <ReactApexChart
                    options={chartDataKendala.options}
                    series={chartDataKendala.series}
                    type="bar"
                    height={350}
                />
                <Table3 data={chartKendala} />
            </div>
            <div className="md:grid-cols- mx-auto mt-2 grid grid-cols-1 gap-4 rounded-md border px-4 pt-8 md:px-8 lg:max-w-6xl lg:grid-cols-2 lg:gap-1 ">
                <ReactApexChart
                    options={chartDataDurasi.options}
                    series={chartDataDurasi.series}
                    type="bar"
                    height={350}
                />
                <Table4 data={chartDurasi} />
            </div>
            <div className="md:grid-cols- mx-auto mt-2 grid grid-cols-1 gap-4 rounded-md border px-4 pt-8 md:px-8 lg:max-w-6xl lg:grid-cols-2 lg:gap-1 ">
                <ReactApexChart
                    options={chartDataKendalas.options}
                    series={chartDataKendalas.series}
                    type="bar"
                    height={350}
                />
                <Table5 data={chartKendalas} />
            </div>
            <div className="md:grid-cols- mx-auto mt-2 grid grid-cols-1 gap-4 rounded-md border px-4 pt-8 md:px-8 lg:max-w-6xl lg:grid-cols-2 lg:gap-1">
                <ReactApexChart
                    options={chartDataCuaca.options}
                    series={chartDataCuaca.series}
                    type="bar"
                    height={350}
                />
                <Table6 data={chartCuacaDurasi} />
            </div>
            <div className="md:grid-cols- mx-auto mt-2 grid grid-cols-1 gap-4 rounded-md border px-4 pt-8 md:px-8 lg:max-w-6xl lg:grid-cols-2 lg:gap-1 ">
                <ReactApexChart
                    options={chartDataWH.options}
                    series={chartDataWH.series}
                    type="bar"
                    height={350}
                />

                <Table7 data={chartWorkingName} />
            </div>
            <div className="mb-10" />

            {/* <ReactApexChart
                options={chartDataWorkerEq.options}
                series={chartDataWorkerEq.series}
                type="scatter"
                height={350}
            /> */}

            {/* <PivotTableUI
                data={flattenedData}
                // renderers={{}}

                // aggregators={{
                //   'Count': (attr) => ReactPivottableUI.aggregators.Count(attr),
                //   'Count Unique Values': (attr) => ReactPivottableUI.aggregators.CountUniqueValues(attr),
                //   'Sum': (attr) => ReactPivottableUI.aggregators.Sum(attr),
                //   'Average': (attr) => ReactPivottableUI.aggregators.Average(attr),
                //  }}
                // vals={[]}
                // onChange={handlePivotStateChange}
                onChange={(s) => setSettings(s)}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                aggregatorName="Integer Sum"
                vals={["Jumlah_Peralatan"]}
                // rows={["Disiplin", "area", "status"]}
                cols={[
                    "Judul",
                    "Deskripsi",
                    "Tanggal",
                    "Nama_inspector",
                    "Jumlah_Peralatan",
                    "Jumlah_Pekerja",
                    "Shift",
                    "Durasi_Pekerjaan",
                ]}
                {...settings}
            /> */}
        </div>
    );
};

export default ReactPivots;
