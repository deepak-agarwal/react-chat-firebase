import React from "react";
import { Formik, Field, Form } from "formik";
import { TextField, Button, Divider } from "@material-ui/core";
import { FirebaseContext } from "../../firebase";
import { validationSchemaRegister } from "../validation";
import { Link } from "react-router-dom";

class Register extends React.Component {
  render() {
    return (
      <div className="authContainer">
        <div className="image-container"></div>
        <Divider orientation="vertical" />
        <div className="register-container">
          <FirebaseContext.Consumer>
            {firebase => (
              <Formik
                firebase={firebase}
                initialValues={{ username: "", email: "", password: "" }}
                onSubmit={(data, { setSubmitting }) => {
                  setSubmitting(true);
                  firebase
                    .doCreateUserWithEmailAndPassword(data.email, data.password)
                    .then(() => {
                      firebase.createUsers(data).then(user => {
                        this.props.history.push("/");
                        console.log(user);
                        setSubmitting(false);
                      });
                    })
                    .catch(error => {
                      console.log({ error });
                      // setSubmitting(false);
                    });
                }}
                validateOnChange={true}
                validationSchema={validationSchemaRegister}
              >
                {({ values, errors, isSubmitting }) => (
                  <Form>
                    <div>
                      <Field
                        placeholder="Enter Email"
                        name="email"
                        type="input"
                        as={TextField}
                        helperText={errors.email}
                        error={!!errors.email}
                        variant="outlined"
                      />
                    </div>
                    <div>
                      <Field
                        placeholder="username"
                        name="username"
                        type="input"
                        as={TextField}
                        helperText={errors.username}
                        error={!!errors.username}
                        variant="outlined"
                      />
                    </div>
                    <div>
                      <Field
                        placeholder="password"
                        name="password"
                        type="password"
                        as={TextField}
                        helperText={errors.password}
                        error={!!errors.password}
                        variant="outlined"
                        autoComplete="off"
                      />
                    </div>

                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        Register
                      </Button>
                    </div>
                    <Link to="/login">Already Registered?</Link>
                  </Form>
                )}
              </Formik>
            )}
          </FirebaseContext.Consumer>
        </div>
      </div>
    );
  }
}

export default Register;
