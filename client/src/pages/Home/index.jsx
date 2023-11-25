import React from "react";

import { allProducts } from "../../redux/features/productSlice";

import Product from "../../components/Product";
import Categories from "../../components/Categories";

import "./home.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Home = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

  return (
    <>
      <Categories setTitle={setTitle} />
      <div className="main">
        <div className="main__title">{title}</div>
        <div className="main-wrapper">
          <div className="main__products">
            {products?.products?.map((item) => (
              <Product
                key={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
