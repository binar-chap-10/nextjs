import React, { useEffect, useState } from "react";
import './GameList.css';
import axios from 'axios';
import pict from '../../assets/images/game.png';

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
            <section className="boxs" onClick={() => window.location = "/DetailGames"}>
                {users?.data?.map((user, index) => (
                    <div key={index} className="box">
                        <img className="logoJ" src={pict} alt="boy" />
                        <p className="textJ">{user.name}</p>
                    </div>
                ))}
            </section>
        </div>
    )
}



