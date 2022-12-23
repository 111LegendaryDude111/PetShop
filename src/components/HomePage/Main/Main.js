import { useQuery } from "@tanstack/react-query";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_FOR_LS } from "../../assets";
import { Loader } from "../../Loader/Loader";
import styles from './styles.module.scss'

export const Main = ({searchValue}) => {
    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/')
            }
    },[])
    
async function getProductsWithQuery(){
     const response = await fetch('https://api.react-learning.ru/products',{
        method:'GET',
        headers:{
            authorization: JSON.parse(localStorage.getItem(TOKEN_FOR_LS))
        }
})
let result = await response.json()

if(response.status === 400 || response.status === 401 ){
    console.log(`error: ${result.message}`)
}else if(response.status === 200){
    return result
}
}
    const {data,isLoading,isError,error,isSuccess} = useQuery({
        queryKey: ['products'], 
        queryFn: getProductsWithQuery,
    })    
if(isLoading){
    return (<Loader />)
}else if(isError){
    console.log(`error: ${error.message}`)
}else if(isSuccess){
    let products = data.products;
    const filtredProducts =  products.filter((product) => {
        return product.name.toLowerCase().includes(searchValue.toLowerCase())
    })

    console.log(filtredProducts)
    return (
        <main>
            <div className={`container ${styles.containerPaddings}`}>
                <div className="row justify-content-center">
            {
           filtredProducts.map((el) => {
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
}



