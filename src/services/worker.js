import axios from "axios";

const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : "";
};

const bearerToken = getToken();

const apiUrl = "http://127.0.0.1:8000/api/workers";

export const getWorkerList = async () => {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: bearerToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getWorkerByReportId = async (reportId, token) => {
    try {
        const response = await axios.get(`${apiUrl}/report/${reportId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const createWorker = async (workerData, success, errors, token) => {
    try {
        await axios.post(apiUrl, workerData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        success();
    } catch (error) {
        console.error(error);
        errors();
    }
};

export const updateWorker = async (id, workerData, success, errors, token) => {
    try {
        await axios.put(`${apiUrl}/${id}`, workerData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        success();
    } catch (error) {
        console.error(error);
        errors();
    }
};

export const deleteWorker = async (id, success, token) => {
    try {
        await axios.delete(`${apiUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        success();
    } catch (error) {
        console.error(error);
    }
};
