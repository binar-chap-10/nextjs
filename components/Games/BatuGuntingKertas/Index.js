import React, { useState, useEffect } from "react";
import styles from "./Index.module.css";
import axios from "axios";
import Link from "next/link";

export default function Index() {
  const [action, setAction] = useState("");
  const [pscore, setPscore] = useState(0);
  const [cscore, setCscore] = useState(0);
  const [status, setStatus] = useState("");
  const [comstyle, setComstyle] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (window) {
      const id = sessionStorage.getItem("id");
      setUserId(parseInt(id));
      // console.log(userid);
    }
  }, []);

  const rockIcon = "rock";
  const paperIcon = "paper";
  const scissorsIcon = "scissors";
  const randomClasses = [rockIcon, paperIcon, scissorsIcon];
  const randomNum = action && Math.floor(Math.random() * randomClasses.length);
  const computerShowIcon = randomClasses[randomNum];

  const clickStyle = () => {
    setAction("");
    setComstyle("");
  };
  const actionGame = () => {
    if (action === "rock" && computerShowIcon === scissorsIcon) {
      setPscore(pscore + 1);
      setStatus("PLAYER 1 WIN");
      setComstyle(scissorsIcon);
    } else if (action === "rock" && computerShowIcon === paperIcon) {
      setCscore(cscore + 1);
      setStatus("COM WIN");
      setComstyle(paperIcon);
    } else if (action === "paper" && computerShowIcon === scissorsIcon) {
      setCscore(cscore + 1);
      setStatus("COM WIN");
      setComstyle(scissorsIcon);
    } else if (action === "paper" && computerShowIcon === rockIcon) {
      setPscore(pscore + 1);
      setStatus("PLAYER 1 WIN");
      setComstyle(rockIcon);
    } else if (action === "scissors" && computerShowIcon === rockIcon) {
      setCscore(cscore + 1);
      setStatus("COM WIN");
      setComstyle(rockIcon);
    } else if (action === "scissors" && computerShowIcon === paperIcon) {
      setPscore(pscore + 1);
      setStatus("PLAYER 1 WIN");
      setComstyle(paperIcon);
    } else if (action === computerShowIcon) {
      setStatus("DRAW");
      setComstyle(computerShowIcon);
    } else {
      setStatus("VS");
    }
  };

  const postGames = async () => {
    try {
      let response = await axios.post(
        "http://localhost:4000/api/gameplay/add",
        { gameid: 1, score: pscore, userid: userId }
      );
      console.log(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    actionGame();
    if (parseInt(pscore) + parseInt(cscore) === 10) {
      parseInt(pscore) > parseInt(cscore)
        ? alert("PLAYER WIN")
        : alert("COM WIN");
      postGames();
      setPscore(0);
      setCscore(0);
      setStatus("VS");
    }
  }, [action]);

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <Link href={"/DetailGames"}>
          <div className={styles["arrow-back"]}>&lt;</div>
        </Link>
        <div className={styles.brand}>
          <img className="logoI" src={"/logo.png"} alt="logo" />
          <h1>ROCK PAPER SCISSORS</h1>
        </div>
      </header>
      <section className={styles.slide1}>
        <div className={styles["user-choice"]}>
          <h1 className={styles["player-name"]}>PLAYER 1</h1>
          <h1>{pscore}</h1>
          <div className={styles.user}>
            <button
              disabled={action}
              onClick={() => setAction("rock")}
              className={action === "rock" && styles.activee}
            >
              <img className={styles.rock} src={"/batu.png"} alt="batu" />
            </button>
            <button
              disabled={action}
              onClick={() => setAction("paper")}
              className={action === "paper" && styles.activee}
            >
              <img className={styles.paper} src={"gunting.png"} alt="kertas" />
            </button>
            <button
              disabled={action}
              onClick={() => setAction("scissors")}
              className={action === "scissors" && styles.activee}
            >
              <img
                className={styles.scissors}
                src={"/kertas.png"}
                alt="gunting"
              />
            </button>
          </div>
        </div>
        <div className={styles.vs}>
          <h1 className={status !== "VS" && "action"}>{status}</h1>
          <img
            onClick={() => clickStyle()}
            className={styles.refresh}
            src={"/refresh.png"}
            alt="batu"
          />
        </div>
        <div className={styles["com-choice"]}>
          <h1 className={styles["player-com"]}>COM</h1>
          <h1>{cscore}</h1>
          <div className={styles.com}>
            <button className={comstyle === rockIcon && styles.activee}>
              <img className={styles.rock} src={"/batu.png"} alt="batu" />
            </button>
            <button className={comstyle === paperIcon && styles.activee}>
              <img className={styles.paper} src={"gunting.png"} alt="kertas" />
            </button>
            <button className={comstyle === scissorsIcon && styles.activee}>
              <img class={styles.scissors} src={"/kertas.png"} alt="gunting" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
