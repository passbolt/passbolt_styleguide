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
 * @since         3.0.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../contexts/AppContext";

/**
 * The component display variations.
 * @type {Object}
 */
export const ImportGpgKeyVariations = {
  SETUP: 'Setup',
  RECOVER: 'Recover'
};

/**
 * This component allows the user to import his Gpg key
 */
class ImportGpgKey extends Component {
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
   * Returns the default state
   */
  get defaultState() {
    return {
      selectedFile: null, // the file to import
      privateKey: '', // The gpg private key
      actions: {
        processing: false // True if one's processing passphrase
      },
      hasBeenValidated: false, // true if the form has already validated once
      errors: {
        emptyPrivateKey: false, // True if the private key is empty
        invalidPrivateKey: false, // True if the private key is invalid
      },
      errorMessage: '', // The error message if isRequired
      keyHasAnExpirationDate: false, // True if the key being imported has an expiration date
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
    return Object.values(this.state.errors).every(value => !value);
  }

  /**
   * Returns true if the component must be in a processing mode
   */
  get isProcessing() {
    return this.state.actions.processing;
  }

  /**
   * Return true if there are errors
   */
  get hasErrors() {
    return this.state.errors.emptyPrivateKey || this.state.errors.invalidPrivateKey;
  }

  /**
   * Handle component event handlers
   */
  bindEventHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePrivateKey = this.handleChangePrivateKey.bind(this);
    this.handleSelectPrivateKeyFile = this.handleSelectPrivateKeyFile.bind(this);
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.checkExpiryDate = this.checkExpiryDate.bind(this);
  }

  /**
   * Creates the references
   */
  createReferences() {
    this.privateKeyInputRef = React.createRef();
    this.fileUploaderRef = React.createRef();
  }

  /**
   * Whenever the users submits his gpg key
   * @param event Dom event
   */
  async handleSubmit(event) {
    event.preventDefault();
    await this.validate();

    if (this.isValid) {
      this.toggleProcessing();
      await this.save();
    }
  }

  /**
   * Check the expiration date of the given private key.
   * If the key has an expiry date, it shows a warning to the user.
   * @param {string} privateKey
   */
  async checkExpiryDate(privateKey) {
    if (!this.props.hasKeyExpirationDate) {
      return;
    }

    // we do not display the warning message if the key can't be read.
    const keyHasAnExpirationDate = await this.props.hasKeyExpirationDate(privateKey).catch(() => false);
    this.setState({keyHasAnExpirationDate});
  }

  /**
   * Whenever the user changes the private key
   * @param event An input event
   */
  async handleChangePrivateKey(event) {
    const privateKey = event.target.value;
    this.setState({privateKey});
    await this.checkExpiryDate(privateKey);

    if (this.state.hasBeenValidated) {
      await this.validate();
    }
  }

  /**
   * Handle the selection of a file by file explorer
   */
  handleSelectFile() {
    this.fileUploaderRef.current.click();
  }

  /**
   * Returns the selected file's name
   */
  get selectedFilename() {
    return this.state.selectedFile ? this.state.selectedFile.name : "";
  }

  /**
   * Whenever the user select a private key file
   * @param event The file dom event
   */
  async handleSelectPrivateKeyFile(event) {
    const [privateKeyFile] = event.target.files;
    const privateKey = await this.readPrivateKeyFile(privateKeyFile);
    await this.checkExpiryDate(privateKey);
    this.setState({privateKey, selectedFile: privateKeyFile});
    if (this.state.hasBeenValidated) {
      await this.validate();
    }
  }

  /**
   * Verify and save the private gpg key
   */
  async save() {
    await this.props.onComplete(this.state.privateKey)
      .catch(this.onSaveFailure.bind(this));
  }

  /**
   * Whenever the gpg key import failed
   * @param {Error} error The error
   * @throw {Error} If an unexpected errors hits the component. Errors not of type: InvalidMasterPasswordError.
   */
  onSaveFailure(error) {
    // It can happen when some key validation went wrong.
    this.toggleProcessing();
    if (error.name === "GpgKeyError") {
      this.setState({errors: {invalidPrivateKey: true}, errorMessage: error.message});
    } else {
      throw error;
    }
  }

