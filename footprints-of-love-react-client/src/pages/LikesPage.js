import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Route, NavLink, Switch, useRouteMatch } from "react-router-dom";
import UserRows from "../components/Likes/UserRows";

const LikesPage = (props) => {
  let { path, url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    if (props.location.pathname === "/likes") {
      history.push(`${url}/who-likes-you`);
    }
  }, [history, path, props.location.pathname, url]);

  return (
    <div>
      <div>
        <div className="bg-dark shadow-sm">
          <div className="container">
            <nav className="navbar navbar-dark bg-dark navbar-expand pb-0">
              <ul className="nav navbar-nav w-100 h-100">
                <li className="nav-item align-self-center d-flex gap-3">
                  <NavLink
                    to={`${url}/who-likes-you`}
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
                    to={`${url}/who-you-like`}
                    className="nav-link align-self-center position-relative"
                    activeStyle={{
                      borderBottom: "3px solid #e00095",
                    }}
                  >
                    <div>
                      <span>You Like</span>
                    </div>
                  </NavLink>
                  <NavLink
                    to={`${url}/who-you-dislike`}
                    className="nav-link align-self-center position-relative"
                    activeStyle={{
                      borderBottom: "3px solid #e00095",
                    }}
                  >
                    <div>
                      <span>You Dislike</span>
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
          <Switch>
            <Route path={`${url}/who-likes-you`} component={UserRows} />
            <Route
              path={`${url}/who-you-like`}
              render={(props) => <UserRows {...props} type="likedUsers" />}
            />
            <Route
              path={`${url}/who-you-dislike`}
              render={(props) => <UserRows {...props} type="dislikedUsers" />}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default LikesPage;
