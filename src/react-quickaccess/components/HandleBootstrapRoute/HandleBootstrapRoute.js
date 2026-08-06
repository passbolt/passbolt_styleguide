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
import { withAppContext } from "../../../shared/context/AppContext/AppContext";

/**
 * This component takes care of redirect the user.
 */
class HandleBootstrapRoute extends React.Component {
  /**
   * Get the route to quickaccess should bootstrap on.
   * @returns {string}
   */
  getBootstrapRoute() {
    const activeSession = this.props.activeSession;
    const canUseOfflineMode = this.props.context.canUseOfflineMode;

    /*
     * An authenticated offline session should persist: the user stays in the app whether or not the server
     * is reachable.
     */
    if (activeSession.isAuthenticated && activeSession.isSessionOffline) {
      return "/webAccessibleResources/quickaccess/home";
    }

    /*
     * A signed-out user who can use offline mode and has no reachable server is taken straight to the
     * offline login page: the server unavailable screen below would have nothing to offer them but that
     * same destination. Kept ahead of the reachability check, and conditioned on it, so a signed-out user
     * whose server is reachable still gets the online login page.
     */
    if (!activeSession.isAuthenticated && !activeSession.isServerReachable && canUseOfflineMode) {
      return "/webAccessibleResources/quickaccess/login-offline";
    }

    /*
     * Server not reachable. This covers an authenticated online session that lost the network as well
     * as an unauthenticated user with no reachable server: both land on the server unavailable screen,
     * which decides what actions to offer (sign out locally, offline sign-in)
     */
    if (!activeSession.isServerReachable) {
      return "/webAccessibleResources/quickaccess/server-not-reachable";
    }

    // Server reachable but user not authenticated: online login page.
    if (!activeSession.isAuthenticated) {
      return "/webAccessibleResources/quickaccess/login";
    }

    return this.getAuthenticatedRoute();
  }

  /**
   * Get the route for an authenticated user, based on the requested bootstrap feature.
   * @returns {string}
   */
  getAuthenticatedRoute() {
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
  context: PropTypes.any, // The application context
  activeSession: PropTypes.instanceOf(UserActiveSessionEntity), // The user active session
  history: PropTypes.object, // The history
  bootstrapFeature: PropTypes.string, // The bootstrap feature
};

export default withRouter(withAppContext(withActiveSessionLocalStorage(HandleBootstrapRoute)));
