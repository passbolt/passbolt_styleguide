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
import React from 'react';
import PropTypes from "prop-types";
import AppContext from "../../../contexts/AppContext";
import {withDialog} from "../../../contexts/Common/DialogContext";
import SessionExpired from "../../Dialog/SessionExpired/SessionExpired";

const IS_AUTHENTICATED_CHECK_PERIOD = 2000;

/**
 * This component takes care of checking when the user session is expired.
 */
class HandleSessionExpired extends React.Component {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
    this.scheduledCheckIsAuthenticatedTimeout = null;
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSessionExpiredEvent = this.handleSessionExpiredEvent.bind(this);
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.scheduleCheckIsAuthenticated();
  }

  /**
   * Whenever the component is unmount.
   */
  componentWillUnmount() {
    clearTimeout(this.scheduledCheckIsAuthenticatedTimeout);
  }

  /**
   * Schedule a session check.
   */
  scheduleCheckIsAuthenticated() {
    this.scheduledCheckIsAuthenticatedTimeout = setTimeout(async() => {
      const isAuthenticated = await this.checkIsAuthenticated();
      if (!isAuthenticated) {
        this.handleSessionExpiredEvent();
      } else {
        this.scheduleCheckIsAuthenticated();
      }
    }, IS_AUTHENTICATED_CHECK_PERIOD);
  }

  /**
   * Check if the user is still authenticated
   * @returns {Promise<boolean>}
   */
  async checkIsAuthenticated() {
    return this.context.port.request("passbolt.auth.is-authenticated", {requestApi: false});
  }

  /**
   * Handle the session expired event
   */
  handleSessionExpiredEvent() {
    this.props.dialogContext.open(SessionExpired);
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return <></>;
  }
}

HandleSessionExpired.contextType = AppContext;

HandleSessionExpired.propTypes = {
  dialogContext: PropTypes.any, // the dialog context
};

export default withDialog(HandleSessionExpired);
