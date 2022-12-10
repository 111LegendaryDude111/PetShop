import { useState } from "react";


export const UserProfile = () => {
  const [user,setUser] = useState('');
    async function getUserData(){
        const response = await fetch('https://api.react-learning.ru/v2/sm8/users/me',{
            method:"GET",
            headers:{
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        const result = await response.json();
        setUser(result);
    }

    return (
        <div >
            <img src={user.avatar} alt="UserPhoto"/>
            <h2>{user.name}</h2>
            <p> {user.about}</p>
            <p> {user.email} </p>
            <button onClick={getUserData}>Get data </button>
        </div>

    )

}