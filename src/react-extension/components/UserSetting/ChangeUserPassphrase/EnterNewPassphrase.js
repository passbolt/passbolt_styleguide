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
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import Password from "../../../../shared/components/Password/Password";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import PownedService from '../../../../shared/services/api/secrets/pownedService';
import PasswordComplexityWithGoal from '../../../../shared/components/PasswordComplexityWithGoal/PasswordComplexityWithGoal';
import {withUserPassphrasePolicies} from '../../../contexts/UserPassphrasePoliciesContext';

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
      notInDictionary: !this.state.passphraseInDictionnary,
      enoughEntropy: this.isMinimumRequiredEntropyReached(this.state.passphraseEntropy)
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
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    await this.props.userPassphrasePoliciesContext.findSettings();
    this.focusOnPassphrase();
    this.initPwnedPasswordService();
  }

  /**
   * Put the focus on the passphrase input
   */
  focusOnPassphrase() {
    this.passphraseInput.current?.focus();
  }

  /**
   * Initialize the pwned password service
   */
  initPwnedPasswordService() {
    const userPasphrasePolicies = this.props.userPassphrasePoliciesContext.getSettings();
    if (userPasphrasePolicies.external_dictionary_check) {
      this.pownedService = new PownedService(this.props.context.port);
    }
  }

  /**
   * Whenever the passphrase change
   * @param event The input event
   */
  handlePassphraseChange(event) {
    const newState = {
      passphrase: event.target.value,
      passphraseEntropy: null,
      passphraseInDictionnary: false,
    };

    if (!newState.passphrase.length) {
      newState.passphraseInDictionnary = false;
      this.setState(newState);
      return;
    }

    newState.passphraseEntropy = SecretGenerator.entropy(newState.passphrase);
    this.setState(newState);
  }

  /**
   * Whenever the user submits the passphrase
   * @param event A form submit event
   */
  async handleSubmit(event) {
    event.preventDefault();
    this.toggleProcessing();
    // is current form valid
    if (!this.isValid) {
      this.toggleProcessing();
      return;
    }

    //the form is valid, check if passphrase is pwned
    const isPassphrasePwned = await this.evaluatePassphraseIsInDictionary(this.state.passphrase);
    if (isPassphrasePwned) {
      this.toggleProcessing();
      return;
    }
    await this.generateGpgKey();
    this.toggleProcessing();
  }

  /**
   * Evaluate if the passphrase is in dictionary
   * @param {string} passphrase the passphrase to evaluate
   * @return {Promise<void>}
   */
  async evaluatePassphraseIsInDictionary(passphrase) {
    if (!this.pownedService) {
      return false;
    }

    const result = await this.pownedService.evaluateSecret(passphrase);
    const passphraseInDictionnary = result.inDictionary;

    this.setState({passphraseInDictionnary});
    return passphraseInDictionnary;
  }

  /**
   * Generate the Gpg key
   * @return {Promise<void>}
   */
  async generateGpgKey() {
    try {
      await this.props.userSettingsContext.onUpdatePassphraseRequested(this.state.passphrase);
    } catch (e) {
      this.onGpgKeyGeneratedFailure(e);
    }
  }

  /**
   * Whenever the gpg key generation failed
   * @param error The error
   */
  onGpgKeyGeneratedFailure(error) {
    this.toggleProcessing();
    this.props.dialogContext.open(NotifyError, {error});
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
  toggleProcessing() {
    const actions = {
      ...this.state.actions,
      processing: !this.state.actions.processing
    };
    this.setState({actions});
  }

  /**
   * Toggle the obfuscate mode of the passphrase view
   */
  toggleObfuscate() {
    this.setState({isObfuscated: !this.state.isObfuscated});
  }

  /**
   * Returns true if the given entropy is greater or equal to the minimum required entropy.
   * @param {number} passphraseEntropy
   * @returns {boolean}
   */
  isMinimumRequiredEntropyReached(passphraseEntropy) {
    return passphraseEntropy && passphraseEntropy >= this.props.userPassphrasePoliciesContext.getSettings().entropy_minimum;
  }

  render() {
    const userPassphrasePolicies = this.props.userPassphrasePoliciesContext.getSettings();
    if (!userPassphrasePolicies) {
      return null;
    }

    const passphraseEntropy = this.state.passphraseInDictionnary ? 0 : this.state.passphraseEntropy;
    return (
      <form className="profile-passphrase" onSubmit={this.handleSubmit}>
        <div className="main-column">
          <div className="main-content">
            <h3><Trans>Please enter a new passphrase</Trans></h3>
            <div className="enter-passphrase">
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
                <PasswordComplexityWithGoal entropy={passphraseEntropy} targetEntropy={userPassphrasePolicies.entropy_minimum}/>
                {this.state.passphraseInDictionnary &&
                  <div className="invalid-passphrase error-message"><Trans>The passphrase is part of an exposed data breach.</Trans></div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="actions-wrapper">
          <button className="button cancel secondary" type="button" disabled={!this.areActionsAllowed} onClick={this.handleCancel}>
            <Trans>Cancel</Trans>
          </button>
          <FormSubmitButton primary={true} disabled={this.mustBeDisabled} processing={this.isProcessing} value={this.props.t('Update')}/>
        </div>
      </form>
    );
  }
}

EnterNewPassphrase.propTypes = {
  context: PropTypes.any, // The application context
  userSettingsContext: PropTypes.object, // The user settings context
  userPassphrasePoliciesContext: PropTypes.object.isRequired, // the user passphrase policies context
  dialogContext: PropTypes.any, // The dialog context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withDialog(withUserSettings(withUserPassphrasePolicies(withTranslation('common')(EnterNewPassphrase)))));
