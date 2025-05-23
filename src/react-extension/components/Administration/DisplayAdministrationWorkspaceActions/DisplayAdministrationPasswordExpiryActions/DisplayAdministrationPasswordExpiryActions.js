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
 * @since         4.4.0
 */

import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withDialog} from "../../../../contexts/DialogContext";
import {withActionFeedback} from '../../../../contexts/ActionFeedbackContext';
import NotifyError from "../../../Common/Error/NotifyError/NotifyError";
import {withAdminPasswordExpiry} from "../../../../contexts/Administration/AdministrationPaswordExpiryContext/AdministrationPaswordExpiryContext";

/**
 * This component is a container of multiple actions applicable on setting
 */

class DisplayAdministrationPasswordExpiryActions extends React.Component {
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
   * Is save button enabled
   * @returns {boolean}
   */
  get isActionEnabled() {
    return !this.props.adminPasswordExpiryContext.isProcessing();
  }

  /**
   * Handles the save action.
   * @return {Promise<void>}
   */
  async handleSave() {
    this.props.adminPasswordExpiryContext.setSubmitted(true);

    if (!this.isActionEnabled || !this.props.adminPasswordExpiryContext.validateData()) {
      return;
    }

    try {
      await this.props.adminPasswordExpiryContext.save();
      await this.handleSaveSuccess();
    } catch (error) {
      await this.handleSaveError(error);
    }
  }

  /**
   * Handle save operation success.
   * @returns {Promise<void>}
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.props.t("The password expiry settings were updated."));
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   * @returns {Promise<void>}
   */
  async handleSaveError(error) {
    console.error(error);
    await this.props.actionFeedbackContext.displayError(error.message);
    this.props.dialogContext.open(NotifyError, {error});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const isDisabled = !this.isActionEnabled;
    return (
      <div className="actions-wrapper">
        <button type="button" className="button primary form" disabled={isDisabled} id="save-settings" onClick={this.handleSave}>
          <span><Trans>Save</Trans></span>
        </button>
      </div>
    );
  }
}

DisplayAdministrationPasswordExpiryActions.propTypes = {
  adminPasswordExpiryContext: PropTypes.object, // The password policy context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  dialogContext: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
};

export default withActionFeedback(withAdminPasswordExpiry(withDialog(withTranslation("common")(DisplayAdministrationPasswordExpiryActions))));
