import React, { useState, useEffect } from "react";
import { addProductsForRegistration } from "../../../Redux/slices/slices";
import styles from "./styles.module.scss";

export const ProductInBasket = ({
  id,
  img,
  name,
  price,
  deleteProduct,
  stock,
  discount,
}) => {
  const [count, setCount] = useState(1);
  const [checked, setChecked] = useState(false);
  price = discount ? price - (price * discount) / 100 : price;
  function handleChange() {
    setChecked(!checked);
  }

  useEffect(() => {
    if (checked === true) {
      addProductsForRegistration(id);
    } else {
      console.log("not checked");
    }
  }, [checked]);
  return (
    <div key={id} className={styles.cardInBasket}>
      <div className="d-flex mw-75%">
        <span>
          <img src={img} style={{ height: 5 + "em" }} />
        </span>
        <h4>{name}</h4>
        <span>
          <input type="checkbox" checked={checked} onChange={handleChange} />
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
