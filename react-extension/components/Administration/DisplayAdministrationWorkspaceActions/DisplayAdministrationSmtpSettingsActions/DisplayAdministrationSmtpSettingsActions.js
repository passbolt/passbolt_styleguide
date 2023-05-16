/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */

import React from "react";
import PropTypes from "prop-types";
import Icon from "../../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {withAdminSmtpSettings} from "../../../../contexts/AdminSmtpSettingsContext";
import SendTestMailDialog from "../../SendTestMailDialog/SendTestMailDialog";
import {withDialog} from "../../../../contexts/DialogContext";

/**
 * This component is a container of multiple actions applicable on setting
 */
class DisplayAdministrationWorkspaceActions extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
    this.dialogId = null;
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleTestClick = this.handleTestClick.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  /**
   * Handle save settings
   */
  async handleSaveClick() {
    if (this.smtpSettings.isProcessing()) {
      return;
    }
    const isFormValid = this.smtpSettings.validateData();
    if (isFormValid) {
      await this.smtpSettings.saveSmtpSettings();
    }
  }

  /**
   * Handle save settings
   */
  async handleTestClick() {
    if (this.smtpSettings.isProcessing()) {
      return;
    }

    const isFormValid = this.smtpSettings.validateData();
    if (isFormValid) {
      if (this.dialogId !== null) {
        this.handleCloseDialog();
      }
      this.dialogId = await this.props.dialogContext.open(SendTestMailDialog, {handleClose: this.handleCloseDialog});
    }
  }

  /**
   * Handle close dialog
   */
  handleCloseDialog() {
    this.props.dialogContext.close(this.dialogId);
    this.dialogId = null;
  }

  /**
   * Is save button enable
   * @returns {boolean}
   */
  isSaveEnabled() {
    return this.smtpSettings.isSettingsModified() && !this.smtpSettings.isProcessing();
  }

  /**
   * Is test button enable
   * @returns {boolean}
   */
  isTestEnabled() {
    return this.smtpSettings.isSettingsModified() && !this.smtpSettings.isProcessing();
  }

  /**
   * Returns the adminSmtpSettingsContext props
   * @returns {object}
   * @private
   */
  get smtpSettings() {
    return this.props.adminSmtpSettingsContext;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="col2_3 actions-wrapper">
        <div className="actions">
          <div>
            <li>
              <button type="button" disabled={!this.isSaveEnabled()} onClick={this.handleSaveClick}>
                <Icon name="save"/>
                <span><Trans>Save settings</Trans></span>
              </button>
            </li>
          </div>
          <div>
            <li>
              <button type="button" disabled={!this.isTestEnabled()} onClick={this.handleTestClick}>
                <Icon name="plug"/>
                <span><Trans>Send test email</Trans></span>
              </button>
            </li>
          </div>
        </div>
      </div>
    );
  }
}

DisplayAdministrationWorkspaceActions.propTypes = {
  adminSmtpSettingsContext: PropTypes.object, // The admin account recovery context
  workflowContext: PropTypes.any, // the workflow context
  dialogContext: PropTypes.object, // The dialog context
};

export default withAdminSmtpSettings(withDialog(withTranslation("common")(DisplayAdministrationWorkspaceActions)));
