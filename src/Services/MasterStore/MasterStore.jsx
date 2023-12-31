// Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

import SignUpSlice from "./Reducers/UserSlice";
import OrderSlice from "./Reducers/OrderSlice";
import StartSlice from './Reducers/StartSlice';
import ShowRequest from './Reducers/ShowRequestsSlice';
import StartStreetMaintainSlice from './Reducers/StartStreetMaintainSlice';

export const MasterStore = configureStore({
    reducer: {
        User: SignUpSlice,
        Order: OrderSlice,
        Start: StartSlice,
        ShowRequest: ShowRequest,
        StartStreetMaintain: StartStreetMaintainSlice
    },
});