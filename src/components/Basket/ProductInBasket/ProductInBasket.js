import { useState } from "react"
import styles from './styles.module.scss'


export const ProductInBasket = ({id,img,name,price,deleteProduct,stock}) =>{
    const [count,setCount] = useState(1)


    return(                            
    <div key={id} className={styles.cardInBasket}>
        <div className="d-flex mw-75%">
            <span >
                <img src={img} style={{height: 5 + 'em'}} />
            </span>
            <h4>
                {name}
            </h4>
        </div>
        <div className={styles.priceCount}>
            <div>{' ' + price === 1? price: price * count} р</div>
                <div className={styles.counterOfProduct}>
                    <button className={`fa-solid fa-minus ${styles.decrProd}`} 
                    disabled={count < 1  && true}
                    onClick={()=> setCount(prev=>prev - 1 )}></button>                                    
                     <span > {count}</span> 
                    <button className={`fa-solid fa-plus ${styles.incrProd}`} 
                    disabled={count === stock && true}
                    onClick={()=> setCount(prev=>prev + 1 )}></button>
                </div>
            <div>Товаров в наличии: {stock}</div>
        <div><i className={`fa-solid fa-trash ${styles.delete}`}
        id={id}
        onClick={deleteProduct}
        ></i></div>
        </div>
    </div>)
}
