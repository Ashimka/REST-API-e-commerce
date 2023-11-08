import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { allCategory } from "../../redux/features/categorySlice";

import "./categories.scss";

const Categories = () => {
  const [isActiveItem, setIsActiveItem] = useState("01");

  const { name } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allCategory());
  }, [dispatch]);

  const handleActive = (index) => {
    setIsActiveItem(index);
  };

  return (
    <>
      <div className="category">
        <ul className="category__list">
          {name?.map((item) => (
            <li
              className={
                isActiveItem === item.id
                  ? "category__item category-active"
                  : "category__item"
              }
              key={item.id}
              onClick={() => handleActive(item.id)}
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
