import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
function NavBar() {
  const [currentUser, setUser] = useState({ status: "", fullname: "" });
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    console.log(token);
    axios.get("https://backend9-binar.herokuapp.com/api/login", {
        headers: { authorization: token },
      })
      .then((res) => {
        setUser({ loggedIn: res.data.authorized, fullname: res.data.fullname });
      });
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <a className="navbar-brand" href="#">
          LOGO
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto left-navbar">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                HOME<span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/List">
                GAME LIST
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                CONTACT
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                ABOUT ME
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto right-navbar">
            <li className="nav-item active">
              <a
                className="nav-link"
                href={currentUser?.loggedIn ? "/profile" : "/Register"}
              >
                {currentUser?.loggedIn
                  ? currentUser?.fullname.toUpperCase()
                  : "SIGNUP"}
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={
                  currentUser?.loggedIn
                    ? () => /*console.log("LOGOUT")*/ {
                        sessionStorage.removeItem("accessToken");
                        window.location = "/";
                      }
                    : () => {
                        console.log("LOGIN");
                        window.location = "/Login";
                      }
                }
                href="#"
              >
                {currentUser?.loggedIn ? "LOGOUT" : "LOGIN"}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
export default NavBar;
