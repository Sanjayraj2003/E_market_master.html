import React from "react";
import Navbar from "../components/Navbar";
import CategoryFilter from "../components/CategoryFilter";
import ProductLists from "../components/ProductLists";

const Home = () => {
  return (
    <div>
      <Navbar>
        <CategoryFilter>
          <ProductLists></ProductLists>
        </CategoryFilter>
      </Navbar>
    </div>
  );
};

export default Home;
