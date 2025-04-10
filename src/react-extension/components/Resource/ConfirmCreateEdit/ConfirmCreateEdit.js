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
 * @since         4.6.1
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {Trans, withTranslation} from "react-i18next";

/**
 * The component display operation variations.
 * @type {Object}
 */
export const ConfirmEditCreateOperationVariations = {
  CREATE: 'Create',
  EDIT: 'Edit',
};

/**
 * The component display error variations.
 * @type {Object}
 */
export const ConfirmEditCreateRuleVariations = {
  IN_DICTIONARY: 'In dictionary',
  MINIMUM_ENTROPY: 'Minimum entropy'
};

/**
 * This component allows user to confirm the creation or edition of a resource when the resource
 * require the attention of the users regarding its password property.
 */
class ConfirmCreateEdit extends Component {
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
    this.handleRejectClicked = this.handleRejectClicked.bind(this);
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (!this.state.processing) {
      this.setState({processing: true});
      this.props.onConfirm();
      this.props.onClose();
    }
  }

  /**
   * Handle close button click.
   */
  async handleCloseClick() {
    await this.reject();
  }

  /**
   * Handle reject button clicked.
   */
  async handleRejectClicked() {
    await this.reject();
  }

  /**
   * Reject the operation.
   */
  async reject() {
    await this.props.onClose();
    this.props.onReject();
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
        title={{
          [ConfirmEditCreateOperationVariations.CREATE]: <Trans>Confirm resource creation</Trans>,
          [ConfirmEditCreateOperationVariations.EDIT]: <Trans>Confirm resource edition</Trans>,
        }[this.props.operation]}
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="confirm-create-edit-password-dialog">
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <p>
              {{
                [ConfirmEditCreateRuleVariations.IN_DICTIONARY]: <Trans>The password is part of an exposed data breach.</Trans>,
                [ConfirmEditCreateRuleVariations.MINIMUM_ENTROPY]: <Trans>The password is very weak and might be part of an exposed data breach.</Trans>,
              }[this.props.rule]}
            </p>
            <p>
              {{
                [ConfirmEditCreateOperationVariations.CREATE]: <Trans>
                  Are you sure you want to create the resource <strong
                    className="dialog-variable">{{resourceName: this.props.resourceName}}</strong>?
                </Trans>,
                [ConfirmEditCreateOperationVariations.EDIT]: <Trans>
                  Are you sure you want to edit the resource <strong
                    className="dialog-variable">{{resourceName: this.props.resourceName}}</strong>?
                </Trans>,
              }[this.props.operation]}
            </p>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton value={this.translate("Edit password")}
              disabled={this.hasAllInputDisabled()}
              onClick={this.handleRejectClicked}/>
            <FormSubmitButton value={this.translate("Proceed anyway")}
              disabled={this.hasAllInputDisabled()}
              processing={this.state.processing}
              attention={true}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ConfirmCreateEdit.propTypes = {
  operation: PropTypes.oneOf([
    ConfirmEditCreateOperationVariations.CREATE,
    ConfirmEditCreateOperationVariations.EDIT,
  ]), // Defines which resource operation the dialog has to be displayed for.
  rule: PropTypes.oneOf([
    ConfirmEditCreateRuleVariations.IN_DICTIONARY,
    ConfirmEditCreateRuleVariations.MINIMUM_ENTROPY,
  ]), // Defines which resource failing rule the dialog has to be displayed for.
  resourceName: PropTypes.string,
  onClose: PropTypes.func, // Whenever the user closes the dialog
  onConfirm: PropTypes.func, // Whenever the user confirms the operation
  onReject: PropTypes.func, // Whenever the user rejects the operation
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(ConfirmCreateEdit);
