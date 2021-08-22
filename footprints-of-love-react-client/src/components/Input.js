import React from "react";

const Input = (props) => {
  let inputClassName = "form-control";

  if (props.hasError !== undefined) {
    inputClassName += props.hasError ? " is-invalid" : " is-valid";
  }

  return (
    <div className="form-floating">
      <input
        type={props.type || "text"}
        name={props.name}
        className={inputClassName}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        required={props.required}
      />
      {props.label && <label>{props.label}</label>}
      {props.hasError && (
        <span className="invalid-feedback">{props.error}</span>
      )}
    </div>
  );
};

export default Input;
