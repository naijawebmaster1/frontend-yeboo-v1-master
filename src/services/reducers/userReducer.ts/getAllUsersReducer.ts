import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import userService from "../../actions/userActions";
import groovieService from "../../actions/groovieAction";


const initialState: any = {
    users: null,
    loading: false,
    error: false,
    success: false,
    message: null,
}



export const getAllUsersAction = createAsyncThunk(
    "getAllUsersAction",
    async ({filters}:any, thunkAPI) => {
        try {
            return await groovieService.getAllUsers({filters})
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

export const getAllUsersSlice = createSlice({
    name: "getAllUsers",
    initialState,
    reducers: {
        //non asynchronous reducers goes here   
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = "";
            state.users = null;
        },
    },


    extraReducers: (builder) => {
        builder
            .addCase(getAllUsersAction.pending, (state) => {
                state.loading = true;
            })

            .addCase(getAllUsersAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.users = action?.payload?.data
            })

            .addCase(getAllUsersAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action?.payload;
                state.users = null;
            })
    }
})


export const { reset } = getAllUsersSlice.actions;

export default getAllUsersSlice.reducer;