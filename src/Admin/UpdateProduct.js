import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slices/auth";
import { createProduct, getProductDetails } from "../slices/products";
import { clearMessage } from "../slices/message";
import { Formik, Field, Form, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import { AppDispatch } from "../store";
import "./newProduct.css";

const UpdateProduct = () => {
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);


  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required!"),
    price: Yup.number().required("This field is required"),
    category: Yup.string().required("This field is required"),
    stock: Yup.number().required("This field is required"),
  });

  const handleLogin = (formValue) => {
    const { name, price, category, stock } = formValue;
    dispatch(
      getProductDetails('6538a40a78c7f19631ef9b76')
    )
      .unwrap()
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        // Handle errors here
      });
  };

  return (
    <div className="col-md-12 Login-form">
      <div className="center-form">
        <Formik
          initialValues={{
            name: "",
            price: 0,
            category: "",
            stock: 0,
            image: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {(props) => (
            <Form className="custom-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="form-control"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <Field name="price" type="number" className="form-control" />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <Field name="category" as="select" className="form-control">
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <Field name="stock" type="number" className="form-control" />
                <ErrorMessage
                  name="stock"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <Field name="image" type="text" className="form-control" />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  <span>create product</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateProduct;