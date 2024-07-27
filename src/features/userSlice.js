import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../services/api";

export const loginUser = createAsyncThunk(
    "user/login",
    async ({email, password}, {rejectWithValue}) => {
        try {
            const response = await api.fetchComments();
            const user = response.data.find(
                (u) => u.email === email && u.password === password
            );
            if (!user) {
                return rejectWithValue("Invalid credentials");
            }
            return user;
        } catch (error) {
            return rejectWithValue("Login failed. Please try again.");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        userData: null,
        status: "idle",
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.userData = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isLoggedIn = true;
                state.userData = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const {logout} = userSlice.actions;
export default userSlice.reducer;
