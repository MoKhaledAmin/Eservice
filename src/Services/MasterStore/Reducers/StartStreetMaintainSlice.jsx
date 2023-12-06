// Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Actions
import { SubmitStreetInfoAction, InsertAttachmentAction } from '../Actions/StartStreetMaintainAction';

// Initial State
const initialState = {
    loading: false,
    SubmitInfo: {},
    UploadAttach: {},
    error: ''
}

// InsertAttached
export const SubmitStreetInfo = createAsyncThunk(
    'InsertAttached',
    async (data) => {
        return await SubmitStreetInfoAction(data);
    }
)

// UploadAttach
export const InsertAttachment = createAsyncThunk(
    'UploadAttach',
    async (data) => {
        return await InsertAttachmentAction(data);
    }
)
const StartStreetMaintainSlice = createSlice({
    name: 'StartStreetMaintain',
    initialState,
    reducers: {},
    extraReducers: (Builder) => {


        // get data
        Builder.addCase(SubmitStreetInfo.pending, (State) => {
            State.loading = true;
        })
        Builder.addCase(SubmitStreetInfo.fulfilled, (State, Action) => {
            State.loading = false;
            State.SubmitInfo = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase(SubmitStreetInfo.rejected, (State, Action) => {
            State.loading = false;
            State.SubmitInfo = [];
            State.error = Action.error?.message;
        })

        // get data
        Builder.addCase(InsertAttachment.pending, (State) => {
            State.loading = true;
        })
        Builder.addCase(InsertAttachment.fulfilled, (State, Action) => {
            State.loading = false;
            State.UploadAttach = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase(InsertAttachment.rejected, (State, Action) => {
            State.loading = false;
            State.UploadAttach = [];
            State.error = Action.error?.message;
        })
    },
});

export default StartStreetMaintainSlice.reducer;