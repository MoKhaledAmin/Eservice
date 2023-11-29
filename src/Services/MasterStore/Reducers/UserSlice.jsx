// Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Actions
import { SignUpAction, SigninAction } from '../Actions/UserAction';

// Initial State
const initialState = {
    loading: false,
    users: [],
    user: {},
    error: ''
}

// Sign up
export const SignUp = createAsyncThunk(
    'SignUp',
    async (user) => {
        return await SignUpAction(user);
    }
)
// Sign in
export const SignIn = createAsyncThunk(
    'SignIn',
    async (userSignIn) => {
        return await SigninAction(userSignIn);
    }
)

const SignUpSlice = createSlice({
    name: 'Sign',
    initialState,
    reducers: {},
    extraReducers: ( Builder) => {

        // Sign up
        Builder.addCase( SignUp.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SignUp.fulfilled, ( State, Action) => {
            State.loading = false;
            State.users = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( SignUp.rejected ,( State, Action) => {
            State.loading = false;
            State.users = [];
            State.error = Action.error?.message;
        })

        // Sign IN
        Builder.addCase( SignIn.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SignIn.fulfilled, ( State, Action) => {
            State.loading = false;
            State.users = Action.payload.DATA;
            State.error = '';
            if(Action.payload.MESSAGE.CODE === null && Action.payload.DATA !== null){
                localStorage.setItem('token', Action.payload?.JWT?.ACCESS_TOKEN)
            }
        })
        Builder.addCase( SignIn.rejected ,( State, Action) => {
            State.loading = false;
            State.users = [];
            State.error = Action.error?.message;
        })
    },
});

export default SignUpSlice.reducer;