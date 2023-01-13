import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addProductsForRegistration } from "../../../Redux/slices/slices"
import styles from './styles.module.scss'

export const ProductInBasket = ({
  id,
  img,
  name,
  price,
  deleteProduct,
  stock,
  discount,
  inputChekbox,
}) => {
  const [count, setCount] = useState(1);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch()
  const store = useSelector(store => store)
  price = discount ? price - (price * discount) / 100 : price;


useEffect(() => {
  if(inputChekbox.includes(id)){
    setChecked(true)
  }

  if(checked === true){
      dispatch(addProductsForRegistration(id))
  }
},[checked])

useEffect(() => console.log(store),[store])

  return (
    <div key={id} className={styles.cardInBasket}>
      <div className="d-flex mw-75%">
        <span>
          <img src={img} className={styles.imgInBasket} />
        </span>
        <h4>{name}</h4>
        <span>
          <input id={id} type="checkbox" checked={checked} onChange={(e) => setChecked(prev => !prev) }/>
        </span>
      </div>
      <div className={styles.priceCount}>
        <div>{" " + price === 1 ? price : price * count} р</div>
        <div className={styles.counterOfProduct}>
          <button
            className={`fa-solid fa-minus ${styles.decrProd}`}
            disabled={count < 1 && true}
            onClick={() => setCount((prev) => prev - 1)}
          ></button>
          <span> {count}</span>
          <button
            className={`fa-solid fa-plus ${styles.incrProd}`}
            disabled={count === stock && true}
            onClick={() => setCount((prev) => prev + 1)}
          ></button>
        </div>
        <div>Товаров в наличии: {stock}</div>
        <div>
          <i
            className={`fa-solid fa-trash ${styles.delete}`}
            id={id}
            onClick={deleteProduct}
          ></i>
        </div>
      </div>
    </div>
  );
};
