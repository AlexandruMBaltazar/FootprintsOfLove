import React from "react";
import { connect } from "react-redux";

const FilterSessions = (props) => {
  return (
    <div
      className="btn-group mb-4 col-12"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio1"
        autocomplete="off"
        checked
      />
      <label className="btn btn-outline-primary" for="btnradio1">
        All
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio2"
        autocomplete="off"
      />
      <label className="btn btn-outline-primary" for="btnradio2">
        Your turn
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio3"
        autocomplete="off"
      />
      <label className="btn btn-outline-primary" for="btnradio3">
        New matches
      </label>
    </div>
  );
};

const mapStateToProps = (state) => {};

export default connect(mapStateToProps)(FilterSessions);
