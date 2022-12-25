import { tokenForFetch } from '../../../assets'
import styles from './styles.module.scss'

 export const Likes = ({id}) => {

    function clickLikesHandler(target){
        console.dir(target.parentElement)
        target.parentElement.classList.toggle('like')               
        target.parentElement.className.includes('like') ? 
            fetch(`https://api.react-learning.ru/products/likes/${target.id}`,{
                method: "PUT",
                headers: {
                    authorization: tokenForFetch
                }})
                .then(resp =>resp.json())
                .catch(err => console.log(`Error ${err.message}`))
                :
                 fetch(`https://api.react-learning.ru/products/likes/${target.id}`,{
                    method: "DELETE",
                    headers: {
                        authorization: tokenForFetch
                    }})
                    .then(resp => resp.json())
                    .catch(err => console.log(`Error ${err.message}`))
    }

    return(
            <i id = {id} className={`fa-regular fa-heart 
            ${styles.heartStyleForFavourite}`}
                onClick={(e) =>{
                    clickLikesHandler(e.target)
                }}
            ></i>
    )
 }
