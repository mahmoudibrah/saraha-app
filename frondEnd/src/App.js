import './App.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';
import EmailVerify from './components/EmailVerify';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import AccountSetting from '../src/components/AccountSetting';
import Messages from './components/Messages';
import SendMessage from './components/SendMessage';
import  Footer  from './components/Footer';
import { useSelector } from 'react-redux';



function App() {

  const auth = useSelector((state) => state.auth);
  function ProtectedRoute ({children} ) {
    if(auth._id) {
      return children
    }else {  
      return <Navigate  to="/" />
    }
  }


  return (
<>
<BrowserRouter>
<Navbar/>
<ToastContainer />
<Routes>
    <Route path='/' element={ <Login/> } />
    <Route path='/register' element={ <Register/> } />
    <Route path='/home' element={  <ProtectedRoute>  <Home /> </ProtectedRoute>               } >
      <Route index element={ <Messages/>} />
      <Route path='accountSetting' element={ <AccountSetting /> } />

    </Route>
    <Route path='verify/:token' element= { <EmailVerify/> } />
    <Route path='/forgetPassword' element = {<ForgetPassword/> } >
      <Route index element ={ <ResetPassword /> } />
      <Route path=':email' element={<ResetPassword />} />
    </Route>
    

    <Route path='/user/:id' element={ <SendMessage /> } />
    <Route path='/*' element={ <NotFound /> } />
</Routes>

<Footer/>

</BrowserRouter>

</>
  );
}

export default App;
