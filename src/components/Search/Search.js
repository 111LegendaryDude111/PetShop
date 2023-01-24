import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { tokenForFetch } from "../assets";
import { useDebounce } from "./Debounce";
import styles from "./styles.module.scss";

export const Searchz = ({ setSearchValue }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(() => searchParams.get("q") ?? "");
  const debounceValue = useDebounce(input, 300);
  useEffect(() => {
    setSearchParams({ q: input });
  }, [input]);

  useEffect(() => {
    setSearch(debounceValue);
  }, [debounceValue]);

  async function setSearch(value) {
    fetch(`https://api.react-learning.ru/products/search?query=${value}`, {
      headers: {
        authorization: tokenForFetch,
      },
    })
      .then((resp) => resp.json())
      .then((data) => setSearchValue(data))
      .catch((err) => console.log(err.message));
  }

  return (
    <>
      <div>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <i
          onClick={() => setInput("")}
          className={`fa-solid fa-circle-xmark ${styles.cross}`}
        ></i>
      </div>
    </>
  );
};
