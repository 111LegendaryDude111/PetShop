import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { tokenForFetch } from "../assets";
import { ProductInLikedProducts } from "./ProductInLikedProducts/ProductInLikedProducts";

export const LikedProducts = () => {
  const likes = useSelector((store) => store.likes);
  const [likedProducts, setLikedProducts] = useState([]);
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

  return (
    <div className="container">
      <h2>Избранные товары: </h2>
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
  );
};
