import React, { useState, useEffect } from "react";
import {
    getWorkerList,
    getWorkerByReportId,
    deleteWorker,
} from "../services/worker";
// import { getWorkerList, getWorkerByReportId, deleteWorker } from './api';

const WorkerList = ({ reportId }) => {
    const [workerList, setWorkerList] = useState([]);
    // const [reportId, setReportId] = useState('');

    const fetchWorkerList = async () => {
        const data = await getWorkerList();
        setWorkerList(data);
    };

    const handleGetWorkerByReportId = async () => {
        const data = await getWorkerByReportId(reportId);
        setWorkerList(data);
    };

    const handleDeleteWorker = async (id) => {
        await deleteWorker(id);
        fetchWorkerList();
    };

    useEffect(() => {
        handleGetWorkerByReportId(reportId);
        fetchWorkerList();
    }, []);

    return (
        <div className="container mx-auto">
            <h2 className="mb-4 text-2xl font-bold">Worker List</h2>
            {/* <div className="mb-4">
        <label className="block">Report ID:</label>
        <input
          type="text"
          className="border border-gray-400 p-2"
          value={reportId}
          onChange={(e) => setReportId(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={handleGetWorkerByReportId}
        >
          Get by Report ID
        </button>
      </div> */}
            <ul>
                {workerList.map((worker) => (
                    <li key={worker.id} className="mb-2">
                        {worker.type_of_worker} - {worker.qty} workers
                        <button
                            className="bg-red-500 hover:bg-red-700 ml-2 rounded py-2 px-4 font-bold text-white"
                            onClick={() => handleDeleteWorker(worker.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkerList;
