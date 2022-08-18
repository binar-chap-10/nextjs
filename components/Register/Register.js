import React, { useState, useNavigate } from "react";
import axios from "axios";
import Link from "next/link";
import { Router, useRouter } from "next/router";

function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  let handleSubmit = () => {
    if (username === "" || password === "" || email === "" || fullname === "") {
      document.querySelector(".error").innerHTML =
        "Please Fill The Require Field";
    } else {
      document.querySelector(".error").innerHTML = "";
      axios
        .post("http://localhost:4000/api/register", {
          username,
          password,
          fullname,
          email,
        })
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          router.push("/Login");
        })
        .catch((err) => {
          //console.log(err.response.data)
          document.querySelector(".error").innerHTML =
            err.response.data.message;
        });
      //Return Backend include {token,name,username,password,loggedIn:true or false}
    }
  };
  return (
    <>
      <div className="background-register"></div>
      <section className="input">
        <div className="inputContainer">
          <h1>REGISTER</h1>
          <div className="inputBox">
            <input
              type="text"
              required="required"
              name="email"
              onChange={(value) => setEmail(value.target.value)}
            />
            <span>Email</span>
          </div>
          <div className="inputBox">
            <input
              type="text"
              required="required"
              name="fullname"
              onChange={(value) => setFullname(value.target.value)}
            />
            <span>Fullname</span>
          </div>
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
              type="password"
              required="required"
              name="password"
              onChange={(value) => setPassword(value.target.value)}
            />
            <span>Password</span>
          </div>
          <h5 className="error"></h5>
          <button className="buttonLogin" onClick={() => handleSubmit()}>
            Register
          </button>
          <Link href={"/"}>
            <a className="login-nav">Back</a>
          </Link>
        </div>
      </section>
    </>
  );
}
export default Register;
