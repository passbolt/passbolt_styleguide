import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {withAppContext} from "../../contexts/AppContext";
import PropTypes from "prop-types";

class PrivateRoute extends Component {

  render() {
    let { component: Component, exact, strict, path, computedMatch, location, ...componentProps } = this.props;

    return (
      <Route
        exact={exact}
        strict={strict}
        path={path}
        render={props => (
          <React.Fragment>
            {this.props.context.isAuthenticated &&
              <Component {...props} {...componentProps} />
            }
            {!this.props.context.isAuthenticated &&
              <Redirect
                to={{
                  pathname: "/data/quickaccess/login",
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
};

export default withAppContext(PrivateRoute);
