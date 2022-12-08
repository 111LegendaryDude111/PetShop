import { useState } from "react";
import { tokenForFetch } from "../assets";


export const UserProfile = () => {
    const [user,setUser] = useState({});
    async function infoAboutUser(){
        let response = await fetch('https://api.react-learning.ru/v2/sm8/users/me',{
            method: 'GET',
            headers: {
                authorization: tokenForFetch
            }
        });
        let result = await response.json();
        console.log(result);
        setUser(result);
    }

    return (
        <div>
            <img src={user.avatar} alt="UserPhoto"/>
            <h2>{user.name}</h2>
            <p> {user.about}</p>
            <p> {user.email} </p>
            <button onClick={infoAboutUser}>Информация обо мне</button>
        </div>

    )
}