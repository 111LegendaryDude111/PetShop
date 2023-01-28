import { useDispatch } from "react-redux";
import { addProductsInBasket } from "../../../Redux/slices/slices";
import styles from "./styles.module.scss";
import { deleteProductInLikedProducts } from "../../../Redux/slices/slices";
import { tokenForFetch } from "../../assets";
export const ProductInLikedProducts = ({
  id,
  img,
  price,
  name,
  stock,
  discount,
  index,
  i,
}) => {
  const dispatch = useDispatch();

  function goToBasket(id, discount, price) {
    dispatch(addProductsInBasket({ id, discount, price }));
  }
  function deleteProduct() {
    dispatch(deleteProductInLikedProducts(id));
    //Запрос чтобы на сервере убрать лайк с товара
    fetch(`https://api.react-learning.ru/products/likes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: tokenForFetch,
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((err) => console.log(`Error ${err.message}`));
  }

  return (
    <div id={id} key={i} className={styles.cardInBasket}>
      <div className="d-flex mw-75%">
        <span>
          <img src={img} className={styles.imgInBasket} />
        </span>
        <h4>{name}</h4>
      </div>
      <div className={styles.priceCount}>
        <div className={styles.price}>
          {discount ? price - (price * discount) / 100 : price} р
        </div>
      </div>
      <div>Товаров в наличии: {stock}</div>
      <div>
        <span
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteProduct();
          }}
        >
          <i className={`fa-solid fa-trash ${styles.delete}`}></i>
        </span>
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToBasket(id, discount, price);
          }}
        >
          {" "}
          В корзину
        </button>
      </div>
    </div>
  );
};
