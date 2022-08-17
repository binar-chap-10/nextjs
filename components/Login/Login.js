import React ,{useState}from "react";
import axios from 'axios';

function Login(){
  const[password,setPassword]= useState("")
  const[username,setUsername]=useState("")
  let handleSubmit=()=>{
    if(username===""||password===""){
       document.querySelector(".error").innerHTML="Password or Username Require"
    }else{
      console.log({username,password})
        document.querySelector(".error").innerHTML=""
        axios.post('https://backend9-binar.herokuapp.com/api/login',{username,password})
        .then(res=>{
          console.log(res.data.data.accessToken)
          sessionStorage.setItem('accessToken',res.data.data.accessToken)
          sessionStorage.setItem('id',res.data.data.id)
          const user = res.data.data.username
          console.log(res.data.data)
          return user
        
        }).then(user=>{
          alert("Selamat Datang "+user.toUpperCase())
          window.location="/"
        })
        .catch(err=>{
          console.log(err)
          document.querySelector(".error").innerHTML=err.response.data.message
        })
    }
    
 }

  return(
      <>
      <div className="background-login"></div>
      <section className="input">
          <div className="inputContainer">
          <h1>LOGIN</h1>
          <div className="inputBox">
              <input type="text"required="required" name="username"onChange={(value)=>setUsername(value.target.value)}/>
              <span>Username</span>
          </div>
          <div className="inputBox">
              <input type="text"required="required" name="password"onChange={(value)=>setPassword(value.target.value)}/>
              <span>Password</span>
          </div>
          <h5 className="error"></h5>
          <button className="buttonLogin" onClick={()=>handleSubmit()}>LOGIN</button>
          <a className="login-nav"href="/Register">Sign Up</a>
          <a className="login-nav"href="/">Back</a>
          </div>
      </section>
      </>
  )
}
export default Login;