import { configureStore } from "@reduxjs/toolkit";
import topHistoryReducer from "./topHistorySlice";

const store = configureStore({
    reducer: {
        topHistory: topHistoryReducer,
    },
});

export default store;
