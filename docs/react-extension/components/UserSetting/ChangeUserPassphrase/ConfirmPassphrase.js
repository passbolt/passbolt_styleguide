
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
 * @since         3.1.0
 */

import React from 'react';
import PropTypes from "prop-types";
import {withUserSettings} from "../../../contexts/UserSettingsContext";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withDialog} from "../../../contexts/DialogContext";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import Password from "../../../../shared/components/Password/Password";

/**
 * This component displays the user confirm passphrase information
 */
class ConfirmPassphrase extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
    this.createInputRef();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      processing: false, // component is processing or not
      passphrase: "", // The passphrase input
      passphraseError: null, // The passphrase error input
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.passphraseInputRef = React.createRef();
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.focusOnPassphrase();
  }

  /**
   * Put the focus on the passphrase input
   */
  focusOnPassphrase() {
    this.passphraseInputRef.current.focus();
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({processing: !this.state.processing});
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
    this.setState({[name]: value});
  }

  /**
   * Whenever the user submits the passphrase
   * @param event A form submit event
   */
  async handleSubmit(event) {
    event.preventDefault();
    // Do not re-submit an already processing form
    if (!this.state.processing) {
      await this.toggleProcessing();
      await this.checkPassphrase();
    }
  }

  /**
   * Check the passphrase
   */
  async checkPassphrase() {
    this.props.userSettingsContext.onCheckProvidePassphraseRequested(this.state.passphrase)
      .catch(this.onCheckFailure.bind(this));
  }

  /**
   * Whenever the gpg key import failed
   * @param error The error
   */
  onCheckFailure(error) {
    // Whenever the passphrase is invalid.
    this.toggleProcessing();
    if (error.name === "InvalidMasterPasswordError") {
      this.setState({passphraseError: this.translate("The passphrase is invalid.")});
    } else {
      const ErrorDialogProps = {error: error};
      this.props.dialogContext.open(NotifyError, ErrorDialogProps);
    }
  }

  /**
   * Cancel action and go back to the introduction passphrase
   */
  handleCancel() {
    this.props.userSettingsContext.onGoToIntroductionPassphraseRequested();
  }

  /**
   * Is valid passphrase.
   * Passphrase has to be valid
   * @returns {boolean}
   */
  IsValidPassphrase() {
    const passphrase = this.state.passphrase;
    return passphrase.trim() !== '';
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * Returns true if the component must be in a disabled mode
   */
  mustBeDisabled() {
    return this.hasAllInputDisabled() || !this.IsValidPassphrase();
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
      <div className="grid grid-responsive-12 profile-passphrase">
        <div className="row">
          <div className="col7 main-column">
            <form className="enter-passphrase" onSubmit={this.handleSubmit}>
              <h3><Trans>Please enter your passphrase to continue</Trans></h3>
              <div className="form-content">
                <div className={`input-password-wrapper input required ${this.state.passphraseError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
                  <label htmlFor="passphrase-input"><Trans>Passphrase</Trans></label>
                  <Password
                    id="passphrase-input"
                    autoComplete="off"
                    name="passphrase" placeholder={this.translate('Passphrase')}
                    inputRef={this.passphraseInputRef}
                    value={this.state.passphrase}
                    onChange={this.handleInputChange}
                    disabled={this.hasAllInputDisabled()}
                    preview={true}
                    securityToken={this.props.context.userSettings.getSecurityToken()}
                  />
                  {this.state.passphraseError &&
                    <div className="error-message">{this.state.passphraseError}</div>
                  }
                  {!this.state.passphraseError &&
                    <div className="help-message"><Trans>You need to enter your current passphrase.</Trans></div>
                  }
                </div>
              </div>
              <div className="submit-wrapper">
                <button
                  className="button cancel"
                  type="button"
                  disabled={this.hasAllInputDisabled()}
                  onClick={this.handleCancel}>
                  <Trans>Cancel</Trans>
                </button>
                <FormSubmitButton
                  primary={true}
                  disabled={this.mustBeDisabled()}
                  processing={this.state.processing}
                  value={this.translate('Verify')}/>
              </div>
            </form>
          </div>
          <div className="col4 last">
            <div className="sidebar-help">
              <h3><Trans>What if I forgot my passphrase?</Trans></h3>
              <p><Trans>Unfortunately you need your passphrase in order to continue. If you forgot it, please contact your administrator.</Trans></p>
              <a className="button" href="https://help.passbolt.com/faq/start/passphrase-recovery" target="_blank" rel="noopener noreferrer">
                <span><Trans>Learn more</Trans></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ConfirmPassphrase.propTypes = {
  context: PropTypes.any, // The application context
  userSettingsContext: PropTypes.object, // The user settings context
  dialogContext: PropTypes.any, // The dialog context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withDialog(withUserSettings(withTranslation('common')(ConfirmPassphrase))));
