import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { image } from './images/images'
import twitter from "./images/twitter.svg"

const LandingPage = ({data}) => {
  const currentUser = data.data
  return (
    <>

      <section id="main-screen">
        <div className="container-fluid main-screen-container">
          <img className="main-background" src={image.mainBg.default.src} alt="" />
          <div className="main-screen">
            <div className="grid-item-container">
              <h1 className="grid-item">PLAY TRADTIONAL GAME</h1>
              <p className="grid-item">Selamat Datang {currentUser?.loggedIn ? currentUser?.fullname : ""}</p>
              <button className="grid-item" onClick={() => window.location = "/List"}>Play Now</button>
            </div>
          </div>
        </div>
      </section>
 

    </>
  )
}

export default LandingPage;