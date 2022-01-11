import React from "react";

const User = (props) => {
  return (
    <div className="col-12 col-lg-3 mb-5">
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src="..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
};

export default User;
