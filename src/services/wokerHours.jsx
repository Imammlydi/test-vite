import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : "";
};

const bearerToken = getToken();

const apiUrl = "http://127.0.0.1:8000/api/working-hours";

export const getWorkerHoursList = async () => {
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

export const getWorkerHours = async (id) => {
    try {
        const response = await axios.get(`${apiUrl}/${id}`, {
            headers: {
                Authorization: bearerToken,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getWorkerHoursByReportId = async (reportId, token) => {
    try {
        const response = await axios.get(`${apiUrl}/report/${reportId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const createWorkerHours = async (
    WorkerHoursData,
    success,
    errors,
    token
) => {
    try {
        await axios.post(apiUrl, WorkerHoursData, {
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

export const updateWorkerHours = async (
    id,
    WorkerHoursData,
    success,
    errors,
    token
) => {
    try {
        await axios.put(`${apiUrl}/${id}`, WorkerHoursData, {
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

export const deleteWorkerHours = async (id, success, token) => {
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
