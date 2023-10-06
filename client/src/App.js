import React from "react";

import Header from "./components/Header";
import Categiries from "./components/Categories";
import Home from "./pages/Home";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <div className="container">
        <Header />
        <Categiries />
        <Home />
        <Footer />
      </div>
    </>
  );
};

export default App;
