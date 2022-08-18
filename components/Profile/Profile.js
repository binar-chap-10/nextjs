import React, { useEffect, useState } from 'react';
import NavBar from "../Navbar/Navbar";
import { useNavigate} from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Profile = ()=> {
 
  const[currentUser,setCurrentUser]=useState("")
  useEffect(()=>{
    const id = window.sessionStorage.getItem("id")
    axios.get('http://localhost:4000/api/users/'+id,).then(res=>{
      setCurrentUser(res.data.data)
      console.log(currentUser.bio)
    })
  },[])
  function goToUpdate() {
  window.location = "/update"
    // navigation("/about")
}

  return (
    <>
    
    <div className='background'>
      <a href='/'><h4 className='back-nav' href="/">{"<"}</h4></a>
        <div className='profile-container'>
          <div className='user-data'>
          <div>
                <h2 className='data-title'>USER ID</h2>
                <p>{currentUser.id}</p>
              </div>
              <div>
                <h2 className='data-title'>USERNAME</h2>
                <p>{currentUser.username}</p>
              </div>
              <div>
                <h2 className='data-title'>FULLNAME</h2>
                <p>{currentUser.fullname}</p>
              </div>
          </div>
          <div className='user-bio'>
              <div>
                <h2 className='data-title'>BIO</h2>
                <p>{currentUser.bio? currentUser.bio:"User To Lazy To Write Bio"}</p>
              </div>
          </div>
          
          <div className='user-data'>
              <div>
                <h2 className='data-title'>TOTAL SCORE</h2>
                <p>{currentUser.total_score? currentUser.total_score:"No Score Yet"}</p>
              </div>
              <button className='edit-button' onClick={()=>goToUpdate()}>EDIT</button>
             
          </div>

        </div>
    </div>
    </>
  )
}

export default Profile