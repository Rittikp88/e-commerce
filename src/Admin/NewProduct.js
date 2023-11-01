import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slices/auth";
import { createProduct } from "../slices/products";
import { clearMessage } from "../slices/message";
import { Formik, Field, Form, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import { AppDispatch } from "../store";


// interface RUser {
//     name: string;
//     // Add the new fields here
//     price: number;
//     category: string;
//     stock: number;
//   }
const NewProduct = () => {
    // Define your categories here
  const categories = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];
  const { status } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("This field is required!"),
        // Add validation for the new fields
        price: Yup.number().required("This field is required"),
        category: Yup.string().required("This field is required"),
        stock: Yup.number().required("This field is required"),
      });

      const handleLogin = (formValue) => {
        const { name, price, category, stock, } = formValue;
        // setLoading(true);
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
            // navigate("/profile");
            window.location.reload();
          })
          .catch(() => {
            // setLoading(false);
          });
      };
    
  return (
    <div className="col-md-12 Login-form">
    <div>
      {/* ... */}
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          price: 0,
          category: "",  // Initial category value
          stock: 0,
          image: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {(props) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" placeholder="Name" className="form-control" />
              <ErrorMessage
                name="name"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <Field name="price" type="number" className="form-control" />
              <ErrorMessage
                name="price"
                component="div"
                className="alert alert-danger"
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
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <Field name="stock" type="number" className="form-control" />
              <ErrorMessage
                name="stock"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <Field name="image" type="text" className="form-control" />
              <ErrorMessage
                name="image"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                {/* {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )} */}
                <span>Login</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    {/* ... */}
  </div>
  )
}

export default NewProduct