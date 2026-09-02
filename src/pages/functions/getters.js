import api from "@/axios.js";
// Categories
export const getCategories = async (id) => {
    const response = await api.get(`/api/categories/${id}/get`);
    return response.data
}

export const getBusinesses = async () => {
    try{
        const response = await api.get('/api/businesses/get');
        return response.data
    } catch(error) {
        console.error(error);
    }
}

export const getBusiness = async (id) => {
    const response = await api.get(`/api/business/${id}/get`);
    return response.data
}

export const getProducts = async (id) => {
    const response = await api.get(`/api/products/${id}/get`);
    return response.data
}

export const getLocations = async (id) => {
    const response = await api.get(`/api/locations/${id}/get`);

    return response.data
}

export const getInventories = async () => {
    const response = await api.get(`/api/inventories/get`);

    return response.data
}