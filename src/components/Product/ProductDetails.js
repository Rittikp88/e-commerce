import React, {Fragment, useEffect, useState}from 'react';
import Carousel from "react-material-ui-carousel";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import MetaData from "../layout/MetaData";

const ProductDetails = ({match}) => {
  const { state } = useLocation();
  const productData = state && state.productData;
  console.log("productData", productData);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const options = {
    size: "large",
    value: productData.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (productData.Stock <= quantity) return;

    const qty = quantity + 1;
    console.log(qty)
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    console.log("jhvdfgsdv")
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    // dispatch(addItemsToCart(match.params.id, quantity));
    // alert.success("Item Added To Cart");

    console.log("hooho")
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    // dispatch(newReview(myForm));
    console.log(myForm);

    setOpen(false);
  };
  return (
        <Fragment>
          <MetaData title={`${productData.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                    <img
                      className="CarouselImage"
                      src= "https://cdn.pixabay.com/photo/2016/12/06/09/30/blank-1886001_640.png"
                      alt={productData.name}
                    />
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{productData.name}</h2>
                <p>Product # {productData._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({productData.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${productData.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={() =>decreaseQuantity}>-</button>
                    <input type="number" value= {quantity} />
                    <button onClick={() =>increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={productData.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={productData.Stock < 1 ? "redColor" : "greenColor"}>
                    {productData.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{productData.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {productData.reviews && productData.reviews[0] ? (
            <div className="reviews">
              {productData.reviews &&
                productData.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
  );
}

export default ProductDetails;