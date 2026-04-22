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
import React, { Component } from "react";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import { withRouter } from "react-router-dom";
import { Trans, withTranslation } from "react-i18next";
import PropTypes from "prop-types";

/**
 * This component allows user to delete a tag of the resources
 */
class NotifyExpiredSession extends Component {
  /**
   * Constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.initEventHandlers();
    this.createReferences();
  }

  /**
   * Init the component event handlers.
   */
  initEventHandlers() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
  }

  /**
   * Create component references.
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
   * Handle sign-in button click.
   */
  handleSignInClick() {
    this.goToLogin();
  }

  /**
   * Go to the login page.
   */
  goToLogin() {
    /*
     * PB-50644
     * Force a full page reload instead of navigating via tabs.update to the
     * auth login url.
     *
     * Starting with Chrome 147, the page may be restored from the browser's
     * Back/Forward Cache (BFCache) when navigating with tabs update primitive.
     * When this happens, the extension message port is closed ("The page
     * keeping the extension port is moved into back/forward cache, so the
     * message channel is closed") and the extension fails to re-initialize
     * on the restored page.
     *
     * Using tabs.reload bypasses BFCache and forces a fresh page load,
     * ensuring the content script and message port are properly re-established.
     */
    this.props.context.port.request("passbolt.tab.reload");
  }

  /**
   * @returns {Element}
   */
  render() {
    return (
      <DialogWrapper
        title={this.props.t("Session Expired")}
        onClose={this.handleCloseClick}
        className="session-expired-dialog"
      >
        <div className="form-content">
          <p>
            <Trans>Your session has expired, you need to sign in.</Trans>
          </p>
        </div>
        <div className="submit-wrapper clearfix">
          <a
            ref={this.loginLinkRef}
            onClick={this.handleSignInClick}
            className="primary button form"
            target="_parent"
            role="button"
            rel="noopener noreferrer"
          >
            <Trans>Sign in</Trans>
          </a>
        </div>
      </DialogWrapper>
    );
  }
}

NotifyExpiredSession.propTypes = {
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withTranslation("common")(NotifyExpiredSession)));
