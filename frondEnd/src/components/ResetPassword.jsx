
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import {  updateForgetPassword } from "../Features/authSlice";
import axios from "axios";
import { url } from "../Features/api";

const ResetPassword = () => {
    const navigate =   useNavigate()
    const dispatch = useDispatch();
    const { email } = useParams();
  const text = useSelector((state) => state.local.text);
  const auth = useSelector((state) => state.auth);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [errorValidation, setErrorValidation] = useState('');
  const [password, setPassword] = useState({
    email ,
    code : "",
    newPassword : ""
  })

  const forgetPassword = async() => {
    try {
        const response = await axios.post(`${url}/users/forgetPassword`, password);
        dispatch(updateForgetPassword())
        setMsg(response.data.message);
      } catch (error) {
        // if code in_vaild
        setError(error.response.data.message);
        if(error.response.data.message === "validation error") {
          setErrorValidation(error.response.data.err[0].message)
        }
      }
  }


  


  const handlerSubmit = (e) => {
    e.preventDefault();
    forgetPassword()
  };

  useEffect(() => {
    msg &&  navigate("/home")
  }, [msg])


  return (
<>
    <div className="contanier my-3 ">
    <form
            onSubmit={handlerSubmit}
            className={`d-flex flex-column  justify-content-center align-items-center `}
          >
            <div className="group w-50">
              <TextField
                helperText=""
                id="code"
                label="code"
                type="text"
                value={password.code}
                sx={{ width: "100%" }}
                onChange={(e) =>  {
                  setPassword({ ...password, code: e.target.value })
                  setError("")
                  setErrorValidation("")
                  setMsg("")
                } }
              />
            </div>
            <div className="group w-50 my-3">
              <TextField
                helperText=""
                id="password"
                label="newPassword"
                type="password"
                value={password.newPassword}
                sx={{ width: "100%" }}
                onChange={(e) =>  {
                  setPassword({ ...password, newPassword: e.target.value })
                  setError("")
                  setErrorValidation("")
                  setMsg("")
                }}
              />
            </div>
            {auth.loginStatus === "rejected" ?  <p className="my-1 text-danger text-center "> {auth.loginError}  </p>     :  null}

                        {msg ? (
              <p className="my-1 text-success text-center">{msg}</p>
            ) : null}
            {error ? (
              <p className="my-1 text-danger text-center">{error}</p>
            ) : null}
            {errorValidation ? (
              <p className="my-1 text-danger text-center">{errorValidation}</p>
            ) : null}

            <div className="group w-50 my-2 d-flex   justify-content-center">
              <Button variant="contained" color="primary" type="submit">
              {auth.loginStatus === "pending" ? text.Loading : text.Login}
              </Button>
            </div>
          </form>
    </div>
</>
  );
};

export default ResetPassword;
