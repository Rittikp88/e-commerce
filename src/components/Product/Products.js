import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import {fetchProducts} from "../../slices/products";


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
  

const Products = () => {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);
    console.log(products)

const [currentPage, setCurrentPage] = useState(1);
const [price, setPrice] = useState([0, 25000]);
const [category, setCategory] = useState("");
const [ratings, setRatings] = useState(0);

useEffect(() => {
    dispatch(fetchProducts());
},[dispatch])
  return (
    <div>
     <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
    </div>
  )
}

export default Products
