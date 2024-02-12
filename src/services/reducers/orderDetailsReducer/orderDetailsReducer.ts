import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import grooveService from "../../actions/grooveActions";
import { toast } from "react-toastify";

const initialState: any = {
    orderDetails: null,
    loading : false
}

export const getOrderDetailsAction = createAsyncThunk(
    "orderDetails",
    async ({token, id}:any, thunkAPI) => {
        try {
          return await grooveService.getGrooveOrderDetails({token, id})
        } catch (error: any) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          toast.error(`${message}`);
          return thunkAPI.rejectWithValue(message);
        }
      }
)

export const getOrderDetailsSlice = createSlice({
    name: "getOrderDetails",
    initialState,
    reducers: {
        //non asynchronous reducers goes here   
        reset: (state) => {
            state.orderDetails = null;
            state.loading = false
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getOrderDetailsAction.pending, (state) => {
                state.loading = true;
            })

            .addCase(getOrderDetailsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.orderDetails= action?.payload.data
            })

            .addCase(getOrderDetailsAction.rejected, (state, action) => {
                state.message = action.payload;
                state.loading = false
            })
    }
})


export const { reset } = getOrderDetailsSlice.actions;

export default getOrderDetailsSlice.reducer;