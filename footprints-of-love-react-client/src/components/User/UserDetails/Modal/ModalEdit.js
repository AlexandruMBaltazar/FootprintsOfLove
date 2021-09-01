import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import RadioFieldSet from "../../../RadioFieldSet";
import * as changeCase from "change-case";
import { connect } from "react-redux";
import * as userDetailsActions from "../../../../actions/user/details/userDetailsActions";

const ModalEdit = (props) => {
  const [height, setHeight] = useState();
  const [value, setValue] = useState({});

  useEffect(() => {
    setHeight(props.details && props.details.height);
  }, [props.details, props.details.height]);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const detail = searchParams.get("detail");

  const onChange = (event) => {
    const { value, name } = event.target;
    setValue((previousForm) => {
      return {
        ...previousForm,
        [name + "_id"]: value,
      };
    });
  };

  const onClick = () => {
    if (height !== props.details.height) {
      props.actions.updateUserDetails({ height: height }, props.detailId);
    } else {
      props.actions.updateUserDetails(value, props.detailId);
    }
  };

  return (
    <div>
      {detail && (
        <div>
          <form className="d-flex flex-column offset-3 mt-5">
            <div className="mb-1">
              {detail !== "height" ? (
                <RadioFieldSet
                  detail={changeCase.pascalCase(detail)}
                  name={detail}
                  onChange={onChange}
                />
              ) : (
                <div>
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
              )}
            </div>
            <button
              type="button"
              className="w-50 btn btn-md btn-primary ms-4"
              onClick={onClick}
            >
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    detailId: state.userDetails.details.id,
    details: state.userDetails.details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      updateUserDetails: (detail, detailId) =>
        dispatch(userDetailsActions.updateUserDetails(detail, detailId)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);
