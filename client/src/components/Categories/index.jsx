import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { allCategory } from "../../redux/features/categorySlice";

import "./categories.scss";

const Categories = ({ setTitle, setSearchParams }) => {
  const [isActiveItem, setIsActiveItem] = useState("Vse");

  const { name } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCategory());
  }, [dispatch]);

  const handleActive = (cat) => {
    setIsActiveItem(cat.latin);
    setSearchParams({ category: cat.latin });
    if (cat.name === "Все") {
      return setTitle("");
    }
    setTitle(cat.name);
  };

  return (
    <>
      <div className="category">
        <ul className="category__list">
          {name?.map((item) => (
            <li
              className={
                isActiveItem === item.latin
                  ? "category__item category-active"
                  : "category__item"
              }
              key={item.id}
              onClick={() => handleActive(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Categories;
