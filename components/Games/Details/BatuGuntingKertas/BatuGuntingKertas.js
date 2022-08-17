import React, { useEffect, useState } from "react";
import styles from './BatuGuntingKertas.module.css';
import axios from 'axios';

export default function BatuGuntingKertas() {
    const [score, setScore] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/api/users/score').then(res => {
            console.log(res.data.scores)
            setScore(res.data.scores)
        })
    }, []);

    const newScore = score.sort((a, b) => parseFloat(b.total_score) - parseFloat(a.total_score));
    const items = newScore.slice(0, 3).map((i, idx) => ({ no: idx + 1, nama: i.fullname, score: i.total_score }));

    const [games, setGames] = useState([]);
    console.log(games);
    const getGames = async () => {
        try {
            let response = await axios.get(`http://localhost:4000/api/game`)
            setGames(response.data);
        } catch (e) {
            console.log(e.message);
        }
    }
    console.log(score);
    useEffect(() => {
        getGames();
    }, [])

    return (
        <div className={styles.containerBatu}>
            <div className={styles.row}>
                <div className="col-xl-6 mb-5 kiri">
                    {games?.data?.map((game, index) => (
                        <div key={index}>
                            <h3 className={styles.gamedetails_texth3}>{game.name}</h3>
                            <p className={styles.gamedetails_textp}>{game.description}</p>
                        </div>
                    ))}
                    <div className={styles.bungkus}>
                        <p className={styles.high_p}>Highscore Top 3</p>
                        <table className={`${styles.table_leaderboard} table-hover table-striped table-bordered`}>
                            <thead>
                                <tr className={styles.tr}>
                                    <th className={styles.th}>
                                        <p>Name</p>
                                    </th>
                                    <th className={styles.th}>
                                        <p>Score</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr className={styles.tr} data-index={index}>
                                        <td className={styles.td}>{item.nama}</td>
                                        <td className={styles.td}>{item.score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={`${styles.b_play} d-grid`}>
                        <button className={`${styles.play}btn btn-primary`} type="button" onClick={() => window.location = "/GamesBatuGuntingKertas"}>Play Now</button>
                    </div>
                </div>
                <br />
                <div className="col-xl-6 mb-5 kanan">
                    <img
                        className={styles.bkg}
                        src={'/main-bg.jpg'}
                        alt="foto" />
                </div>
            </div>
        </div>
    )
}