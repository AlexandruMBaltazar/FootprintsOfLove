import React from "react";
import * as guidesInfo from "./guindesInfo";
import { useRouteMatch, Link } from "react-router-dom";
import { Switch } from "react-router-dom";
import SecuredRoute from "../../../securityUtils/SecuredRoute";
import Guides from "./Guides";

const GuidesContainer = (props) => {
  let { path, url } = useRouteMatch();

  return (
    <div className="container">
      <div className="row">
        <Switch>
          <SecuredRoute path={`${path}/:guideName`} component={Guides} />
          <SecuredRoute path={`${path}`}>
            {guidesInfo.getGuides().map((guide, key) => {
              return (
                <div key={key} className="col-md-12 col-lg-6">
                  <div key={key} className="card" style={{ width: "18rem" }}>
                    <img src={guide.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{guide.title}</h5>
                      <p className="card-text">{guide.body}</p>
                      <Link
                        to={`${url}/${guide.link}`}
                        className="btn btn-primary"
                      >
                        Check guide
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </SecuredRoute>
        </Switch>
      </div>
    </div>
  );
};

export default GuidesContainer;
