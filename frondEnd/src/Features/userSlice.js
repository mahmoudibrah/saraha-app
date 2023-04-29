import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { headers, url } from "./api";



const initialState = {
    fetchProfileStatus: "",
    fetchProfileError: "",
    doneImage : null,
    comfirmEmail : null ,
}

export const fetchProfile = createAsyncThunk( "userSlice/fetchProfile" , async (value , { rejectWithValue }) => {
    try {
      const respons =  await axios.get(`${url}/users/profile` , headers())
      return respons?.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  })

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers : {},
    extraReducers : {
        [fetchProfile.pending] : (state , action)=> {
            state.fetchProfileStatus = "pending"
        },
        [fetchProfile.fulfilled] : (state , action)=> {
            state.fetchProfileStatus = "success"
            state.doneImage = action.payload.user?.profilImage
            state.comfirmEmail = action.payload.user?.comfirmEmail
        },
        [fetchProfile.rejected] : (state , action)=> {
            state.fetchProfileStatus = "rejected"
            state.fetchProfileError = action.payload
        },
    }
})

export default userSlice.reducer



