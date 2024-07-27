import {configureStore} from "@reduxjs/toolkit";
import commentsReducer from "./features/commentsSlice";
import userReducer from "./features/userSlice";

export default configureStore({
    reducer: {
        comments: commentsReducer,
        user: userReducer,
    },
});
