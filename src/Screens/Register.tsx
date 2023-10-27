import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slices/auth";
import { clearMessage } from "../slices/message";
import { Formik, Field, Form, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import { AppDispatch } from "../store";

interface RUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  interface RootState {
    auth: {
      isLoggedIn: boolean;
    };
    message: {
      message: string;
    };
    // Add other slices and their state properties as needed
  }
  
  const Register = () => {
    // let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const { message } = useSelector((state: RootState) => state.message);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      dispatch(clearMessage());
    }, [dispatch]);
    // const initialValues = {
    //   email: "mnssdvbnsdvan",
    //   password: "",
    // };
  
    const validationSchema = Yup.object().shape({
      name: Yup.string().required("This field is required!"),
      email: Yup.string().required("This field is required!"),
      password: Yup.string().required("This fied is required"),
    });
  
    const handleLogin = (formValue: RUser) => {
      const { name, email, password, confirmPassword } = formValue;
      console.log(formValue)
      setLoading(true);
      dispatch(
        register({
          name,
          email,
          password,
          confirmPassword
        })
      )
        .unwrap()
        .then(() => {
          // navigate("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    };
    return (
      <div className="col-md-12 Login-form">
        <div>
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <Formik
            initialValues={{name: "", email: "", password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
            
          >
            {(props: FormikProps<any>) => (
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
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" placeholder="Email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">confirmPassword</label>
                <Field name="confirmPassword" type="password" className="form-control" />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
            </Form>
         )}
          </Formik>
        </div>
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Register;