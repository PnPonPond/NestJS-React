import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const LoginForm = () => {
  return (
    <div className="LoginForm">
      <Formik
        initialValues={{ login: "", password: "" }}
        validate={(values) => {
          const errors: any = {};
          if (values.login === "") {
            errors.login = "Login required";
          }
          if (values.password === "") {
            errors.password = "Password required";
          }
          return errors;
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            Login :
            <Field name="login" type="input" />
            <ErrorMessage name="login" component="div" />
            Password :
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />
            <br />
            <button disabled={isSubmitting}>Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
