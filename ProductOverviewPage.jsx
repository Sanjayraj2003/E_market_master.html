import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import ProductOverview from "../components/ProductOverview";
const ProductOverviewPage = () => {
  const params = useParams();
  return (
    <div>
      <Navbar>
        <ProductOverview params={params}></ProductOverview>
      </Navbar>
      <Footer></Footer>
    </div>
  );
};

export default ProductOverviewPage;
