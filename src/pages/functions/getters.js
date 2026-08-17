// Categories
export const getCategories = async (id) => {
    const response = await fetch(`http://localhost:8000/api/categories/${id}/get`, {
        credentials: "include"
    });
    const data = await response.json();

    return data;
}

export const getBusinesses = async () => {
    const response = await fetch('http://localhost:8000/api/businesses/get', {
        credentials: "include"
    });
    const data = await response.json();

    return data;
}

export const getBusiness = async (id) => {
    const response = await fetch(`http://localhost:8000/api/business/${id}/get`, {
        credentials:"include"
    });
    const data = await response.json();

    return data
}