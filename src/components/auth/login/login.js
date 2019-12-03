import React from "react";
import { Formik, Field, Form } from "formik";
import { TextField, Button } from "@material-ui/core";
import { FirebaseContext } from "../../firebase";
import { validationSchemaLogin } from "../validation";

class Login extends React.Component {
  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => (
          <div className="login-items">
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                firebase
                  .doSignInWithEmailAndPassword(data.email, data.password)
                  .then(authUser => {
                    this.props.history.push("/home");
                    setSubmitting(false);
                    setSubmitting(false);
                  })
                  .catch(error => {
                    this.setState({ error });
                    setSubmitting(false);
                  });
              }}
              validateOnChange={true}
              validationSchema={validationSchemaLogin}
            >
              {({ values, errors, isSubmitting }) => (
                <Form>
                  <div className="username">
                    <Field
                      placeholder="enter email"
                      name="email"
                      type="input"
                      as={TextField}
                      helperText={errors.email}
                      error={!!errors.email}
                      variant="outlined"
                    />
                  </div>
                  <div className="password">
                    <Field
                      placeholder="password"
                      name="password"
                      type="password"
                      as={TextField}
                      helperText={errors.password}
                      error={!!errors.password}
                      variant="outlined"
                    />
                  </div>

                  <div className="button">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Login
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </FirebaseContext.Consumer>
    );
  }
}

export default Login;
