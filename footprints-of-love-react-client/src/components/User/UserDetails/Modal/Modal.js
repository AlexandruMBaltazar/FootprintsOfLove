import { useHistory, useLocation } from "react-router";
import { detailTypes } from "../detailTypes";
import { connect } from "react-redux";
import ModalEdit from "./ModalEdit";

const Modal = (props) => {
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get("page");

  let rootClass = "modal fade";
  let rootStyle = { backgroundColor: "#00000061" };

  if (page) {
    rootClass += " d-block show";
    rootStyle = { backgroundColor: "#00000061" };
  }

  let sidebar = detailTypes.map((detailType) => {
    return (
      <div>
        <h2 className="d-flex align-items-center flex-shrink-0 p-3">
          <span className="fs-5 fw-semibold">{detailType.name}</span>
        </h2>
        <div className="list-group list-group-flush border-bottom">
          {[...detailType.values].map((value) => {
            let userValue;
            if (value[0] !== "height") {
              userValue = props.details[value[0]]
                ? props.details[value[0]].value
                : "Add";
            } else {
              userValue = props.details[value[0]] + " cm" ?? "Add";
            }
            return (
              <span
                className="list-group-item list-group-item-action"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  history.push(`/profile?page=edit&detail=${value[0]}`)
                }
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{value[1]}</h5>
                  <span className="text-muted">{userValue}</span>
                </div>
              </span>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className={rootClass} style={rootStyle}>
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => history.push("/profile")}
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex">
                <div className="col-6 flex-fill">
                  <div className="overflow-auto">
                    <div
                      className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
                      style={{ height: "360px" }}
                    >
                      {sidebar}
                    </div>
                  </div>
                </div>
                <div className="col-6 flex-fill">
                  <ModalEdit />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => history.push("/profile")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    details: state.userDetails.details,
  };
};

export default connect(mapStateToProps)(Modal);
