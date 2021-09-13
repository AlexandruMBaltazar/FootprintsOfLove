import React, { useState, useEffect } from "react";
import * as apiCalls from "../api/apiCalls";
import { connect } from "react-redux";
import * as changeCase from "change-case";
import Spinner from "./Spinner";
import Input from "./Input";

const CheckFieldSet = (props) => {
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

  let checkContent;

  if (pendingApiCall) {
    checkContent = <Spinner />;
  } else {
    if (details) {
      checkContent = details.map((detail) => (
        <div className="form-check">
          <Input
            className="form-check-input"
            type="checkbox"
            name={props.name}
            value={detail.id}
            onChange={props.onChange}
            checked={
              props.preferenceIds && props.preferenceIds.includes(detail.id)
            }
          />
          <label className="form-check-label">{detail.value}</label>
        </div>
      ));
    }
  }

  return (
    <div>
      <h3 className="offset-3">{changeCase.capitalCase(props.detail)}</h3>
      <div className="row">
        <div className="col-sm-10">
          <div className="bg-white p-2 mt-5">{checkContent}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    preferences: state.userPreference.preferences,
  };
};

export default connect(mapStateToProps)(CheckFieldSet);
