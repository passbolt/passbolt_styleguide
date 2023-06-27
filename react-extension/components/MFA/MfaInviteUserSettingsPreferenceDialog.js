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
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";
import DialogWrapper from '../Common/Dialog/DialogWrapper/DialogWrapper';
import FormSubmitButton from "../Common/Inputs/FormSubmitButton/FormSubmitButton";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import {withNavigationContext} from "../../contexts/NavigationContext";
import {Trans} from 'react-i18next';


/**
 * The component display variations.
 * @type {Object}
 */


class MfaInviteUserSettingsPreferenceDialog extends Component {
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
    await this.props.navigationContext.onGoToUserSettingsMfaRequested();
    this.props.onClose();
  }

  /**
   * Handle click on cancel buttons
   */
  async handleCancel() {
    await this.props.context.port.request('passbolt.mfa-policy.postpone-user-setting-invitation');
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
        title={`${this.translate("Enable Multi Factor Authentication")}`}
        onClose={this.handleCancel}
        className="mfa-policy-dialog" >
        <form onSubmit={this.handleSubmit}>
          <div className="form-content">
            <p>
              Your administrator requires you to configure a Multi Factor Authentication method for your account.
            </p>
          </div>
          <div className="submit-wrapper clearfix">
            <button type="button" className="cancel link" onClick={this.handleCancel}><Trans>Later</Trans></button>
            <FormSubmitButton
              value={this.translate("Go to MFA settings")}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

MfaInviteUserSettingsPreferenceDialog.propTypes = {
  context: PropTypes.object, // The application context
  navigationContext: PropTypes.any, // The application navigation context
  onClose: PropTypes.func, // The close callback
  t: PropTypes.func, // The translation function
  history: PropTypes.object, // The navigation history
};
export default withNavigationContext(withAppContext(withTranslation("common")(MfaInviteUserSettingsPreferenceDialog)));
