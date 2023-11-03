import React, { Fragment, useEffect } from "react";
import {MdAccountCircle} from "react-icons/md";
import "./Home.css";
import Product from "./ProductCard";
import {fetchProducts} from "../../slices/products";
import { useSelector, useDispatch } from "react-redux";
// import ProductCard from "./ProductCard.js";
// import MetaData from "../layout/MetaData";
// import { clearErrors, getProduct } from "../../actions/productAction";
// import { useSelector, useDispatch } from "react-redux";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

const Home = () => {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchProducts());
      }
    }, [status, dispatch]);
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }
  return (
    <Fragment>
      {/* {loading ? (
        <Loader />
      ) : (
        <Fragment> */}
          {/* <MetaData title="ECOMMERCE" /> */}

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <MdAccountCircle />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
          {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
    //   )}
    // </Fragment>
  )
}

export default Home