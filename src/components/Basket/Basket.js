import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { tokenForFetch } from "../assets"
import { ProductInBasket } from "./ProductInBasket/ProductInBasket"
import styles from './styles.module.scss'

export const Basket = () => {
    const productsInTheBasket = useSelector(store => store.productsInTheBasket)
    const [arrayForCards, setArrayForCards] = useState([]);
    const navigate = useNavigate()


    useEffect(()=>{
        getProductsInTheBasket(productsInTheBasket)
    },[productsInTheBasket])
  
    useEffect(()=>{
        console.log(productsInTheBasket)
        let basketProducts = JSON.stringify(productsInTheBasket)
        localStorage.setItem('basketProducts',basketProducts )
    },[productsInTheBasket])

    async function getProductsInTheBasket(arrayWithProductsId){
        let tempArray = [];
        for(let i = 0; i < arrayWithProductsId.length;i++){
          await  fetch(`https://api.react-learning.ru/products/${arrayWithProductsId[i]}`,{
                    method: 'GET',
                    headers:{
                        authorization: tokenForFetch
                    }
            }).then(resp => resp.json())
            .then(data => tempArray.push(data))
        }
        setArrayForCards(tempArray)
        return tempArray;
    }   

    if (arrayForCards.length < 1){
       return( 
       <div className={styles.basketIsEmpty}>
           <h3> Корзина пуста </h3>
            <button className={styles.btnBackToHome} onClick={()=> navigate('/homepage')}>
                На главную
            </button>
            <button className={styles.btnBackToHome} onClick={()=> navigate('/userProfile')}>
                Профиль
            </button>
       </div>
       )
    }

    return(

        <div className={styles.basketStyle}>
            <h2>Список товаров:</h2>
            <div >
                {
                    arrayForCards.map((el,i) => {
                        return(
                            <ProductInBasket
                            key={i}
                            id={el._id}
                            img={el.pictures}
                            name={el.name}
                            price={el.price}
                            index={i}
                            stock={el.stock}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}