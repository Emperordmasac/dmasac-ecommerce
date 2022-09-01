import axios from "axios";

export const getSubCategories = async () =>
    await axios.get(`${process.env.REACT_APP_API}/sub_categories`);

export const getSubCategory = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/sub_category/${slug}`);

export const removeSubCategory = async (slug, authToken) =>
    await axios.delete(`${process.env.REACT_APP_API}/sub_category/${slug}`, {
        headers: {
            authToken,
        },
    });

export const updateSubCategory = async (slug, category, authToken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/sub_category/${slug}`,
        category,
        {
            headers: {
                authToken,
            },
        }
    );

export const createSubCategory = async (category, authToken) =>
    await axios.post(`${process.env.REACT_APP_API}/sub_category`, category, {
        headers: {
            authToken,
        },
    });
