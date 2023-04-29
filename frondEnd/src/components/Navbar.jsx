import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLanguage } from "../Features/languageLocalSlice.js";
import Logo from "../Assets/Logo.png";
import { logoutUser } from "../Features/authSlice.js";

const Navbar = () => {
  const {text , currentLanguage} = useSelector((state) => state.local);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const handleLanguage = (e) => {
    if (currentLanguage === "en") {
      dispatch(setLanguage("ar"));
    } else {
      dispatch(setLanguage("en"));
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container ">
          <Link className="navbar-brand" to={"/home"}>
            <span>
              <img src={Logo} alt="Logo" className="mx-1" />
              {text.Saraha}
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user.comfirmEmail && auth._id ? (
                <>
                                  <li className="nav-item">
                    <Link className="nav-link" to={"/home"}>
                      {text.MyMessages}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/home/accountSetting"}>
                      {text.AccountSetting}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={"/"}
                      onClick={() => {
                        dispatch(logoutUser(null));
                      }}
                    >
                      {text.Logout}
                    </Link>
                  </li>
                  <li className="nav-item">
                  <button onClick={handleLanguage}  className="btn py-2"> {currentLanguage === "en" ? " العربية " : " English "}</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/register"}>
                      {text.SignUp}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/"}>
                      {text.SignIn}
                    </Link>
                  </li>
                  <li className="nav-item">
                  <button onClick={handleLanguage}  className="btn py-2"> {currentLanguage === "en" ? " العربية " : " English "}</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;


