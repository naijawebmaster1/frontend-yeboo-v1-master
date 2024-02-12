import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import grooveService from '../../actions/grooveActions';



const initialState: any = {
    grooves: null,
    loading: false,
    error: false,
    success: false,
    message: null,
}



export const getGroovesAction = createAsyncThunk(
    "getGroovesAction",
    async ({filters}:any, thunkAPI) => {
        try {
            return await grooveService.getGrooves({filters});
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

//CREATE THE SLICE

export const getGroovesSlice = createSlice({
    name: "getGrooves",
    initialState,
    reducers: {
        //non asynchronous reducers goes here   
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = "";
            state.grooves = null;
            state.token = null;
        },
    },


    extraReducers: (builder) => {
        builder
            .addCase(getGroovesAction.pending, (state) => {
                state.loading = true;
            })

            .addCase(getGroovesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.grooves = action?.payload?.data
            })

            .addCase(getGroovesAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
                state.grooves = null;
            })
    }
})


export const { reset } = getGroovesSlice.actions;

export default getGroovesSlice.reducer;