import axios from "axios";

export const createOrUpdateUser = async (authToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create_or_update_user`,
        {},
        {
            headers: {
                authToken,
            },
        }
    );
};

export const currentUser = async (authToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/current_user`,
        {},
        {
            headers: {
                authToken,
            },
        }
    );
};

export const currentAdmin = async (authToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/current_admin`,
        {},
        {
            headers: {
                authToken,
            },
        }
    );
};
