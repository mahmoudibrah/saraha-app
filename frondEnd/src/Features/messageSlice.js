import { createSlice  , createAsyncThunk} from "@reduxjs/toolkit";
import { headers, url } from "./api";
import axios from "axios";

const initialState = {
    items: [],
    status: null,
}


export const fetchMessages = createAsyncThunk("messsage/fetchMessages" , async () => {
    const response = await axios.get(`${url}/messages`, headers())
    return response?.data;
})


const messageSlice = createSlice({
    name : "messsage",
    initialState,
    reducers : {},
    extraReducers : {
        [fetchMessages.pending]  : (state , action) => {
            state.status = "pending";
        },
        [fetchMessages.fulfilled]  : (state , action) => {
            state.status = "succsse";
            state.items = action.payload.messages;
        },
        [fetchMessages.rejected]  : (state , action) => {
            state.status = "rejected";
        },
    }
})


export default messageSlice.reducer


