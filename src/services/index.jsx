import axios from "axios";
import { urlAuthLogin, urlReport } from "./url";

// Function to get all items
export const getItems = async () => {
    try {
        const response = await axios.get(urlReport);
        response.data;
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Function to create an item
export const createItem = async ({ item }) => {
    try {
        const response = await axios.post(urlReport, item);
        return [response.data, window.location.reload()];
    } catch (error) {
        console.error("sdedwe", error);
    }
};
export const createItemLogin = async ({ item }) => {
    try {
        const response = await axios.post(urlAuthLogin, item);
        return console.log(response.data);
    } catch (error) {
        console.error(error, item);
    }
};

//fetch
export const fetchLogin = async ({ datas }) => {
    try {
        const response = await fetch(urlAuthLogin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datas),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

// Function to update an item
export const updateItem = async (itemId, updatedItem) => {
    try {
        const response = await axios.put(`/api/items/${itemId}`, updatedItem);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Function to delete an item
export const deleteItem = async (itemId) => {
    try {
        const response = await axios.delete(`/api/items/${itemId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
