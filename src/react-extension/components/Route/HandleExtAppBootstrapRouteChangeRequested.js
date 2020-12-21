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
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

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
    this.props.port.on('passbolt.app-bootstrap.change-route', pathname => {
      if (/^\/[A-Za-z0-9\-\/]*$/.test(pathname)) {
        this.props.history.replace(pathname);
      }
    });
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

HandleExtAppBootstrapRouteChangeRequested.propTypes = {
  history: PropTypes.object,
  port: PropTypes.any
};
export default withRouter(HandleExtAppBootstrapRouteChangeRequested);

