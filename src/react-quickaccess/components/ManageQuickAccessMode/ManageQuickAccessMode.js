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

class ManageQuickAccessMode extends Component {
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
    this.handleCloseOutsideWindowEvent();
    this.redirectFromFeatureParams();
  }

  /**
   * Get the query parameters from the url
   * @returns {URLSearchParams}
   */
  get queryParameters() {
    return new URLSearchParams(this.props.location.search);
  }

  /**
   * Handle close outside window event
   */
  handleCloseOutsideWindowEvent() {
    const mustCloseWindow = this.queryParameters.get("uiMode") === "detached"
      && this.queryParameters.get("feature") !== null;
    if (mustCloseWindow) {
      const closeWindow = () => window.close();
      window.addEventListener("blur", closeWindow);
    }
  }

  /**
   * Redirect on the right page according to the feature
   */
  redirectFromFeatureParams() {
    const tabId = this.queryParameters.get("tabId");
    switch (this.queryParameters.get("feature")) {
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

ManageQuickAccessMode.propTypes = {
  context: PropTypes.any, // The application context
  history: PropTypes.any, // The router history
  location: PropTypes.any, // The router location
};

export default withAppContext(withRouter(ManageQuickAccessMode));
