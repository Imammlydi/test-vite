import React, { useState, useEffect } from "react";

import {
    createWorker,
    deleteWorker,
    getWorkerByReportId,
    updateWorker,
} from "../services/worker";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkForm = ({ reportId }) => {
    const token = localStorage.getItem("token");

    const notifsuccess = () =>
        toast.success(
            `berhasil edit data equipment! name: ${type_of_worker}, qty: ${qty}`,
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
        type_of_worker: "",
        qty: 0,
        report_id: reportId,
    });

    const [type_of_worker, setType_of_worker] = useState("");
    const [qty, setQty] = useState(0);
    const [equipmentList, setEquipmentList] = useState([]);

    const fetchEquipmentList = async () => {
        const data = await getWorkerByReportId(reportId, token);
        console.log(data);
        setEquipmentList(data);
        setLoading(false);
    };

    const handleCreateEquipment = async () => {
        await createWorker(equipment, notifsuccess, notifyerror, token);
        setEquipment({ type_of_worker: "", qty: 0, report_id: reportId });
        console.log(equipment);
        fetchEquipmentList();
    };

    const handleUpdateEquipment = async (id) => {
        const data = {
            type_of_worker: type_of_worker,
            qty: qty,
        };
        await updateWorker(id, data, notifsuccess, notifyerror, token);
        setType_of_worker("");
        setQty("");
        // setEquipment({ type_of_worker: "", qty: 0, report_id: reportId });
        fetchEquipmentList();
    };

    const handleDeleteEquipment = async (id) => {
        await deleteWorker(id, notifsuccessdel, token);
        fetchEquipmentList();
    };

    useEffect(() => {
        setLoading(true);
        fetchEquipmentList();
        getWorkerByReportId(reportId, token).then((r) => {
            console.log(r);
        });
        console.log(reportId);
    }, []);

    const [editRow, setEditRow] = useState(null);

    const handleEdit = (index) => {
        setEditRow(index);
        console.log(index);
    };
    const CancelhandleEdit = (index) => {
        setEditRow(index);
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
                {showForm ? "X" : "Add Worker"}
            </button>
            {showForm && (
                <div className="mt-2 rounded-lg border border-graydisable px-2 py-3 shadow-lg">
                    <h2 className=" mb-2 font-Bitter text-2xl font-bold">
                        Add Worker
                    </h2>
                    <div className="mb-4">
                        <label className="block">Name:</label>
                        <input
                            type="text"
                            className="border-gray-400 rounded border p-2"
                            value={equipment.type_of_worker}
                            onChange={(e) =>
                                setEquipment({
                                    ...equipment,
                                    type_of_worker: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block">Quantity:</label>
                        <input
                            type="number"
                            className="border-gray-400 rounded border p-2"
                            value={equipment.qty}
                            onChange={(e) =>
                                setEquipment({
                                    ...equipment,
                                    qty: parseInt(e.target.value),
                                })
                            }
                        />
                    </div>

                    <button
                        className="bg-green-500 hover:bg-green-700 mr-2 rounded py-2 px-4 font-bold text-blue1"
                        onClick={handleCreateEquipment}
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
                                                Quantity
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
                                                        : item.type_of_worker}
                                                    {editRow == index ? (
                                                        <input
                                                            className="w-20 rounded border px-2 py-1"
                                                            type="text"
                                                            placeholder={
                                                                item.type_of_worker
                                                            }
                                                            value={
                                                                type_of_worker
                                                            }
                                                            onChange={(e) =>
                                                                setType_of_worker(
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
                                                        : item.qty}
                                                    {editRow == index ? (
                                                        <input
                                                            className="w-20 rounded border px-2 py-1"
                                                            type="number"
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
                                                    {/* {
                                                        editRow == index && 
                                                        <button onClick={handleEdit(!index)}>Cancel</button>
                                                        // null
                                                    } */}
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

export default WorkForm;
