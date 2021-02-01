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
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";

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
    let baseUrl = this.context.userSettings && this.context.userSettings.getTrustedDomain();
    baseUrl = baseUrl || this.context.trustedDomain;
    return `${baseUrl}/auth/login`;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    return (
      <DialogWrapper
        title={this.translate("Session Expired")}
        onClose={this.handleCloseClick}
        className="session-expired-dialog">
        <div className="form-content">
          <p>{this.translate("Your session has expired, you need to sign in.")}</p>
        </div>
        <div className="submit-wrapper clearfix">
          <a ref={this.loginLinkRef}
            href={this.loginUrl}
            className="primary button"
            target="_parent"
            role="button"
            rel="noopener noreferrer">{this.translate("Sign in")}</a>
        </div>
      </DialogWrapper>
    );
  }
}

SessionExpired.contextType = AppContext;

SessionExpired.propTypes = {
  t: PropTypes.func, // The translation function
};

export default withRouter(withTranslation('common')(SessionExpired));
