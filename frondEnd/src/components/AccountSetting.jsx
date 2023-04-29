import React, { useState } from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { headers, url } from '../Features/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Features/authSlice';
const AccountSetting = () => {
    const [validationError, setValidationError] = useState({});
    const [error, setError] = useState("")
    const [msg, setMsg] = useState("")
    const text = useSelector((state) => state.local.text);
    const auth = useSelector((state) => state.auth);
    const navigate =   useNavigate()
    const dispatch = useDispatch();
    const [value, setValue] = useState({
        oldPassword: "",
        newPassword: "",
        cpassword : "" 
    })


    const handleChangeInput = (e) => {
        setValue({...value ,  [e.target.name]   : e.target.value })
        setValidationError({}); 
        setError("")
    }

    const handlerSubmit =async(e)=> {
        e.preventDefault()
        try {
            const respons = await axios.patch(`${url}/users/updatePassword` , value  ,headers())
            setMsg(respons.data.message);
        } catch (error) {

            if(error.response.data?.err) {
                const errors = {}
                error.response.data.err.forEach((error) => {
                    errors[error.path[0]] = error.message
                })
                setValidationError(errors)
            }else {
                setValidationError({})
                setError(error.response.data.message)
            }
        }
    }

   const headleDeleteAccount = async(auth) => {
    Swal.fire({
        title: `${text.AreYouSureDeletedAcount} ${auth.firstName} ${auth.lastName}`,
        text: `${text.YouWontBe}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result)=> {
        if(result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            await axios.delete(`${url}/users` , headers())
            dispatch(logoutUser())
            navigate("/")
        }
      })
   
   }
  return (
   <>
<article className='accountSetting'>
       <h2 className='border-bottom pb-3 my-3'>{text.DeleteAccount}</h2>
        <div className='text-center'>
            <p className='text-danger'>{text.YouWillLoseAllContent}</p>
            <button className="btn btn-outline-danger" onClick={()=>headleDeleteAccount (auth)}>{text.DeleteAccount}</button>
        </div>
        <h2 className='border-bottom pb-3 my-3'>{text.ChangePassword}</h2>
        <form
            onSubmit={handlerSubmit}
            className={`d-flex flex-column  justify-content-center align-items-center `}
          >
            <div className="group w-50">
              <TextField
                helperText=""
                id="oldPassword"
                name="oldPassword"
                label={text.CurrentPassword}
                type="password"
                value={value.oldPassword}
                sx={{ width: "100%" }}
                onChange={handleChangeInput}
              />
                          {error ? (
              <span style={{ color: "red" }}>{error}</span>
            ) : null}
                 {validationError.oldPassword && (
    <span style={{ color: "red" }}>{validationError.oldPassword}</span>
  )}
            </div>
            <div className="group w-50 my-3">
              <TextField
                helperText=""
                id="newPassword"
                name="newPassword"
                label={text.NewPassword}
                type="password"
                value={value.newPassword}
                sx={{ width: "100%" }}
                onChange={handleChangeInput}
              />
             {validationError.newPassword && (
    <span style={{ color: "red" }}>{validationError.newPassword}</span>
  )}
            </div>
            <div className="group w-50 ">
              <TextField
                helperText=""
                id="cpassword"
                name="cpassword"
                label={text.NewPasswordConfirmation}
                type="password"
                value={value.cpassword}
                sx={{ width: "100%" }}
                onChange={handleChangeInput}
              />
                           {validationError.cpassword && (
    <span style={{ color: "red" }}>{validationError.cpassword}</span>
  )}
            </div>
            {msg ?     <p className="my-1 text-success text-center">{msg}</p>  : null}
            <div className="group w-50 my-3 d-flex   justify-content-center">
              <Button variant="contained"  color="primary" type="submit">
                {text.Change}
              </Button>
            </div>
          </form>
</article>
   </>
  )
}

export default AccountSetting