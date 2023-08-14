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
      accountKit: null, // The account kit to upload
      errors: { // The list of errors
        message: null // error message
      },
      validation: {
        hasAlreadyBeenValidated: false // True if the form has been already validated once
      }
    };
  }

  /**
   * Returns the selected file's name
   * @return {string}
   */
  get selectedFilename() {
    return this.state.accountKit ? this.state.accountKit.name : '';
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
  }


  /**
   * Whenever the user selects a profile picture file
   * @param event A dom event
   */
  async handleAccountKitSelected(event) {
    const [accountKit] = event.target.files;
    await this.select(accountKit);
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
   * Select the account kit file
   * @param avatarFile
   */
  async select(accountKit) {
    await this.setState({accountKit});
  }

  /**
   * Upload the account kit
   */
  async upload() {
    // If the upload is already processing
    if (this.state.actions.processing) {
      return;
    }

    await this.setState({validation: {hasAlreadyBeenValidated: true}});

    await this.toggleProcessing();
    await this.validateAccountKitInput();

    if (this.hasValidationError) {
      await this.toggleProcessing();
      return;
    }
   // await this.props.context.port.request("passbolt.users.update-avatar", this.user.id, avatarDto);
  }

  /**
   * Render the component
   */
  render() {
    return (
      <div className="get-started-desktop">
        <div className="big avatar">
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="90" height="90" rx="45" fill="#939598"/>
            <path d="M65.997 51.9822V61.316C66.0007 61.9294 65.883 62.5374 65.6509 63.1051C65.4187 63.6729 65.0766 64.1891 64.6442 64.6241C64.2117 65.0591 63.6976 65.4044 63.1312 65.64C62.5649 65.8755 61.9576 65.9968 61.3442 65.9968H28.634C27.3925 65.9968 26.2019 65.5036 25.3241 64.6258C24.4462 63.748 23.9531 62.5574 23.9531 61.316V51.9822" stroke="white" strokeWidth="2.58413" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M56.663 35.6409L44.9748 23.9527L33.2866 35.6409" stroke="white" strokeWidth="2.58413" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M44.9751 23.9527V51.982" stroke="white" strokeWidth="2.58413" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={`input file required ${this.hasValidationError ? "error" : ""}`}>
          <input
            aria-required={true}
            id="dialog-upload-account-kit-input"
            type="file"
            ref={this.fileUploaderRef}
            onChange={this.handleAccountKitSelected}
            accept="image/*"/>
          <label htmlFor="dialog-upload-avatar-input">
            <Trans>Account kit</Trans>
          </label>
          <div className="input-file-inline">
            <input
              type="text"
              disabled={true}
              placeholder={this.props.t("Upload your account kit")}
              defaultValue={this.selectedFilename}/>
            <button
              type='button'
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
          <button type="button" className="link">
            <Trans>Where can I find my account kit ?</Trans>
          </button>
        </div>
      </div>);
  }
}

ImportAccountKit.propTypes = {
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(ImportAccountKit));

