import React, { useState, useEffect } from "react";
import {
    // getkendala,
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
import {
    createKendala,
    deleteKendala,
    getKendalabyReportId,
} from "../services/kendala";
import axios from "axios";

// import { createEquipment, updateEquipment, deleteEquipment } from './api';

const Kendala = ({ reportId, chart }) => {
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
    const [equipment, setKendalas] = useState({
        name: "",
        // length: 0,
        report_id: reportId,
    });
    const [kendala, setKendala] = useState([]);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchKendalas = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/kendalas/report/${reportId}`,
                config
            );
            console.log(response.data, "kendalas");
        } catch (error) {
            console.error("Error fetching kendalas:", error);
        }
    };

    const fetchKendala = async () => {
        const data = await getKendalabyReportId(reportId, token);
        console.log(data.data, "Kendala");
        setKendala(data.data);
        setLoading(false);
    };

    const handleCreateEquipment = async () => {
        createKendala(token, equipment).then((r) => console.log(r));
        fetchKendala();
    };

    const [name, setname] = useState("");

    const handleKendala = async (id) => {
        const data = {
            name: name,
            report_id: reportId,
        };

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/kendalas/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Ganti dengan token JWT Anda
                    },
                }
            );

            if (response.status === 200) {
                console.log("Data berhasil diperbarui.");
            }
        } catch (error) {
            console.log("Terjadi kesalahan saat memperbarui data.");
        }
        // createKendala(data);
        // await updateWorkerHours(id, data, notifsuccess, notifyerror, token);
        // setKendalas({ name: "", length: 0, report_id: reportId });
        setname("");
        // setQty("");
        fetchKendala();
    };

    const handleDeleteEquipment = async (idsx) => {
        // await deleteWorkerHours(id, notifsuccessdel, token);
        //    await deleteKendala(token,idsx)
        console.log(idsx);
        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/api/kendalas/${idsx}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Ganti dengan token JWT Anda
                    },
                }
            );

            if (response.status === 200) {
                console.log("Data berhasil dihapus.");
            }
        } catch (error) {
            console.log("Terjadi kesalahan saat menghapus data.", error);
        }
        fetchKendala();
        chart();
    };

    useEffect(() => {
        setLoading(true);
        fetchKendala();
        fetchKendalas();
        getWorkerHoursByReportId(reportId).then((r) => {
            // console.log(r);
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
                {showForm ? "X" : "Add Obstacles"}
            </button>
            {showForm && (
                <div className="mt-2 rounded-lg border border-graydisable px-2 py-3 shadow-lg">
                    <h2 className="mt-4 mb-2 font-Bitter text-2xl font-bold">
                        Obstacles
                    </h2>
                    <div className="mb-4">
                        <label className="block">Name:</label>
                        <input
                            type="text"
                            className="border-gray-400 rounded border p-2"
                            value={equipment.name}
                            onChange={(e) =>
                                setKendalas({
                                    ...equipment,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>
                    {/* <div className="mb-4">
                        <label className="block">Quantity:</label>
                        <input
                            type="number"
                            className="border-gray-400 rounded border p-2"
                            value={equipment.length}
                            onChange={(e) =>
                                setKendalas({
                                    ...equipment,
                                    length: parseInt(e.target.value),
                                })
                            }
                        />
                    </div> */}

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
                // <Table data={kendala} onDelete={handleDeleteEquipment} />
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
                                                Name
                                            </th>
                                            {/* <th
                                                scope="col"
                                                className="px-6 py-3 text-left font-Bitter text-xs font-medium uppercase tracking-wider text-white "
                                            >
                                                Quantity
                                            </th> */}
                                            <th
                                                scope="col"
                                                className="items-center px-6 py-3 text-left text-center font-Bitter text-xs font-medium uppercase tracking-wider text-white"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-gray-200 divide-y bg-white">
                                        {kendala.map((item, index) => (
                                            <tr key={item.id}>
                                                <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                    {index + 1}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                    {editRow == index
                                                        ? null
                                                        : item.name}
                                                    {editRow == index ? (
                                                        <input
                                                            className="w-20 rounded border px-2 py-1"
                                                            type="text"
                                                            placeholder={
                                                                item.name
                                                            }
                                                            value={name}
                                                            onChange={(e) =>
                                                                setname(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    ) : null}
                                                </td>
                                                {/* <td className="whitespace-nowrap px-6 py-0 font-Bitter">
                                                    {editRow == index
                                                        ? null
                                                        : item.length}
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
                                                </td> */}
                                                <td className="whitespace-nowrap px-6 py-0 font-Bitter ">
                                                    <button
                                                        className={
                                                            editRow == index
                                                                ? `hover:text-indigo-900 font-Bitter font-bold text-blue1`
                                                                : `hover:text-indigo-900 text-graydisable2`
                                                        }
                                                        onClick={() => {
                                                            editRow == index
                                                                ? handleKendala(
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

export default Kendala;
