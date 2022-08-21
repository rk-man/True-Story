import axios from "axios";

const authURL = "/api/v1/users";

export const signupFromBackend = async (userData) => {
    const response = await axios.post(`${authURL}/signup`, userData);

    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("user", JSON.stringify(response.data.data.user));

    return response.data;
};

export const loginFromBackend = async (userData) => {
    const response = await axios.post(`${authURL}/login`, userData);

    console.log("Inside login from backend");
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("user", JSON.stringify(response.data.data.user));

    return response.data;
};

export const logoutFromBackend = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

export const editUserProfileFromBackend = async (form, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            ContentType: "multipart/form-data",
        },
    };

    const response = await axios.patch(
        `${authURL}/my-account/edit-profile`,
        form,
        config
    );

    console.log(response.data);
    localStorage.setItem("user", JSON.stringify(response.data.data.user));

    return response.data;
};
