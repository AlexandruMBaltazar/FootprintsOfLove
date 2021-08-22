import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import * as apiCalls from "../api/apiCalls";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState();
  const [pendingApiCall, setPendingApiCall] = useState(false);

  useEffect(() => {
    setErrors();
  }, [email, password]);

  const submit = () => {
    const user = {
      email,
      password,
    };

    setPendingApiCall(true);

    apiCalls
      .login(user)
      .then((response) => {
        setPendingApiCall(false);
        props.history.push("/");
      })
      .catch((apiErrors) => {
        setPendingApiCall(false);
        setErrors(apiErrors.response.data.error);
      });
  };

  let disableSubmit = email && password ? false : true;

  return (
    <div>
      <form className="d-flex flex-column w-50 offset-4 mt-5">
        <h1 className="h3 mb-3 fw-normal text-center">Log in</h1>

        <div className="mb-1">
          <Input
            type="email"
            name="email"
            placeholder="name@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required={true}
            label="Email address"
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required={true}
            label="Password"
          />
        </div>
        {errors && (
          <div className="col-12 mt-1 mb-0 ">
            <div className="alert alert-danger">{errors}</div>
          </div>
        )}
        <ButtonWithProgress
          className="w-100 btn btn-lg btn-primary mt-2"
          onClick={submit}
          disabled={disableSubmit || pendingApiCall}
          pendingApiCall={pendingApiCall}
          text="Sign Up"
        />
        <p className="mt-5 mb-3 text-muted">&copy; Footprints of Love</p>
      </form>
    </div>
  );
};

export default LoginPage;
