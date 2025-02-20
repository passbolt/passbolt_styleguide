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
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../../../shared/components/Icons/Icon";
import {withAdminEmailNotification} from "../../../../contexts/Administration/AdministrationEmailNotification/AdministrationEmailNotificationContext";
import {withActionFeedback} from "../../../../contexts/ActionFeedbackContext";



/**
 * This component is a container of multiple actions applicable on setting
 */

class DisplayAdministrationEmailNotificationActions extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Handle save settings
   */
  async handleSaveClick() {
    try {
      await this.props.adminEmailNotificationContext.save();
      this.handleSaveSuccess();
    } catch (error) {
      this.handleSaveError(error);
    } finally {
      this.props.adminEmailNotificationContext.setProcessing(false);
    }
  }

  /**
   * Is save button enable
   * @returns {boolean}
   */
  isSaveEnabled() {
    return !this.props.adminEmailNotificationContext.isProcessing() && this.props.adminEmailNotificationContext.hasSettingsChanges();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.props.t("The email notification settings were updated."));
  }
  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  async handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name !== "UserAbortsOperationError") {
      // Unexpected error occurred.
      console.error(error);
      await this.handleError(error);
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
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="col2_3 actions-wrapper">
        <div className="actions">
          <ul>
            <li>
              <button type="button" disabled={!this.isSaveEnabled()} onClick={this.handleSaveClick}>
                <Icon name="save"/>
                <span><Trans>Save settings</Trans></span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

DisplayAdministrationEmailNotificationActions.propTypes = {
  adminEmailNotificationContext: PropTypes.object, // The email notification context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAdminEmailNotification(withActionFeedback(withTranslation("common")(DisplayAdministrationEmailNotificationActions)));
