import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { image } from './images/images'
import twitter from "./images/twitter.svg"

const LandingPage = () => {
  const [currentUser, setUser] = useState({ status: "", fullname: "" })
  
 
  useEffect(() => {
    const token = window.sessionStorage.getItem("accessToken")
    axios.get('https://backend9-binar.herokuapp.com/api/login', { headers: { authorization: token } }).then(res => {
      setUser({ loggedIn: res.data.authorized, fullname: res.data.fullname })
    })
  }, [])

  return (
    <>

      <section id="main-screen">
        <div class="container-fluid main-screen-container">
          <img class="main-background" src={image.mainBg.default.src} alt="" />
          <div class="main-screen">
            <div class="grid-item-container">
              <h1 class="grid-item">PLAY TRADTIONAL GAME</h1>
              <p class="grid-item">Selamat Datang {currentUser?.loggedIn ? currentUser?.fullname : ""}</p>
              <button class="grid-item" onClick={() => window.location = "/List"}>Play Now</button>
            </div>
          </div>
        </div>
      </section>
 

    </>
  )
}

export default LandingPage;