  /**
   * Read the selected private key file and returns its content in a base 64
   * @param privateKeyFile A private key file
   */
  readPrivateKeyFile(privateKeyFile) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        try {
          resolve(reader.result);
        } catch (e) {
          reject(e);
        }
      };
      reader.readAsText(privateKeyFile);
    });
  }

  /**
   * Validate the imported private key
   */
  async validate() {
    const {privateKey} = this.state;
    const emptyPrivateKey = privateKey.trim() === '';
    if (emptyPrivateKey) {
      this.setState({hasBeenValidated: true, errors: {emptyPrivateKey}});
      return;
    }

    let invalidPrivateKey = false;
    let errorMessage = "";
    try {
      await this.props.validatePrivateGpgKey(privateKey);
    } catch (e) {
      invalidPrivateKey = true;
      errorMessage = e.message;
    }
    this.setState({hasBeenValidated: true, errors: {invalidPrivateKey}, errorMessage});
  }

  /**
   * Toggle the processing mode
   */
  toggleProcessing() {
    this.setState({actions: {processing: !this.state.actions.processing}});
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   */
  render() {
    const processingClassName = this.isProcessing ? 'processing' : '';
    return (
      <div className="import-private-key">
        <h1>
          {{
            [ImportGpgKeyVariations.SETUP]: <Trans>Please enter your private key to continue.</Trans>,
            [ImportGpgKeyVariations.RECOVER]: <Trans>Welcome back, please enter your private key to begin the recovery process.</Trans>
          }[this.props.displayAs]}
        </h1>
        <form
          acceptCharset="utf-8"
          onSubmit={this.handleSubmit}>
          <div className={`input textarea required openpgp-key ${this.hasErrors ? "error" : ""} ${!this.areActionsAllowed ? 'disabled' : ''}`}>
            <label htmlFor="private-key"><Trans>Private key</Trans></label>
            <textarea
              name="private-key"
              ref={this.privateKeyInputRef}
              placeholder={this.translate("Your OpenPGP private key block")}
              value={this.state.privateKey}
              onChange={this.handleChangePrivateKey}
              disabled={!this.areActionsAllowed}/>
          </div>
          <div className={`input file ${!this.areActionsAllowed ? "disabled" : ""}`}>
            <input
              type="file"
              ref={this.fileUploaderRef}
              disabled={!this.areActionsAllowed}
              onChange={this.handleSelectPrivateKeyFile}
              accept="text/plain,.key,.asc"/>
            <div className="input-file-inline">
              <input type="text" disabled={true} placeholder={this.translate("No key file selected")} value={this.selectedFilename}/>
              <button className="button primary" type="button" onClick={this.handleSelectFile} disabled={!this.areActionsAllowed}>
                <span><Trans>Choose a file</Trans></span>
              </button>
            </div>
            {this.state.keyHasAnExpirationDate &&
              <div className="warning-message">
                <Trans>The private key should not have an expiry date.</Trans>&nbsp;
                <Trans>Once expired you will not be able to connect to your account.</Trans>
              </div>
            }
            {this.state.hasBeenValidated &&
              <>
                {this.state.errors.emptyPrivateKey &&
                  <div className="empty-private-key error-message"><Trans>The private key should not be empty.</Trans></div>
                }
                {this.state.errors.invalidPrivateKey &&
                  <div className="invalid-private-key error-message">{this.state.errorMessage}</div>
                }
              </>
            }
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className={`button primary big full-width ${processingClassName}`}
              role="button"
              disabled={this.isProcessing}>
              <Trans>Next</Trans>
            </button>
            {this.props.onSecondaryActionClick &&
            <a onClick={this.props.onSecondaryActionClick}>
              {{
                [ImportGpgKeyVariations.SETUP]: <Trans>Or generate a new private key.</Trans>,
                [ImportGpgKeyVariations.RECOVER]: <Trans>Help, I lost my private key.</Trans>,
              }[this.props.displayAs]}
            </a>
            }
          </div>
        </form>
      </div>
    );
  }
}

ImportGpgKey.defaultProps = {
  displayAs: ImportGpgKeyVariations.SETUP,
};

ImportGpgKey.propTypes = {
  context: PropTypes.object, // The application context
  onComplete: PropTypes.func.isRequired, // The callback to trigger when the user wants to import its gpg key
  displayAs: PropTypes.oneOf([
    ImportGpgKeyVariations.SETUP,
    ImportGpgKeyVariations.RECOVER
  ]), // Defines how the form should be displayed and behaves
  onSecondaryActionClick: PropTypes.func, // Callback to trigger when the user clicks on the secondary action link.
  t: PropTypes.func, // The translation function
  validatePrivateGpgKey: PropTypes.func, // The callback to check the validity of the gpg key
  hasKeyExpirationDate: PropTypes.func, // The callback to check if the key has an expiration date
};
export default withAppContext(withTranslation('common')(ImportGpgKey));
