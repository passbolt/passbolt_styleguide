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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withImportAccountKitContext} from "../../../contexts/Desktop/ImportAccountKitContext";

class ImportAccountKit extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
    this.createReferences();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      filename: null, // The account kit filename
      accountKit: null, //The base64 content
      errors: { // The list of errors
        message: null // error message
      },
      processing: false,
      validation: {
        hasAlreadyBeenValidated: false // True if the form has been already validated once
      }
    };
  }

  /**
   * Create elements references
   */
  createReferences() {
    this.fileUploaderRef = React.createRef();
  }

  /**
   * Bind the components handlers
   */
  bindHandlers() {
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleAccountKitSelected = this.handleAccountKitSelected.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.openDocumentation = this.openDocumentation.bind(this);
  }


  /**
   * Whenever the user selects a profile picture file
   * @param event A dom event
   */
  async handleAccountKitSelected(event) {
    const [uploadedKit] = event.target.files;
    const filename = uploadedKit?.name;
    const accountKit = await this.readFileContent(uploadedKit)
    this.setState({filename, accountKit});
    if (this.state.validation.hasAlreadyBeenValidated) {
      const state = this.validateAccountKitInput();
      this.setState(state);
    }
  }

  /**
   * Handle the selection of a file by file explorer
   */
  handleSelectFile() {
    this.fileUploaderRef.current.click();
  }

  /**
   * Whenever the user wants to upload a new account kit
   * @param event A DOM event
   */
  handleUpload(event) {
    event.preventDefault();
    this.upload();
  }

  /**
   * Returns true if the an error message is set
   */
  get hasValidationError() {
    return this.state.errors.message !== null;
  }

  /**
   * Upload the account kit
   */
  async upload() {
    // If the upload is already processing
    if (this.state.processing) {
      return;
    }

    await this.setState({ validation: { hasAlreadyBeenValidated: true } });

    await this.toggleProcessing();
    await this.validateAccountKitInput();

    if (this.hasValidationError) {
      await this.toggleProcessing();
      return;
    }
    await this.props.importAccountKitContext.verifyAccountKit(this.state.accountKit);
  }

  
  /**
   * Read the content of file content
   * @param accountKit the account kit file
   */
  readFileContent(accountKit) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        try {
          resolve(reader.result);
        } catch (e) {
          reject(e);
        }
      };
      reader.readAsText(accountKit);
    });
  }


  /**
   * Toggle the processing mode
   */
  toggleProcessing() {
    this.setState({ processing: !this.state.processing });
  }

  /**
   * Validate the account kit input.
   * @returns {Promise<void>}
   */
  validateAccountKitInput() {
    let message = null;
    if (!this.state.accountKit) {
      message = this.props.t("A file is required.");
    }
    else if (this.state.filename.split('.').pop() !== "passbolt") {
      message = this.props.t("Only passbolt format is allowed.");
    }
    return this.setState({ errors: { message } });
  }

  /**
   * Request main process to open browser with link.
   * @returns {Promise<void>}
   */
  openDocumentation() {
    this.props.context.port.emit("passbolt.rendered.open-to-browser", "https://help.passbolt.com/TBD")
  }

  /**
   * Render the component
   */
  render() {
    return (
      <div className="import-account-kit">
        <div className="big avatar">
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="90" height="90" rx="45" fill="#939598" />
            <path d="M65.997 51.9822V61.316C66.0007 61.9294 65.883 62.5374 65.6509 63.1051C65.4187 63.6729 65.0766 64.1891 64.6442 64.6241C64.2117 65.0591 63.6976 65.4044 63.1312 65.64C62.5649 65.8755 61.9576 65.9968 61.3442 65.9968H28.634C27.3925 65.9968 26.2019 65.5036 25.3241 64.6258C24.4462 63.748 23.9531 62.5574 23.9531 61.316V51.9822" stroke="white" strokeWidth="2.58413" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M56.663 35.6409L44.9748 23.9527L33.2866 35.6409" stroke="white" strokeWidth="2.58413" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M44.9751 23.9527V51.982" stroke="white" strokeWidth="2.58413" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <form
          onSubmit={this.handleUpload} noValidate>
          <div className={`input file required ${this.hasValidationError ? "error" : ""}`}>
            <input
              aria-required={true}
              id="dialog-upload-account-kit-input"
              type="file"
              ref={this.fileUploaderRef}
              onChange={this.handleAccountKitSelected}
              accept="application/passbolt" />
            <label htmlFor="dialog-upload-account-kit-input">
              <Trans>Account kit</Trans>
            </label>
            <div className="input-file-inline">
              <input
                type="text"
                disabled={true}
                id="upload-account-kit-input"
                placeholder={this.props.t("Upload your account kit")}
                defaultValue={this.state.filename} />
              <button
                type="button"
                className="primary"
                onClick={this.handleSelectFile}>
                <span className='ellipsis'><Trans>Select a file</Trans></span>
              </button>
            </div>
            {this.state.errors.message &&
              <div className="error-message">{this.state.errors.message}</div>
            }
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className="button primary big full-width">
              <Trans>Import account</Trans>
            </button>
            <button type="button" className="link"  onClick={this.openDocumentation}>
              <Trans>Where can I find my account kit ?</Trans>
            </button>
          </div>
        </form>
      </div>);
  }
}

ImportAccountKit.propTypes = {
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
  importAccountKitContext: PropTypes.any.isRequired, // The import account kit context
};

export default withAppContext(withImportAccountKitContext((withTranslation('common')(ImportAccountKit))));

