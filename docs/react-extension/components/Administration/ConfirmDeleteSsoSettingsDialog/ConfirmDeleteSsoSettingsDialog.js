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
 * @since         3.9.0
 */
import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import {withAdminSso} from "../../../contexts/AdminSsoContext";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";


class ConfirmDeleteSsoSettingsDialog extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {Object}
   */
  get defaultState() {
    return {
      processing: false
    };
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
  }

  /**
   * Handles the form submission
   * @param {Event} event
   * @returns {Promise<void>}
   */
  async handleConfirmDelete(event) {
    event.preventDefault();
    this.setState({processing: true});
    await this.props.adminSsoContext.deleteSettings();
    this.props.onClose();
    this.setState({processing: false});
  }

  /**
   * Returns true if the input must be disabled.
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const isDisabled = this.hasAllInputDisabled();
    return (
      <DialogWrapper className='delete-sso-settings-dialog' title={this.props.t("Disable Single Sign-On settings?")} onClose={this.props.onClose} disabled={isDisabled}>
        <form onSubmit={this.handleConfirmDelete} noValidate>
          <div className="form-content">
            <p><Trans>Are you sure you want to disable the current Single Sign-On settings?</Trans></p>
            <p><Trans>This action cannot be undone. All the data associated with SSO will be permanently deleted.</Trans></p>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={isDisabled} onClick={this.props.onClose}/>
            <FormSubmitButton warning={true} disabled={isDisabled} processing={this.state.processing} value={this.props.t("Disable")}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ConfirmDeleteSsoSettingsDialog.propTypes = {
  adminSsoContext: PropTypes.object, // The administration SSO settings context
  onClose: PropTypes.func, // The close dialog callback
  t: PropTypes.func, // The translation function
};

export default withAdminSso(withTranslation('common')(ConfirmDeleteSsoSettingsDialog));
