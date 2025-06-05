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
 * @since         4.5.0
 */
import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {Trans, withTranslation} from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import {withPasswordExpiry} from "../../../contexts/PasswordExpirySettingsContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withDialog} from "../../../contexts/DialogContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import PasswordExpiryDialogViewModel, {PasswordExpiryOptionEnum} from "../../../../shared/models/passwordExpirySettings/PasswordExpiryDialogViewModel";
import CalendarSVG from "../../../../img/svg/copy.svg";

class PasswordExpiryDialog extends React.Component {
  /**
   * Constructor
   * Initialize state and bind methods
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
    const settings = this.props.passwordExpiryContext.getSettings();
    return {
      hasBeenSubmitted: false,
      processing: false,
      passwordExpiryDialogViewModel: PasswordExpiryDialogViewModel.fromEntityDto(settings),
      errors: null,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDurationInDayChange = this.handleDurationInDayChange.bind(this);
    this.handleDuration = this.handleDurationInDayChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.selectExpiryOption = this.selectExpiryOption.bind(this);
  }

  /**
   * Handle duration in day input change
   * @param {Event} event
   */
  handleDurationInDayChange(event) {
    const value = event.target.value;
    //we limit the user input to 3 characters to avoid giant numbers that user can't read and even crash the app
    if (value.toString().length > 3) {
      event.preventDefault();
      return;
    }

    const newExpiryDurationInDay = {
      passwordExpiryDurationInDay: parseInt(event.target.value, 10)
    };
    this.selectExpiryOption(PasswordExpiryOptionEnum.AUTOMATIC, newExpiryDurationInDay);
  }

  /**
   * Handle manual date input change
   * @param {Event} event
   */
  handleDateChange(event) {
    const newPasswordExpiryDate = {
      passwordExpiryDate: event.target.value
    };
    this.selectExpiryOption(PasswordExpiryOptionEnum.MANUAL, newPasswordExpiryDate);
  }

  /**
   * Change the currently selected expiration option
   * @param {string} passwordExpiryOption
   * @param {object} [newInputFieldDate]
   */
  selectExpiryOption(passwordExpiryOption, newInputFieldDate = {}) {
    const data = Object.assign({}, this.state.passwordExpiryDialogViewModel.toDto(), newInputFieldDate, {passwordExpiryOption});
    const newState = {
      passwordExpiryDialogViewModel: new PasswordExpiryDialogViewModel(data),
    };

    if (!this.state.hasBeenSubmitted) {
      this.setState(newState);
      return;
    }

    newState.errors = this.state.passwordExpiryDialogViewModel.validate();
    this.setState(newState);
  }

  /**
   * Returns true if the input must be disabled.
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * Handles error by displaying the NotifyError dialog.
   * @param {Error} error
   */
  handleError(error) {
    this.props.dialogContext.open(NotifyError, {error});
  }

  /**
   * Handles EntityValidationError for displaying on the UI.
   * @param {object} errors
   */
  displayErrors(errors) {
    return (
      <span className="error-message">
        {Object.keys(errors).map(errorKey => <>{errors[errorKey]}</>)}
      </span>);
  }

  /**
   * Returns the count of selected resources.
   * This is mainly used to adapt the translations accordingly.
   * @returns {number}
   */
  get resourceCount() {
    return this.props.resources.length;
  }

