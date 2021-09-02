import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import RadioFieldSet from "../../../RadioFieldSet";
import * as changeCase from "change-case";
import { connect } from "react-redux";
import * as userDetailsActions from "../../../../actions/user/details/userDetailsActions";
import ButtonWithProgress from "../../../ButtonWithProgress";

const ModalEdit = (props) => {
  const [height, setHeight] = useState();
  const [value, setValue] = useState();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const detail = searchParams.get("detail");

  useEffect(() => {
    setHeight(props.details && props.details.height);

    return () => {
      setValue(undefined);
    };
  }, [props.details, props.details.height, detail]);

  const onChange = (event) => {
    const { value, name } = event.target;
    setValue((previousForm) => {
      return {
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

  let disableSubmit = value || height !== props.details.height ? false : true;

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
                  {detail !== "height" ? (
                    <RadioFieldSet
                      detail={changeCase.pascalCase(detail)}
                      name={detail}
                      onChange={onChange}
                    />
                  ) : (
                    <div>
                      <label className="form-label">
                        Height in cm - {height}{" "}
                      </label>
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
              </form>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12">
              <ButtonWithProgress
                type="submit"
                className="w-50 btn btn-md btn-primary offset-3 mt-5"
                disabled={props.isLoading || disableSubmit}
                pendingApiCall={props.isLoading}
                text="Submit"
                onClick={onClick}
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
    detailId: state.userDetails.details.id,
    details: state.userDetails.details,
    isLoading: state.userDetails.isLoading,
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
