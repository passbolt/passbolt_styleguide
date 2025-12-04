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
import React, {Component} from "react";
import PropTypes from "prop-types";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {Trans, withTranslation} from "react-i18next";
import AttentionSVG from "../../../../img/svg/attention.svg";
import RoleEntity from "../../../../shared/models/entity/role/roleEntity";
import memoize from "memoize-one";

class EditRole extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.roleEntity = new RoleEntity(props.role);
    this.state = this.defaultState;
    this.createInputRefs();
    this.bindEventHandlers();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      // Dialog states
      processing: false,
      role: this.roleEntity.toDto(), // The role to edit
      hasAlreadyBeenValidated: false, // True if the form has already been submitted once.
    };
  }

  /**
   * Create references
   * @returns {void}
   */
  createInputRefs() {
    this.nameRef = React.createRef();
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  /**
   * Validate form.
   * @param {object} roleDto The form role entity dto store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   * @return {EntityValidationError}
   */
  validateForm = memoize(roleDto => this.roleEntity.validate(roleDto));

  /**
   * Verify the data health. This intends for user, to inform if data form has invalid fields
   * @param {object} _roleDto The form role entity dto store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   * @return {EntityValidationError}
   */
  // eslint-disable-next-line no-unused-vars
  verifyDataHealth = memoize(_roleDto => this.roleEntity.verifyHealth());

  /**
   * Handle close button click.
   * @returns {void}
   */
  handleClose() {
    this.props.onClose();
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.roleEntity.set(name, value, {validate: false});

    const newState = {role: this.roleEntity.toDto()};
    this.setState(newState);
  }

  /**
   * Handle form submission that can be trigger when hitting `enter`
   * @param {Event} event The html event triggering the form submit.
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.processing) {
      return;
    }

    this.setState({hasAlreadyBeenValidated: true});
    await this.toggleProcessing();

    // Validate the entity
    const validationError = this.roleEntity.validate();

    if (validationError?.hasErrors() || this.roleEntity.isAReservedRole()) {
      this.focusFirstFieldError();
      await this.toggleProcessing();
      return;
    }

    await this.props.onSubmit(this.roleEntity);
    this.handleClose();
  }

  /**
   * Toggle processing state
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.processing;
    return new Promise(resolve => {
      this.setState({processing: !prev}, resolve());
    });
  }

  /**
   * Focus the first field of the form which is in error state.
   * @returns {void}
   */
  focusFirstFieldError() {
    this.nameRef.current.focus();
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * Get translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const warnings = this.verifyDataHealth(this.state.role);
    const errors = this.state.hasAlreadyBeenValidated ? this.validateForm(this.state.role) : null;
    const hasNameReservedError = this.state.hasAlreadyBeenValidated && this.roleEntity.isAReservedRole();

    return (
      <DialogWrapper className='role-edit-dialog' title={this.translate("Rename role")}
        onClose={this.handleClose} disabled={this.hasAllInputDisabled()}>
        <form className="role-edit-form" onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className={`input text required ${errors?.hasError("name") || hasNameReservedError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="role-name-input"><Trans>Role name</Trans>{warnings?.hasErrors() &&
                <AttentionSVG className="attention-required"/>
              }</label>
              <input id="role-name-input" name="name"
                ref={this.nameRef}
                type="text" value={this.state.role.name}
                maxLength="255"
                disabled={this.hasAllInputDisabled()}
                onChange={this.handleInputChange}
                autoComplete='off' autoFocus={true}
              />
              {errors?.hasErrors() &&
                <div className="error-message">
                  {errors?.hasError("name", "maxLength") &&
                    <Trans>A name can not be more than 255 char in length.</Trans>
                  }
                  {errors?.hasError("name", "minLength") &&
                    <Trans>A name is required.</Trans>
                  }
                </div>
              }
              {hasNameReservedError &&
                <div className="error-message"><Trans>This name is reserved by the system.</Trans></div>
              }
              {warnings?.hasError("name", "maxLength") && (
                <div className="name warning-message">
                  <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated.</Trans>
                </div>
              )}
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.handleClose}/>
            <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Save")}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

EditRole.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  role: PropTypes.instanceOf(RoleEntity).isRequired,
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(EditRole);
