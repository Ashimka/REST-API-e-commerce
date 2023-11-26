import React from "react";

import { allProducts, filterCategory } from "../../redux/features/productSlice";

import Product from "../../components/Product";
import Categories from "../../components/Categories";

import "./home.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [urlParams, setUrlParams] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    if (!title || title === "Все") {
      dispatch(allProducts());
    }
    if (title !== "Все") {
      dispatch(filterCategory(urlParams));
    }
    if (urlParams) {
      if (urlParams === "Vse") {
        return navigate("/");
      }
      navigate(`/products/category/${urlParams}`);
    }
  }, [dispatch, navigate, title, urlParams]);

  const data = products?.products || products;

  return (
    <>
      <Categories setTitle={setTitle} setUrlParams={setUrlParams} />
      <div className="main">
        <div className="main__title">{title === "Все" ? "" : title}</div>
        <div className="main-wrapper">
          <div className="main__products">
            {data &&
              data?.map((item) => (
                <React.Fragment key={item.id}>
                  <Product
                    image={item.image}
                    name={item.name}
                    price={item.price}
                  />
                </React.Fragment>
              ))}
            {!data && <span>Не найдено</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
