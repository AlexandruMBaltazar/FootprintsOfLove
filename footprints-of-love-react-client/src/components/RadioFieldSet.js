import React, { useState, useEffect } from "react";
import * as apiCalls from "../api/apiCalls";

export default function RadioFieldSet(props) {
  const [details, setDetails] = useState();

  useEffect(() => {
    const loadDetails = () => {
      apiCalls.details(props.detail).then((response) => {
        setDetails(response.data.data);
      });
    };

    loadDetails();
  }, [props.detail]);

  let radio;
  if (details) {
    radio = details.map((detail) => (
      <div className="form-check" key={detail.id}>
        <input
          className="form-check-input"
          type="radio"
          name={props.name}
          value={detail.id}
          onChange={props.onChange}
        />
        <label className="form-check-label">{detail.value}</label>
      </div>
    ));
  }

  return (
    <fieldset className="row mb-3">
      <legend className="col-form-label col-sm-2 pt-0">{props.detail}</legend>
      <div className="col-sm-10">{radio}</div>
    </fieldset>
  );
}
