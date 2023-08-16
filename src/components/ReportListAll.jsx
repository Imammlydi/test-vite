import React, { useEffect, useState } from "react";
import {
    deleteReport,
    getAllReports,
    getReportByIdInspector,
} from "../services/reports";
// import { getReports, deleteReport } from './api';
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

const ReportListAll = () => {
    const [loading, setLoading] = useState(false);

    const [reports, setReports] = useState([]);
    const navigate = useNavigate();
    const tokens = localStorage.getItem("token");

    const [selectedArea, setSelectedArea] = useState("All");
    const [selectedDate, setSelectedDate] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 5;

    // Calculate the index of the last report on the current page
    const indexOfLastReport = currentPage * reportsPerPage;
    // Calculate the index of the first report on the current page
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    // Get the reports to be displayed on the current page
    const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

    // ...

    const id_inspector = localStorage.getItem("id_inspector");
    useEffect(() => {
        getAllReports(tokens)
            .then((response) => {
                console.log(response.data);
                setReports(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Gagal mendapatkan daftar laporan:", error);
            });
        setLoading(true);

        console.log(id_inspector, tokens);
        // getReportByIdInspector(id_inspector, tokens)
        //     .then((result) => {
        //         // console.log(result),
        //         setReports(result);
        //         setLoading(false);
        //     })
        //     .catch((err) => {
        //         setLoading(false), console.log(err);
        //     });
    }, []);

    useEffect(() => {
        console.log(reports);
    }, [reports]);

    const handleDelete = (id) => {
        deleteReport(id, tokens)
            .then(() => {
                setReports(reports.filter((report) => report.id !== id));
            })
            .catch((error) => {
                console.error("Gagal menghapus laporan:", error);
            });
    };

    return (
        <>
            <h2 className="mb-4 font-Bitter text-2xl font-bold ">
            List of All Reports
            </h2>
            {/* Add a dropdown to select the area */}
            <div className="mb-4">
                <label
                    htmlFor="areaSelect"
                    className="mr-2 font-Bitter text-base"
                >
                    Filter by area:
                </label>
                <select
                    id="areaSelect"
                    className="rounded border px-2 py-1"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                >
                    <option value="All">All Areas</option>
                    <option value="Regulating Dam">Regulating Dam</option>
                    <option value="Tunnel">Tunnel</option>
                    <option value="Powerhouse">Powerhouse</option>
                </select>
            </div>
            <div className="border p-2 rounded-md max-w-md">

            <div className="mb-4">
                <label
                    htmlFor="dateInput"
                    className="mr-2 font-Bitter text-base"
                >
                    Filter by date:
                </label>
            </div>
            <div className="mb-4">
                <label
                    htmlFor="startDateInput"
                    className="mr-2 font-Bitter text-base"
                >
                 Start Date:
                </label>
                <input
                    type="date"
                    id="startDateInput"
                    className="rounded border px-2 py-1"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="endDateInput"
                    className="mr-2 font-Bitter text-base"
                >
                    End Date:
                </label>
                <input
                    type="date"
                    id="endDateInput"
                    className="rounded border px-2 py-1"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            </div>

            <div className="container mx-auto grid grid-cols-1 gap-2 px-4 py-6 lg:grid-cols-4">
                {/* <ReactLoading type={'spin'} color={'#000000'} height={50} width={50} /> */}
                {loading ? (
                    <div className=" flex h-full w-full items-center justify-center">
                        <ReactLoading
                            type={"spin"}
                            color={"#000000"}
                            height={50}
                            width={50}
                        />
                    </div>
                ) : (
                    reports &&
                    currentReports
                        .filter((report) => {
                            // Check if the selectedArea matches the report's area, or if selectedArea is "All"
                            const areaFilter =
                                selectedArea === "All" ||
                                report.area === selectedArea;

                            // Check if the selectedDate is within the report's date range, or if selectedDate is empty
                            const dateFilter =
                                (!startDate || report.date >= startDate) &&
                                (!endDate || report.date <= endDate); // Modify this condition based on your use case for date filtering

                            return areaFilter && dateFilter;
                        })
                        .map((report) => (
                            <>
                                <div
                                    key={report.id}
                                    className="border-gray-300 mb-4 rounded  border border-opacity-20 p-4 shadow-lg "
                                >
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-Bitter text-xl font-bold uppercase">
                                                {report.title}
                                            </h3>
                                            <p className=" font-Bitter text-sm">
                                                {" "}
                                                {report.date}
                                            </p>
                                        </div>

                                        {/* <p className="text-gray-700">{report.id}</p> */}
                                        <p className="text-gray-700 font-Bitter">
                                            Shift: {report.shift}
                                        </p>
                                        <p className="text-gray-700 font-Bitter">
                                            {report.area}
                                        </p>
                                        {/* <p className="text-gray-700 font-Bitter">
                            ID Pemeriksa: {report.inspector_id}
                        </p> */}

                                        {/* <Link to={`/reports/${report.id}`}>View Details</Link> */}
                                        <div className="mt-6 flex items-center justify-between ">
                                            <p className="text-gray-700  font-Bitter  text-sm lowercase underline">
                                                {report.status}
                                            </p>
                                            <div className="flex items-center">
                                                {/* <button
                                                className="bg-red-500 mr-2 rounded px-4 py-2 text-red1"
                                                onClick={() =>
                                                    handleDelete(report.id)
                                                }
                                            >
                                                Delete
                                            </button> */}
                                                <Link
                                                    className="rounded-lg bg-green1 py-1 px-2 text-white"
                                                    to={`/reportdetail3`}
                                                    state={report.id}
                                                >
                                                    Lihat
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                )}
            </div>
            <div className="mt-4 flex justify-center">
                <button
                    className="bg-blue-500 mx-2 rounded px-4 py-2 text-primary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>
                <button
                    className="bg-blue-500 mx-2 rounded px-4 py-2 text-primary"
                    disabled={currentReports.length < reportsPerPage}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default ReportListAll;
