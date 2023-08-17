import React, { useEffect, useState } from "react";
import {
    deleteReport,
    getAllReports,
    getReportByIdInspector,
} from "../services/reports";
// import { getReports, deleteReport } from './api';
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import ReportForm from "./ReportForm";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/reports";

const ReportList = () => {
    const [loading, setLoading] = useState(false);

    const [reports, setReports] = useState([]);
    const navigate = useNavigate();
    const tokens = localStorage.getItem("token");

    const id_inspector = localStorage.getItem("id_inspector");

    const setAuthHeader = (token) => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    const getReportByIdInspector = async () => {
        try {
            setAuthHeader(tokens);
            const response = await axios.get(
                `${BASE_URL}/inspector/${id_inspector}`
            );
            // return response.data;
            console.log(response.data);
            setReports(response.data);
            setLoading(false);
        } catch (error) {
            // throw new Error(error.response.data.error);
            console.log(error);
        }
    };

    useEffect(() => {
        // getAllReports(tokens)
        //   .then((response) => {
        //     console.log(response)

        //   })
        //   .catch((error) => {
        //     console.error('Gagal mendapatkan daftar laporan:', error);
        //   });
        setLoading(true);

        console.log(id_inspector, tokens);
        getReportByIdInspector();
        // .then((result) => {
        //     // console.log(result),
        //     setReports(result);
        //     setLoading(false);
        // })
        // .catch((err) => {
        //     setLoading(false), console.log(err);
        // });
    }, []);

    useEffect(() => {
        console.log(reports);
    }, [reports]);

    const handleDelete = (id) => {
        deleteReport(id, tokens)
            .then(() => {
                setReports(reports.filter((report) => report.id !== id));
                getReportByIdInspector();
            })
            .catch((error) => {
                console.error("Gagal menghapus laporan:", error);
            });
    };

    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const notifsuccess = () =>
        toast.success("berhasil tambahakan report!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    const notifyerror = () =>
        toast.error("Input cannot be empty", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 ml-8 border-primary py-2 px-2 font-Bitter  text-sm font-bold  text-primary"
                    onClick={toggleForm}
                >
                    {showForm ? "X" : "Add Report"}
                </button>
                {showForm && (
                    <ReportForm
                        onclick={() =>
                            getReportByIdInspector(id_inspector, tokens)
                        }
                        notsucces={notifsuccess}
                        fetchreport={() =>
                            getReportByIdInspector(id_inspector, tokens)
                        }
                        notfyerror={notifyerror}
                    />
                )}
            </div>
            <h2 className="mb-4 px-4 pt-8 font-Bitter  text-2xl font-bold  md:px-8 ">
            My Report List
            </h2>
            <div className="container mx-auto grid grid-cols-1 gap-2 px-4 py-6 pt-8  md:px-8 lg:max-w-7xl  lg:grid-cols-4 ">
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
                    reports.map((report) => (
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
                                    {/* <p className="text-gray-700 font-Bitter">
                            ID Pemeriksa: {report.inspector_id}
                        </p> */}

                                    {/* <Link to={`/reports/${report.id}`}>View Details</Link> */}
                                    <div className="mt-6 flex items-center justify-between ">
                                        <p className="text-gray-700  font-Bitter  text-sm lowercase underline">
                                            {report.status}
                                        </p>
                                        <div className="flex items-center">
                                            <button
                                                className="bg-red-500 mr-2 rounded px-4 py-2 text-red1"
                                                onClick={() =>
                                                    handleDelete(report.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                            <Link
                                                className="rounded-lg bg-green1 py-1 px-2 text-white"
                                                to={`/reportdetail2`}
                                                state={report.id}
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                )}
            </div>
        </>
    );
};

export default ReportList;
