import { useState } from "react"
import { useSelector } from "react-redux"
import styles from './styles.module.scss'


export const ProductInBasket = ({id,img,name,price,index,stock}) =>{
    const productsInTheBasket = useSelector(store => store.productsInTheBasket)
    const [count,setCount] = useState(1)



    return(                            
    <div key={Date.now()} className={styles.cardInBasket}>
        <div className="d-flex mw-75%">
            <span >
                <img src={img} style={{height: 5 + 'em'}} />
            </span>
            <h4>
                {name}
            </h4>
        </div>
        <div className={styles.priceCount}>
            <div>{' ' + price } р</div>
                <div className={styles.counterOfProduct}>
                    <i className={`fa-solid fa-minus ${styles.decrProd}`} 
                    onClick={()=> setCount(prev=>prev - 1 )}></i>                                    
                     <span > {count}</span> 
                    <i className={`fa-solid fa-plus ${styles.incrProd}`} 
                    onClick={()=> setCount(prev=>prev + 1 )}></i>
                </div>
            <div>Товаров в наличии: {stock}</div>
        </div>
    </div>)
}
