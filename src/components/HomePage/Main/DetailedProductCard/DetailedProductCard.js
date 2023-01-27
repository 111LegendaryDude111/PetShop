import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addProductsInBasket } from "../../../../Redux/slices/slices";
import { tokenForFetch } from "../../../assets";
import { Loader } from "../../../Loader/Loader";
import { Likes } from "../Likes/Likes";
import styles from "./styles.module.scss";

export const DetailedProductCard = () => {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["productData"],
    queryFn: getProduct,
  });
  const { productId } = useParams();
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    getUserId();
    getProduct();
  }, []);

  async function getProduct() {
    try {
      const response = await fetch(
        `https://api.react-learning.ru/products/${productId}`,
        {
          headers: {
            authorization: tokenForFetch,
          },
        }
      );
      let result = await response.json();
      return result;
    } catch (err) {
      return err;
    }
  }

  async function getUserId() {
    await fetch("https://api.react-learning.ru/v2/sm8/users/me", {
      headers: {
        authorization: tokenForFetch,
      },
    })
      .then((resp) => resp.json())
      .then((user) => setUserId(user._id))
      .catch((err) => console.log(`User Error ${err}}`));
  }

  function goToBasket(id, discount, price) {
    dispatch(addProductsInBasket({ id, discount, price }));
  }
  if (isLoading) {
    return <Loader />;
  } else
    return (
      <div key={data._id} className={`card col col-3 ${styles.divCard}`}>
        <span className={styles.discountPrice}>
          {data.discount ? `-${data.discount}%` : ""}
        </span>
        <span className={styles.newProduct}>
          {data.tags[0] === "new" ? `Новинка` : ""}
        </span>
        <span className={styles.spanForImg}>
          <img
            key={data.pictures}
            src={data.pictures}
            className={`card-img-top ${styles.cardImg}`}
            alt={data.name}
          />
        </span>
        <span className={data.likes.includes(userId) ? "like" : ""}>
          <Likes id={data._id} />
        </span>
        <div className="card-body">
          <div
            className={`card-text ${
              data.discount ? styles.discPrice : styles.price
            }`}
          >
            <div className={styles.oldPrice}>
              {data.discount ? data.price + "P" : ""}
            </div>
            {data.discount
              ? Math.round(data.price - data.price * (data.discount / 100))
              : data.price}{" "}
            <i className="fa-solid fa-ruble-sign"></i>
          </div>
          <p className={`card-text ${styles.weight}`}>{data.wight} </p>
          <h5 className={`card-title ${styles.productName}`}>{data.name}</h5>
          <br />
          <button
            id={data._id}
            className={`btn ${styles.btnStyle}`}
            onClick={() => goToBasket(data._id, data.discount, data.price)}
          >
            В корзину
          </button>
        </div>
        <div>
          {data.reviews.map((el) => {
            console.log(el);
            return (
              <div className="container col-6">
                <p>Avtor: {el.author}</p>
                <p>Rating: {el.rating}</p>
                <p>Comment: {el.text}</p>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    );
};
