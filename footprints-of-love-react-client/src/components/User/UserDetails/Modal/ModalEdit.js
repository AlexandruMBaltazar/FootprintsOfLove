import React, { useState } from "react";
import { useLocation } from "react-router";
import RadioFieldSet from "../../../RadioFieldSet";
import * as changeCase from "change-case";
import { connect } from "react-redux";
import * as userDetailsActions from "../../../../actions/user/details/userDetailsActions";

const ModalEdit = (props) => {
  const [value, setValue] = useState({});

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
    props.actions.updateUserDetails(value, props.detailId);
  };

  return (
    <div>
      {detail && (
        <RadioFieldSet
          detail={changeCase.pascalCase(detail)}
          name={detail}
          onChange={onChange}
        />
      )}
      <div>
        <button type="button" className="btn btn-primary" onClick={onClick}>
          Save
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    detailId: state.userDetails.details.id,
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
