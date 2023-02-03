import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { tokenForFetch } from "../assets";
import { ProductInLikedProducts } from "./ProductInLikedProducts/ProductInLikedProducts";
import styles from "./styles.module.scss";
import { Header } from "../HomePage/Header/Header";
import { Footer } from "../HomePage/Footer/Footer";
import { useNavigate } from "react-router-dom";
export const LikedProducts = () => {
  const likes = useSelector((store) => store.likes);
  const [likedProducts, setLikedProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getLikedProducts(likes);
  }, [likes]);
  async function getLikedProducts(arrayWithProductsId) {
    const tempArray = [];
    for (let i = 0; i < arrayWithProductsId.length; i++) {
      await fetch(
        `https://api.react-learning.ru/products/${arrayWithProductsId[i]}`,
        {
          method: "GET",
          headers: {
            authorization: tokenForFetch,
          },
        }
      )
        .then((resp) => resp.json())
        .then((data) => tempArray.push(data));
    }
    setLikedProducts(tempArray);
    return tempArray;
  }

  if (likes.length < 1) {
    return (
      <>
        <Header />
        <div className={styles.basketIsEmpty}>
          <h3> Нет избранных товаров </h3>
          <button
            className={styles.btnBackToHome}
            onClick={() => navigate("/homepage")}
          >
            На главную
          </button>
          <button
            className={styles.btnBackToHome}
            onClick={() => navigate("/userProfile")}
          >
            Профиль
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="">
      <Header />
      <div className="container-xxl">
        <h2 className={styles.h2}>Избранные товары: </h2>
        <div>
          {likedProducts.map((el, i) => {
            return (
              <ProductInLikedProducts
                key={crypto.randomUUID()}
                id={el._id}
                img={el.pictures}
                name={el.name}
                price={el.price}
                stock={el.stock}
                discount={el.discount}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};
