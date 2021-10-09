import React from "react";
import styles from "./details.module.css";
import { connect } from "react-redux";
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
    <button
      onClick={() => history.push(`/profile?page=edit`)}
      type="button"
      class={
        props.isAuthUser
          ? "btn p-0 w-100 text-start"
          : "btn p-0 w-100 text-start pe-none"
      }
    >
      <div>
        <div
          className={
            props.isAuthUser
              ? `card mb-2 ${styles.card}`
              : `card mb-2 ${styles.profileDetail}`
          }
        >
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
    </button>

    // <div onClick={() => history.push(`/profile?page=edit`)} >
    //   <div
    //     className={
    //       props.isAuthUser
    //         ? `card mb-2 ${styles.card}`
    //         : `card mb-2 ${styles.profileDetail}`
    //     }
    //   >
    //     <div className="d-flex"></div>
    //     <div className="card-body">
    //       <div className="d-flex">
    //         <div className="col-1">{props.icon}</div>
    //         <div className="ms-2 col-11">
    //           <span className="ps-1">{pageContent}</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthUser: state.profile.isAuthUser,
  };
};

export default connect(mapStateToProps)(Details);
