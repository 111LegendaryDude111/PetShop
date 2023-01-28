import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import modalStyles from "./modalStyles.css";
import { tokenForFetch } from "../../../../assets";

export const ModalForComment = ({ id }) => {
  const ref = useRef();
  const [comment, setComment] = useState("");

  function modalToogle() {
    if (ref.current.classList.contains("active")) {
      ref.current.classList.remove("active");
      ref.current.classList.add("inactive");
    } else {
      ref.current.classList.add("active");
      ref.current.classList.remove("inactive");
    }
  }

  function addComment() {
    fetch(`https://api.react-learning.ru/products/review/${id}`, {
      method: "POST",
      headers: {
        authorization: tokenForFetch,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: comment,
      }),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));
  }

  return (
    <>
      <button
        type="button"
        className={styles.commentsBtn}
        onClick={(e) => modalToogle()}
      >
        {" "}
        Добавить комментраий
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment();
          modalToogle();
          setComment("");
        }}
        className="inactive"
        ref={ref}
      >
        <input
          placeholder="Оставьте отзыв..."
          type="text"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button type="submit">Отправить</button>
      </form>
    </>
  );
};
