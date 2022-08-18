import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

function NavBar({ data }) {
  const currentUser = data.data;
  function refreshPage() {
    window.location.reload(false);
    sessionStorage.removeItem("accessToken");
  }

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
              <Link href="/">
                <a className="nav-link">
                  HOME<span className="sr-only">(current)</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/List">
                <a className="nav-link">GAME LIST</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">CONTACT</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">ABOUT ME</a>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto right-navbar">
            <li className="nav-item active">
              <Link href={currentUser?.loggedIn ? "/Profile" : "/Register"}>
                <a className="nav-link">
                  {currentUser?.loggedIn
                    ? currentUser?.fullname.toUpperCase()
                    : "SIGNUP"}
                  <span className="sr-only">(current)</span>
                </a>
              </Link>
            </li>
            <li className="nav-item active">
              {currentUser?.loggedIn ? (
                <a
                  type="button"
                  style={{ color: "white" }}
                  className="nav-link"
                  onClick={refreshPage}
                >
                  LOGOUT
                </a>
              ) : (
                <Link href={"/Login"}>
                  <a className="nav-link">LOGIN</a>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
export default NavBar;
