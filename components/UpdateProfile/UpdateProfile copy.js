import React, { useEffect, useState } from 'react'
import NavBar from '../Navbar/Navbar';
import "./UpdateProfile.css"
import axios from 'axios';
import { useNavigate } from 'react-router';



function UpdateProfile(){
    const id = sessionStorage.getItem("id")
    const[currentUser,setCurrentUser]=useState("")

    const[email,setEmail]= useState("")
    const[password,setPassword]=useState("")
    const[fullname,setFullname]=useState("")
    const[bio,setBio]=useState("")
    const[city,setCity]=useState("")
    const[social_media_url,setSocial_Media_Url]=useState("")

    useEffect(()=>{
        axios.get('http://localhost:4000/api/users/'+id,).then(res=>{
          setCurrentUser(res.data.data)
    
          console.log(currentUser.email)
        })
      },[])

    const navigation = useNavigate();

    let handleSubmit=()=>{
        if(email===""||password===""||fullname===""||bio===""||city===""||social_media_url===""){
        document.querySelector(".error").innerHTML="Please Fill the Form"
        }else{
        console.log({email,fullname,bio,city,social_media_url})
            document.querySelector(".error").innerHTML=""
            axios.put('http://localhost:4000/api/users/'+id,{email,password,fullname,bio,city,social_media_url})
            .then(res=>{
            console.log(res.data.data.accessToken)
            sessionStorage.setItem('accessToken',res.data.data.accessToken)
            sessionStorage.setItem('id',res.data.data.id)
            const user = res.data.data.id
            console.log(res.data.data)
            return user
            
            }).then(user=>{
            alert("Update Success "+user.toUpperCase())
            window.location.replace("/Profile")
            })
            .catch(err=>{
            console.log(err.response.data)
            document.querySelector(".error").innerHTML=err.response.data.message
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
    <div className='main'>
    <div className='row container-height' >
        <div className='col-lg-6 col-md-6 m-auto' >
            <div className='container' >
                <h1 className='text-center'>Update Profile</h1>
                    <form >
                        <fieldset>
                            <div className='form-group' >
                                <label htmlFor='exampleInputEmail'>Email</label>
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
                            <div className='form-group'>
                                <label htmlFor='exampleInputName' >Fullname</label>
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
                            <div className='form-group' >
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
                            </div>
                            <br />
                            <h5 style={{color:"white"}}  className="error"></h5>
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
                        </fieldset>
                    </form>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}


export default UpdateProfile;