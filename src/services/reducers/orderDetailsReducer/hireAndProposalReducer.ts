import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: any = {
    orderDetails: null,
    loading : false
}

export const hireAndProposalAction = createAsyncThunk(
    "orderDetails",
    async (details:any, thunkAPI) => {
         return details
      }
)

export const hireAndProposalSlice = createSlice({
    name: "hireAndProposal",
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
            .addCase(hireAndProposalAction.pending, (state) => {
                state.loading = true;
            })

            .addCase(hireAndProposalAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.orderDetails= action?.payload
            })

            .addCase(hireAndProposalAction.rejected, (state, action) => {
                state.message = null
                state.loading = false
            })
    }
})


export const { reset } = hireAndProposalSlice.actions;

export default hireAndProposalSlice.reducer;