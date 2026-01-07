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
 * @since         5.8.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import { Trans, withTranslation } from "react-i18next";
import RoleEntity from "../../../../shared/models/entity/role/roleEntity";

/**
 * This component allows user to delete a role
 */
class DeleteRole extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.initEventHandlers();
  }

  get defaultState() {
    return {
      processing: false,
    };
  }

  initEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (!this.state.processing) {
      this.delete();
      this.handleClose();
    }
  }

  /**
   * Handle close button click.
   */
  handleClose() {
    this.props.onClose();
  }

  /**
   * Save the changes.
   */
  delete() {
    this.setState({ processing: true });
    this.props.onSubmit(this.props.role);
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    return (
      <DialogWrapper
        title={this.translate("Delete role?")}
        onClose={this.handleClose}
        disabled={this.state.processing}
        className="delete-role-dialog"
      >
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <p>
              <Trans>
                Are you sure you want to delete the role{" "}
                <strong className="dialog-variable">{{ roleName: this.props.role.name }}</strong>?
              </Trans>
            </p>
            <p>
              <Trans>Once the role is deleted, it will be removed permanently and will not be recoverable.</Trans>
            </p>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleClose} />
            <FormSubmitButton
              disabled={this.hasAllInputDisabled()}
              processing={this.state.processing}
              value={this.translate("Delete")}
              warning={true}
            />
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

DeleteRole.propTypes = {
  onClose: PropTypes.func, // Whenever the dialog is closed
  onSubmit: PropTypes.func, // Whenever the dialog is submitted
  role: PropTypes.instanceOf(RoleEntity).isRequired, // The role to delete
  t: PropTypes.func, // The translation function
};

export default withTranslation("common")(DeleteRole);
