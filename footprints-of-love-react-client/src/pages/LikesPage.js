import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Route, NavLink } from "react-router-dom";
import UserRows from "../components/Likes/UserRows";

const LikesPage = (props) => {
  const history = useHistory();

  useEffect(() => {
    if (props.location.pathname === "/likes") {
      history.push(`${props.match.url}/who-likes-you`);
    }
  }, [history, props.location.pathname, props.match.url]);

  return (
    <div>
      <div>
        <div className="bg-dark shadow-sm">
          <div className="container">
            <nav className="navbar navbar-dark bg-dark navbar-expand pb-0">
              <ul className="nav navbar-nav w-100 h-100">
                <li className="nav-item align-self-center d-flex gap-3">
                  <NavLink
                    to={`${props.match.url}/who-likes-you`}
                    className="nav-link align-self-center position-relative default"
                    activeStyle={{
                      borderBottom: "3px solid #e00095",
                    }}
                  >
                    <div>
                      <span>Likes You</span>
                    </div>
                  </NavLink>
                  <NavLink
                    to={`${props.match.url}/who-you-like`}
                    className="nav-link align-self-center position-relative"
                    activeStyle={{
                      borderBottom: "3px solid #e00095",
                    }}
                  >
                    <div>
                      <span>You Like</span>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <Route
            path={`${props.match.path}/who-likes-you`}
            component={UserRows}
          />
          <Route
            path={`${props.match.path}/who-you-like`}
            render={(props) => <UserRows {...props} type="likedUsers" />}
          />
        </div>
      </div>
    </div>
  );
};

export default LikesPage;
