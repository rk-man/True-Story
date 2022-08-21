import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    createPostFromBackend,
    getOverallPostsFromBackend,
    getUsersPostsFromBackend,
    addOrRemoveLikeFromBackend,
} from "./postService";

const initialState = {
    allPosts: [],
    post: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

export const createPost = createAsyncThunk(
    "post/createPost",
    async (formData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            console.log("Hello there");

            const form = new FormData();
            form.append("description", formData.description);

            formData.Images.forEach((img, index) => {
                form.append("Images", img, img.name);
            });

            return await createPostFromBackend(form, token);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const getOverallPosts = createAsyncThunk(
    "post/getAllPosts",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await getOverallPostsFromBackend(token);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const getUsersPosts = createAsyncThunk(
    "post/getUsers",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await getUsersPostsFromBackend(token);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const addOrRemoveLike = createAsyncThunk(
    "post/addOrRemoveLike",
    async (postId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            return await addOrRemoveLikeFromBackend(token, postId);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);



const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.post = null;
        },

        resetAllPosts: (state) => {
            state.allPosts = [];
        },
    },
    extraReducers: (builders) => {
        builders

            //creating a  post
            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.post = action.payload.data.post;
                state.isSuccess = true;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            //gtting overall posts
            .addCase(getOverallPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOverallPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allPosts = action.payload.data.posts;
                state.isSuccess = true;
            })

            .addCase(getOverallPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(addOrRemoveLike.fulfilled, (state, action) => {
                state.allPosts = state.allPosts.map((post, index) => {
                    if (
                        String(post._id) == String(action.payload.data.post._id)
                    ) {
                        post.likes = action.payload.data.post.likes;
                        return post;
                    } else {
                        return post;
                    }
                });
            })

            .addCase(getUsersPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsersPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allPosts = action.payload.data.posts;
                state.isSuccess = true;
            })

            .addCase(getUsersPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            
    },
});

export const { reset, resetAllPosts } = postSlice.actions;

export default postSlice.reducer;
