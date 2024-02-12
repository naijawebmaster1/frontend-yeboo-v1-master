import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import grooveService from '../../actions/grooveActions';

const initialState: any = {
    loading: false,
    error: false,
    success: false,
    message: null,
    grooves: null,
}


export const getMyGroovesAction = createAsyncThunk(
    "getMyGroovesAction",
    async ({token}:any, thunkAPI) => {
      try {
        return await grooveService.getMyGrooves({token});
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

export const getMyGroovesSlice = createSlice({
    name: "getMyGrooves",
    initialState,
    reducers: {
        reset: (state) => {
          state.loading = false
          state.error = false
          state.success = false
          state.message = ""
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getMyGroovesAction.pending, (state) => {
            state.loading = true;
          })
          .addCase(getMyGroovesAction.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.grooves = action.payload.data;
          })
          .addCase(getMyGroovesAction.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.success = false;
            state.message = action.payload;
          });
    },
})

export const { reset } = getMyGroovesSlice.actions;

export default getMyGroovesSlice.reducer