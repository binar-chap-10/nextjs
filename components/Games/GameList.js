import React, { useEffect, useState } from "react";
import styles from './GameList.module.css';
import axios from 'axios';

export default function GameList() {

    const [users, setUsers] = useState([])
    console.log(users);
    const getUsers = async () => {
        try {
            let response = await axios.get(`http://localhost:4000/api/game`)
            setUsers(response.data);
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div>
            <section className={styles.boxs} onClick={() => window.location = "/DetailGames"}>
                {users?.data?.map((user, index) => (
                    <div key={index} className={styles.box}>
                        <img className={styles.logoJ} src={'/game.png'} alt="boy" />
                        <p className={styles.textJ}>{user.name}</p>
                    </div>
                ))}
            </section>
        </div>
    )
}



