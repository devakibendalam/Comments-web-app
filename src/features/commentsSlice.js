import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../services/api";

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async () => {
        const response = await api.fetchComments();
        return response.data;
    }
);

export const updateComment = createAsyncThunk(
    "comments/updateComment",
    async ({id, data}) => {
        const response = await api.updateComment(id, data);
        return response.data;
    }
);

export const addComment = createAsyncThunk(
    "comments/addComment",
    async (data) => {
        const response = await api.addComment(data);
        return response.data;
    }
);

export const deleteComment = createAsyncThunk(
    "comments/deleteComment",
    async (id) => {
        await api.deleteComment(id);
        return id;
    }
);

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    (comment) => comment.id === action.payload.id
                );
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (comment) => comment.id !== action.payload
                );
            });
    },
});

export default commentsSlice.reducer;
