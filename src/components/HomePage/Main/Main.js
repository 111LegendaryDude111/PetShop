import { useEffect, useState } from "react"
import { tokenForFetch } from "../../assets";
import styles from './styles.module.scss'

export const Main = () => {

const [cards, setCards] = useState([]);
 useEffect( () =>  {
    getProducts()
},[]);

async function getProducts(){
    const response = await fetch('https://api.react-learning.ru/products',{
        method:'GET',
        headers:{
            authorization: tokenForFetch
        }
    })
    let result = await response.json();
    setCards(result.products)
    console.log(result.products)
}
    return (
        <main>
            <div className={`container ${styles.containerPaddings}`}>
                <div className="row justify-content-center">
            {
                cards.map((el,i) => {
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
                            <i className={`fa-regular fa-heart ${styles.heartStyleForFavourite}`}></i>
                        </span>
                        <div className="card-body">
                            <p className={`card-text ${el.discount ? styles.discPrice :styles.price}`}>
                              <div className={styles.oldPrice}>
                                 {el.discount ? el.price + 'P': ''}
                           </div>
                                {el.discount ? Math.round(el.price - (el.price * (el.discount /100)))
                                :el.price} 
                            <i className="fa-solid fa-ruble-sign"></i>
                            </p>
                            <p className={`card-text ${styles.weight}`}>{el.wight} </p>
                            <h5 className={`card-title ${styles.productName}`}>{el.name}</h5>
                            <br/>
                            <button className={`btn btn-primary ${styles.btnStyle}`}>В корзину</button>
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



