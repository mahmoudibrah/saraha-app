
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import pic from "../Assets/pic.jpg"
import avatar from "../Assets/avatar.png"
import { Link } from "react-router-dom"
import {  Outlet  } from 'react-router-dom'
import {  headers, host, url  } from '../Features/api.js';
import { fetchProfile } from '../Features/userSlice.js';
import axios from 'axios';

const Home = () => {
  const text = useSelector((state) => state.local.text);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const { items  } = useSelector((state) => state.message);
  const [image, setImage] = useState("")
  const [uploadImage, setUploadImage] = useState(null);
  const [clickedButton, setClickedButton] = useState('');
  const dispatch = useDispatch();





  const handlChangeInput = (e) => {
  const file = e.target.files[0]
    transformFile(file)
  }
  const transformFile = (file) => {
    const  reader  = new FileReader()
    if(file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setImage(reader.result)
      }
    }else {
      setImage("")
    }
  }


  const handleButtonClick = (event) => {
    setClickedButton(event.target.getAttribute("name"))
}

  const handlSubmit = async (e) => {
    e.preventDefault()
    if(clickedButton === "updateImage") {
      const response = await axios.put(`${url}/users/uploadImage` , {uploadImage  : image  , oldImge : user.doneImage } ,  headers())
      setUploadImage(response.data.updateImageUser.profilImage)
    }
    if(clickedButton === "deleteImage") {
      await axios.delete(`${url}/users/deletedImage` , headers() )
      setUploadImage(null)
    }
  }



useEffect(() => {
  dispatch(fetchProfile())
}, [uploadImage])


  return (
<>
    <div className='profile mt-5 pt-4'>
      <div className='container '>
      <div className="row">
        <div className="col-md-8">
          <Outlet/>
        </div>
        <div className="col-md-4">
        <nav>
<div className="side-bar  p-2   text-center">
  <img src={pic} alt="coverimage" className="rounded-top"/>
  <div className="content bg-white p-2 rounded-bottom position-relative">
  
  <button  type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">

    <img  src={user?.doneImage? user.doneImage.url : avatar} style={{maxWidth: "100px"}}  alt="avatar" className="avatar position-absolute top-0 start-50 translate-middle rounded-circle border  "/> 
  
</button>

{/* <!-- updateImage Modal --> */}
<div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">{text.ChangeImage}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handlSubmit}>
          <div className="mb-3">
            <input onChange={handlChangeInput} type="file" accept='image/*' className='form-control' name="image" id="image" />
          </div>
          <div className="modal-footer">
        <button name="updateImage" type="submit"  onClick={handleButtonClick} className="btn btn-outline-info" data-bs-dismiss="modal">{text.UpdateImage}</button>
        <button type="submit" name='deleteImage' onClick={handleButtonClick} className="btn btn-outline-danger" data-bs-dismiss="modal">{text.RemoveImage}</button>
      </div>
        </form>
      </div>

    </div>
  </div>
</div>


    <h5 className="card-title mt-3 pt-3">
      <span className='px-2'>{auth.firstName}</span>
      <span>{auth.lastName}</span>
    </h5>



{/* <!--  shareProfile Button trigger modal --> */}
<button type="button" className="btn btn-primary my-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
 {text.ShareProfile}
</button>

{/* <!-- shareProfile Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">{text.SendThisLinkToAny}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <Link className='text-decoration-underline' to={`${host}/user/${auth._id}`}>
        {`${host}/user/${auth._id}`}
        </Link>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{text.Close}</button>
      </div>
    </div>
  </div>
</div>
<Link to={'/home'} className="countMessage d-flex justify-content-around  align-items-center my-1">
        <span className="card-text">{text.Message}</span>
        <span>{items.length}</span>
</Link>



<Link  to={'accountSetting'}>
{text.AccountSetting}
</Link>
  </div>
</div>
</nav>
        </div>
      </div>
      </div>
    </div>
</>
  )
}

export default Home
