import React, { useEffect, useState } from "react";
import styles from "./GameList.module.css";
import axios from "axios";
import { connect } from "react-redux";
// import { image } from "./images/images";
import { image } from "../../components/LandingPage/images/images";
import Link from "next/link";

export default function GameList() {
  const [users, setUsers] = useState([]);
  console.log(users);
  const getUsers = async () => {
    try {
      let response = await axios.get(`http://localhost:4000/api/game`);
      setUsers(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <section id="main-screen">
        <div className="container-fluid main-screen-container">
          <img
            className="main-background"
            src={image.mainBg.default.src}
            alt=""
          />
          <div className="main-screen">
            <Link href={"/DetailGames"}>
              <section
                className={styles.boxs}
                //   onClick={() => (window.location = "/DetailGames")}
              >
                {users?.data?.map((user, index) => (
                  <div key={index} className={styles.box}>
                    <img className={styles.logoJ} src={"/game.png"} alt="boy" />
                    <p className={styles.textJ}>{user.name}</p>
                  </div>
                ))}
              </section>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
