import { useState, useEffect} from "react";
import styles from './styles.module.scss'


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
        <div className={styles.user_profile}>
            <img src={user.avatar} alt="UserPhoto" className={styles.user_avatar}/>
            <h2>{user.name}</h2>
            <p> {user.about}</p>
            <p> {user.email} </p>
        </div>
        )
    }