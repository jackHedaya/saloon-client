import React from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";

import "./styles/Login.scss";

function Login() {
  
  return (
    <div className="login">
      <h1>Login</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={() => {}} // Handle submitting later
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="username" placeholder="username" />
            <Field type="password" name="password" placeholder="password" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <div className="register-here">Don't have an account? Join <Link to="/register">here</Link></div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
