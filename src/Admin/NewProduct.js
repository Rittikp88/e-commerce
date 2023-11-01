import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slices/auth";
import { createProduct } from "../slices/products";
import { clearMessage } from "../slices/message";
import { Formik, Field, Form, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import { AppDispatch } from "../store";
import "./newProduct.css";

const NewProduct = () => {
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const { status } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required!"),
    price: Yup.number().required("This field is required"),
    category: Yup.string().required("This field is required"),
    stock: Yup.number().required("This field is required"),
  });

  const handleLogin = (formValue) => {
    const { name, price, category, stock } = formValue;
    dispatch(
      createProduct({
        name,
        price,
        category,
        stock,
      })
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

export default NewProduct;