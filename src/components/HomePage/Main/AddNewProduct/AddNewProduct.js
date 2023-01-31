import styles from './styles.module.scss'
import { tokenForFetch } from "../../../assets";
import { useRef } from 'react';

export const AddNewProduct = () => {
  const ref = useRef();

    function modalToogle() {
        if (ref.current.classList.contains("active")) {
          ref.current.classList.remove("active");
          ref.current.classList.add("inactive");
        } else {
          ref.current.classList.add("active");
          ref.current.classList.remove("inactive");
        }
      }

      
    //   {
    //     "available": true, // boolean
    //     "pictures": "https://react-learning.ru/image-compressed/2.jpg", // string
    //     "name": "Куриные желудочки для собак", // string, обязательное
    //     "price": 450, // number, обязательное
    //     "discount": 10, // number 
    //     "stock": 10, // number
    //     "wight": "100 г", // string
    //     "description": "Описание demo", // string, обязательное
    // }


      async function AddProduct() {
        await fetch('https://api.react-learning.ru/products',{
                method:"POST",
                headers:{
                    authorization: tokenForFetch,
                    'Content-Type': 'application/json'
                } ,
                body:JSON.stringify({
                    
                })
            }).then(resp => resp.json())
            .then(data => data)
            .catch(err => alert(err.message))
      }

    return (
        <form
        onSubmit={(e) => {
          e.preventDefault();
          modalToogle();
        }}
        className={`inactive ${styles.modal}`}
        ref={ref}
      >
        <input placeholder='available' />
        <input placeholder='pictures' />
        <input placeholder='name' />
        <input placeholder='price' />
        <input placeholder='discount' />
        <input placeholder='stock' />
        <input placeholder='wight' />
        <input placeholder='description' />

        <button type="submit">Отправить</button>

        <i className="cross fa-solid fa-xmark" onClick={modalToogle}></i>
      </form>
    )
}