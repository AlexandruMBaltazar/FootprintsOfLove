import React, { useState } from "react";
import * as apiCalls from "../api/apiCalls";

const UserSignupPage = (props) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const onChange = (event) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
  };

  const submit = (event) => {
    event.preventDefault();

    const user = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      password: form.password,
      password_confirm: form.passwordConfirm,
    };

    apiCalls.signup(user);
  };

  return (
    <div>
      <form className="d-flex flex-column w-50 offset-4 mt-5" onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal text-center">Join Us !</h1>

        <div className="form-floating mb-1">
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="John"
            onChange={onChange}
            value={form.fistName}
            required
          />
          <label>First Name</label>
        </div>
        <div className="form-floating mb-1">
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="John"
            value={form.lastName}
            onChange={onChange}
            required
          />
          <label>Last Name</label>
        </div>
        <div className="form-floating mb-1">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="name@example.com"
            value={form.email}
            onChange={onChange}
            required
          />
          <label>Email address</label>
        </div>
        <div className="form-floating mb-1">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            required
          />
          <label>Password</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            name="passwordConfirm"
            className="form-control"
            placeholder="Password"
            value={form.passwordConfirm}
            onChange={onChange}
          />
          <label>Password Confirm</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary mt-2" type="submit">
          Register
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; Footprints of Love</p>
      </form>
    </div>
  );
};

export default UserSignupPage;
