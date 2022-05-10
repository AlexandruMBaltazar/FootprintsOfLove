import React, { useState } from "react";

const Guide = (props) => {
  const { image, body, title, info } = props.guide;
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="col-md-12 col-lg-6 mb-3">
      <div className="card h-100" style={{ width: "18rem" }}>
        <img src={image} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
          >
            Check guide
          </button>
        </div>
      </div>
      {showModal && (
        <div
          className="modal fade d-block show"
          style={{ backgroundColor: "#00000061" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="container">
                    <div className="col-12">
                      <img src={image} className="card-img-top" />
                    </div>
                    <div className="col-12 pt-3">{info}</div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guide;
