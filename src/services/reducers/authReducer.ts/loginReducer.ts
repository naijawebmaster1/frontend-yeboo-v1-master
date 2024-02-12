import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService,{ILogin} from '../../actions/authActions';



const initialState: any = {
    user: null,
    loading: false,
    error: false,
    success: false,
    message: null,
    token: null,
}


//LOGIN USER

export const loginAction = createAsyncThunk(
    "loginAction",
    async ({email, password}: ILogin, thunkAPI) => {
        try {
            return await authService.Login({email, password});
        } catch (error: any) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            toast.warning(`${message}`);
            return thunkAPI.rejectWithValue(message);
          }
    }
)

//CREATE THE SLICE

export const authLoginSlice = createSlice({
    name: "authLogin",
    initialState,
    reducers: {
        //non asynchronous reducers goes here   
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = "";
            state.user = {};
            state.token = null;
        },
    },


    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload.data
                state.token = action.payload.data.auth.accessToken
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
                state.user = null;
            })
    }
})


export const { reset } = authLoginSlice.actions;

export default authLoginSlice.reducer;
