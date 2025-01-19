import {combineReducers} from "@reduxjs/toolkit";
import tiktokSlice from "./slices/tiktokSlice";
import instagramSlice from "./slices/instagramSlice";

const rootSlice = combineReducers({
    tiktok: tiktokSlice,
    instagram: instagramSlice,
});

export default rootSlice;
