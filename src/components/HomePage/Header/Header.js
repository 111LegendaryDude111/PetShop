import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import styles from './styles.module.scss'


export const Header = ({setSearchValue,searchValue}) =>{
    const navigate = useNavigate();
    const productsInTheBasket = useSelector(state => state.productsInTheBasket)
    function goToProfile(){
        navigate('/userProfile');
    }

    function goToHomepage(){
        navigate('/homepage')
    }

    function goToBasket(){
        navigate('/basket')
    }

    return(
        <header className={`${styles.header}`}>
            <a href='#' className={styles.logoDiv} onClick={goToHomepage}>
                <i className={`fa-solid fa-paw ${styles.logo}`}></i>
                <h1>DogFood</h1>
            </a>
            <div className=" mb-3">
                <input type="text" className={`${styles.searchInput}`} placeholder="Search"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                />
                    <i className={`fa-solid fa-circle-xmark ${styles.cross}`}
                    onClick={() => setSearchValue('')}
                    ></i>
            </div>
            <div className={styles.rightAside}>
                <span><i className={`fa-solid fa-heart ${styles.fa_heart_style}`}></i></span>
                <span
                    onClick={goToBasket}
                >
                <span className={styles.basketCountOfProducts}>
                    <div >{productsInTheBasket.length > 0 ? productsInTheBasket.length : ''}</div></span>
                <i className={`fa-solid fa-basket-shopping ${styles.fa_heart_style}`}></i>
                </span>
                <span onClick={goToProfile}>
                    <i className={`fa-solid fa-user ${styles.fa_heart_style}`}></i>
                </span>
            </div>
        </header>
    )
    
}
