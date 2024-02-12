import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../actions/userActions";


const initialState: any = {
    bankInfo: null,
    loading: false,
    error: false,
    success: false,
    message: null,
}

export const getBankInfoAction = createAsyncThunk(
    "getBankInfoAction",
    async ({token}:any, thunkAPI) => {
        try {
            return await userService.getBankDetails({token})
        } catch (error: any) {
            // const message =
            //   (error.response &&
            //     error.response.data &&
            //     error.response.data.message) ||
            //   error.message ||
            //   error.toString();
            // toast.warning(`${message}`);
            // return thunkAPI.rejectWithValue(message);
          }
    }
)

export const getBankInfoSlice = createSlice({
    name: "getBankInfo",
    initialState,
    reducers: {
        //non asynchronous reducers goes here   
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = "";
            state.bankInfo = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getBankInfoAction.pending, (state) => {
                state.loading = true;
            })

            .addCase(getBankInfoAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.bankInfo = action?.payload?.data
            })

            .addCase(getBankInfoAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
                state.bankInfo = null;
            })
    }
})


export const { reset } = getBankInfoSlice.actions;

export default getBankInfoSlice.reducer;