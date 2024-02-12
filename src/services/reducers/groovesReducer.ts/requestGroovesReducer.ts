import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: any = {
    requestDetails: {}
}

export const requestGrooveAction = createAsyncThunk(
    "requestDetails",
    async (data:any, thunkAPI) => {
        return data
    }
)

export const requestGrooveSlice = createSlice({
    name: "requestGroove",
    initialState,
    reducers: {
        //non asynchronous reducers goes here   
        reset: (state) => {
            state.requestDetails ={}
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(requestGrooveAction.fulfilled, (state, action) => {
                state.requestDetails= action.payload
            })
    }
})


export const { reset } = requestGrooveSlice.actions;

export default requestGrooveSlice.reducer;