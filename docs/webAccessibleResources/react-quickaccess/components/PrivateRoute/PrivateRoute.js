import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import RbacContextProvider from "../../../shared/context/Rbac/RbacContext";

class PrivateRoute extends Component {
  render() {
    const {component: Component, exact, strict, path, ...componentProps} = this.props;

    return (
      <Route
        exact={exact}
        strict={strict}
        path={path}
        render={props => (
          <React.Fragment>
            {this.props.context.isAuthenticated && this.props.context.loggedInUser !== null &&
              <RbacContextProvider>
                <Component {...props} {...componentProps} />
              </RbacContextProvider>
            }
            {!this.props.context.isAuthenticated &&
              <Redirect
                to={{
                  pathname: "/webAccessibleResources/quickaccess/login",
                  search: props.location.search,
                  state: {from: props.location}
                }}
              />
            }
          </React.Fragment>
        )}
      />
    );
  }
}

PrivateRoute.propTypes = {
  context: PropTypes.any, // The application context
  component: PropTypes.any, // The component class to render
  exact: PropTypes.bool, // Exact route match
  path: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]), // The route(s) to match
  strict: PropTypes.bool, // Strict matching
};

export default withAppContext(PrivateRoute);
