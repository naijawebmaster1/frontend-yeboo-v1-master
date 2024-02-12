import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: any = {
    allChats: null,
    loading : false
}

export const chatMessagesAction = createAsyncThunk(
    "allChats",
    async (chats:any, thunkAPI) => {
         return chats
      }
)

export const chatMessagesSlice = createSlice({
    name: "chatMessages",
    initialState,
    reducers: {
        //non asynchronous reducers goes here   
        reset: (state) => {
            state.allChats = null;
            state.loading = false
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(chatMessagesAction.pending, (state) => {
                state.loading = true;
            })

            .addCase(chatMessagesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.allChats= action?.payload
            })

            .addCase(chatMessagesAction.rejected, (state, action) => {
                state.message = null
                state.loading = false
            })
    }
})


export const { reset } = chatMessagesSlice.actions;

export default chatMessagesSlice.reducer;