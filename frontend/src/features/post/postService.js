import axios from "axios";
const postURL = "/api/v1/users/posts";


const homeUrl = "/api/v1/posts";

export const createPostFromBackend = async (form, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            ContentType: "multipart/form-data",
        },
    };

    const response = await axios.post(postURL, form, config);

    return response.data;
};

export const getOverallPostsFromBackend = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${homeUrl}/all-posts`, config);
    console.log(response.data);
    return response.data;
};

export const addOrRemoveLikeFromBackend = async (token, postId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.patch(
        `${postURL}/${postId}/likes`,
        {},
        config
    );

    console.log(response.data);
    return response.data;
};

export const getUsersPostsFromBackend = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(postURL, config);
    console.log(response.data);
    return response.data;
};

