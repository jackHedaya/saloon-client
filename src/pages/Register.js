import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "../components/Form";
import * as Yup from "yup";

function Register() {
  return (
    <div className="form">
      <h1>Register</h1>
      <Formik
        initialValues={{ username: "", password: "", first_name: "", last_name: "" }}
        onSubmit={vals => {
          alert(JSON.stringify(vals));
        }} // Handle submitting later
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required(),
          last_name: Yup.string().required(),
          username: Yup.string().required(),
          password: Yup.string().required()
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="first_name" placeholder="first name" />
            <Field type="text" name="last_name" placeholder="last name" />
            <Field type="text" name="username" placeholder="username" />
            <Field type="password" name="password" placeholder="password" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <div className="switch-here">
              Already have an account? Login <Link to="/login">here</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
