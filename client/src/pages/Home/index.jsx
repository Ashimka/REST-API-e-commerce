import React from "react";

import { allProducts, filterCategory } from "../../redux/features/productSlice";
// import { oneCategory } from "../../redux/features/categorySlice";

import Product from "../../components/Product";
import Categories from "../../components/Categories";

import "./home.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    if (!title || title === "Все") {
      dispatch(allProducts());
    }
    if (title) {
      dispatch(filterCategory(title));
    }
  }, [dispatch, title]);

  const data = products?.products || products;

  return (
    <>
      <Categories setTitle={setTitle} />
      <div className="main">
        <div className="main__title">{title}</div>
        <div className="main-wrapper">
          <div className="main__products">
            {data?.map((item) => (
              <div className="products-list" key={item.id}>
                <Product
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
