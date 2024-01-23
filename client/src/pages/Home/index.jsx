import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { allProducts, filterCategory } from "../../redux/features/productSlice";

import Product from "../../components/Product";
import Categories from "../../components/Categories";

import "./home.scss";

const Home = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeItem, setActiveItem] = useState("");

  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if (!title && !searchParams.get("category")) {
      setActiveItem("Vse");

      dispatch(allProducts());
    }
  }, [dispatch, title, searchParams]);

  useEffect(() => {
    if (
      searchParams.get("category") &&
      searchParams.get("category") !== "Vse"
    ) {
      setActiveItem(searchParams.get("category"));
      dispatch(filterCategory(searchParams));
      navigate(`/products?${searchParams}`);
    }
  }, [dispatch, title, searchParams, navigate]);

  useEffect(() => {
    if (searchParams.get("category") === "Vse") {
      navigate("/");
    }
  }, [searchParams, navigate]);

  const data = products?.products || products;

  return (
    <>
      <Categories
        setTitle={setTitle}
        setSearchParams={setSearchParams}
        activeItem={activeItem}
      />
      {isLoading ? (
        <h4>Loading...</h4>
      ) : (
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
      )}
    </>
  );
};

export default Home;
