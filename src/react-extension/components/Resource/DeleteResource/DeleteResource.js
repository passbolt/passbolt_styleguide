/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.14.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../contexts/AppContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withDialog} from "../../../contexts/DialogContext";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";

/**
 * This component allows user to delete a tag of the resources
 */
class DeleteResource extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.initEventHandlers();
  }

  getDefaultState() {
    return {
      processing: false,
    };
  }

  initEventHandlers() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * get the resources
   * @returns {[]|null}
   */
  get resources() {
    return this.props.context.passwordDeleteDialogProps.resources;
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (!this.state.processing) {
      await this.delete();
    }
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.props.onClose();
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The password has been deleted successfully", {count: this.resources.length}));
    this.props.onClose();
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else {
      // Unexpected error occurred.
      console.error(error);
      this.handleError(error);
      this.setState({processing: false});
    }
  }

  /**
   * Save the changes.
   */
  async delete() {
    this.setState({processing: true});
    try {
      const resourcesIds = this.resources.map(resource => resource.id);
      await this.props.context.port.request("passbolt.resources.delete-all", resourcesIds);
      await this.handleSaveSuccess();
    } catch (error) {
      this.handleSaveError(error);
    }
  }

  /**
   * handle error and display error dialog
   * @param error
   */
  handleError(error) {
    const errorDialogProps = {
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * has multiple resources
   * @returns {boolean}
   */
  hasMultipleResources() {
    return this.resources.length > 1;
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
        title={this.translate("Delete password?", {count: this.resources.length})}
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="delete-password-dialog">
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            {!this.hasMultipleResources() &&
            <>
              <p>
                <Trans>
                  Are you sure you want to delete the password <strong>{{resourceName: this.resources[0].name}}</strong>?
                </Trans>
              </p>
              <p><Trans>Once the password is deleted, it’ll be removed permanently and will not be recoverable.</Trans></p>
            </>
            }
            {this.hasMultipleResources() &&
            <p>
              <Trans>Please confirm you really want to delete the passwords. After clicking ok, the passwords will be deleted permanently.</Trans>
            </p>
            }
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleCloseClick}/>
            <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Delete")} warning={true}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

DeleteResource.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func, // Whenever the dialog is closed
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withResourceWorkspace(withActionFeedback(withDialog(withTranslation('common')(DeleteResource)))));