  /**
   * Handles form submission
   * @param {Event} e
   */
  async handleFormSubmit(e) {
    e.preventDefault();

    const errors = this.state.passwordExpiryDialogViewModel.validate();
    this.setState({
      hasBeenSubmitted: true,
      errors,
    });

    if (errors.hasErrors()) {
      return;
    }

    this.setState({processing: true});

    const resourceExpirationDto = this.state.passwordExpiryDialogViewModel.mapResourcesToPasswordExpiryDto(this.props.resources);
    try {
      await this.props.context.port.request('passbolt.resources.set-expiration-date', resourceExpirationDto);
      this.props.actionFeedbackContext.displaySuccess(this.props.t("The expiry date of the selected resource has been updated.", {count: this.props.resources.length}));
      this.setState({processing: false});
      this.props.onClose();
    } catch (e) {
      this.handleError(e);
      this.setState({processing: false});
    }
  }


  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    const viewModel = this.state.passwordExpiryDialogViewModel;
    const isDisabled = this.hasAllInputDisabled();
    const errors = this.state.errors;
    return (
      <DialogWrapper className='password-expiry-dialog' title={this.props.t("Set an expiry date", {count: this.resourceCount})} onClose={this.props.onClose} disabled={isDisabled}>
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className="radiolist-alt">
              <div className={`input radio ${viewModel.passwordExpiryOption === PasswordExpiryOptionEnum.AUTOMATIC ? "checked" : ""}`}>
                <input type="radio"
                  value={PasswordExpiryOptionEnum.AUTOMATIC}
                  onChange={() => this.selectExpiryOption(PasswordExpiryOptionEnum.AUTOMATIC)}
                  name="passwordExpiryOption"
                  checked={viewModel.passwordExpiryOption === PasswordExpiryOptionEnum.AUTOMATIC}
                  id="passwordExpiryOptionAutomatic"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="passwordExpiryOptionAutomatic">
                  <span className="name"><Trans>Set the date automatically:</Trans></span>
                  <span className="info">
                    <input
                      type="number"
                      value={viewModel.passwordExpiryDurationInDay}
                      id="passwordExpiryDateAutomatic"
                      name="passwordExpiryDurationInDay"
                      onChange={this.handleDurationInDayChange}
                      disabled={this.hasAllInputDisabled()}
                      min="1"
                      max="365"/>
                    <Trans>days from now.</Trans>
                  </span>
                  {errors?.hasError("passwordExpiryDurationInDay") && this.displayErrors(errors.getError("passwordExpiryDurationInDay"))}
                </label>
              </div>
              <div className={`input radio ${viewModel.passwordExpiryOption === PasswordExpiryOptionEnum.MANUAL ? "checked" : ""}`}>
                <input type="radio"
                  value={PasswordExpiryOptionEnum.MANUAL}
                  onChange={() => this.selectExpiryOption(PasswordExpiryOptionEnum.MANUAL)}
                  name="passwordExpiryOption"
                  checked={viewModel.passwordExpiryOption === PasswordExpiryOptionEnum.MANUAL}
                  id="passwordExpiryOptionManual"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="passwordExpiryOptionManual">
                  <span className="name"><Trans>Set the date manually:</Trans></span>
                  <span className="info date-wrapper">
                    <div className="button-inline">
                      <input
                        className={`fluid form-element ${viewModel.passwordExpiryDate ? "" : "empty"}`}
                        type="date"
                        value={viewModel.passwordExpiryDate}
                        id="passwordExpiryDateManual"
                        name="passwordExpiryDate"
                        onChange={this.handleDateChange}
                        disabled={this.hasAllInputDisabled()}
                      />
                      <CalendarSVG/>
                    </div>
                  </span>
                  {errors?.hasError("passwordExpiryDate") && this.displayErrors(errors.getError("passwordExpiryDate"))}
                </label>
              </div>
              <div className={`input radio ${viewModel.passwordExpiryOption === PasswordExpiryOptionEnum.NEVER ? "checked" : ""}`}>
                <input type="radio"
                  value={PasswordExpiryOptionEnum.NEVER}
                  onChange={() => this.selectExpiryOption(PasswordExpiryOptionEnum.NEVER)}
                  name="passwordExpiryOption"
                  checked={viewModel.passwordExpiryOption === PasswordExpiryOptionEnum.NEVER}
                  id="passwordExpiryOptionNever"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="passwordExpiryOptionNever">
                  <span className="name"><Trans>Not set</Trans></span>
                  <span className="info">
                    <Trans count={this.resourceCount}>This resource does not need an expiry date.</Trans>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={isDisabled} onClick={this.props.onClose}/>
            <FormSubmitButton disabled={isDisabled} processing={this.state.processing} value={this.props.t("Save")}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

PasswordExpiryDialog.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func, // The close dialog callback
  passwordExpiryContext: PropTypes.object, // the password expiry context
  dialogContext: PropTypes.object, // the dialog context
  actionFeedbackContext: PropTypes.object, // the action feedback context
  t: PropTypes.func, // The translation function
  resources: PropTypes.arrayOf(Object), // the resource to modify
};

export default withAppContext(withDialog(withPasswordExpiry(withActionFeedback(withTranslation('common')(PasswordExpiryDialog)))));
