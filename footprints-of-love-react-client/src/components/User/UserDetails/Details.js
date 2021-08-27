import React from "react";
import { Link } from "react-router-dom";
import styles from "./details.module.css";

const Details = (props) => {
  let pageContent;

  let details = props.details.filter((detail) => detail !== null);

  console.log(details.length);

  if (details.length === 0) {
    pageContent = "Add more details about you";
  } else {
    pageContent = details.join(" | ");
  }

  return (
    <Link className="text-decoration-none text-dark">
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
    </Link>
  );
};

export default Details;
