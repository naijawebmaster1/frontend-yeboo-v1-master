import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService,{ISignUp} from '../../actions/authActions';



const initialState: any = {
    loading: false,
    error: false,
    success: false,
    message: null,
}


//LOGIN USER

export const signupAction = createAsyncThunk(
    "signupAction",
    async (signUpData: ISignUp, thunkAPI) => {
        try {
            return await authService.Signup(signUpData);
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
        },
    },


    extraReducers: (builder) => {
        builder
            .addCase(signupAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(signupAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.data
            })
            .addCase(signupAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.message = action.payload;
            })
    }
})


export const { reset } = authLoginSlice.actions;

export default authLoginSlice.reducer;