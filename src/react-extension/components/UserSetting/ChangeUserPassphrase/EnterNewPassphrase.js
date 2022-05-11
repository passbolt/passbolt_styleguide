
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
import debounce from "debounce-promise";
import SecurityComplexity from "../../../../shared/lib/Secret/SecretComplexity";
import SecretComplexity from "../../../../shared/lib/Secret/SecretComplexity";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../contexts/AppContext";
import Password from "../../../../shared/components/Password/Password";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import PasswordComplexity from "../../../../shared/components/PasswordComplexity/PasswordComplexity";

/**
 * This component displays the user choose passphrase information
 */
class EnterNewPassphrase extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.evaluatePassphraseIsInDictionaryDebounce = debounce(this.evaluatePassphraseIsInDictionary, 300);
    this.bindEventHandlers();
    this.createReferences();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      passphrase: '', // The current passphrase
      passphraseEntropy: 0,  // The current passphrase entropy
      actions: {
        processing: false // True if one's processing passphrase
      },
      hintClassNames: { // The class names for passphrase hints
        enoughLength: '',
        uppercase: '',
        alphanumeric: '',
        specialCharacters: '',
        notInDictionary: ''
      }
    };
  }

  /**
   * Returns true if the user can perform actions on the component
   */
  get areActionsAllowed() {
    return !this.isProcessing;
  }

  /**
   * Returns true if the passphrase is valid
   */
  get isValid() {
    const validation = {
      enoughLength:  this.state.passphrase.length >= 8,
      enoughStrength: this.state.passphraseStrength.id !== 'n/a'
    };
    return Object.values(validation).every(value => value);
  }

  /**
   * Returns true if the component must be in a disabled mode
   */
  get mustBeDisabled() {
    return !this.isValid || this.isProcessing;
  }

  /**
   * Returns true if the component must be in a processing mode
   */
  get isProcessing() {
    return this.state.actions.processing;
  }

  /**
   * Bind the event handlers
   */
  bindEventHandlers() {
    this.handlePassphraseChange = this.handlePassphraseChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Create component element references
   */
  createReferences() {
    this.passphraseInput = React.createRef();
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
    this.passphraseInput.current.focus();
  }

  /**
   * Whenever the passphrase change
   * @param event The input event
   */
  async handlePassphraseChange(event) {
    const passphrase = event.target.value;
    this.setState({passphrase});
    const passphraseEntropy = SecretGenerator.entropy(passphrase);
    const hintClassNames = await this.evaluatePassphraseHintClassNames(passphrase);
    this.setState({passphraseEntropy, hintClassNames});
    await this.checkPassphraseIsInDictionary(passphrase, hintClassNames);
  }

  /**
   * check if the passphrase is in dictionary
   * @param passphrase
   * @param hintClassNames
   * @returns {Promise<void>}
   */
  async checkPassphraseIsInDictionary(passphrase, hintClassNames) {
    const hintClassName = condition => condition ? 'success' : 'error';
    // debounce only to check the passphrase is in dictionary
    const isPwned = await this.evaluatePassphraseIsInDictionaryDebounce(passphrase).catch(() => null);
    hintClassNames.notInDictionary = isPwned !== null ? hintClassName(!isPwned) : null;
    // if the passphrase is in dictionary, force the complexity to n/a
    const passphraseStrength = {...this.state.passphraseStrength};
    passphraseStrength.id = isPwned ? 'n/a' : this.state.passphraseStrength.id;
    this.setState({hintClassNames, passphraseStrength});
  }

  /**
   * Whenever the user submits the passphrase
   * @param event A form submit event
   */
  handleSubmit(event) {
    event.preventDefault();
    this.generateGpgKey();
  }

  /**
   * Evaluate the passphrase hints classnames
   * @param passphrase The passphrase to evaluate
   */
  evaluatePassphraseHintClassNames(passphrase) {
    const masks = SecurityComplexity.matchMasks(passphrase);
    const hintClassName = condition => condition ? 'success' : 'error';
    return {
      enoughLength:  hintClassName(passphrase.length >= 8),
      uppercase: hintClassName(masks.uppercase),
      alphanumeric: hintClassName(masks.alpha && masks.digit),
      specialCharacters: hintClassName(masks.special),
      notInDictionary:  'error'
    };
  }

  /**
   * Evaluate if the passphrase is in dictionary
   * @param passphrase The passphrase to evaluate
   * @return {Promise<boolean>} Return true if the password is part of a dictionary, false otherwise
   */
  async evaluatePassphraseIsInDictionary(passphrase) {
    if (passphrase.length >= 8) {
      return SecretComplexity.ispwned(passphrase);
    }
    return true;
  }

  /**
   * Generate the Gpg key
   */
  async generateGpgKey() {
    await this.toggleProcessing();
    this.props.userSettingsContext.onUpdatePassphraseRequested(this.state.passphrase)
      .catch(this.onGpgKeyGeneratedFailure.bind(this));
  }

  /**
   * Whenever the gpg key generation failed
   * @param error The error
   */
  async onGpgKeyGeneratedFailure(error) {
    await this.toggleProcessing();
    const ErrorDialogProps = {error: error};
    this.props.dialogContext.open(NotifyError, ErrorDialogProps);
  }

  /**
   * Cancel action and go back to the introduction passphrase
   */
  handleCancel() {
    this.props.userSettingsContext.onGoToIntroductionPassphraseRequested();
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({actions: {processing: !this.state.actions.processing}});
  }

  /**
   * Toggle the obfuscate mode of the passphrase view
   */
  toggleObfuscate() {
    this.setState({isObfuscated: !this.state.isObfuscated});
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
              <h3><Trans>Please enter a new passphrase</Trans></h3>
              <div className="form-content">
                <div className="input-password-wrapper input required">
                  <Password
                    id="passphrase-input"
                    autoComplete="off"
                    inputRef={this.passphraseInput}
                    value={this.state.passphrase}
                    preview={true}
                    securityToken={this.props.context.userSettings.getSecurityToken()}
                    onChange={this.handlePassphraseChange}
                    disabled={!this.areActionsAllowed}/>
                  <PasswordComplexity entropy={this.state.passphraseEntropy}/>
                </div>
                <div className="password-hints">
                  <ul>
                    <li className={this.state.hintClassNames.enoughLength}>
                      <Trans>It is at least 8 characters in length</Trans>
                    </li>
                    <li className={this.state.hintClassNames.uppercase}>
                      <Trans>It contains lower and uppercase characters</Trans>
                    </li>
                    <li className={this.state.hintClassNames.alphanumeric}>
                      <Trans>It contains letters and numbers</Trans>
                    </li>
                    <li className={this.state.hintClassNames.specialCharacters}>
                      <Trans>It contains special characters (like / or * or %)</Trans>
                    </li>
                    <li className={this.state.hintClassNames.notInDictionary}>
                      <Trans>It is not part of a dictionary</Trans>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="submit-wrapper">
                <button className="button cancel" type="button" disabled={!this.areActionsAllowed} onClick={this.handleCancel}>
                  <Trans>Cancel</Trans>
                </button>
                <FormSubmitButton primary={true} disabled={this.mustBeDisabled} processing={this.isProcessing} value={this.translate('Update')}/>
              </div>
            </form>
          </div>
          <div className="col4 last">
            <div className="sidebar-help">
              <h3><Trans>Tips for choosing a good passphrase</Trans></h3>
              <p><Trans>Make sure your passphrase is hard to guess but also that is long enough. For example you can use your favorite lyric from a song,
                grab the first couple of characters from the words in your favorite line.</Trans></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EnterNewPassphrase.propTypes = {
  context: PropTypes.any, // The application context
  userSettingsContext: PropTypes.object, // The user settings context
  dialogContext: PropTypes.any, // The dialog context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withDialog(withUserSettings(withTranslation('common')(EnterNewPassphrase))));
