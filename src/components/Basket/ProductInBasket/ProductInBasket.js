import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatusOfProductInBasket,
  decrementProductsInBasket,
  incrementProductsInBasket,
} from "../../../Redux/slices/slices";
import styles from "./styles.module.scss";

export const ProductInBasket = ({
  id,
  i,
  img,
  name,
  price,
  deleteProduct,
  stock,
  discount,
}) => {
  const [count, setCount] = useState(1);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((store) => store.basket);
  const idRef = createRef();

  price = discount ? price - (price * discount) / 100 : price;
  useEffect(() => {
    let tempProductCard = store.find(findinxeFunc);
    if (tempProductCard === undefined) {
      console.log({ tempProductCard });
      return;
    } else {
      setCount(tempProductCard.count);
      setChecked(tempProductCard.checked);
    }
    function findinxeFunc(el, i, arr) {
      let element = el.id;
      return element === id;
    }
  }, [store]);

  return (
    <div ref={idRef} id={id} key={i} className={styles.cardInBasket}>
      <div className="d-flex mw-75%">
        <span>
          <img src={img} className={styles.imgInBasket} />
        </span>
        <h4>{name}</h4>
        <span>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) =>
              dispatch(changeStatusOfProductInBasket(idRef.current.id))
            }
          />
        </span>
      </div>
      <div className={styles.priceCount}>
        <div className={styles.price}>
          {" " + price === 1 ? price : price * count} р
        </div>
        <div className={styles.counterOfProduct}>
          <button
            className={`fa-solid fa-minus ${styles.decrProd}`}
            disabled={count < 1 && true}
            onClick={(e) =>
              dispatch(decrementProductsInBasket(idRef.current.id))
            }
          ></button>
          <span> {count}</span>
          <button
            className={`fa-solid fa-plus ${styles.incrProd}`}
            disabled={count === stock && true}
            onClick={(e) =>
              dispatch(incrementProductsInBasket(idRef.current.id))
            }
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
