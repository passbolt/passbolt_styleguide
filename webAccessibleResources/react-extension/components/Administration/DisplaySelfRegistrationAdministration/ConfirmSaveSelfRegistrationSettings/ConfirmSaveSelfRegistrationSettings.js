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
 * @since         3.9.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import DialogWrapper from "../../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormCancelButton from "../../../Common/Inputs/FormSubmitButton/FormCancelButton";
import FormSubmitButton from "../../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import {withAppContext} from "../../../../../shared/context/AppContext/AppContext";
import {withAdminSelfRegistration} from "../../../../contexts/Administration/AdministrationSelfRegistration/AdministrationSelfRegistrationContext";
import MapObject from '../../../../lib/Map/MapObject';

class ConfirmSaveSelfRegistrationSettings extends Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Handle close button click.
   */
  handleClose() {
    this.props.onClose();
  }

  /**
   * Go to the next process
   * @param {Event} event A form submit event
   */
  async handleSubmit(event) {
    event.preventDefault();
    await this.props.onSubmit();
    this.props.onClose();
  }

  /**
   * return the allowed domains
   */
  get allowedDomains() {
    return this.props.adminSelfRegistrationContext.getAllowedDomains();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const isProcessing = this.props.adminSelfRegistrationContext.isProcessing();
    return (
      <DialogWrapper
        title={this.props.t("Save self registration settings")}
        onClose={this.handleClose}
        disabled={isProcessing}
        className="save-self-registration-settings-dialog">
        <form onSubmit={this.handleSubmit}>
          <div className="form-content">
            <>
              <label><Trans>Allowed domains</Trans></label>
              <div className="radiolist-alt">
                <div className="input radio">
                  <ul id="domains-list">
                    {this.allowedDomains &&
                         MapObject.iterators(this.allowedDomains).map(key => (
                           <li key={key}>
                             {this.allowedDomains.get(key)}
                           </li>
                         ))

                    }
                  </ul>
                </div>
              </div>
            </>
          </div>
          <div className="warning message">
            <Trans>Please review carefully this configuration.</Trans>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton
              onClick={this.handleClose}
              disabled={isProcessing}/>
            <FormSubmitButton
              value={this.props.t("Save")}
              disabled={isProcessing}
              processing={isProcessing}
              warning={true}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ConfirmSaveSelfRegistrationSettings.propTypes = {
  context: PropTypes.any, // The application context
  onSubmit: PropTypes.func, // The submit callback
  adminSelfRegistrationContext: PropTypes.object, // The self registration workspace context
  onClose: PropTypes.func, // Callback when the dialog must be closed
  t: PropTypes.func, // The translation function
};
export default withAppContext(withAdminSelfRegistration(withTranslation('common')(ConfirmSaveSelfRegistrationSettings)));

