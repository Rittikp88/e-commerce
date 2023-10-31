import React from 'react';
import { Link } from "react-router-dom";
// import { Rating } from "@material-ui/lab";


const Product = ({ product }: any) => {
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      };
      return (
        <Link className="productCard" to={`/product/${product._id}`}>
          <img src="https://cdn.pixabay.com/photo/2016/12/06/09/30/blank-1886001_640.png" alt={product.name} />
          <p>{product.name}</p>
          <div>
            {/* <Rating {...options} />{" "} */}
            <span className="productCardSpan">
              {" "}
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <span>{`₹${product.price}`}</span>
        </Link>
      );
}

export default Product