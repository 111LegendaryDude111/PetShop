import { useQuery } from "@tanstack/react-query";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { tokenForFetch } from "../../assets";
import { Loader } from "../../Loader/Loader";
import { Likes } from "./Likes/Likes";
import styles from './styles.module.scss'
import './likeAndUnlike.css'
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_IN_BASKET, TOKE_FOR_AUTHORIZATION } from "../../../Redux/Redux";


export const Main = ({searchValue,setSearchValue}) => {

    const [userId,setUserId] = useState('');
    const dispatch = useDispatch()
    dispatch({type: TOKE_FOR_AUTHORIZATION, payload: tokenForFetch})



    const {data,isLoading,isError,error,isSuccess} = useQuery({
        queryKey: ['products'], 
        queryFn: getProductsWithQuery,
    })    
    const navigate = useNavigate()
    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/')
            }
        fetch('https://api.react-learning.ru/v2/sm8/users/me',{
            headers:{
                authorization: tokenForFetch
            }})
            .then(resp => resp.json())
            .then(user => setUserId(user._id))
            .catch(err => console.log(`User Error ${err.message}}`))
    },[])
async function getProductsWithQuery(){
     const response = await fetch('https://api.react-learning.ru/products',{
        method:'GET',
        headers:{
            authorization: tokenForFetch
        }})
        let result = await response.json()

        if(response.status === 400 || response.status === 401 ){
            console.log(`error: ${result.message}`)
        }else if(response.status === 200){
            return result
        }
    }
    
    function goToBasket(e){
            dispatch({type: PRODUCT_IN_BASKET, payload:e.target.id})
    }
        if(isLoading){
            return (<Loader />)
        }else if(isError){
            console.log(`error: ${error.message}`)
        }else if(isSuccess){
            let products = data.products;
            const filtredProducts = products.filter((product) => {
                return product.name.toLowerCase().includes(searchValue.toLowerCase())
            })
    return (
        <main>
            <div className={`container ${styles.containerPaddings}`}>
                <div className="row justify-content-center">
            {filtredProducts.length < 1 ? 
           <div className={styles.searchResult}>
                <div className={styles.leftSideSearchResult}>
                    По запросу <span className={styles.searchValueText}>{searchValue}</span> найдено 0 товаров
                </div>
                <div className={styles.centerSide}>
                    <i className={`fa-solid fa-face-sad-tear ${styles.sadSticker}`}></i>
                    <p className={styles.searchResultText}>
                        По вашему запросу товаров не найдено</p>
                    <button className={`btn btn-primary ${styles.btnGoToHomepage}`}
                    onClick={() => setSearchValue('')}
                    > На главную</button>
                </div>
            </div> 
            :filtredProducts.map((el) => {
                    return(
                    <div key={el._id} className={`card col col-3 ${styles.divCard}`}>
                        <span className={styles.discountPrice}>
                            {el.discount ? `-${el.discount}%` : ''}
                        </span>
                        <span className={styles.newProduct}>
                            {el.tags[0] === 'new'? `Новинка`: ''}
                        </span>
                        <span className={styles.spanForImg}>
                            <img key={el.pictures} src={el.pictures} className={`card-img-top ${styles.cardImg}`} alt={el.name} />
                            </span>
                            <span className={el.likes.includes(userId) ? 'like' : ''}>
                                <Likes id={el._id}/>
                            </span>
                        <div className="card-body">
                            <div className={`card-text ${el.discount ? styles.discPrice :styles.price}`}>
                              <div className={styles.oldPrice}>
                                 {el.discount ? el.price + 'P': ''}
                           </div>
                                {el.discount ? Math.round(el.price - (el.price * (el.discount /100)))
                                :el.price} {" "}    
                            <i className="fa-solid fa-ruble-sign"></i>
                            </div>
                            <p className={`card-text ${styles.weight}`}>{el.wight} </p>
                            <h5 className={`card-title ${styles.productName}`}>{el.name}</h5>
                            <br/>
                            <button id={el._id} className={`btn ${styles.btnStyle}`}
                                onClick={goToBasket}
                            >В корзину</button>
                        </div>
                    </div>
                    )
                })
            }
            </div>
            </div>
        </main>
    )
}
}



