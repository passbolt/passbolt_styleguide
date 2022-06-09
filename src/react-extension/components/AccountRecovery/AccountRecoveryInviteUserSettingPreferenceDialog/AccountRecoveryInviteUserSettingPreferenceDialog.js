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
 * @since         3.6.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import {withAppContext} from "../../../contexts/AppContext";
import {withRouter} from "react-router-dom";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";

/**
 * The component display variations.
 * @type {Object}
 */
export const PolicyVariations = {
  MANDATORY: 'mandatory',
  OPT_OUT: 'opt-out'
};

class AccountRecoveryInviteUserSettingPreferenceDialog extends Component {
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  /**
   * Handle click on continue button
   * @param {Event} event A form submit event
   */
  async handleSubmit(event) {
    event.preventDefault();
    this.props.onClose();
    await this.props.history.push({pathname: "/app/settings/account-recovery/edit"});
  }

  /**
   * Handle click on cancel buttons
   */
  async handleCancel() {
    await this.props.context.port.request('passbolt.account-recovery.postpone-user-setting-invitation');
    this.props.onClose();
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <DialogWrapper
        title={`${this.translate("Account recovery enrollment")}`}
        onClose={this.handleCancel}
        className="recovery-account-policy-dialog">
        <form onSubmit={this.handleSubmit}>
          <div className="form-content">
            <p>
              {{
                [PolicyVariations.MANDATORY]: <Trans>It is mandatory to share securely a copy of your private key with your organization recovery contacts. Would you like to continue?</Trans>,
                [PolicyVariations.OPT_OUT]: <Trans>It is recommended to share securely a copy of your private key with your organization recovery contacts. Would you like to continue?</Trans>,
              }[this.props.policy]}
            </p>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton
              onClick={this.handleCancel}/>
            <FormSubmitButton
              value={this.translate("Continue")}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

AccountRecoveryInviteUserSettingPreferenceDialog.propTypes = {
  context: PropTypes.object, // The application context
  policy: PropTypes.string, // The organization policy details
  onClose: PropTypes.func, // The close callback
  t: PropTypes.func, // The translation function
  history: PropTypes.object, // The navigation history
};
export default withRouter(withAppContext(withTranslation("common")(AccountRecoveryInviteUserSettingPreferenceDialog)));
