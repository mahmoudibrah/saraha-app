import React, { useEffect } from 'react'

import { useDispatch, useSelector } from "react-redux"
import moment from 'moment';
import { fetchMessages } from '../Features/messageSlice';

export const Messages = () => {
  const text = useSelector((state) => state.local.text);
  const { items } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages())
  }, [])
  
  return (
    <>
      <div className='content message'>
        <h3 className='bg-white my-3 border rounded-1 text-center p-1'>{text.Message}</h3>
        {items?.length ? (
          items.map((message) => (
            <div key={message._id} className="box-message p-4 bg-white my-3">
              <h4>{message.text}</h4>
              <h6 className="text-muted">
              {moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
              </h6>
            </div>
          ))
        ) : (
          <p className=" fw-bold text-center my-5">{text.ThereAreNoMessages}</p>
        )}
      </div>
    </>
  )
}

export default Messages










