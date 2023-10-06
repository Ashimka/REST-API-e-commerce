import React from "react";
import Product from "../../components/Product";

import { products } from "../../data";
import "./home.css";

const Home = () => {
  return (
    <>
      <main className="main">
        <div className="main__title">Бургеры</div>
        <div className="main-wrapper">
          <div className="main__products">
            {products.map((item) => (
              <Product
                key={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
