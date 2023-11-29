// Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Actions
import { GetDistricAction ,GetStreetAction,GetPlanAction ,DisplayAttachedAction ,SubmitInfoAction,InsertAttachAction,UploadAttachAction,GetClientAction} from '../Actions/StartAction';

// Initial State
const initialState = {
    loading: false,
    Client: {},
    District: [],
    Street: {},
    Plan: {},
    DisplayAttach:{},
    SubmitInf:{},
    InsertAttach:{},
    UploadAttach:{},
    error: ''
}

// GetClient
export const GetClient = createAsyncThunk(
    'GetClient',
    async () => {
        return await GetClientAction();
    }
)
// GetDistric
export const GetDistric = createAsyncThunk(
    'GetDistric',
    async () => {
        return await GetDistricAction();
    }
)
// GetStreet
export const GetStreet = createAsyncThunk(
    'GetStreet',
    async () => {
        return await GetStreetAction();
    }
)
// GetPlan
export const GetPlan = createAsyncThunk(
    'GetPlan',
    async () => {
        return await GetPlanAction();
    }
)

// Submit Info
export const SubmitInfo = createAsyncThunk(
    'Submitdata',
    async (data) => {
        return await SubmitInfoAction(data);
    }
)

// DisplayAttached
export const DisplayAttachedSlice = createAsyncThunk(
    'DisplayAttached',
    async (id) => {
        return await DisplayAttachedAction(id);
    }
)

// InsertAttached
export const InsertAttach = createAsyncThunk(
    'InsertAttached',
    async (data) => {
        return await InsertAttachAction(data);
    }
)

// UploadAttach
export const UploadAttach = createAsyncThunk(
    'UploadAttach',
    async (data) => {
        return await UploadAttachAction(data);
    }
)

const StartSlice = createSlice({
    name: 'Start',
    initialState,
    reducers: {},
    extraReducers: ( Builder) => {

        // get data
        Builder.addCase( GetClient.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetClient.fulfilled, ( State, Action) => {
            State.loading = false;
            State.Client = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( GetClient.rejected ,( State, Action) => {
            State.loading = false;
            State.Client = [];
            State.error = Action.error?.message;
        })

        // get data
        Builder.addCase( GetDistric.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetDistric.fulfilled, ( State, Action) => {
            State.loading = false;
            State.District = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( GetDistric.rejected ,( State, Action) => {
            State.loading = false;
            State.District = [];
            State.error = Action.error?.message;
        })

        // get data
        Builder.addCase( GetStreet.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetStreet.fulfilled, ( State, Action) => {
            State.loading = false;
            State.Street = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( GetStreet.rejected ,( State, Action) => {
            State.loading = false;
            State.Street = [];
            State.error = Action.error?.message;
        })

        // get data
        Builder.addCase( GetPlan.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetPlan.fulfilled, ( State, Action) => {
            State.loading = false;
            State.Plan = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( GetPlan.rejected ,( State, Action) => {
            State.loading = false;
            State.Plan = [];
            State.error = Action.error?.message;
        })

        // get data
        Builder.addCase( DisplayAttachedSlice.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( DisplayAttachedSlice.fulfilled, ( State, Action) => {
            State.loading = false;
            State.DisplayAttach = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( DisplayAttachedSlice.rejected ,( State, Action) => {
            State.loading = false;
            State.DisplayAttach = [];
            State.error = Action.error?.message;
        })

        // get data
        Builder.addCase( SubmitInfo.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SubmitInfo.fulfilled, ( State, Action) => {
            State.loading = false;
            State.SubmitInf = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( SubmitInfo.rejected ,( State, Action) => {
            State.loading = false;
            State.SubmitInf = [];
            State.error = Action.error?.message;
        })

        // get data
        Builder.addCase( InsertAttach.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( InsertAttach.fulfilled, ( State, Action) => {
            State.loading = false;
            State.InsertAttach = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( InsertAttach.rejected ,( State, Action) => {
            State.loading = false;
            State.InsertAttach = [];
            State.error = Action.error?.message;
        })

        // get data
        Builder.addCase( UploadAttach.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( UploadAttach.fulfilled, ( State, Action) => {
            State.loading = false;
            State.UploadAttach = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( UploadAttach.rejected ,( State, Action) => {
            State.loading = false;
            State.UploadAttach = [];
            State.error = Action.error?.message;
        })
    },
});

export default StartSlice.reducer;