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
 * @since         2.14.0
 */
import React, {Component} from "react";
import AppContext from "../../../contexts/AppContext";
import DialogWrapper from "../../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import {withRouter} from "react-router-dom";

/**
 * This component allows user to delete a tag of the resources
 */
class SessionExpired extends Component {
  constructor(props) {
    super(props);
    this.initEventHandlers();
    this.createReferences();
  }

  initEventHandlers() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  /**
   * Create references
   */
  createReferences() {
    this.loginLinkRef = React.createRef();
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.goToLogin();
  }

  /**
   * Go to the login page.
   */
  goToLogin() {
    this.loginLinkRef.current.click();
  }

  /**
   * Get the login url
   * @returns {string}
   */
  get loginUrl() {
    const baseUrl = this.context.userSettings.getTrustedDomain();
    return `${baseUrl}/auth/login`;
  }

  render() {
    return (
      <DialogWrapper
        title="Session Expired"
        onClose={this.handleCloseClick}
        className="session-expired-dialog">
        <div className="form-content">
          <p>Your session has expired, you need to login</p>
        </div>
        <div className="submit-wrapper clearfix">
          <a ref={this.loginLinkRef}
            href={this.loginUrl}
            className="primary button"
            target="_parent"
            role="button"
            rel="noopener noreferrer">Sign in</a>
        </div>
      </DialogWrapper>
    );
  }
}

SessionExpired.contextType = AppContext;

export default withRouter(SessionExpired);
