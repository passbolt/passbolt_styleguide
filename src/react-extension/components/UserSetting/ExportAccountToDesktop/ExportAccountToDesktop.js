/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since
 */

import React from 'react';
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../../shared/components/Icons/Icon";


/**
 * This component displays the user profile information
 */
class ExportAccountToDesktop extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
    };
  }

  /**
   * Binds the component handlers
   */
  bindHandlers() {
    this.handleDownloadAccount = this.handleDownloadAccount.bind(this);
  }

  /**
   * handle the download account kit click event
   */
  async handleDownloadAccount() {
    try {
      await this.props.context.port.request('passbolt.desktop.export-account');
      await this.props.actionFeedbackContext.displaySuccess(this.props.t("The account kit has been downloaded successfully."));
    } catch (error) {
      // Could be that the user canceled or couldn't remember the passphrase
      if (error.name !== "UserAbortsOperationError") {
        return this.handleError(error);
      }
    }
  }

  /**
   * handle error to display the error dialog
   * @param error
   */
  async handleError(error) {
    await this.props.actionFeedbackContext.displayError(error.message);
  }

  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className="grid grid-responsive-12 profile-desktop-export">
        <div className="row">
          <>
            <div className="desktop-section col6 main-column">
              <h3><Trans>Welcome to the desktop app setup</Trans></h3>
              <h4 className="no-border"><Trans>Download the desktop app</Trans></h4>
              <p>
                <Trans>Windows Hello is required to launch the passbolt app, please enable it.</Trans>
              </p>
              <a className="windows-store" href="https://apps.microsoft.com/store/detail/passbolt/TBD" target="_blank" rel="noopener noreferrer"></a>
              <h4><Trans>Transfer your account kit</Trans></h4>
              <p><Trans>An account kit is require to transfer your profile and private key to the desktop app.</Trans></p>
              <div className="submit-wrapper">
                <button type="button" id="download-account-kit" className={`button primary`} role="button" onClick={this.handleDownloadAccount}>
                  <Trans>Download your account kit</Trans>
                </button>
              </div>
            </div>
            <div className="col4 last">
              <div className="sidebar-help">
                <h3><Trans>Get started in 5 easy steps</Trans></h3>
                <p><Trans>1. Click download the account kit.</Trans></p>
                <p><Trans>2. Install the application from the store.</Trans></p>
                <p><Trans>3. Open the application.</Trans></p>
                <p><Trans>4. Upload the account kit on the desktop app.</Trans></p>
                <p><Trans>5. And you are done!</Trans></p>
                <a className="button" href="https://help.passbolt.com/TBD" target="_blank" rel="noopener noreferrer">
                  <Icon name="document"/>
                  <span><Trans>Read the documentation</Trans></span>
                </a>
              </div>
            </div>
          </>
        </div>
      </div>
    );
  }
}

ExportAccountToDesktop.propTypes = {
  context: PropTypes.object, // Application context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withTranslation('common')(ExportAccountToDesktop)));
