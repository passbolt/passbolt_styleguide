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
import AppContext, {withAppContext} from "../../contexts/AppContext";

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
   * - If the route is handled by the ExtApp, notify the background page to update the browser url.
   * - If the route is handled by the ApiApp, go to the url.
   */
  handleRouteChanged() {
    this.props.history.listen(location => {
      if (this.apiAppRoutes.includes(location.pathname)) {
        const trustedDomain = this.context.userSettings.getTrustedDomain();
        const url = new URL(`${trustedDomain}${location.pathname}`);
        window.open(url, '_parent', 'noopener,noreferrer');
      } else {
        this.context.port.emit('passbolt.app.route-changed', location.pathname);
      }
    });
  }

  /**
   * Get the API app routes.
   * @return {array<string>}
   */
  get apiAppRoutes() {
    return [
      "/app/administration",
      "/app/settings/mfa",
    ];
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

HandleExtAppRouteChanged.contextType = AppContext;
HandleExtAppRouteChanged.propTypes = {
  history: PropTypes.object
};
export default withAppContext(withRouter(HandleExtAppRouteChanged));

