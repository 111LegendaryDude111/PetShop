import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { UserProfile } from '../../UserProfile/UserProfile';
import styles from './styles.module.scss'


export const Header = () =>{
    const navigate = useNavigate();
    
    function goToProfile(){
        navigate('/userProfile/');
    }

    function goToHomepage(){
        navigate('/homepage')
    }

    return(
        <header className={`${styles.header}`}>
            <div className={styles.logoDiv} onClick={goToHomepage}>
                <i className={`fa-solid fa-paw ${styles.logo}`}></i>
                <h1>DogFood</h1>
            </div>
            <div className=" mb-3">
                <input type="text" className={`${styles.searchInput}`} placeholder="Search" />
                    <i className={`fa-solid fa-circle-xmark ${styles.cross}`}></i>
            </div>
            <div className={styles.rightAside}>
                <span><i className={`fa-solid fa-heart ${styles.fa_heart_style}`}></i></span>
                <span><i className={`fa-solid fa-basket-shopping ${styles.fa_heart_style}`}></i></span>
                <span onClick={goToProfile}>
                    <i className={`fa-solid fa-user ${styles.fa_heart_style}`}></i>
                </span>
            </div>
        </header>
    )
}
