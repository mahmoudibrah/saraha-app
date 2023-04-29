import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import success from '../Assets/successfully.png';
import { useDispatch, useSelector } from 'react-redux';
import {  verifyEmail } from '../Features/authSlice';


const EmailVerify = () => {

    const params = useParams();
    const text = useSelector((state) => state.local.text);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(verifyEmail(params.token))
    }, []);
  



    // render loading indicator while verifyEmail is running
    if (auth.verifyStatus === "pending") {
      return <div className='my-5 py-5 text-center'>{text.Loading} .......</div>;
    }
  
    return (
      <>
        {auth.verifyStatus === "success" ? (
          <section className='verify_email text-capitalize  d-flex align-items-center justify-content-center'>
            <div className='content text-center'>
              <img src={success} alt='success_img' className='w-100' />
              <h1>{text.EmailVerifySuccess}</h1>
              <Link to={'/home'} className=''>
                <button  className='btn btn-success mx-auto'>Home</button>
              </Link>
            </div>
          </section>
        ) : (
  
         <section className='verify_email text-capitalize  d-flex align-items-center justify-content-center'>
           <div className='content text-center'>
             <h1>{text.EmailVerifyFailed}</h1>
             <p>The email verification link is invalid or has already been used.</p>
             <Link to={'/'} className=''>
               <button className='btn btn-success mx-auto'>Go to login page</button>
             </Link>
           </div>
         </section>
        )}
      </>
    );
  };
  
  export default EmailVerify;