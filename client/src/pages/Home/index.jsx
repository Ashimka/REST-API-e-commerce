import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import { allProducts, filterCategory } from "../../redux/features/productSlice";

import Product from "../../components/Product";
import Categories from "../../components/Categories";

import "./home.scss";

const Home = () => {
  const [title, setTitle] = useState("");
  const [urlParams, setUrlParams] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const query = qs.stringify({
    category: urlParams,
  });

  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    if (!title) {
      dispatch(allProducts());
    }
  }, [dispatch, title]);

  useEffect(() => {
    if (title) {
      dispatch(filterCategory(query));
      navigate(`/products?${query}`);
    }
  }, [dispatch, title, query, navigate]);

  useEffect(() => {
    if (urlParams === "Vse") {
      navigate("/");
    }
  }, [urlParams, navigate]);

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
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                  />
                </React.Fragment>
              ))}
            {!data && <span>Не найдено...</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
