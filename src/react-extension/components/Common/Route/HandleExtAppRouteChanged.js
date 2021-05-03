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
import {withAppContext} from "../../../contexts/AppContext";

/**
 * This component tracks any navigation changes and handle it
 */
class HandleExtAppRouteChanged extends Component {
  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.handleRouteChanged();
  }

  /**
   * Whenever the route changed.
   * Notify the background page to update the browser url.
   */
  handleRouteChanged() {
    this.props.history.listen(location => {
      this.props.context.port.emit('passbolt.app.route-changed', location.pathname);
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

HandleExtAppRouteChanged.propTypes = {
  context: PropTypes.any, // The application context
  history: PropTypes.object
};
export default withAppContext(withRouter(HandleExtAppRouteChanged));

