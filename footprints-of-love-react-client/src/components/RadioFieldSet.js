import React, { useState, useEffect } from "react";
import * as apiCalls from "../api/apiCalls";
import Input from "./Input";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import styles from "../components/Modal/modal.module.css";
import * as changeCase from "change-case";

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
        <div className="form-check d-flex flex-row mt-2" key={detail.id}>
          <Input
            className={`radio form-check-input ms-2 ${styles.radio}`}
            type="radio"
            name={props.name}
            value={detail.id}
            onChange={props.onChange}
            disabled={
              props.userDetails[props.name] &&
              props.userDetails[props.name].id === detail.id
            }
          />
          <label className="form-check-label align-self-center flex-fill ms-5">
            {detail.value}
          </label>
        </div>
      ));
    }
  }

  return (
    <div>
      <h3 className="offset-3">{changeCase.capitalCase(props.detail)}</h3>
      <div className="row">
        <div className="col-sm-10">
          <div className="bg-white p-2 mt-5">{radioContent}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails.details,
  };
};

export default connect(mapStateToProps)(RadioFieldSet);
