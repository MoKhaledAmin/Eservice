// Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Actions
import { GetNserviceAction ,PrcServiceDetailSel } from '../Actions/OrdersAction';

// Initial State
const initialState = {
    loading: false,
    orders: [],
    order: {},
    error: ''
}

// GetNservice
export const GetNservice = createAsyncThunk(
    'GetNservice',
    async (data) => {
        return await GetNserviceAction(data);
    }
)

// PrcServiceDetail
export const PrcServiceDetail = createAsyncThunk(
    'PrcServiceDetail',
    async (data) => {
        return await PrcServiceDetailSel(data);
    }
)

const OrderSlice = createSlice({
    name: 'Nservice',
    initialState,
    reducers: {},
    extraReducers: ( Builder) => {

        // get data
        Builder.addCase( GetNservice.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetNservice.fulfilled, ( State, Action) => {
            State.loading = false;
            State.orders = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( GetNservice.rejected ,( State, Action) => {
            State.loading = false;
            State.orders = [];
            State.error = Action.error?.message;
        })

        // get data
        Builder.addCase( PrcServiceDetail.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( PrcServiceDetail.fulfilled, ( State, Action) => {
            State.loading = false;
            State.order = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( PrcServiceDetail.rejected ,( State, Action) => {
            State.loading = false;
            State.order = [];
            State.error = Action.error?.message;
        })
    },
});

export default OrderSlice.reducer;