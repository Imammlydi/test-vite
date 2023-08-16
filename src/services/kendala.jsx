import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/api";
const token = localStorage.getItem("token");
const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : "";
};

const bearerToken = getToken();

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

const jwtToken = "your_jwt_token"; // Ganti dengan token JWT yang valid

api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// export const createKendala = async (data) => {
//   try {
//     const response = await api.post('/kendalas', data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteKendala = async (id) => {
//     try {
//         const response = await api.delete(`/kendalas/${id}`);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

export const updateKendala = async (id, data) => {
    try {
        const response = await api.put(`/kendalas/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getKendalabyReportId = async (reportId, token) => {
    try {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/kendalas/report/${reportId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
        // return console.log(response.data)
    } catch (error) {
        console.log(error);
    }
};
export const createKendala = async (token, data) => {
    try {
        const response = await axios.post(
            `http://127.0.0.1:8000/api/kendalas`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
        // return console.log(response.data)
    } catch (error) {
        console.log(error);
    }
};

export const deleteKendala = async (token, id) => {
    try {
        const response = await axios.delete(
            `http://127.0.0.1:8000/api/kendalas/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
