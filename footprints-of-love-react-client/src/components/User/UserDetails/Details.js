import React from "react";
import styles from "./details.module.css";
import { useHistory } from "react-router";

const Details = (props) => {
  let pageContent;
  let history = useHistory();

  let details = props.details.filter((detail) => detail !== null);
  if (details.length === 0) {
    pageContent = "Add more details about you";
  } else {
    pageContent = details.join(" | ");
  }

  return (
    <div onClick={() => history.push(`/profile?page=edit`)}>
      <div className={`card mb-2 ${styles.card}`}>
        <div className="d-flex"></div>
        <div className="card-body">
          <div className="d-flex">
            <div className="col-1">{props.icon}</div>
            <div className="ms-2 col-11">
              <span className="ps-1">{pageContent}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
