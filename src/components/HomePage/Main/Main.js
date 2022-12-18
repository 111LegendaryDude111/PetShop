import { useQuery } from "@tanstack/react-query";
import { tokenForFetch } from "../../assets";
import { Loader } from "../../Loader/Loader";
import styles from './styles.module.scss'

export const Main = () => {

async function getProductsWithQuery(){
  return  await fetch('https://api.react-learning.ru/products',{
        method:'GET',
        headers:{
            authorization: tokenForFetch
        }
}).then(resp => resp.json())  
.catch(err => alert(err.message))  
}

const {data,isLoading} = useQuery(['products'], getProductsWithQuery)    
if(isLoading){
    return (<Loader />)
}

    return (
        <main>
            <div className={`container ${styles.containerPaddings}`}>
                <div className="row justify-content-center">
            {
                data.products.map((el) => {
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
                            <div className={`card-text ${el.discount ? styles.discPrice :styles.price}`}>
                              <div className={styles.oldPrice}>
                                 {el.discount ? el.price + 'P': ''}
                           </div>
                                {el.discount ? Math.round(el.price - (el.price * (el.discount /100)))
                                :el.price} 
                            <i className="fa-solid fa-ruble-sign"></i>
                            </div>
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



