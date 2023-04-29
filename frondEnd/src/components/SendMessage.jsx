import React, { useEffect, useState } from "react";
import avatar from "../Assets/avatar.png";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../Features/api";
import {  useSelector } from "react-redux";
import { toast } from "react-toastify";


const SendMessage = () => {
  const lang = useSelector((state) => state.local.text);

  const { id } = useParams();
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [text, setText] = useState("");
  const [msgError, setMsgError] = useState("");

  const getUser = async () => {
    try {
      const repones = await axios.get(`${url}/users/ShareProfile/${id}`);
      setUser(repones.data.user);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const sendMessage = async() => {
    try {
      await axios.post(`${url}/messages/${id}` , {text})
      toast.success(`${lang.MessageSentTo} ${user.firstName} ${user.lastName}`, {
        position : "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable : false,
      })
    } catch (error) {

      setMsgError(error.response.data.err[0].message)
      toast.error(error.response.data.err[0].message)
    }
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
    sendMessage()
    setText("")
  };

  return (
    <>
      <div className="user text-center my-5 py-5">
        <main className="container position-relative bg-white p-3 rounded ">
          {!error ? (
            <>
              <div className="position-absolute  top-0 start-50 translate-middle">
                {user.profilImage ?        <img
                  src={user.profilImage.url}
                  className="mx-3 my-3 rounded-circle"
                  alt="avatar"
                  style={{ width: "80px", height: "80px" }}
                /> :      <img
                  src={avatar}
                  className="mx-3 my-3 rounded-circle"
                  alt="avatar"
                  style={{ width: "80px", height: "80px" }}
                /> }
              </div>

              <form onSubmit={handlerSubmit}>
                <h5 className="card-title my-3 pt-3">
                  <span className="px-2">{user.firstName}</span>
                  <span>{user.lastName}</span>
                </h5>
                <div className="form-group ">
                  <textarea
                    onChange={(e) => {
                      setText(e.target.value)
                      setMsgError("")
                    }}
                    className="form-control w-50 mx-auto"
                    id="exampleFormControlTextarea1"
                    rows="5"
                    value={text}
                  ></textarea>
                </div>
                {msgError && <span style={{ color: "red" }}>{msgError}</span>}
                <div className="d-flex justify-content-center my-3">
                  <Button
                   type="submit"
                    variant="contained"
                    className="btn btn-primary mx-3"
                    endIcon={<SendIcon />}
                  >
                    {lang.Send}
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <p className="my-3 fw-bold fs-4">{error}</p>
          )}
        </main>
      </div>
    </>
  );
};

export default SendMessage;
