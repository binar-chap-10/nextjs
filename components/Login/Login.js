import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Router, useRouter } from "next/router";

function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  let handleSubmit = () => {
    if (username === "" || password === "") {
      document.querySelector(".error").innerHTML =
        "Password or Username Require";
    } else {
      console.log({ username, password });
      document.querySelector(".error").innerHTML = "";
      axios
        .post("http://localhost:4000/api/login", { username, password })
        .then((res) => {
          console.log(res.data.data.accessToken);
          sessionStorage.setItem("accessToken", res.data.data.accessToken);
          sessionStorage.setItem("id", res.data.data.id);
          const user = res.data.data.username;
          console.log(res.data.data);
          return user;
        })
        .then((user) => {
          alert("Selamat Datang " + user.toUpperCase());
          // window.location = "/";
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          document.querySelector(".error").innerHTML =
            err.response.data.message;
        });
    }
  };

  return (
    <>
      <div className="background-login"></div>
      <section className="input">
        <div className="inputContainer">
          <h1>LOGIN</h1>
          <div className="inputBox">
            <input
              type="text"
              required="required"
              name="username"
              onChange={(value) => setUsername(value.target.value)}
            />
            <span>Username</span>
          </div>
          <div className="inputBox">
            <input
              type="text"
              required="required"
              name="password"
              onChange={(value) => setPassword(value.target.value)}
            />
            <span>Password</span>
          </div>
          <h5 className="error"></h5>
          <button className="buttonLogin" onClick={() => handleSubmit()}>
            LOGIN
          </button>
          <Link href={"/Register"}>
            <a className="login-nav">Sign Up</a>
          </Link>
          <Link href={"/"}>
            <a className="login-nav">Back</a>
          </Link>
        </div>
      </section>
    </>
  );
}
export default Login;
