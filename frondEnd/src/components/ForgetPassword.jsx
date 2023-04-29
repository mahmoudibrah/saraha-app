import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {  Outlet, useNavigate } from 'react-router-dom';
import { url } from '../Features/api';

const ForgetPassword = () => {
  const text = useSelector((state) => state.local.text);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const sendCode = async () => {
    try {
      const response = await axios.post(`${url}/users/sendCode`, { email });
      setMsg(response.data.message);
      navigate(`/forgetPassword/${email}`); 
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendCode();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("")
    setMsg("")
  };

  return (
    <>
      <div className="forgetPassword my-5">
        <div className="container d-flex justify-content-center flex-column">
          <h2 className="text-center mt-5 mb-2 fw-bold">{text.RestorePassword}</h2>
          <p className="text-center  fw-bold">
            {text.EnterYourEmail}
          </p>
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className="group w-50">
              <TextField
                helperText=""
                id="email"
                label={text.Email}
                type="email"
                sx={{ width: '100%' }}
                onChange={handleEmailChange}
                dir="auto"
              />
            </div>
            {msg ? (<>
              <p className="my-1 text-success text-center">{msg}</p>
              <p className="my-1 text-success text-center">{text.SentToAnEmail}</p>
            </>

            ) : null}
            {error ? (
              <p className="my-1 text-danger text-center ">{error}</p>
            ) : null}
            <div className="group w-50 my-2 d-flex justify-content-center">
              <Button variant="contained" color="primary" type="submit">
                {text.Send}
              </Button>
            </div>
          </form>
        </div>
        {msg ? <Outlet/> : null}
      </div>
    </>
  );
};

export default ForgetPassword;