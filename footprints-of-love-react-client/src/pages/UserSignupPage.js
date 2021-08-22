import React, { useState } from "react";
import * as apiCalls from "../api/apiCalls";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import humps from "humps";

const UserSignupPage = (props) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);

  const onChange = (event) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });

    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [humps.decamelize(name)]: undefined,
      };
    });
  };

  const submit = (event) => {
    const user = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      password: form.password,
      password_confirm: form.passwordConfirm,
    };

    setPendingApiCall(true);

    apiCalls
      .signup(user)
      .then((response) => {
        setPendingApiCall(false);
        props.history.push("/login");
      })
      .catch((apiError) => {
        setPendingApiCall(false);

        if (apiError.response.data.errors) {
          setErrors(apiError.response.data.errors);
        }
      });
  };

  let passwordMatch;
  if (form.password || form.passwordConfirm) {
    passwordMatch =
      form.password === form.passwordConfirm
        ? ""
        : "Does not match to password";
  }

  return (
    <div>
      <form className="d-flex flex-column w-50 offset-4 mt-5">
        <h1 className="h3 mb-3 fw-normal text-center">Join Us !</h1>

        <div className="mb-1">
          <Input
            type="text"
            name="firstName"
            placeholder="John"
            onChange={onChange}
            value={form.fistName}
            required={true}
            label="First Name"
            hasError={errors.first_name && true}
            error={errors.first_name}
          />
        </div>
        <div className="mb-1">
          <Input
            type="text"
            name="lastName"
            placeholder="Doe"
            value={form.lastName}
            onChange={onChange}
            required={true}
            label="Last Name"
            hasError={errors.last_name && true}
            error={errors.last_name}
          />
        </div>
        <div className="mb-1">
          <Input
            type="email"
            name="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={onChange}
            required={true}
            label="Email address"
            hasError={errors.email && true}
            error={errors.email}
          />
        </div>
        <div className="mb-1">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            required={true}
            label="Password"
            hasError={errors.password && true}
            error={errors.password}
          />
        </div>
        <div className="">
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="Password"
            value={form.passwordConfirm}
            onChange={onChange}
            label="Password Confirm"
            hasError={passwordMatch && true}
            error={passwordMatch}
          />
        </div>
        <ButtonWithProgress
          className="w-100 btn btn-lg btn-primary mt-2"
          onClick={submit}
          disabled={pendingApiCall || passwordMatch ? true : false}
          pendingApiCall={pendingApiCall}
          text="Sign Up"
        />
        <p className="mt-5 mb-3 text-muted">&copy; Footprints of Love</p>
      </form>
    </div>
  );
};

export default UserSignupPage;
