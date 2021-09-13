import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import * as changeCase from "change-case";
import { connect } from "react-redux";
import * as userDetailsActions from "../../actions/user/details/userDetailsActions";
import * as userPreferenceActions from "../../actions/user/preference/userPreferenceActions";
import ButtonWithProgress from "../ButtonWithProgress";
import RadioFieldSet from "../RadioFieldSet";
import CheckFieldSet from "../CheckFieldSet";
import Input from "../Input";

const ModalEditDetails = (props) => {
  const [height, setHeight] = useState();
  const [value, setValue] = useState();

  const [preferenceIds, setPreferenceIds] = useState([]);
  const [min, setMin] = useState();
  const [max, setMax] = useState();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const detail = searchParams.get("detail");
  const page = searchParams.get("page");

  useEffect(() => {
    setHeight(props.details && props.details.height);

    const loadPreferences = () => {
      if (detail === "height" || detail === "age") {
        setMin(props.preferences[detail] && props.preferences[detail].min);
        setMax(props.preferences[detail] && props.preferences[detail].max);
      } else {
        setPreferenceIds(() => {
          return (
            props.preferences &&
            props.preferences[detail] &&
            props.preferences[detail].map((detail) => detail.id)
          );
        });
      }
    };

    loadPreferences();

    return () => {
      setValue(undefined);
    };
  }, [props.details, props.details.height, detail, props.preferences]);

  const onChangeRadio = (event) => {
    const { value, name } = event.target;

    setValue((previousForm) => {
      return {
        [name + "_id"]: value,
      };
    });
  };

  const onChangeMin = (event) => {
    let value = parseInt(event.target.value);

    if (value > max) {
      setMin(max);
      setMax(value);
    } else {
      setMin(value);
    }
  };

  const onChangeMax = (event) => {
    let value = parseInt(event.target.value);

    if (value < min) {
      setMin(value);
      setMax(min);
    } else {
      setMax(value);
    }
  };

  const onChangeCheck = (event) => {
    let value = parseInt(event.target.value);

    setPreferenceIds((previousPreferenceIds) => {
      if (previousPreferenceIds.includes(value)) {
        return previousPreferenceIds.filter((id) => id !== value);
      } else {
        return [...previousPreferenceIds, value];
      }
    });
  };

  const submitNewDetails = () => {
    if (height !== props.details.height) {
      props.actions.updateUserDetails({ height: height }, props.detailId);
    } else {
      props.actions.updateUserDetails(value, props.detailId);
    }
  };

  const submitNewPreferences = () => {
    if (detail === "height") {
      let body = {
        height: {
          min,
          max,
        },
      };

      props.actions.postUserPreferences(props.user.id, body);
    } else if (detail === "age") {
      let body = {
        age: {
          min,
          max,
        },
      };

      props.actions.postUserPreferences(props.user.id, body);
    } else {
      let body = {
        preference_ids: preferenceIds,
        preference_type: changeCase.pascalCase(detail),
      };
      props.actions.postUserPreferences(props.user.id, body);
    }
  };

  const disableSubmitButton = () => {
    if (page === "edit") {
      let disableSubmit =
        value || height !== props.details.height ? false : true;

      return props.isLoading || disableSubmit;
    }

    return props.isPostingUserPreferences;
  };

  const editDetails = (
    <div>
      {detail && detail !== "height" ? (
        <RadioFieldSet
          detail={changeCase.pascalCase(detail)}
          name={detail}
          onChange={onChangeRadio}
        />
      ) : (
        <div>
          <h3 className="offset-3">Height</h3>
          <div className="row">
            <div className="col-sm-10">
              <div className="bg-white p-2 mt-5">
                <label className="form-label">Height in cm - {height} </label>
                <Input
                  type="range"
                  className="form-range"
                  min="145"
                  max="200"
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const editPreferences = () => {
    if (detail === "height" || detail === "age") {
      return (
        <div>
          <h3 className="offset-3">{changeCase.capitalCase(detail)}</h3>
          <div className="row">
            <div className="col-sm-10">
              <div className="bg-white p-2 mt-5">
                <div className="d-flex justify-content-between">
                  <div>
                    <select class="form-select" onChange={onChangeMin}>
                      {detail === "height"
                        ? getHeights().map((height) => (
                            <option value={height} selected={height === min}>
                              {height + " cm"}
                            </option>
                          ))
                        : getAges().map((age) => (
                            <option value={age} selected={age === min}>
                              {age}
                            </option>
                          ))}
                    </select>
                  </div>
                  <span className="align-self-center">-</span>
                  <div>
                    <select class="form-select" onChange={onChangeMax}>
                      {detail === "height"
                        ? getHeights().map((height) => (
                            <option value={height} selected={height === max}>
                              {height + " cm"}
                            </option>
                          ))
                        : getAges().map((age) => (
                            <option value={age} selected={age === max}>
                              {age}
                            </option>
                          ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        {detail && (
          <CheckFieldSet
            detail={changeCase.pascalCase(detail)}
            name={detail}
            preferenceIds={preferenceIds}
            onChange={onChangeCheck}
          />
        )}
      </div>
    );
  };

  const getHeights = () => {
    let heights = [];

    for (let i = 145; i <= 200; i++) {
      heights.push(i);
    }

    return heights;
  };

  const getAges = () => {
    let ages = [];

    for (let i = 18; i <= 99; i++) {
      ages.push(i);
    }

    return ages;
  };

  return (
    <div className="container">
      {detail && (
        <div>
          <div className="row overflow-auto">
            <div className="col-12">
              <form
                className="d-flex flex-column offset-3 mt-5"
                style={{ height: "260px" }}
              >
                <div className="mb-1">
                  {page === "edit" ? editDetails : editPreferences()}
                </div>
              </form>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12">
              <ButtonWithProgress
                type="submit"
                className="w-50 btn btn-md btn-primary offset-3 mt-5"
                disabled={disableSubmitButton()}
                pendingApiCall={
                  props.isLoading || props.isPostingUserPreferences
                }
                text="Submit"
                onClick={
                  page === "edit" ? submitNewDetails : submitNewPreferences
                }
              >
                Save
              </ButtonWithProgress>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    detailId: state.userDetails.details.id,
    details: state.userDetails.details,
    isLoading: state.userDetails.isLoading,
    preferences: state.userPreference.preferences,
    isPostingUserPreferences: state.userPreference.isPostingUserPreferences,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      updateUserDetails: (detail, detailId) =>
        dispatch(userDetailsActions.updateUserDetails(detail, detailId)),

      postUserPreferences: (userId, preferences) =>
        dispatch(
          userPreferenceActions.postUserPreferences(userId, preferences)
        ),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditDetails);
