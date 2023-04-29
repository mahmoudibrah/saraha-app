
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser , updateLoginError } from "../Features/authSlice";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [validationError, setValidationError] = useState({});
  const navigate =   useNavigate()
    const {text  } = useSelector((state) => state.local);
  const auth = useSelector((state) => state.auth);
  const userss = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
    dispatch(updateLoginError()) 
    setValidationError({})
  };


  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(loginUser(user)).then((result)=> {
        if(result.payload?.err) {
          const errors = {}
          result.payload.err.forEach((error)=> {
            errors[error.path[0]] = error.message
          })
          setValidationError(errors)
        }else {
          setValidationError({})
        }
      })
  };
  



  useEffect(() => {
    if(auth._id   && userss.comfirmEmail) {
      navigate('/home')
    }
  }, [ auth._id && userss.comfirmEmail])





  return (
    <>
      <div className="login my-5">
        <div className="container d-flex justify-content-center flex-column">
          <h2 className="text-center my-5">Login</h2>

          <form
            onSubmit={handleSubmit}
            className={`d-flex flex-column justify-content-center align-items-center`}
          >
            <div className="group w-50">
              <TextField
                helperText=""
                id="email"
                label={text.Email}
                type="email"
                value={user.email}
                sx={{ width: "100%" }}
                onChange={handleChange}
                onInput={() => dispatch(updateLoginError())}
                
              />
                                {validationError.email && (
    <span style={{ color: "red" }}>{validationError.email}</span>
  )}
            </div>
            <div className="group w-50 my-3">
              <TextField
                helperText=""
                id="password"
                label={text.Password}
                type="password"
                value={user.password}
                sx={{ width: "100%" }}
                onChange={handleChange}
                onInput={() => dispatch(updateLoginError())}
              />
                 {validationError.password && (
    <span style={{ color: "red" }}>{validationError.password}</span>
  )}
            </div>
            {auth.loginStatus === "rejected" && auth.loginError !== "validation error" ?  <p className="my-1 text-danger text-center "> {auth.loginError}  </p>     :  null} 
            <div className="group w-50 my-2 d-flex justify-content-center">
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </div>
          </form>
          <div className="d-flex justify-content-center">
         <Link
           to={"/forgetPassword"}
           className="forgetpasswordlink text-center  text-secondary my-3"
         >
            {text.ForgetPassword}
        </Link>
        </div>
        </div>
      </div>
    </>
  );
};

export default Login;

