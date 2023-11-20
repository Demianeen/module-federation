import { shopRoutes } from "@packages/shared/src/routes/shopRoutes";
import React from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  return (
    <div>
      <h1>Shop</h1>
      <Link to={shopRoutes.second()}>Second page</Link>
    </div>
  );
};

export default Shop;
