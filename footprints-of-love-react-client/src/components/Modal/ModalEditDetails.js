import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import * as changeCase from "change-case";
import { connect } from "react-redux";
import * as userDetailsActions from "../../actions/user/details/userDetailsActions";
import * as userPreferenceActions from "../../actions/user/preference/userPreferenceActions";
import * as locationActions from "../../actions/location/locationActions";
import ButtonWithProgress from "../ButtonWithProgress";
import RadioFieldSet from "../RadioFieldSet";
import CheckFieldSet from "../CheckFieldSet";
import Input from "../Input";
import Select from "react-select";
import countryList from "react-select-country-list";
import { deprecationHandler } from "moment";

const ModalEditDetails = (props) => {
  const [height, setHeight] = useState();
  const [value, setValue] = useState();

  const [selectedLocation, setSelectedLocation] = useState({
    country: "",
    city: "",
    lat: null,
    long: null,
    message: undefined,
    isSearching: false,
  });
  const countryOptions = useMemo(() => countryList().getData(), []);

  const distanceOptions = [
    { value: 5, label: "5 km" },
    { value: 10, label: "10 km" },
    { value: 25, label: "25 km" },
    { value: 50, label: "50 km" },
    { value: 100, label: "100 km" },
    { value: 250, label: "250 km" },
    { value: 500, label: "500 km" },
    { value: 0, label: "Anywhere" },
  ];
  const [distance, setDistance] = useState();

  const [preferenceIds, setPreferenceIds] = useState([]);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [isImportant, setIsImportant] = useState(false);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const detail = searchParams.get("detail");
  const page = searchParams.get("page");

  useEffect(() => {
    setHeight(props.details && props.details.height);

    if (props.details.location !== null) {
      setSelectedLocation({
        ...props.details.location,
        country: { label: props.details.location.country },
      });
    }

    const loadPreferences = () => {
      if (detail === "height" || detail === "age") {
        setMin(props.preferences[detail] && props.preferences[detail].min);
        setMax(props.preferences[detail] && props.preferences[detail].max);
      } else if (detail === "distance") {
        setDistance(
          props.preferences.distance &&
            distanceOptions.find(
              (option) => option.value === props.preferences.distance.value
            )
        );
      } else {
        setPreferenceIds(() => {
          return (
            props.preferences[detail] &&
            props.preferences[detail].values &&
            props.preferences[detail].values.map((detail) => detail.id)
          );
        });
      }

      setIsImportant(
        props.preferences[detail] && props.preferences[detail].is_important
          ? props.preferences[detail].is_important
          : false
      );
    };

    loadPreferences();

    return () => {
      setValue(undefined);
      if (props.details.location !== null) {
        setSelectedLocation({
          ...props.details.location,
          country: { label: props.details.location.country },
        });
      } else {
        setSelectedLocation({
          country: "",
          city: "",
          lat: null,
          long: null,
          message: undefined,
          isSearching: false,
        });
      }
    };
  }, [props.details, props.details.height, detail, props.preferences]);

  useEffect(() => {
    let newTimer = null;
    if (
      selectedLocation.city.length >= 3 &&
      page === "edit" &&
      detail === "location"
    ) {
      setSelectedLocation((previousSelectedLocations) => {
        return {
          ...previousSelectedLocations,
          isSearching: true,
        };
      });
      newTimer = setTimeout(() => {
        props.actions.searchLocation(selectedLocation).then((response) => {
          if (response.geometry) {
            setSelectedLocation((previousSelectedLocations) => {
              return {
                ...previousSelectedLocations,
                lat: response.geometry.coordinates[1],
                long: response.geometry.coordinates[0],
                message: "",
                isSearching: false,
              };
            });
          } else {
            setSelectedLocation((previousSelectedLocations) => {
              return {
                ...previousSelectedLocations,
                message: "We couldn’t find that location!",
                isSearching: false,
              };
            });
          }
        });
      }, 600);
    }

    return () => {
      clearTimeout(newTimer);
    };
  }, [props.actions, selectedLocation.country, selectedLocation.city]);

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

  const onChangeCountry = (value) => {
    setSelectedLocation((previousSelectedLocations) => {
      return {
        ...previousSelectedLocations,
        country: value,
      };
    });
  };

  const onChangeCity = (event) => {
    setSelectedLocation((previousSelectedLocations) => {
      return {
        ...previousSelectedLocations,
        city: event.target.value,
      };
    });
  };

  const submitNewDetails = () => {
    if (height !== props.details.height) {
      props.actions.updateUserDetails({ height: height }, props.detailId);
    } else if (
      JSON.stringify({
        lat: String(selectedLocation.lat),
        long: String(selectedLocation.long),
      }) !==
        JSON.stringify(
          props.details.location && {
            lat: String(props.details.location.lat),
            long: String(props.details.location.long),
          }
        ) &&
      detail === "location"
    ) {
      props.actions.addLocation({
        ...selectedLocation,
        country: selectedLocation.country.label,
      });
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
        is_important: isImportant,
      };

      props.actions.postUserPreferences(props.user.id, body);
    } else if (detail === "age") {
      let body = {
        age: {
          min,
          max,
        },
        is_important: isImportant,
      };

      props.actions.postUserPreferences(props.user.id, body);
    } else if (detail === "distance") {
      let body = {
        distance: distance.value,
        is_important: isImportant,
      };
      props.actions.postUserPreferences(props.user.id, body);
    } else {
      let body = {
        preference_ids: preferenceIds,
        preference_type: changeCase.pascalCase(detail),
        is_important: preferenceIds.length !== 0 ? isImportant : false,
      };
      props.actions.postUserPreferences(props.user.id, body);
    }
  };

  const disableSubmitButton = () => {
    if (page === "edit" && detail === "location") {
      return selectedLocation.isSearching ||
        selectedLocation.message ||
        selectedLocation.city.length < 3
        ? true
        : false;
    }

    let disableSubmit = false;

    if (page === "edit") {
      disableSubmit = value || height !== props.details.height ? false : true;

      return props.isLoading || disableSubmit;
    }

    if (detail === "distance") {
      disableSubmit = distance ? false : true;
    }

    return props.isPostingUserPreferences || disableSubmit;
  };

  const disableSiwtch = () => {
    if (detail === "height" || detail === "age") {
      return !min && !max;
    }

    if (detail === "distance") {
      return !distance;
    }

    return preferenceIds && preferenceIds.length === 0;
  };

  const editDetails = () => {
    switch (detail) {
      case "height":
        return (
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
        );

      case "location":
        let inputClassName = "form-control";

        if (
          selectedLocation.message !== undefined &&
          !selectedLocation.isSearching
        ) {
          inputClassName +=
            selectedLocation.message ||
            selectedLocation.city === "" ||
            selectedLocation.city.length < 3
              ? " is-invalid"
              : " is-valid";
        }

        return (
          <div>
            <h3 className="offset-3">Location</h3>
            <div className="row">
              <div className="col-sm-10">
                <div className="bg-white p-2 mt-5">
                  <Select
                    options={countryOptions}
                    value={selectedLocation.country}
                    onChange={onChangeCountry}
                  />
                  <div class="input-group mt-4">
                    <input
                      type="text"
                      name="city"
                      className={inputClassName}
                      placeholder="City"
                      value={selectedLocation.city}
                      onChange={onChangeCity}
                      required={true}
                    />
                    {selectedLocation.message && (
                      <span className="invalid-feedback">
                        {selectedLocation.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-center text-center mt-2">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() =>
                      props.actions.deleteLocation(props.details.location.id)
                    }
                  >
                    Remove my location
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <RadioFieldSet
              detail={changeCase.pascalCase(detail)}
              name={detail}
              onChange={onChangeRadio}
            />
          </div>
        );
    }
  };

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

    if (detail === "distance") {
      return (
        <div>
          <h3 className="offset-3">{changeCase.capitalCase(detail)}</h3>
          <div className="row">
            <div className="col-sm-10">
              <div className="bg-white p-2 mt-5">
                <Select
                  value={distance}
                  onChange={(value) => setDistance(value)}
                  className="basic-single"
                  classNamePrefix="select"
                  options={distanceOptions}
                  isClearable={true}
                />
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
          <div
            className={`row ${
              detail === "distance" || detail === "location"
                ? null
                : "overflow-auto"
            }`}
          >
            <div className="col-12">
              <form
                className="d-flex flex-column offset-2 mt-5"
                style={{ height: "260px" }}
              >
                <div className="mb-1">
                  {page === "edit" ? editDetails() : editPreferences()}
                </div>
              </form>
            </div>
          </div>
          {page === "preferences" && (
            <div className="mt-3">
              <div className="form-check form-switch offset-3">
                <Input
                  className="form-check-input"
                  type="checkbox"
                  onChange={() => setIsImportant(!isImportant)}
                  checked={isImportant}
                  disabled={disableSiwtch()}
                />
                <label className="form-check-label">
                  Is this important to you ?
                </label>
              </div>
            </div>
          )}
          <div className="row mt-4">
            <div className="col-12">
              <ButtonWithProgress
                type="submit"
                className="w-50 btn btn-md btn-primary offset-3 mt-4"
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

      searchLocation: (location) =>
        dispatch(locationActions.searchLocation(location)),

      addLocation: (location) =>
        dispatch(locationActions.addLocation(location)),

      deleteLocation: (location_id) =>
        dispatch(locationActions.deleteLocation(location_id)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditDetails);
