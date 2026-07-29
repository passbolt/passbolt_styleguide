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
 */
import React from "react";
import PropTypes from "prop-types";
import { BOOTSTRAP_FEATURE } from "../../ExtQuickAccess";
import { withActiveSessionLocalStorage } from "../../../shared/context/ActiveSession/ActiveSessionLocalStorageContext";
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";
import { withRouter } from "react-router-dom";

/**
 * This component takes care of redirect the user.
 */
class HandleBootstrapRoute extends React.Component {
  /**
   * Get the route to quickaccess should bootstrap on.
   * @returns {string}
   */
  getBootstrapRoute() {
    // If server is not reachable redirect to server not reachable page
    if (!this.props.activeSession.isServerReachable) {
      return "/webAccessibleResources/quickaccess/server-not-reachable";
    }
    // If user is not authenticated redirect to login page
    if (!this.props.activeSession.isAuthenticated) {
      return "/webAccessibleResources/quickaccess/login";
    }

    switch (this.props.bootstrapFeature) {
      case BOOTSTRAP_FEATURE.CREATE_NEW_CREDENTIALS:
      case BOOTSTRAP_FEATURE.SAVE_CREDENTIALS:
        return "/webAccessibleResources/quickaccess/resources/create";
      case BOOTSTRAP_FEATURE.AUTOSAVE_CREDENTIALS:
        return "/webAccessibleResources/quickaccess/resources/autosave";
    }

    return "/webAccessibleResources/quickaccess/home";
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return this.props.history.push(this.getBootstrapRoute());
  }
}

HandleBootstrapRoute.propTypes = {
  activeSession: PropTypes.instanceOf(UserActiveSessionEntity), // The user active session
  history: PropTypes.object, // The history
  bootstrapFeature: PropTypes.string, // The bootstrap feature
};

export default withRouter(withActiveSessionLocalStorage(HandleBootstrapRoute));
