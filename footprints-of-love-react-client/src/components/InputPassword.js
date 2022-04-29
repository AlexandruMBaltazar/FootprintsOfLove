import React, { useState, useEffect } from "react";

const InputPassword = (props) => {
  const [hasUpperCase, setHasUppserCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [has8Characters, setHas8Characters] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);

  const mustContainData = [
    ["An uppercase letter (a-z)", hasUpperCase],
    ["A lowercase letter (A-Z)", hasLowerCase],
    ["A number (0-9)", hasNumber],
    ["A special character (!@#$)", hasSpecialCharacter],
    ["At least 8 characters", has8Characters],
  ];

  let inputClassName = "form-control form-control-lg";

  if (props.hasError !== undefined) {
    inputClassName += props.hasError ? " is-invalid" : " is-valid";
  }

  const validatePassword = () => {
    console.log("validated password");
    props.value.toLowerCase() !== props.value
      ? setHasUppserCase(true)
      : setHasUppserCase(false);
    props.value.toUpperCase() !== props.value
      ? setHasLowerCase(true)
      : setHasLowerCase(false);
    props.value.match(/\d/) ? setHasNumber(true) : setHasNumber(false);
    props.value.match(/[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/g)
      ? setHasSpecialCharacter(true)
      : setHasSpecialCharacter(false);
    props.value.length > 8 ? setHas8Characters(true) : setHas8Characters(false);

    hasUpperCase &&
    hasLowerCase &&
    has8Characters &&
    hasSpecialCharacter & hasNumber
      ? props.setIsPasswordValid(true)
      : props.setIsPasswordValid(false);
  };

  return (
    <div>
      <label className="form-label fs-5 fw-bold">Change your password</label>
      <ul className="list-group m-3">
        {mustContainData.map((data, index) => {
          return (
            <li
              key={index}
              className={`list-group-item ${
                data[1] ? "list-group-item-success" : "list-group-item-danger"
              }`}
            >
              {data[0]}
            </li>
          );
        })}
      </ul>
      <input
        type="password"
        name={props.name}
        className={props.className || inputClassName}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
        onKeyUp={validatePassword}
      />
      {props.hasError && (
        <span className="invalid-feedback">{props.error}</span>
      )}
    </div>
  );
};

export default InputPassword;
