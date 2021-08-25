import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RadioFieldSet from "../components/RadioFieldSet";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { connect } from "react-redux";
import * as apiCalls from "../api/apiCalls";
import * as authActions from "../actions/auth/authActions";
import moment from "moment";

const OnboardingPage = (props) => {
  const [dob, setDob] = useState(new Date());
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

  useEffect(() => {}, []);

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
      dob: moment(dob).format("YYYY-MM-DD"),
    };

    const user = {
      boarding_completed: true,
    };

    setPendingApiCall(true);

    apiCalls
      .postDetails(userDetails, props.user.id)
      .then((response) => {
        props.actions.updateAuthUser(user, props.user.id).then((response) => {
          setPendingApiCall(false);
          props.history.push("/");
        });
      })
      .catch((error) => {
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
            <DatePicker selected={dob} onChange={(dob) => setDob(dob)} />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Height in cm - {height} </label>
          <input
            type="range"
            className="form-range"
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

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      updateAuthUser: (user, userId) =>
        dispatch(authActions.updateAuthUser(user, userId)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingPage);
