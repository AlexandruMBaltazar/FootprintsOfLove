import React from "react";
import ButtonWithProgress from "./ButtonWithProgress";

const UploadInput = (props) => {
  let inputClassName = "form-control";

  if (props.hasError !== undefined) {
    inputClassName += props.hasError ? " is-invalid" : " is-valid";
  }

  return (
    <div className="input-group">
      <ButtonWithProgress
        className="btn btn-outline-primary"
        type="button"
        onClick={props.onClick}
        disabled={props.disabled}
        pendingApiCall={props.pendingApiCall}
        text="Upload Photo"
      />
      <input type="file" className={inputClassName} onChange={props.onChange} />
      {props.hasError && (
        <span className="invalid-feedback">{props.error}</span>
      )}
    </div>
  );
};

export default UploadInput;
