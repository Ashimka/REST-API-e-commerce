import React, { useState } from "react";

import { data } from "../../data";

import "./categories.scss";

const Categories = () => {
  const [isActiveItem, setIsActiveItem] = useState("01");

  const handleActive = (index) => {
    setIsActiveItem(index);
  };

  return (
    <>
      <div className="category">
        <ul className="category__list">
          {data.map((item) => (
            <li
              className={
                isActiveItem === item.id
                  ? "category__item category-active"
                  : "category__item"
              }
              key={item.id}
              onClick={() => handleActive(item.id)}
            >
              {item.cat}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Categories;
