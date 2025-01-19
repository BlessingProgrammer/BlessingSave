import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosClient from "../../network/axiosClient";
import stateStatus from "../../utils/stateStatus";
import {Data} from "../../models/Data";
import {RejectValue} from "../../models/RejectValue";

const endpoint = 'instagram';

interface InstagramState {
    data: Data | null;
    instagramPostUrlStatus: string;
    instagramPostUrlError: string | null;
    downloadStatus: string;
    downloadError: string | null;
}

const initialState: InstagramState = {
    data: null,
    instagramPostUrlStatus: stateStatus.idleState,
    instagramPostUrlError: null,
    downloadStatus: stateStatus.idleState,
    downloadError: null,
}

export const instagramPostUrl = createAsyncThunk<Data, {
    url: string;
    lang: string;
}, {
    rejectValue: RejectValue
}>(
    'instagram/instagramPostUrl',
    async ({url, lang}, {rejectWithValue}) => {
        try {
            const response = await axiosClient.post(endpoint, {
                url: url,
            }, {
                params: {
                    lang: lang
                }
            });

            if (response.status === 200) {
                if (response.data.code === 200) {
                    console.log("res: ",response.data.data);
                    return response.data.data;
                } else {
                    return rejectWithValue({
                        code: response.data.code,
                        status: response.data.status,
                        message: response.data.message,
                    });
                }
            }
        } catch (e) {
            return rejectWithValue({
                code: 500,
                status: '',
                message: 'Server error',
            });
        }
    }
);

const instagramSlice = createSlice({
    name: "instagram",
    initialState,
    reducers: {
        resetInstagramPostUrlState: (state) => {
            state.instagramPostUrlStatus = stateStatus.idleState;
            state.instagramPostUrlError = null;
            state.data = null;
        },
        resetInstagramDownloadStatus: (state) => {
            state.downloadStatus = stateStatus.idleState;
            state.downloadError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(instagramPostUrl.pending, (state) => {
                state.instagramPostUrlStatus = stateStatus.loadingState;
                state.instagramPostUrlError = null;
            })
            .addCase(instagramPostUrl.fulfilled, (state, action) => {
                state.instagramPostUrlStatus = stateStatus.succeededState;
                state.instagramPostUrlError = null;
                console.log("payload: ",action.payload);
                state.data = action.payload;
            })
            .addCase(instagramPostUrl.rejected, (state, action) => {
                state.instagramPostUrlStatus = stateStatus.failedState;
                state.instagramPostUrlError = action.payload?.message || '';
            })
    }
});

export const {
    resetInstagramPostUrlState,
    resetInstagramDownloadStatus
} = instagramSlice.actions;

export default instagramSlice.reducer;
