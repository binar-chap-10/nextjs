import React, { useState, useEffect } from "react";
import './Index.css';
import logo from '../../../assets/images/logo.png';
import kembali from '../../../assets/images/refresh.png';
import rock from '../../../assets/images/batu.png';
import scissor from '../../../assets/images/gunting.png';
import paper from '../../../assets/images/kertas.png';
import axios from "axios";

export default function Index() {
    const [action, setAction] = useState('');
    const [pscore, setPscore] = useState(0);
    const [cscore, setCscore] = useState(0);
    const [status, setStatus] = useState('');
    const [comstyle, setComstyle] = useState('');

    const userid = sessionStorage.getItem("id");

    const rockIcon = "rock";
    const paperIcon = "paper";
    const scissorsIcon = "scissors";
    const randomClasses = [rockIcon, paperIcon, scissorsIcon];
    const randomNum = action && Math.floor(Math.random() * randomClasses.length);
    const computerShowIcon = randomClasses[randomNum];

    const clickStyle = () => {
        setAction('');
        setComstyle('');
    }
    const actionGame = () => {
        if (action === 'rock' && computerShowIcon === scissorsIcon) {
            setPscore(pscore + 1);
            setStatus('PLAYER 1 WIN');
            setComstyle(scissorsIcon);
        } else if (action === 'rock' && computerShowIcon === paperIcon) {
            setCscore(cscore + 1);
            setStatus('COM WIN');
            setComstyle(paperIcon);
        } else if (action === 'paper' && computerShowIcon === scissorsIcon) {
            setCscore(cscore + 1);
            setStatus('COM WIN');
            setComstyle(scissorsIcon);
        } else if (action === 'paper' && computerShowIcon === rockIcon) {
            setPscore(pscore + 1);
            setStatus('PLAYER 1 WIN');
            setComstyle(rockIcon);
        } else if (action === 'scissors' && computerShowIcon === rockIcon) {
            setCscore(cscore + 1);
            setStatus('COM WIN');
            setComstyle(rockIcon);
        } else if (action === 'scissors' && computerShowIcon === paperIcon) {
            setPscore(pscore + 1);
            setStatus('PLAYER 1 WIN');
            setComstyle(paperIcon);
        } else if (action === computerShowIcon) {
            setStatus('DRAW');
            setComstyle(computerShowIcon);
        } else {
            setStatus('VS');
        }
    }

    const postGames = async () => {
        try {
            let response = await axios.post("http://localhost:4000/api/gameplay/add", { gameid: 1, score: pscore, userid })
            console.log(response.data);
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        actionGame();
        if (parseInt(pscore) + parseInt(cscore) === 10) {
            parseInt(pscore) > parseInt(cscore) ? alert("PLAYER WIN") : alert("COM WIN");
            postGames();
            setPscore(0);
            setCscore(0);
            setStatus('VS');

        }
    }, [action])

    return (
        <div className="body">
            <header className="header">
                <div className="arrow-back" onClick={() => window.location = "/DetailGames"}>
                    &lt;
                </div>
                <div className="brand">
                    <img className="logoI" src={logo} alt="logo" />
                    <h1>ROCK PAPER SCISSORS</h1>
                </div>
            </header>
            <section className="slide1">
                <div className="user-choice">
                    <h1 className="player-name">PLAYER 1</h1>
                    <h1>{pscore}</h1>
                    <div className="user">
                        <button disabled={action} onClick={() => setAction('rock')} className={(action === 'rock') && 'activee'}>
                            <img className="rock" src={rock} alt="batu" />
                        </button>
                        <button disabled={action} onClick={() => setAction('paper')} className={(action === 'paper') && 'activee'}>
                            <img className="paper" src={paper} alt="kertas" />
                        </button>
                        <button disabled={action} onClick={() => setAction('scissors')} className={(action === 'scissors') && 'activee'}>
                            <img className="scissors" src={scissor} alt="gunting" />
                        </button>
                    </div>
                </div>
                <div className="vs">
                    <h1 className={status !== 'VS' && 'action'}>{status}</h1>
                    <img onClick={() => clickStyle()} className="refresh" src={kembali} alt="batu" />
                </div>
                <div className="com-choice">
                    <h1 className="player-com">COM</h1>
                    <h1>{cscore}</h1>
                    <div className="com">
                        <button className={(comstyle === rockIcon) && 'activee'}>
                            <img className="rock" src={rock} alt="batu" />
                        </button>
                        <button className={(comstyle === paperIcon) && 'activee'}>
                            <img className="paper" src={paper} alt="kertas" />
                        </button>
                        <button className={(comstyle === scissorsIcon) && 'activee'}>
                            <img class="scissors" src={scissor} alt="gunting" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}