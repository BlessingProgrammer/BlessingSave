import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosClient from "../../network/axiosClient";
import stateStatus from "../../utils/stateStatus";
import {Data} from "../../models/Data";
import {RejectValue} from "../../models/RejectValue";

const endpoint = 'tiktok';

interface TiktokState {
    data: Data | null;
    tiktokPostUrlStatus: string;
    tiktokPostUrlError: string | null;
    downloadStatus: string;
    downloadError: string | null;
}

const initialState: TiktokState = {
    data: null,
    tiktokPostUrlStatus: stateStatus.idleState,
    tiktokPostUrlError: null,
    downloadStatus: stateStatus.idleState,
    downloadError: null,
}

export const tiktokPostUrl = createAsyncThunk<Data, {
    url: string;
    lang: string;
}, {
    rejectValue: RejectValue
}>(
    'tiktok/tiktokPostUrl',
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

const tiktokSlice = createSlice({
    name: "tiktok",
    initialState,
    reducers: {
        resetTiktokPostUrlState: (state) => {
            state.tiktokPostUrlStatus = stateStatus.idleState;
            state.tiktokPostUrlError = null;
            state.data = null;
        },
        resetTiktokDownloadStatus: (state) => {
            state.downloadStatus = stateStatus.idleState;
            state.downloadError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(tiktokPostUrl.pending, (state) => {
                state.tiktokPostUrlStatus = stateStatus.loadingState;
                state.tiktokPostUrlError = null;
            })
            .addCase(tiktokPostUrl.fulfilled, (state, action) => {
                state.tiktokPostUrlStatus = stateStatus.succeededState;
                state.tiktokPostUrlError = null;
                state.data = action.payload;
            })
            .addCase(tiktokPostUrl.rejected, (state, action) => {
                state.tiktokPostUrlStatus = stateStatus.failedState;
                state.tiktokPostUrlError = action.payload?.message || '';
            })
    }
});

export const {
    resetTiktokPostUrlState,
    resetTiktokDownloadStatus
} = tiktokSlice.actions;

export default tiktokSlice.reducer;
