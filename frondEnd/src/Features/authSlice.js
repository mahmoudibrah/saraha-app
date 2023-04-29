import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {  url } from "./api";
import jwtDecode from "jwt-decode";


const initialState = {
  token:   localStorage.getItem("token") ,
  _id: "",
  firstName: "",
  email: "",
  lastName: "",
  registerStatus: "",
  doneMessageRespone : "" ,
  registerError: "",
  loginStatus: "",
  loginError: "",
  verifyStatus: "",
  verifyError: "",
  comfirmEmail : null,
  userLoading: false,
};

/* registerUser */
export const registerUser = createAsyncThunk("auth/registerUser" , async(user , { rejectWithValue })=> {
  try {
    const respons = await axios.post(`${url}/users/signup` , user)
    localStorage.setItem("token" ,respons.data.accessToken)
    return respons.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})


/**verifyUser*/
export const verifyEmail = createAsyncThunk("auth/verifyEmail"  , async(token , { rejectWithValue }) => {
  try {
    const respons = await axios.get(`${url}/users/confirmEmail/${token}`);
    return respons.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})



/* login */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const respons = await axios.post(`${url}/users/signin` , user)
      localStorage.setItem("token" ,respons.data.accessToken)
      return respons.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser (state , action)  {
        const token =  state.token;
        if(token) {
            const user = jwtDecode(token);
            return {
                ...state , 
                _id: user._id,
                comfirmEmail : user.comfirmEmail,
                firstName: user.firstName,
                email: user.email,
                lastName: user.lastName,
                userLoading:true,
              };
        }
    },
    logoutUser (state , action) {
      localStorage.removeItem("token")
      return{
        ...state,
        token: "",
        _id: "",
        firstName: "",
        email: "",
        lastName: "",
        registerStatus: "",
        doneMessageRespone : "" ,
        registerError: "",
        loginStatus: "",
        loginError: "",
        verifyStatus: "",
        verifyError: "",
        comfirmEmail : false,
        userLoading: false,
      }
    },
    updateLoginError (state , action) {
      return {...state , loginError : ""}
    },
    updateForgetPassword (state , action) {
      return {...state , comfirmEmail : true}
    },
    updateDoneMessageRespone (state , action) {
      return {...state , doneMessageRespone : ""}
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(registerUser.pending, (state, action) => {
        return { ...state, registerStatus: "pending" };
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload) {
          const user = jwtDecode(action.payload.accessToken);
          return {
            ...state,
            token: action.payload.accessToken,
            doneMessageRespone :  action.payload.message,
            _id: user._id,
            firstName: user.firstName,
            comfirmEmail : user.comfirmEmail,
            email: user.email,
            lastName: user.lastName,
            registerStatus: "success",
          };
        } else return state;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = "rejected";
        // state.registerError = action.payload.err[0].message  
        state.registerError = action.payload
      })
      .addCase(loginUser.pending  , (state, action) => {
        return { ...state, loginStatus: "pending" };
      })
      .addCase(loginUser.fulfilled  , (state, action) => {
        if (action.payload) {
          const user = jwtDecode(action.payload.accessToken);
          return {
            ...state,
            token: action.payload.accessToken,
            _id: user._id,
            firstName: user.firstName,
            comfirmEmail : user.comfirmEmail,
            email: user.email,
            lastName: user.lastName,
            registerStatus: "success",
          };
        } else return state;
      })
      .addCase(loginUser.rejected  , (state, action) => {
        return { ...state, 
          loginStatus: "rejected",
          loginError : action.payload.message 
        };
      })
      .addCase(verifyEmail.fulfilled  , (state, action) => {
      
        return { ...state, 
          verifyStatus: "success",
        };
        
      })
      .addCase(verifyEmail.pending  , (state, action) => {
        return { ...state, verifyStatus: "pending" };
      })
      .addCase(verifyEmail.rejected  , (state, action) => {
        return { ...state, 
          verifyStatus: "rejected",
          verifyError : action.payload.message 
        };
      })
  },
});


export const {loadUser    , logoutUser , updateLoginError  , updateForgetPassword  , updateDoneMessageRespone } = authSlice.actions
export default authSlice.reducer;


