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
  const [product, setProduct] = useState({});
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
      setProduct(result);
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
      <div key={product._id} className={`card col col-3 ${styles.divCard}`}>
        <span className={styles.discountPrice}>
          {product.discount ? `-${product.discount}%` : ""}
        </span>
        {/* <span className={styles.newProduct}>
                      {product.tags[0] === "new" ? `Новинка` : ""}
                    </span> */}
        <span className={styles.spanForImg}>
          <img
            key={product.pictures}
            src={product.pictures}
            className={`card-img-top ${styles.cardImg}`}
            alt={product.name}
          />
        </span>
        {/* <span className={product.likes.includes(userId) ? "like" : ""}>
                        <Likes id={product._id} />
                        </span> */}
        <div className="card-body">
          <div
            className={`card-text ${
              product.discount ? styles.discPrice : styles.price
            }`}
          >
            <div className={styles.oldPrice}>
              {product.discount ? product.price + "P" : ""}
            </div>
            {product.discount
              ? Math.round(
                  product.price - product.price * (product.discount / 100)
                )
              : product.price}{" "}
            <i className="fa-solid fa-ruble-sign"></i>
          </div>
          <p className={`card-text ${styles.weight}`}>{product.wight} </p>
          <h5 className={`card-title ${styles.productName}`}>{product.name}</h5>
          <br />
          <button
            id={product._id}
            className={`btn ${styles.btnStyle}`}
            onClick={() =>
              goToBasket(product._id, product.discount, product.price)
            }
          >
            В корзину
          </button>
        </div>
      </div>
    );
};
