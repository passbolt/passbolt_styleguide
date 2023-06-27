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
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import Password from "../../../../shared/components/Password/Password";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import PasswordComplexity from "../../../../shared/components/PasswordComplexity/PasswordComplexity";
import ExternalServiceUnavailableError from "../../../../shared/lib/Error/ExternalServiceUnavailableError";
import Tooltip from "../../Common/Tooltip/Tooltip";
import ExternalServiceError from "../../../../shared/lib/Error/ExternalServiceError";
import PownedService from '../../../../shared/services/api/secrets/pownedService';

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
    this.isPwndProcessingPromise = null;
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
      passphraseEntropy: null,  // The current passphrase entropy
      actions: {
        processing: false, // True if one's processing passphrase
      },
      hintClassNames: { // The class names for passphrase hints
        enoughLength: '',
        uppercase: '',
        alphanumeric: '',
        specialCharacters: '',
        notInDictionary: ''
      },
      isPwnedServiceAvailable: true // True if the isPwned service can be reached
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
      enoughEntropy: this.state.passphraseEntropy && this.state.passphraseEntropy !== 0,
      notInDictionary: this.state.hintClassNames.notInDictionary !== "error"
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
    this.pownedService = new PownedService(this.props.context.port);
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
    let hintClassNames = {};
    let passphraseEntropy = null;
    if (passphrase.length) {
      passphraseEntropy = SecretGenerator.entropy(passphrase);
      hintClassNames = this.evaluatePassphraseHintClassNames(passphrase);
      this.isPwndProcessingPromise = this.evaluatePassphraseIsInDictionaryDebounce();
    } else {
      this.setState({
        hintClassNames: {
          ...this.state.hintClassNames,
          notInDictionary: "unavailable"
        }
      });
    }

    this.setState({passphrase, passphraseEntropy, hintClassNames});
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
    const hintClassName = condition => condition ? 'success' : 'warning';
    return {
      enoughLength: passphrase.length >= 8 ? 'success' : 'error',
      uppercase: hintClassName(masks.uppercase),
      alphanumeric: hintClassName(masks.alpha && masks.digit),
      specialCharacters: hintClassName(masks.special),
      notInDictionary: this.state.hintClassNames.notInDictionary
    };
  }

  /**
   * Evaluate if the passphrase is in dictionary
   * @return {Promise<void>}
   */
  async evaluatePassphraseIsInDictionary() {
    let isPwnedServiceAvailable = this.state.isPwnedServiceAvailable;
    if (!isPwnedServiceAvailable) {
      return;
    }

    const passphrase = this.state.passphrase;
    let notInDictionaryHint = "success";

    if (passphrase.length < 8) {
      notInDictionaryHint = passphrase.length > 0 ? "error" : "unavailable";
    } else {
      try {
        const result =  await this.pownedService.evaluateSecret(this.state.passphrase);
        const isPwned = result.inDictionary;
        isPwnedServiceAvailable = result.isPwnedServiceAvailable;
        notInDictionaryHint =  isPwnedServiceAvailable ? (isPwned ? "error" : "success") : "unavailable";
      } catch (error) {
        // If the service is unavailable don't block the user journey.
        if (error instanceof ExternalServiceUnavailableError || error instanceof ExternalServiceError) {
          isPwnedServiceAvailable = false;
          notInDictionaryHint = "unavailable";
        } else {
          throw error;
        }
      }
    }

    this.setState({
      isPwnedServiceAvailable,
      hintClassNames: {
        ...this.state.hintClassNames,
        notInDictionary: notInDictionaryHint
      }
    });
  }

  /**
   * Await for isPwned service to finish its process and returns true if the current displayed passphrase is pwned.
   * @return {Promise<boolean>}
   */
  async isCurrentPassphrasePwned() {
    await this.isPwndProcessingPromise;
    return this.state.hintClassNames.notInDictionary === "error";
  }

  /**
   * Generate the Gpg key
   * @return {Promise<void>}
   */
  async generateGpgKey() {
    await this.toggleProcessing();
    const isPwned = await this.isCurrentPassphrasePwned();
    if (isPwned) {
      await this.toggleProcessing();
      return;
    }

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
    const actions = {
      ...this.state.actions,
      processing: !this.state.actions.processing
    };
    await this.setState({actions});
  }

  /**
   * Toggle the obfuscate mode of the passphrase view
   */
  toggleObfuscate() {
    this.setState({isObfuscated: !this.state.isObfuscated});
  }

  render() {
    const passphraseEntropy = this.state.hintClassNames.notInDictionary === "error" ? 0 : this.state.passphraseEntropy;
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
                  <PasswordComplexity entropy={passphraseEntropy}/>
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
                      {this.state.isPwnedServiceAvailable &&
                      <Trans>It is not part of an exposed data breach</Trans>
                      }
                      {!this.state.isPwnedServiceAvailable &&
                      <Tooltip message={<Trans>The pwnedpasswords service is unavailable, your passphrase might be part of an exposed data breach</Trans>}
                        direction="bottom">
                        <Trans>It is not part of an exposed data breach</Trans>
                      </Tooltip>
                      }
                    </li>
                  </ul>
                </div>
              </div>
              <div className="submit-wrapper">
                <button className="button cancel" type="button" disabled={!this.areActionsAllowed} onClick={this.handleCancel}>
                  <Trans>Cancel</Trans>
                </button>
                <FormSubmitButton primary={true} disabled={this.mustBeDisabled} processing={this.isProcessing} value={this.props.t('Update')}/>
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
