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
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

/**
 * This component tracks any navigation changes and handle it
 */
class HandleExtAppBootstrapRouteChangeRequested extends Component {
  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.handleRouteChangeRequested();
  }

  /**
   * Whenever the route change is requested
   */
  handleRouteChangeRequested() {
    this.props.port.on("passbolt.app-bootstrap.change-route", (pathname) => {
      /*
       * No need to update the URL history when the URL didn't change.
       * There is no added value for the end user in navigating back to the same URL, nor is there any internal value in tracking a navigation to the same URL.
       * Additionally, changing the URL will trigger a navigation event that will re-trigger the whole navigation detection (tabEvent),
       * which is unnecessary and brittle when solicited too frequently for some users under Linux (PB-50077).
       */
      if (/^\/[A-Z/-9\-]*$/i.test(pathname) && this.props.location.pathname !== pathname) {
        this.props.history.replace(pathname);
      }
    });
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return <></>;
  }
}

HandleExtAppBootstrapRouteChangeRequested.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  port: PropTypes.any,
};
export default withRouter(HandleExtAppBootstrapRouteChangeRequested);
