import React, { useState, useEffect } from "react";
import ButtonWithProgress from "../ButtonWithProgress";
import { connect } from "react-redux";
import * as authActions from "../../actions/auth/authActions";
import InputPassword from "../InputPassword";

const Account = (props) => {
  const [firstName, setFirstName] = useState({
    value: props.user.first_name,
    pendingApiCall: false,
    error: undefined,
  });

  const [email, setEmail] = useState({
    value: props.user.email,
    pendingApiCall: false,
    error: undefined,
  });

  const [newPassword, setNewPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const onSaveFirstName = () => {
    setFirstName((previousFirstName) => {
      return {
        ...previousFirstName,
        pendingApiCall: true,
      };
    });

    props.actions
      .updateUser({ first_name: firstName.value }, props.user.id)
      .then((response) => {
        setFirstName((previousFirstName) => {
          return {
            ...previousFirstName,
            pendingApiCall: false,
          };
        });
      });
  };

  const onSaveEmail = () => {
    setEmail((previousEmail) => {
      return {
        ...previousEmail,
        pendingApiCall: true,
      };
    });

    props.actions
      .updateUser({ email: email.value }, props.user.id)
      .then((response) => {
        setEmail((previousEmail) => {
          return {
            ...previousEmail,
            pendingApiCall: false,
          };
        });
      })
      .catch((apiError) => {
        setEmail((previousEmail) => {
          return {
            ...previousEmail,
            error: apiError.response.data.errors.email,
            pendingApiCall: false,
          };
        });
      });
  };

  return (
    <div className="d-grid gap-5">
      <div>
        <h3>My Account</h3>
        <hr></hr>
      </div>
      <div>
        <div className="mb-5">
          <label className="form-label fs-5 fw-bold">First name</label>
          <input
            name="firstName"
            type="text"
            className={`form-control form-control-lg ${
              firstName.error ? "is-invalid" : ""
            }`}
            placeholder="John"
            value={firstName.value}
            onChange={(event) =>
              setFirstName((previousFirstName) => {
                return {
                  ...previousFirstName,
                  value: event.target.value,
                };
              })
            }
          />
          <ButtonWithProgress
            type="button"
            className="btn btn-lg btn-primary mt-3 px-5"
            text="Save"
            pendingApiCall={firstName.pendingApiCall}
            disabled={!firstName.value || firstName.pendingApiCall}
            onClick={onSaveFirstName}
          />
        </div>
        <div className="mb-5">
          <label className="form-label fs-5 fw-bold">Email</label>
          <input
            name="email"
            type="email"
            className={`form-control form-control-lg ${
              email.error ? "is-invalid" : ""
            }`}
            placeholder="name@example.com"
            value={email.value}
            onChange={(event) =>
              setEmail((previousEmail) => {
                return {
                  ...previousEmail,
                  error: undefined,
                  value: event.target.value,
                };
              })
            }
          />
          {email.error && (
            <span className="invalid-feedback">{email.error}</span>
          )}
          <ButtonWithProgress
            type="button"
            className="btn btn-lg btn-primary mt-3 px-5"
            text="Save"
            pendingApiCall={email.pendingApiCall}
            disabled={!email.value || email.pendingApiCall}
            onClick={onSaveEmail}
          />
        </div>
      </div>
      <div>
        <h3>Security</h3>
        <hr></hr>
      </div>
      <div className="mb-5">
        <InputPassword
          name="password"
          placeholder="New password"
          onChange={(event) => setNewPassword(event.target.value)}
          value={newPassword}
          setIsPasswordValid={setIsPasswordValid}
        />
        <ButtonWithProgress
          type="button"
          className="btn btn-lg btn-primary mt-3 px-5"
          text="Save"
          disabled={!isPasswordValid}
          onClick={() =>
            props.actions
              .updateUser({ password: newPassword }, props.user.id)
              .then((response) => {
                setNewPassword("");
              })
          }
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      updateUser: (user, id) => dispatch(authActions.updateAuthUser(user, id)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
