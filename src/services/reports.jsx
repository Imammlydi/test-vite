import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/reports";

// Fungsi untuk mengatur Bearer Token
const setAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

// const getInspector= () => {
//   const id_inspector = localStorage.getItem('id_inspector');
//   return id_inspector ? `Bearer ${id_inspector}` : '';
// };

// const id_inspector = localStorage.getItem('id_inspector');

// Fungsi untuk mengambil semua laporan
export const getAllReports = async (token) => {
    try {
        setAuthHeader(token);
        const response = await axios.get(BASE_URL);
        return response.data;
        console.log(response.data);
    } catch (error) {
        // throw new Error(error.response.data.error);
        console.log(error);
    }
};

// Fungsi untuk mengambil laporan berdasarkan ID
export const getReportById = async (id, token) => {
    try {
        setAuthHeader(token);
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};
export const getReportByIdInspector = async (id_inspector, token) => {
    try {
        setAuthHeader(token);
        const response = await axios.get(
            `${BASE_URL}/inspector/${id_inspector}`
        );
        return response.data;
    } catch (error) {
        // throw new Error(error.response.data.error);
        console.log(error);
    }
};
export const getReportApproveByIdInspector = async (id_inspector, token) => {
    try {
        setAuthHeader(token);
        const response = await axios.get(`${BASE_URL}/approve/${id_inspector}`);
        return response.data;
    } catch (error) {
        // throw new Error(error.response.data.error);
        console.log(error);
    }
};

// Fungsi untuk membuat laporan baru
export const createReport = async (reportData, token) => {
    try {
        setAuthHeader(token);
        const response = await axios.post(BASE_URL, reportData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

// Fungsi untuk memperbarui laporan berdasarkan ID
export const updateReport = async (id, reportData, token) => {
    try {
        setAuthHeader(token);
        const response = await axios.put(`${BASE_URL}/${id}`, reportData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

// Fungsi untuk menghapus laporan berdasarkan ID
export const deleteReport = async (id, token) => {
    try {
        setAuthHeader(token);
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        // throw new Error(error.response.data.error);
    }
};
