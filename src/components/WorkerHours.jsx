import React, { useState, useEffect } from "react";
import {
    getEquipmentList,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    getEquipmentByReportId,
} from "../services/equipment";
import {
    createWorker,
    deleteWorker,
    getWorkerByReportId,
    updateWorker,
} from "../services/worker";
import {
    createWorkerHours,
    deleteWorkerHours,
    getWorkerHoursByReportId,
    updateWorkerHours,
} from "../services/wokerHours";
import ReactLoading from "react-loading";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { createEquipment, updateEquipment, deleteEquipment } from './api';

const WorkerHour = ({ reportId, chart }) => {
    const token = localStorage.getItem("token");
    const notifsuccess = () =>
        toast.success(
            `berhasil edit data equipment! name: ${name}, qty: ${qty}`,
            {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        );
    const notifsuccessnew = () =>
        toast.success(`berhasil menambahkan data equipment baru!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    const notifsuccessdel = () =>
        toast.success(`berhasil menghapus data equipment !`, {
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
        toast.error("input cannot be empty", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    const [loading, setLoading] = useState(false);
    const [equipment, setEquipment] = useState({
        working_name: "",
        length: 0,
        report_id: reportId,
    });
    const [equipmentList, setEquipmentList] = useState([]);

    const fetchEquipmentList = async () => {
        const data = await getWorkerHoursByReportId(reportId, token);
        console.log(data);
        setEquipmentList(data);
        setLoading(false);
    };

    const handleCreateEquipment = async () => {
        await createWorkerHours(equipment, notifsuccessnew, notifyerror, token);
        setEquipment({ working_name: "", length: 0, report_id: reportId });
        console.log(equipment);
        fetchEquipmentList();
    };

    const [working_name, setWorking_name] = useState("");
    const [qty, setQty] = useState(0);

    const handleUpdateEquipment = async (id) => {
        const data = {
            working_name: working_name,
            qty: qty,
        };
        await updateWorkerHours(id, data, notifsuccess, notifyerror, token);
        // setEquipment({ working_name: "", length: 0, report_id: reportId });
        setWorking_name("");
        setQty("");
        fetchEquipmentList();
    };

    const handleDeleteEquipment = async (id) => {
        await deleteWorkerHours(id, notifsuccessdel, token);
        fetchEquipmentList();
        chart();
    };

    useEffect(() => {
        setLoading(true);
        fetchEquipmentList();
        getWorkerHoursByReportId(reportId).then((r) => {
            console.log(r);
        });
    }, []);

    const [editRow, setEditRow] = useState(null);

    const handleEdit = (index) => {
        setEditRow(index);
        chart();
        console.log(index);
    };

    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="container ">
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

            <button
                className="bg-blue-500 hover:bg-blue-700 border py-2 px-4 font-Bitter text-sm font-bold  text-primary"
                onClick={toggleForm}
            >
                {showForm ? "X" : "Add Working Duration"}
            </button>
            {showForm && (
                <div className="mt-2 rounded-lg border border-graydisable px-2 py-3 shadow-lg">
                    <h2 className="mt-4 mb-2 font-Bitter text-2xl font-bold">
                        Working Duration Form
                    </h2>
                    <div className="mb-4">
                        <label className="block">Name:</label>
                        <input
                            type="text"
                            className="border-gray-400 rounded border p-2"
                            value={equipment.working_name}
                            onChange={(e) =>
                                setEquipment({
                                    ...equipment,
                                    working_name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block">Quantity:</label>
                        <input
                            type="number"
                            className="border-gray-400 rounded border p-2"
                            value={equipment.length}
                            onChange={(e) =>
                                setEquipment({
                                    ...equipment,
                                    length: parseInt(e.target.value),
                                })
                            }
                        />
                    </div>

                    <button
                        className="bg-green-500 hover:bg-green-700 mr-2 rounded py-2 px-4 font-bold text-blue1"
                        onClick={() => {
                            handleCreateEquipment(), chart();
                        }}
                    >
                        Create
                    </button>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center">
                    <ReactLoading
                        type={"spin"}
                        color={"#0388fc"}
                        height={50}
                        width={50}
                    />{" "}
                </div>
            ) : (
                // <Table data={equipmentList} onDelete={handleDeleteEquipment} />
                <div className="mt-5 flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="border-gray-200 overflow-hidden border-b shadow sm:rounded-sm">
                                <table className="divide-gray-200 min-w-full divide-y">
                                    <thead className="bg-blue1">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white"
                                            >
                                                No
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white"
                                            >
                                                Type of worker
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white "
                                            >
                                                Duration
                                            </th>
                                            <th
                                                scope="col"
                                                className="items-center px-6 py-3 text-left text-center font-Bitter text-xs font-medium uppercase tracking-wider text-white"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-gray-200 divide-y bg-white">
                                        {equipmentList.map((item, index) => (
                                            <tr key={item.id}>
                                                <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                    {index + 1}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                    {editRow == index
                                                        ? null
                                                        : item.working_name}
                                                    {editRow == index ? (
                                                        <input
                                                            className="w-20 rounded border px-2 py-1"
                                                            type="text"
                                                            placeholder={
                                                                item.working_name
                                                            }
                                                            value={working_name}
                                                            onChange={(e) =>
                                                                setWorking_name(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    ) : null}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                    {editRow == index
                                                        ? null
                                                        : item.length}{" "}
                                                    {"hours"}
                                                    {editRow == index ? (
                                                        <input
                                                            className="w-20 rounded border px-2 py-1"
                                                            type="text"
                                                            placeholder={
                                                                item.qty
                                                            }
                                                            value={qty}
                                                            onChange={(e) =>
                                                                setQty(
                                                                    Number(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                )
                                                            }
                                                        />
                                                    ) : null}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-0 font-Bitter ">
                                                    <button
                                                        className={
                                                            editRow == index
                                                                ? `hover:text-indigo-900 font-Bitter font-bold text-blue1`
                                                                : `hover:text-indigo-900 text-graydisable2`
                                                        }
                                                        onClick={() => {
                                                            editRow == index
                                                                ? handleUpdateEquipment(
                                                                      item.id
                                                                  )
                                                                : handleEdit(
                                                                      index
                                                                  );
                                                        }}
                                                    >
                                                        {editRow == index
                                                            ? "Send"
                                                            : "Edit"}
                                                    </button>
                                                    {editRow == index ? null : (
                                                        <button
                                                            className="hover:text-red-900 ml-4 text-red1"
                                                            onClick={() =>
                                                                handleDeleteEquipment(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkerHour;
