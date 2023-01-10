import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { DELETE_PRODUCTS_IN_BASKET } from "../../Redux/Redux"
import { tokenForFetch } from "../assets"
import { ProductInBasket } from "./ProductInBasket/ProductInBasket"
import styles from './styles.module.scss'

export const Basket = () => {
    const productsInTheBasket = useSelector(store => store.productsInTheBasket)
    const [arrayForCards, setArrayForCards] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        getProductsInTheBasket(productsInTheBasket)
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

    function deleteProduct(e){
        let target = e.target;
        dispatch({type: DELETE_PRODUCTS_IN_BASKET, payload: target.id})
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
            <div>
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
                            deleteProduct={deleteProduct}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}