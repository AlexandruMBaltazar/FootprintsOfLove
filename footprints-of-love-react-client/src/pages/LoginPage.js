import React from "react";

const LoginPage = () => {
  return (
    <div>
      <form className="d-flex flex-column w-50 offset-4 mt-5">
        <h1 className="h3 mb-3 fw-normal text-center">Log in</h1>

        <div className="form-floating mb-1">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary mt-2" type="submit">
          Login
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; Footprints of Love</p>
      </form>
    </div>
  );
};

export default LoginPage;
