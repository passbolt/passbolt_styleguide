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
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";
import PropTypes from "prop-types";

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
      privateKey: '', // The gpg private key
      actions: {
        processing: false // True if one's processing passphrase
      },
      hasBeenValidated: false, // true if the form has already validated once
      errors: {
        emptyPrivateKey: false, // True if the private key is empty
        invalidPrivateKey: false, // True if the private key is invalid
      },
      errorMessage: '' // The error messag if required
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
      await this.toggleProcessing();
      await this.save();
    }
  }


  /**
   * Whenever the user changes the private key
   * @param event An input event
   */
  async handleChangePrivateKey(event) {
    const privateKey = event.target.value;
    await this.fillPrivateKey(privateKey);
    if (this.state.hasBeenValidated) {
      await this.validate();
    }
  }

  /**
   * Whenever the user select a private key file
   * @param event The file dom event
   */
  async handleSelectPrivateKeyFile(event) {
    const [privateKeyFile] = event.target.files;
    const privateKey = await this.readPrivateKeyFile(privateKeyFile);
    await this.fillPrivateKey(privateKey);
    if (this.state.hasBeenValidated) {
      await this.validate();
    }
  }

  /**
   * Verify and save the private gpg key
   */
  async save() {
    await this.context.onImportGpgKeyRequested(this.state.privateKey)
      .catch(this.onSaveFailure.bind(this));
  }

  /**
   * Whenever the gpg key import failed
   * @param error The error
   */
  async onSaveFailure(error) {
    // It can happen when some key validation went wrong.
    await this.toggleProcessing();
    if (error.name === "GpgKeyError") {
      this.setState({errors: {invalidPrivateKey: true}, errorMessage: error.message});
    } else {
      const ErrorDialogProps = {message: error.message};
      this.props.dialogContext.open(ErrorDialog, ErrorDialogProps);
    }
  }

  /**
   * Fill the gpg private key
   * @param privateKey A private gpg key
   */
  async fillPrivateKey(privateKey) {
    await this.setState({privateKey});
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
   * Validate the security token data
   */
  async validate() {
    const {privateKey} = this.state;
    const emptyPrivateKey =  privateKey.trim() === '';
    if (emptyPrivateKey) {
      await this.setState({hasBeenValidated: true, errors: {emptyPrivateKey}});
      return;
    }
    await this.setState({hasBeenValidated: true, errors: {}});
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({actions: {processing: !this.state.actions.processing}});
  }

  /**
   * Render the component
   */
  render() {
    const processingClassName = this.isProcessing ? 'processing' : '';
    return (
      <div className="import-private-key">
        <h1>Welcome back, please enter your private key to begin with the recovery process.</h1>
        <form
          acceptCharset="utf-8"
          onSubmit={this.handleSubmit}>
          <div className={`input textarea required openpgp-key ${this.hasErrors ? "error" : ""}`}>
            <label htmlFor="private-key">Private key</label>
            <textarea
              name="private-key"
              ref={this.privateKeyInputRef}
              placeholder="Your OpenPGP private key block"
              value={this.state.privateKey}
              onChange={this.handleChangePrivateKey}
              disabled={!this.areActionsAllowed}/>
          </div>
          <div className="input-file-chooser-wrapper">
            <div className="input text">
              <input
                type="file"
                ref={this.fileUploaderRef}
                onChange={this.handleSelectPrivateKeyFile}/>
              {this.state.hasBeenValidated &&
              <>
                {this.state.errors.emptyPrivateKey &&
                  <div className="empty-private-key error-message">The private key should not be empty.</div>
                }
                {this.state.errors.invalidPrivateKey &&
                  <div className="invalid-private-key error-message">{this.state.errorMessage}</div>
                }
              </>
              }
            </div>
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className={`button primary big ${processingClassName}`}
              role="button"
              disabled={this.isProcessing}>
              Next
            </button>
            {this.props.secondaryAction}
          </div>
        </form>
      </div>
    );
  }
}

ImportGpgKey.contextType = AuthenticationContext;
ImportGpgKey.propTypes = {
  dialogContext: PropTypes.any, // The dialog context
  secondaryAction: PropTypes.any // Secondary action to display
};
export default withDialog(ImportGpgKey);
