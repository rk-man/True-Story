import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    signupFromBackend,
    loginFromBackend,
    logoutFromBackend,
    editUserProfileFromBackend,
} from "./authService";

const USER = JSON.parse(localStorage.getItem("user"));
const TOKEN = JSON.parse(localStorage.getItem("token"));

const initialState = {
    user: USER ? USER : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    token: TOKEN ? TOKEN : null,
};

export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            return await signupFromBackend(userData);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await loginFromBackend(userData);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    return logoutFromBackend();
});

export const editUserProfile = createAsyncThunk(
    "auth/editUserProfile",
    async (formData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            console.log("Hello there");

            const form = new FormData();

            //              const form = new FormData();
            //              form.append("description", formData.description);
            //
            //              formData.Images.forEach((img, index) => {
            //                  form.append("Images", img, img.name);
            //              });

            if (formData.bio) {
                form.append("bio", formData.bio);
            }

            if (formData.username) {
                form.append("username", formData.username);
            }

            if (formData.Image != null) {
                form.append("Image", formData.Image);
            }

            return await editUserProfileFromBackend(form, token);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builders) => {
        builders
            //for signing in
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = { ...action.payload.data.user };
                state.token = action.payload.token;
            })

            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            //for logging in
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = { ...action.payload.data.user };
                state.token = action.payload.token;
            })

            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            //logout feature
            .addCase(logout.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null;
                state.token = null;
            })

            //edit user profile in my-account
            .addCase(editUserProfile.pending, (state) => {
                state.isLoading = false;
            })

            .addCase(editUserProfile.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.user = action.payload.data.user;
            })

            .addCase(editUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
