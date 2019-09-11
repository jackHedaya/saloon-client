import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form, Field } from "../components/Form";

import * as authenticationService from "../services/authentication.service";
import { AuthContext } from "../App";

function Login(props) {
  const { isLoggedIn, setIsLoggedIn, setToken } = useContext(AuthContext);

  return isLoggedIn ? (
    <Redirect to={props.location.state ? props.location.state.from.pathname : "/"} />
  ) : (
    <div className="form">
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={({ email, password }, actions) => {
          authenticationService
            .login(email, password)
            .then(data => {
              setToken(data);
              setIsLoggedIn(true);
            })
            .catch(_ => {
              actions.setErrors({ password: "incorrect password" });
              actions.setSubmitting(false)
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="email" placeholder="email" />
            <Field type="password" name="password" placeholder="password" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <div className="switch-here">
              Don't have an account? Join <Link to="/register">here</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
