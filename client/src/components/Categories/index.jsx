import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { allCategory } from "../../redux/features/categorySlice";

import "./categories.scss";

const Categories = ({ setTitle, setSearchParams, activeItem }) => {
  const [isActiveItem, setIsActiveItem] = useState(activeItem);

  const { name } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsActiveItem(activeItem);
    dispatch(allCategory());
  }, [dispatch, setIsActiveItem, activeItem]);

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
