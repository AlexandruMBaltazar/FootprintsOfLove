import React, { useState, useEffect } from "react";
import * as apiCalls from "../api/apiCalls";
import Input from "./Input";
import { connect } from "react-redux";
import Spinner from "./Spinner";

const RadioFieldSet = (props) => {
  const [details, setDetails] = useState();
  const [pendingApiCall, setPendingApiCall] = useState(false);

  useEffect(() => {
    setPendingApiCall(true);
    const loadDetails = () => {
      apiCalls.details(props.detail).then((response) => {
        setDetails(response.data.data);
        setPendingApiCall(false);
      });
    };

    loadDetails();
  }, [props.detail]);

  let radioContent;

  if (pendingApiCall) {
    radioContent = <Spinner />;
  } else {
    if (details) {
      radioContent = details.map((detail) => (
        <div className="form-check" key={detail.id}>
          <Input
            className="form-check-input ms-2"
            type="radio"
            name={props.name}
            value={detail.id}
            onChange={props.onChange}
          />
          <label className="form-check-label">{detail.value}</label>
        </div>
      ));
    }
  }

  return (
    <fieldset className="row mb-3">
      <legend className="col-form-label col-sm-2 pt-0">{props.detail}</legend>
      <div className="col-sm-10">{radioContent}</div>
    </fieldset>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails.details,
  };
};

export default connect(mapStateToProps)(RadioFieldSet);
