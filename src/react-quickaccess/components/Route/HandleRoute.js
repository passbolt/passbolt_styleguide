/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since        3.0.0
 */
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {withAppContext} from "../../contexts/AppContext";

class HandleRoute extends Component {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.redirectFromFeatureParams();
  }

  redirectFromFeatureParams() {
    const queryParameters = new URLSearchParams(this.props.location.search);
    const tabId = queryParameters.get("tabId");
    switch (queryParameters.get("feature")) {
      case "create-new-credentials":
      case "save-credentials":
        this.props.history.push({pathname: "/data/quickaccess/resources/create", state: {tabId}});
        break;
      case "browse-credentials":
        this.props.history.push({pathname: "/data/quickaccess.html", state: {tabId}});
        break;
      default:
        break;
    }
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <></>
    );
  }
}

HandleRoute.propTypes = {
  context: PropTypes.any, // The application context
  history: PropTypes.any, // The router history
  location: PropTypes.any, // The router location
};

export default withAppContext(withRouter(HandleRoute));
