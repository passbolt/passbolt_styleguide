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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import {withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";

/**
 * This component allows user to delete a tag of the resources
 */
class NotifyExpiredSession extends Component {
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
    let baseUrl = this.props.context.userSettings && this.props.context.userSettings.getTrustedDomain();
    baseUrl = baseUrl || this.props.context.trustedDomain;
    return `${baseUrl}/auth/login`;
  }

  render() {
    return (
      <DialogWrapper
        title={this.props.t("Session Expired")}
        onClose={this.handleCloseClick}
        className="session-expired-dialog">
        <div className="form-content">
          <p><Trans>Your session has expired, you need to sign in.</Trans></p>
        </div>
        <div className="submit-wrapper clearfix">
          <a ref={this.loginLinkRef}
            href={this.loginUrl}
            className="primary button"
            target="_parent"
            role="button"
            rel="noopener noreferrer"><Trans>Sign in</Trans></a>
        </div>
      </DialogWrapper>
    );
  }
}

NotifyExpiredSession.propTypes = {
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withTranslation('common')(NotifyExpiredSession)));
