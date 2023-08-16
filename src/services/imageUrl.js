import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/image-urls";

const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : "";
};

const bearerToken = getToken();

export const getImages = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error while fetching images:", error);
        throw error;
    }
};

export const getImagesByReport = async (reportId, token) => {
    try {
        const response = await axios.get(`${API_URL}/report/${reportId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error while fetching images by report:", error);
        throw error;
    }
};

export const createImage = async (imageData, token) => {
    try {
        const response = await axios.post(API_URL, imageData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error while creating image:", error);
        throw error;
    }
};

export const updateImage = async (imageId, imageData) => {
    try {
        const response = await axios.put(`${API_URL}/${imageId}`, imageData, {
            headers: {
                Authorization: bearerToken,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error while updating image:", error);
        throw error;
    }
};

export const deleteImage = async (imageId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${imageId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error while deleting image:", error);
        throw error;
    }
};
