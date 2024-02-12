import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import walletService from "../../actions/walletActions";


const initialState: any = {
    walletInfo: null,
    loading: false,
    error: false,
    success: false,
    message: null,
}

export const getWalletAction = createAsyncThunk(
    "getWalletAction",
    async ({token}:any, thunkAPI) => {
        try {
            return await walletService.getWalletDetails({token});
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

export const getWalletSlice = createSlice({
    name: "getWallet",
    initialState,
    reducers: {
        //non asynchronous reducers goes here   
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = "";
            state.walletInfo = null;
            state.token = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getWalletAction.pending, (state) => {
                state.loading = true;
            })

            .addCase(getWalletAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.walletInfo = action?.payload?.data
            })

            .addCase(getWalletAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
                state.walletInfo = null;
            })
    }
})


export const { reset } = getWalletSlice.actions;

export default getWalletSlice.reducer;