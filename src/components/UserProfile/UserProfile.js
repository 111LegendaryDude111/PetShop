import { useState, useEffect} from "react";


export const UserProfile = () => {
  const [user,setUser] = useState('');

  useEffect(() =>{
    const getUserData = async () =>{
        const response = await fetch('https://api.react-learning.ru/v2/sm8/users/me',{
            method:"GET",
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.log(err))
    }
    getUserData()     
    
}, []);

        return (
        <div >
            <img src={user.avatar} alt="UserPhoto"/>
            <h2>{user.name}</h2>
            <p> {user.about}</p>
            <p> {user.email} </p>
        </div>
        )
    }