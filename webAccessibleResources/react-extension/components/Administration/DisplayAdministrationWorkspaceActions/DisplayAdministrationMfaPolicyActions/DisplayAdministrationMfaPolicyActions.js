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
 * @since         3.10.0
 */

import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../../../shared/components/Icons/Icon";
import {withAdminMfaPolicy} from "../../../../contexts/Administration/AdministrationMfaPolicy/AdministrationMfaPolicyContext";
import {withActionFeedback} from '../../../../contexts/ActionFeedbackContext';

/**
 * This component is a container of multiple actions applicable on setting
 */

class DisplayAdministrationMfaPolicyActions extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSave = this.handleSave.bind(this);
  }

  /**
   * Is save button enable
   * @returns {boolean}
   */
  isSaveEnabled() {
    return !this.props.adminMfaPolicyContext.isProcessing();
  }

  /**
   * Handle the save action.
   * In case we have more than one domain and we have changes, we should display a confirmation dialog to inform the user
   * @return {Promise<void>}
   */
  async handleSave() {
    if (this.isSaveEnabled()) {
      try {
        await this.props.adminMfaPolicyContext.save();
        this.handleSaveSuccess();
      } catch (error) {
        this.handleSaveError(error);
      } finally {
        this.props.adminMfaPolicyContext.setProcessing(false);
      }
    }
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.props.t("The MFA policy settings were updated."));
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
      await this.props.actionFeedbackContext.displayError(error.message);
    }
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
              <button type="button" disabled={!this.isSaveEnabled()} id="save-settings" onClick={this.handleSave}>
                <Icon name="save"/>
                <span><Trans>Save settings</Trans></span>
              </button>
            </li>
          </div>
        </div>
      </div>
    );
  }
}

DisplayAdministrationMfaPolicyActions.propTypes = {
  adminMfaPolicyContext: PropTypes.object, // The mfa policy context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withAdminMfaPolicy(withActionFeedback(withTranslation("common")(DisplayAdministrationMfaPolicyActions)));


