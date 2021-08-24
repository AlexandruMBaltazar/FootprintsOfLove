import React, { useState } from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import * as apiCalls from "../api/apiCalls";

const PasswordResetPage = (props) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [pendingApiCall, setPendingApiCall] = useState(false);

  let passwordConfirmError;
  if (password || passwordConfirm) {
    passwordConfirmError =
      password === passwordConfirm ? "" : "Does not match to password";
  }

  const submit = (event) => {
    event.preventDefault();

    const data = {
      password,
      password_confirm: passwordConfirm,
      token: props.match.params.token,
    };

    setPendingApiCall(true);
    apiCalls
      .reset(data)
      .then((response) => {
        setPendingApiCall(false);
        props.history.push("/login");
      })
      .catch((error) => {
        setPendingApiCall(false);
      });
  };

  return (
    <div>
      <form className="d-flex flex-column w-50 offset-4 mt-5" onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal text-center">Reset your password</h1>
        <div className="mb-1">
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
        <div className="mb-1">
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="Password"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
            required={true}
            label="Password Confirm"
            hasError={passwordConfirmError && true}
            error={passwordConfirmError}
          />
        </div>
        <ButtonWithProgress
          type="submit"
          className="w-100 btn btn-lg btn-primary mt-2"
          disabled={pendingApiCall || passwordConfirmError ? true : false}
          pendingApiCall={pendingApiCall}
          text="Reset Password"
        />
      </form>
    </div>
  );
};

export default PasswordResetPage;
