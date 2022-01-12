import React, { useState } from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import * as apiCalls from "../api/apiCalls";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [notify, setNotify] = useState({
    show: false,
    error: false,
    message: "",
  });

  const submit = (event) => {
    event.preventDefault();

    setPendingApiCall(true);
    apiCalls
      .forgot({ email })
      .then((response) => {
        setPendingApiCall(false);
        setNotify({ ...notify, show: true, message: response.data.message });
      })
      .catch((error) => {
        setPendingApiCall(false);
        setNotify({
          error: true,
          show: true,
          message: "We can't send your email. Please try again !",
        });
      });
  };

  let alertClass = "alert";
  alertClass += notify.error ? " alert-danger" : " alert-success";

  return (
    <div className="container">
      <form className="d-flex flex-column w-50 offset-4 mt-5" onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal text-center">
          Enter your email to reset your password
        </h1>

        {notify.show && (
          <div className={alertClass} role="alert">
            {notify.message}
          </div>
        )}

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
        <ButtonWithProgress
          type="submit"
          className="w-100 btn btn-lg btn-primary mt-2"
          disabled={pendingApiCall}
          pendingApiCall={pendingApiCall}
          text="Send Email"
        />
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
