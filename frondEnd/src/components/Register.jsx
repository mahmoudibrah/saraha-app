

import TextField from "@mui/material/TextField";
import React, {  useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, updateDoneMessageRespone } from "../Features/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate =   useNavigate()

  // Store validation error in the component's state
  const [validationError, setValidationError] = useState({});

  const {text , currentLanguage} = useSelector((state) => state.local);
  const auth = useSelector((state) => state.auth);
  const userss = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setValidationError({}); // clear validation error when any change occurs in the input
    dispatch(updateDoneMessageRespone())
  };


  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user)).then((result)=>{
      // If the registration failed, display the validation error message
      if(result.payload?.err) {
        const errors = {}
        result.payload.err.forEach((error)=> {
          errors[error.path[0]] = error.message
        })
        setValidationError(errors)
      }
    })
  };

  useEffect(() => {
    if(auth._id && userss.comfirmEmail) {
      navigate('/home')
    }
  }, [ auth._id ,  userss.comfirmEmail])



  return (
    <>
      <div className="register my-5">
        <div className="container d-flex justify-content-center flex-column">
          <h2 className="text-center my-3">{text.Register}</h2>
          <form
            onSubmit={handlerSubmit}
            className={`d-flex flex-column  justify-content-center align-items-center`}
          >
            <div className="group w-50 my-3">
              <TextField
                helperText=""
                name="firstName"
                id="firstName"
                label={`${text.FirstName}`}
                type="text"
                value={user.firstName}
                sx={{ width: "100%" }}
                onChange={handleInputChange}
                required
                error={!!validationError.firstName}
                dir={currentLanguage === "ar" ? "rtl" : "ltr"} 
              />
                {validationError.firstName && (
    <span style={{ color: "red" }}>{validationError.firstName}</span>
  )}
            </div>
            <div className="group w-50 mb-3">
              <TextField
                helperText=""
                id="lastName"
                name="lastName"
                label={`${text.LastName}`}
                type="text"
                value={user.lastName}
                sx={{ width: "100%" }}
                onChange={handleInputChange}
                required
                error={!!validationError.lastName }
              />
                 {validationError.lastName && (
    <span style={{ color: "red" }}>{validationError.lastName}</span>
  )}
            </div>
            <div className="group w-50">
              <TextField
                helperText=""
                id="email"
                name="email"
                label={text.Email}
                type="email"
                value={user.email}
                sx={{ width: "100%" }}
                onChange={handleInputChange}
                required
                autoComplete="email"
                error={!!validationError.email}
              />
                  {validationError.email && (
    <span style={{ color: "red" }}>{validationError.email}</span>
  )}
            </div>
            <div className="group w-50 my-3">
              <TextField
                helperText=""
                id="password"
                name="password"
                label={text.Password}
                type="password"
                value={user.password}
                sx={{ width: "100%" }}
                onChange={handleInputChange}
                required
                autoComplete="current-password"
                error={!!validationError.password}
              />
              {validationError.password && (
    <span style={{ color: "red" }}>{validationError.password}</span>
  )}
            </div>
   
            {auth.doneMessageRespone ? (
              <p className="alert alert-success"> {auth.doneMessageRespone} </p>
            ) : null}
            <div className="group w-50 my-2 d-flex   justify-content-center">
              <Button variant="contained" color="primary" type="submit">
                {auth.registerStatus === "pending"
                  ? text.Loading
                  : text.Register}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;



/* ooooorrrrr
      try {
    await dispatch(registerUser(user));
  } catch (error) {
    setValidationError(error.message);
  }
*/











































