import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import userService from "../../actions/userActions";


const initialState: any = {
    info: null,
    loading: false,
    error: false,
    success: false,
    message: null,
}



export const getUserDetailsAction = createAsyncThunk(
    "getUserDetailsAction",
    async ({token}:any, thunkAPI) => {
        try {
            return await userService.getUserDetails({token});
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

export const getUserDetailsSlice = createSlice({
    name: "getUserDetails",
    initialState,
    reducers: {
        //non asynchronous reducers goes here   
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = "";
            state.info = null;
        },
    },


    extraReducers: (builder) => {
        builder
            .addCase(getUserDetailsAction.pending, (state) => {
                state.loading = true;
            })

            .addCase(getUserDetailsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.info = action?.payload?.data
            })

            .addCase(getUserDetailsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action?.payload;
                state.info = null;
            })
    }
})


export const { reset } = getUserDetailsSlice.actions;

export default getUserDetailsSlice.reducer;