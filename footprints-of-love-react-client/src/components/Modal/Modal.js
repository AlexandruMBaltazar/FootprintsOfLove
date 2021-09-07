import { useHistory, useLocation } from "react-router";
import { detailTypes } from "../User/UserDetails/detailTypes";
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

  const getSideBar = () => {
    let sidebar = detailTypes.map((detailType) => {
      return (
        <div>
          <h2
            className="d-flex align-items-center flex-shrink-0 p-3"
            style={{ background: "#f3f5f9" }}
          >
            {detailType.icon}
            <span className="ps-2 fs-5 fw-semibold">{detailType.name}</span>
          </h2>
          <div className="list-group list-group-flush border-bottom">
            {[...detailType.values].map((value) => {
              return (
                <span
                  className="list-group-item list-group-item-action"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    history.push(`/profile?page=${page}&detail=${value[0]}`)
                  }
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{value[1]}</h5>
                    <span className="text-muted">
                      {getSideBarUserInfo(value[0])}
                    </span>
                  </div>
                </span>
              );
            })}
          </div>
        </div>
      );
    });

    return sidebar;
  };

  const getSideBarUserInfo = (infoType) => {
    return props.details && props.details[infoType].value;
  };

  return (
    <div>
      <div className={rootClass} style={rootStyle}>
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: "#1a1a1a" }}
            >
              <h5 className="modal-title" style={{ color: "white" }}>
                {page === "edit" ? "Details" : "Preferences"}
              </h5>
              <button
                type="button"
                className="btn-close"
                style={{ backgroundColor: "white" }}
                onClick={() => history.push("/profile")}
              ></button>
            </div>
            <div className="modal-body p-0" style={{ background: "#f3f5f9" }}>
              <div className="d-flex">
                <div className="col-6 flex-fill">
                  <div className="overflow-auto">
                    <div
                      className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
                      style={{ height: "460px" }}
                    >
                      {getSideBar()}
                    </div>
                  </div>
                </div>
                <div className="col-6 h-100 flex-fill">
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
