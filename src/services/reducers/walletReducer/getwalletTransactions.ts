import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import walletService from "../../actions/walletActions";


const initialState: any = {
   transactions: null,
    loading: false,
    error: false,
    success: false,
    message: null,
}

export const getWalletTransactionsAction = createAsyncThunk(
    "getWalletTransactionsAction",
    async ({token}:any, thunkAPI) => {
        try {
            return await walletService.getWalletTransactions({token});
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

export const getWalletTransactionsSlice = createSlice({
    name: "getWalletTransactions",
    initialState,
    reducers: {
        //non asynchronous reducers goes here   
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = "";
            state.transactions = null;
            state.token = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getWalletTransactionsAction.pending, (state) => {
                state.loading = true;
            })

            .addCase(getWalletTransactionsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.transactions = action?.payload?.data
            })

            .addCase(getWalletTransactionsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
                state.transactions = null;
            })
    }
})


export const { reset } = getWalletTransactionsSlice.actions;

export default getWalletTransactionsSlice.reducer;