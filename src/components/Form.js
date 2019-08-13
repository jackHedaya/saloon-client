import React from "react";
import { Formik, Form, Field as FormikField, ErrorMessage } from "formik";

import "./styles/Form.scss"

function Field(props) {
  return (
    <>
      <div className="field-title">{props.placeholder}</div>
      <FormikField {...props} />
      <ErrorMessage name={props.name} render={msg => <div className="error">{msg.replace("_", " ")}</div>} />
    </>
  );
}

export { Formik, Form, Field };
