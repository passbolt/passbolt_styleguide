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
 * @since         3.0.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import debounce from "debounce-promise";
import {Trans, withTranslation} from "react-i18next";
import SecurityComplexity from "../../../../shared/lib/Secret/SecretComplexity";
import Password from "../../../../shared/components/Password/Password";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import PasswordComplexity from "../../../../shared/components/PasswordComplexity/PasswordComplexity";
import ExternalServiceUnavailableError from "../../../../shared/lib/Error/ExternalServiceUnavailableError";
import Tooltip from "../../Common/Tooltip/Tooltip";
import ExternalServiceError from "../../../../shared/lib/Error/ExternalServiceError";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import PownedService from '../../../../shared/services/api/secrets/pownedService';
/**
 * The component display variations.
 * @type {Object}
 */
export const CreateGpgKeyVariation = {
  SETUP: 'Setup',
  GENERATE_ACCOUNT_RECOVERY_GPG_KEY: 'Account recovery request key'
};

/**
 * The component allows the user to create a Gpg key by automatic generation or by manually importing one
 */

class CreateGpgKey extends Component {
  /**
   * Default constructor
   * @param props
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
    return !this.state.actions.processing;
  }

  /**
   * Returns true if the passphrase is valid
   */
  get isValid() {
    const validation = {
      enoughLength: this.state.hintClassNames.enoughLength === "success",
      enoughEntropy: this.state.passphraseEntropy && this.state.passphraseEntropy !== 0,
      notInDictionary: this.state.hintClassNames.notInDictionary !== "error"
    };
    return Object.values(validation).every(value => value);
  }

  /**
   * Returns true if the component must be in a disabled mode
   */
  get mustBeDisabled() {
    return !this.isValid;
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
   * @param {Event} event The input event
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
   * @param {string} passphrase The passphrase to evaluate
   * @return {object}
   */
  evaluatePassphraseHintClassNames(passphrase) {
    const masks = SecurityComplexity.matchMasks(passphrase);
    const hintClassName = condition => condition ? "success" : "warning";
    return {
      enoughLength:  passphrase.length >= 8 ? "success" : "error",
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
        const result = await this.pownedService.evaluateSecret(passphrase);
        isPwnedServiceAvailable = result.isPwnedServiceAvailable;
        notInDictionaryHint =  isPwnedServiceAvailable ? (result.inDictionary ? "error" : "success") : "unavailable";
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
   */
  async generateGpgKey() {
    await this.toggleProcessing();
    const isPwned = await this.isCurrentPassphrasePwned();
    if (isPwned) {
      await this.toggleProcessing();
      return;
    }
    this.props.onComplete(this.state.passphrase);
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
   * Render the component
   */
  render() {
    const passphraseEntropy = this.state.hintClassNames.notInDictionary ===  "error" ? 0 : this.state.passphraseEntropy;
    const processingClassName = this.isProcessing ? 'processing' : '';
    const disabledClassName = this.mustBeDisabled ? 'disabled' : '';
    return (
      <div className="create-gpg-key">
        <h1>
          {this.props.displayAs === CreateGpgKeyVariation.SETUP &&
          <Trans>Welcome to Passbolt, please select a passphrase!</Trans>
          }
          {this.props.displayAs === CreateGpgKeyVariation.GENERATE_ACCOUNT_RECOVERY_GPG_KEY &&
          <Trans>Choose a new passphrase.</Trans>
          }
        </h1>
        <form acceptCharset="utf-8" onSubmit={this.handleSubmit} className="enter-passphrase">
          <p>
            <Trans>This passphrase is the only passphrase you will need to remember from now on, choose wisely!</Trans>
          </p>
          <div className="input-password-wrapper input required">
            <Password
              id="passphrase-input"
              autoComplete="off"
              inputRef={this.passphraseInput}
              value={this.state.passphrase}
              preview={true}
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

          <div className="form-actions">
            <button
              type="submit"
              className={`button primary big full-width ${disabledClassName} ${processingClassName}`}
              disabled={this.mustBeDisabled || this.isProcessing}>
              <Trans>Next</Trans>
            </button>
            {this.props.onSecondaryActionClick &&
            <button className="link" type="button" onClick={this.props.onSecondaryActionClick}>
              {{
                [CreateGpgKeyVariation.SETUP]: <Trans>Or use an existing private key.</Trans>,
              }[this.props.displayAs]}
            </button>
            }
          </div>
        </form>
      </div>
    );
  }
}

CreateGpgKey.defaultProps = {
  displayAs: CreateGpgKeyVariation.SETUP,
};

CreateGpgKey.propTypes = {
  context: PropTypes.any, // The application context
  onComplete: PropTypes.func.isRequired, // The callback function to call when the form is submitted
  displayAs: PropTypes.PropTypes.oneOf([
    CreateGpgKeyVariation.SETUP,
    CreateGpgKeyVariation.GENERATE_ACCOUNT_RECOVERY_GPG_KEY
  ]), // Defines how the form should be displayed and behaves
  onSecondaryActionClick: PropTypes.func, // Callback to trigger when the user clicks on the secondary action link.
};

export default withAppContext(withTranslation("common")(CreateGpgKey));
