import { useQuery } from "@tanstack/react-query";
import { tokenForFetch } from "../assets";
import { Loader } from "../Loader/Loader";
import styles from './styles.module.scss'


export const UserProfile = () => {


const {data, isLoading,isSuccess} = useQuery(['userProfile'], getUserDataWithQuery)

async function getUserDataWithQuery(){
return await fetch('https://api.react-learning.ru/v2/sm8/users/me',{
            method:"GET",
            headers: {
                authorization: tokenForFetch
            }
        })
        .then(res => res.json())
        .catch(err => alert(err.message))
    }
    
    if (isLoading){
        return (<Loader/>)
    }else if(isSuccess){
        
        return (
            <div className={styles.user_profile}>
            <img src={data.avatar} alt="UserPhoto" className={styles.user_avatar}/>
            <h2>{data.name}</h2>
            <p> {data.about}</p>
            <p> {data.email} </p>
        </div>
        )
    }
    }