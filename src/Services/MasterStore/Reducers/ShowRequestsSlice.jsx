// Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Actions
import { GetLightingRequestsAction } from '../Actions/ShowRequestsAction';

// Initial State
const initialState = {
    loading: false,
    LightingRequest: [],
    requests: {},
    error: ''
}

// GetLightingRequests
export const GetLightingRequests = createAsyncThunk(
    'GetLightingRequests',
    async () => {
        return await GetLightingRequestsAction();
    }
)

const ShowRequestsSlice = createSlice({
    name: 'ShowRequest',
    initialState,
    reducers: {},
    extraReducers: ( Builder) => {

        // get data
        Builder.addCase( GetLightingRequests.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetLightingRequests.fulfilled, ( State, Action) => {
            State.loading = false;
            State.LightingRequest = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( GetLightingRequests.rejected ,( State, Action) => {
            State.loading = false;
            State.LightingRequest = [];
            State.error = Action.error?.message;
        })
    },
});

export default ShowRequestsSlice.reducer;