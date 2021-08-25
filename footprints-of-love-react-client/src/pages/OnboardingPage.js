import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RadioFieldSet from "../components/RadioFieldSet";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { connect } from "react-redux";
import * as apiCalls from "../api/apiCalls";

const OnboardingPage = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [height, setHeight] = useState("170");
  const [details, setDetails] = useState({
    bodyType: undefined,
    child: undefined,
    diet: undefined,
    drink: undefined,
    education: undefined,
    employment: undefined,
    ethnicity: undefined,
    gender: undefined,
    language: undefined,
    pet: undefined,
    politics: undefined,
    relationship: undefined,
    religion: undefined,
    sign: undefined,
    smoke: undefined,
  });

  const submit = (event) => {
    event.preventDefault();

    const userDetails = {
      body_type_id: details.bodyType,
      child_id: details.child,
      diet_id: details.diet,
      drink_id: details.drink,
      education_id: details.education,
      employment_id: details.employment,
      ethnicity_id: details.ethnicity,
      gender_id: details.gender,
      language_id: details.language,
      pet_id: details.pet,
      politics_id: details.politics,
      relationship_id: details.relationship,
      religion_id: details.religion,
      sign_id: details.sign,
      smoke_id: details.smoke,
      height,
    };

    setPendingApiCall(true);

    apiCalls.postDetails(userDetails, props.user.id).then((response) => {
      setPendingApiCall(false);
    });
  };

  const onChange = (event) => {
    const { value, name } = event.target;

    setDetails((previousDetails) => {
      return {
        ...previousDetails,
        [name]: value,
      };
    });
  };

  let radioFieldSets = Object.keys(details).map((detail) => (
    <RadioFieldSet
      key={detail}
      detail={detail.charAt(0).toUpperCase() + detail.slice(1)}
      name={detail}
      onChange={onChange}
    />
  ));

  return (
    <div>
      <form className="d-flex flex-column w-50 offset-4 mt-5" onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">About you</h1>
        <div className="row mb-3 mt-3">
          <label className="col-3 col-form-label">Date of Birth</label>
          <div className="col-9 pt-1">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
        <div className="mb-3">
          <label class="form-label">Height in cm - {height} </label>
          <input
            type="range"
            class="form-range"
            min="145"
            max="200"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
          ></input>
        </div>
        {radioFieldSets}
        <ButtonWithProgress
          type="submit"
          className="w-100 btn btn-lg btn-primary mt-2 mb-3"
          disabled={pendingApiCall}
          pendingApiCall={pendingApiCall}
          text="Submit"
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(OnboardingPage);
