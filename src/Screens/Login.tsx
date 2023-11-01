import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { login } from "../slices/auth";
import './Login.css';
import { clearMessage } from "../slices/message";
import { Formik, Field, Form, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import { AppDispatch } from "../store";

interface lUser {
  email: string;
  password: string;
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

const Login = () => {
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
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This fied is required"),
  });

  const handleLogin = (formValue: lUser) => {
    const { email, password } = formValue;
    console.log(formValue)
    setLoading(true);
    dispatch(
      login({
        email,
        password,
      })
    )
      .unwrap()
      .then(() => {
        // navigate("/profile");
        alert("vbnvcadbfvabcfvab")
        // window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="col-md-12 Login-form">
      <div>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
          
        >
          {(props: FormikProps<any>) => (
          <Form>
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
              <button type="submit" className="btn btn-primary btn-block">
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>

              <Link className="productCard" to={`/signup`}>
                <span>Sign-up</span>
              </Link>
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

export default Login;
