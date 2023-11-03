import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slices/auth";
import {
  EditProduct,
  createProduct,
  getProductDetails,
} from "../slices/products";
import { clearMessage } from "../slices/message";
import { Formik, Field, Form, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import { AppDispatch } from "../store";
import "./newProduct.css";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { state } = useLocation();
  const productData = state && state.productData;

  // console.log("productData", productData);

  const id = productData?.id;

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const verify = [
    "Verified",
    "Rejected"
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);

  const [name, setName] = useState(productData?.name);
  const [price, setPrice] = useState(productData?.price);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(productData?.category);
  const [Stock, setStock] = useState(productData?.stock);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required!"),
    price: Yup.number().required("This field is required"),
    category: Yup.string().required("This field is required"),
    stock: Yup.number().required("This field is required"),
  });

  const updateProduct = (formValue) => {
    console.log("sjhmgjfgdsfbsdbfhjds");
    const { name, price, category, stock } = formValue;

    dispatch(EditProduct({ name, price, category, stock, id }))
      .then(() => {
        alert("update Successfully");
        navigate("admin/products");
      })
      .unwrap()
      .catch(() => {
        // Handle errors here
      });
  };

  return (
    <div className="col-md-12 Login-form">
      <div className="center-form">
        <Formik
          initialValues={{
            name: productData?.name,
            price: productData?.price,
            category: "Laptop",
            stock: productData?.stock,
            // image: "",
          }}
          validationSchema={validationSchema}
          onSubmit={updateProduct}
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
                  {/* <option value="">Select a category</option> */}
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
                <label htmlFor="category">Category</label>
                <Field name="category" as="select" className="form-control">
                  {/* <option value="">Select a category</option> */}
                  {verify.map((category) => (
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
              {/* <div className="form-group">
                <label htmlFor="image">Image</label>
                <Field name="image" type="text" className="form-control" />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="error-message"
                />
              </div> */}
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  <span>update product</span>
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