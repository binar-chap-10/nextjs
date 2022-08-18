import React, { useEffect, useState } from 'react'
import NavBar from '../Navbar/Navbar';
import "./UpdateProfile.module.css"
import axios from 'axios';



function UpdateProfile(){
    // const id = sessionStorage.getItem("id")
    const[currentUser,setCurrentUser]=useState("")

    const[email,setEmail]= useState("")
    const[password,setPassword]=useState("")
    const[fullname,setFullname]=useState("")
    const[bio,setBio]=useState("")
    const[city,setCity]=useState("")
    const[social_media_url,setSocial_Media_Url]=useState("")

    /*useEffect(()=>{
        axios.get('http://localhost:4000/api/users/'+id,).then(res=>{
          setCurrentUser(res.data.data)
    
          console.log(currentUser.email)
        })
      },[])*/



    let handleSubmit=()=>{
        if(email===""||fullname===""||bio===""){
        document.querySelector(".error").innerHTML="Please Fill the Form"
        }else{
            const id= sessionStorage.getItem("id")
            const url = "http://localhost:4000/api/users/"+id
            const token = sessionStorage.getItem("accessToken")
            axios.put(url,{email,fullname,bio,password},{headers:{authorization:token}})
       .then(res=>{
            alert(res.data.message)
            window.location.replace("/Profile")
            }).catch(err=>{
                console.log(err)
            })
        }
    }
    
    function goToProfile() {
        navigation("/Profile")
        // navigation("/about")
    }

    return (
    <>
    {/* <NavBar /> */}
    <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
    <div className= "w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto" >
        <div className='form w-100' >
            <div className='text-center mb-10' >
                <h1 className='text-dark mb-3' style={{ marginTop: "40px" }}>Update Profile</h1>
                    <form >
                        <fieldset>
                            <div className='fv-row mb-10' >
                                <label className="form-label fs-6 fw-bolder text-dark" htmlFor='exampleInputEmail'>Email</label>
                                <input
                                    type="email"
                                    name='email'
                                    className='form-control'
                                    // value={currentUser.email}
                                    required="required"
                                    placeholder={currentUser.email}
                                    onChange={(value)=>setEmail(value.target.value)}
                                />
                            </div>
                            <div className='form-group' >
                                <label htmlFor='exampleInputEmail'>Password</label>
                                <input
                                    type="password"
                                    name='password'
                                    className='form-control'
                                    // value={currentUser.email}
                                    required="required"
                                    placeholder="minimum 6 karakter"
                                    onChange={(value)=>setPassword(value.target.value)}
                                />
                            </div>
                            <div className='fv-row mb-10'>
                                <label className="form-label fs-6 fw-bolder text-dark" htmlFor='exampleInputName' >Fullname</label>
                                <input
                                    type="text"
                                    name='fullname'
                                    className='form-control'
                                    // value={currentUser.fullname}
                                    required="required"
                                    placeholder={currentUser.fullname}
                                    onChange={(value)=>setFullname(value.target.value)}
                                />
                            </div>
                            <div className='form-group' >
                                <label htmlFor='exampleInputBio'>Bio</label>
                                <input
                                    type="text"
                                    name='bio'
                                    className='form-control'
                                    // value={currentUser.bio}
                                    required="required"
                                    placeholder={currentUser.bio}
                                    onChange={(value)=>setBio(value.target.value)}
                                />
                            </div>


                            {/* <div className='form-group' >
                                <label htmlFor='exampleInputCity'>City</label>
                                <input
                                    type="text"
                                    name='city'
                                    className='form-control'
                                    // value={currentUser.city}
                                    required="required"
                                    placeholder={currentUser.city}
                                    onChange={(value)=>setCity(value.target.value)}
                                />
                            </div>
                            <div className='form-group' >
                                <label htmlFor='exampleInputSosial'>Social Media Url</label>
                                <input
                                    type="text"
                                    className='form-control'
                                    name='social_media_url'
                                    // value={currentUser.social_media_url}
                                    required="required"
                                    placeholder={currentUser.social_media_url}
                                    onChange={(value)=>setSocial_Media_Url(value.target.value)}
                                />
                            </div> */}


                            <br />
                            <h5 style={{color:"white"}}  className="error"></h5>
                           
                        </fieldset>
                    </form>
                    <button
                            className='btn btn-primary'
                            onClick={()=> handleSubmit()}
                            >
                                Update your profile
                            </button>
                            <button
                            className='btn btn-info' name='back'
                            onClick={()=> goToProfile()}
                            >
                                Back
                            </button>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}


export default UpdateProfile;