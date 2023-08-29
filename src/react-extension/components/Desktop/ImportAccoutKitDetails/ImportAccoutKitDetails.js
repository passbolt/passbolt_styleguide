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
 * @since         4.3.0
 */

import React from "react";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {withImportAccountKitContext} from "../../../contexts/Desktop/ImportAccountKitContext";
import Password from "../../../../shared/components/Password/Password";
import PasswordComplexity from "../../../../shared/components/PasswordComplexity/PasswordComplexity";
import PownedService from "../../../../shared/services/api/secrets/pownedService";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import Icon from "../../../../shared/components/Icons/Icon";
import debounce from "debounce-promise";
import UserAvatar from "../../Common/Avatar/UserAvatar";

class ImportAccoutKitDetails extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindEventHandlers();
    this.createReferences();
    this.isPwndProcessingPromise = null;
    this.evaluatePassphraseIsInDictionaryDebounce = debounce(this.evaluatePassphraseIsInDictionary, 300);
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.pownedService = new PownedService(this.props.context.port);
  }

  /**
   * Returns the default state
   */
  get defaultState() {
    return {
      passphrase: '', // The passphrase
      hasBeenValidated: false, // true if the form has already validated once
      errors: {
        emptyPassphrase: false, // True if the passphrase is empty
        invalidPassphrase: false, // True if the passphrase is invalid
      },
      passphraseInDictionnary: false, // True if the passphrase is part of a data breach
      isPwnedServiceAvailable: true, // True if the isPwned service can be reached
      passwordEntropy: null
    };
  }

  /**
   * Creates the references
   */
  createReferences() {
    this.passphraseInputRef = React.createRef();
  }

  /**
   * Return true if there are errors
   */
  get hasErrors() {
    return this.state.errors.emptyPassphrase || this.state.errors.invalidPassphrase;
  }

  /**
   * Returns true if the passphrase is valid
   */
  get isValid() {
    return Object.values(this.state.errors).every(value => !value);
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.handleChangePassphrase = this.handleChangePassphrase.bind(this);
  }

  /**
   * Handle confirmation button click.
   * @returns {void}
   */
  async handleConfirmation() {
    try {
      await this.props.importAccountKitContext.validatePassphrase(this.state.passphrase);
    } catch (error) {
      this.onCheckPassphraseFailure(error);
    }
  }

  /**
   * Returns the user full name
   */
  get fullname() {
    return `${this.props.importAccountKitContext.accountKit.first_name} ${this.props.importAccountKitContext.accountKit.last_name}`;
  }

  /**
   * Whenever the user changes the private key
   * @param event An input event
   */
  handleChangePassphrase(event) {
    const passphrase = event.target.value;
    let passphraseEntropy = null;

    if (passphrase.length) {
      passphraseEntropy = SecretGenerator.entropy(passphrase);
      this.isPwndProcessingPromise = this.evaluatePassphraseIsInDictionaryDebounce();
    } else {
      this.setState({
        passphraseInDictionnary: false,
        passwordEntropy: null,
      });
    }

    this.setState({passphrase, passphraseEntropy});
    if (this.state.hasBeenValidated) {
      this.validate();
    }
  }

  /**
   * Get the security token
   * @returns {{backgroundColor, code, textColor}}
   */
  get securityToken() {
    return {
      code: this.props.importAccountKitContext.accountKit.security_token.code,
      backgroundColor: this.props.importAccountKitContext.accountKit.security_token.color,
      textColor: this.props.importAccountKitContext.accountKit.textcolor
    };
  }

  /**
   * Returns true if the user can perform actions on the component
   */
  get areActionsAllowed() {
    return !this.props.importAccountKitContext.isProcessing();
  }
  /**
   * Validate the security token data
   */
  validate() {
    const {passphrase} = this.state;
    const errors = {
      emptyPassphrase: passphrase.trim() === '',
      invalidPassphrase: false,
    };
    this.setState({hasBeenValidated: true, errors});
  }

  /**
   * Whenever the passphrase check failed
   * @param {Error} error The error
   * @throw {Error} If an unexpected errors hits the component. Errors not of type: InvalidMasterPasswordError, GpgKeyError.
   */
  onCheckPassphraseFailure(error) {
    // It can happen when the user has entered the wrong passphrase.
    if (error.name === "InvalidMasterPasswordError") {
      this.setState({errors: {invalidPassphrase: true}});
    } else if (error.name === 'GpgKeyError') {
      this.setState({errors: {invalidGpgKey: true}});
    } else {
      // Only controlled errors should hit the component.
      throw error;
    }
  }

  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    const passphraseEntropy = this.state.passphraseInDictionnary ? 0 : this.state.passphraseEntropy;

    return (
      <div className="import-account-kit-details">
        <div className="user">
          <UserAvatar user={this.props.importAccountKitContext.accountKit} baseUrl={this.props.importAccountKitContext.accountKit.domain} className="big avatar user-avatar" />
          <p className="user-name">{this.fullname}</p>
          <p className="user-email">{this.props.importAccountKitContext.accountKit.username}</p>
          <p className="user-domain">{this.props.importAccountKitContext.accountKit.domain}</p>
        </div>
        <div className="input-password-wrapper input required">
          <label htmlFor="passphrase"><Trans>Passphrase</Trans>
            {!this.state.hasBeenValidated && (!this.state.isPwnedServiceAvailable || this.state.passphraseInDictionnary) &&
              <Icon name="exclamation" />
            }</label>          <Password
            id="passphrase-input"
            autoComplete="off"
            value={this.state.passphrase}
            preview={true}
            securityToken={this.securityToken}
            onChange={this.handleChangePassphrase}
            disabled={!this.areActionsAllowed} />
          <PasswordComplexity entropy={passphraseEntropy} />
        </div>
        <div className="form-actions">
          <button
            type="button"
            onClick={this.handleConfirmation}
            className="button primary big full-width">
            <Trans>Next</Trans>
          </button>
        </div>
      </div>
    );
  }
}

ImportAccoutKitDetails.propTypes = {
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
  importAccountKitContext: PropTypes.any.isRequired, // The import account kit context
};

export default withAppContext(withImportAccountKitContext(withTranslation('common')(ImportAccoutKitDetails)));
