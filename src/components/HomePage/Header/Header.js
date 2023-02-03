import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Searchz } from "../../Search/Search";
import styles from "./styles.module.scss";

export const Header = ({ setSearchValue, searchValue }) => {
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  function goToProfile() {
    navigate("/userProfile");
  }

  function goToHomepage() {
    navigate("/homepage");
  }

  function goToBasket() {
    navigate("/basket");
  }

  function goToLikedProducts() {
    navigate("/LikedProducts");
  }
  return (
    <header className={`${styles.header}`}>
      <Link to={"/homepage"} href=" " className={styles.logoDiv}>
        {/* // onClick={goToHomepage}> */}
        <i className={`fa-solid fa-paw ${styles.logo}`}></i>
        <h1>DogFood</h1>
      </Link>
      <div className=" mb-3">
        <Searchz setSearchValue={setSearchValue} />
      </div>
      <div className={styles.rightAside}>
        <Link
          to={"/LikedProducts"}
          className={styles.likesCountOfProductsContainer}
          onClick={goToLikedProducts}
        >
          <span className={styles.likesCountOfProductsContainer__Likes}>
            <div>{store.likes.length > 0 ? store.likes.length : ""}</div>
          </span>
          <i className={`fa-solid fa-heart ${styles.fa_heart_style}`}></i>
        </Link>
        <Link
          to={"/basket"}
          className={styles.basketCountOfProductsContainer}
          onClick={goToBasket}
        >
          <Link className={styles.basketCountOfProductsContainer__Products}>
            <div>{store.basket.length > 0 ? store.basket.length : ""}</div>
          </Link>
          <i
            className={`fa-solid fa-basket-shopping ${styles.fa_heart_style}`}
          ></i>
        </Link>
        <Link to={"/userProfile"}>
          <i className={`fa-solid fa-user ${styles.fa_heart_style}`}></i>
        </Link>
      </div>
    </header>
  );
};
