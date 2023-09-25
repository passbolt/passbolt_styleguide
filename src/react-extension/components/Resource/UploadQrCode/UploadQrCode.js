/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.4.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {Trans, withTranslation} from "react-i18next";
import Tooltip from "../../Common/Tooltip/Tooltip";
import Icon from "../../../../shared/components/Icons/Icon";
import {isValidBase32} from "../../../../shared/utils/assertions";
import {Html5Qrcode, Html5QrcodeSupportedFormats} from "html5-qrcode";

class UploadQrCode extends Component {
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
   * Returns the default state
   */
  get defaultState() {
    return {
      // Dialog states
      processing: false,

      fileToImport: null, // The file to import
      fileError: "", // The file error
    };
  }


  /**
   * Bind component handlers
   */
  bindHandlers() {
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Create elements references
   */
  createReferences() {
    this.fileUploaderRef = React.createRef();
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * Returns the selected file's name
   * @returns {string}
   */
  get selectedFilename() {
    return this.state.fileToImport?.name || '';
  }

  /**
   * Handle the selection of a file by file explorer
   */
  handleSelectFile() {
    this.fileUploaderRef.current.click();
  }

  /**
   * Handle the event that a file has been selected
   * @param event A dom event
   * @returns {Promise<void>}
   */
  async handleFileSelected(event) {
    const [fileToImport] = event.target.files;
    await this.resetValidation();
    this.setState({fileToImport});
  }

  /**
   * Handle the cancellation of the import
   */
  handleCancel() {
    this.close();
  }

  /**
   * Handle the import submit event
   * @param event A dom event
   */
  handleSubmit(event) {
    // Prevent the form to be submitted.
    event.preventDefault();

    if (!this.state.processing) {
      this.save();
    }
  }

  /**
   * Toggle processing state
   */
  toggleProcessing() {
    const prev = this.state.processing;
    this.setState({processing: !prev});
  }

  /**
   * Close the dialog
   */
  close() {
    this.props.onClose();
  }

  /**
   * Save the selected file with its qr code read
   * @returns {Promise<void>}
   */
  async save() {
    this.toggleProcessing();

    if (!await this.validate()) {
      await this.toggleProcessing();
      return;
    }

    try {
      const url = await this.getDataFromQrCode();
      const standaloneTotp = this.createTotpFromUrl(url);
      this.props.onSave(standaloneTotp);
      this.handleImportSuccess();
    } catch (error) {
      this.handleImportError(error);
    }
  }

  /**
   * Get data from QR code
   * @return {Promise<module:url.URL>}
   */
  async getDataFromQrCode() {
    const html5QrCode = new Html5Qrcode("dialog-upload-qr-code", {formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]});
    const result = await html5QrCode.scanFileV2(this.state.fileToImport, false);
    // Decode uri for special characters
    return new URL(decodeURIComponent(result.decodedText));
  }

  /**
   * Create TOTP
   * @param url {URL}
   * @return {{resourceDto: {name: string, uri: (string|string)}, secretDto: {totp: {secret_key: string, period: (number|number), digits: (number|number), algorithm: (string|string)}}}}
   */
  createTotpFromUrl(url) {
    const secret_key = url.searchParams.get('secret').toUpperCase();
    if (isValidBase32(secret_key)) {
      // RESOURCE DTO
      const resourceDto = {
        // First seven characters are for type (example: /totp// or /hotp//) and add space after ':'
        name: url.pathname.substring(7).split(":").join(": "),
        uri: url.searchParams.get('issuer') || ""
      };
      // SECRET DTO
      const secretDto = {
        totp: {
          secret_key: secret_key,
          algorithm: url.searchParams.get('algorithm') || "SHA1",
          digits: parseInt(url.searchParams.get('digits'), 10) || 6,
          period: parseInt(url.searchParams.get('period'), 10) || 30
        }
      };
      return {resourceDto, secretDto};
    } else {
      throw new Error(this.translate("The QR code is incomplete."));
    }
  }

  /**
   * Handle import success
   */
  handleImportSuccess() {
    this.toggleProcessing();
    this.close();
  }

  /**
   * Handle import error.
   * @param {Object} error The error returned by the background page
   */
  handleImportError(error) {
    const isUserAbortsOperation = error.name === "UserAbortsOperationError";
    const isNoQrCodeFound = error.name === "NotFoundException";
    let fileError = "";

    this.toggleProcessing();
    if (isUserAbortsOperation) {
      // If the user aborts the operation, then do nothing. It happens when the users close the passphrase dialog
    } else if (isNoQrCodeFound) {
      fileError = this.translate("No QR code found.");
    } else {
      fileError = error.message;
    }
    this.setState({fileError});
  }

  /*
   * =============================================================
   *  Validation
   * =============================================================
   */
  /**
   * Validate the form.
   * @return {Promise<boolean>}
   */
  async validate() {
    // Reset the form errors.
    this.setState({
      fileError: ""
    });

    // Validate the form inputs.
    await this.validateFileInput();

    return this.state.fileError === "";
  }

  /**
   * Validate the name input.
   * @return {Promise<void>}
   */
  validateFileInput() {
    const file = this.state.fileToImport;
    let fileError = "";
    if (!file) {
      fileError = this.translate("A file is required.");
    }

    return new Promise(resolve => {
      this.setState({fileError}, resolve);
    });
  }

  /**
   * Reset the validation process
   * @returns {Promise<void>}
   */
  async resetValidation() {
    await this.setState({fileError: ""});
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
    return (
      <DialogWrapper
        title={this.props.title}
        className="upload-qr-code-dialog"
        disabled={this.hasAllInputDisabled()}
        onClose={this.handleCancel}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-content">
            <div className={`input file required ${this.state.fileError ? "error" : ""} ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
              <input
                type="file"
                id="dialog-upload-qr-code"
                ref={this.fileUploaderRef}
                onChange={this.handleFileSelected}
                accept=".png, .jpg, .jpeg"/>
              <div className="label-required-inline">
                <label htmlFor="dialog-import-passwords">
                  <Trans>Upload a QR code</Trans>
                </label>
                <Tooltip message={this.translate("Only PNG or JPEG file are accepted.")}>
                  <Icon name="info-circle"/>
                </Tooltip>
              </div>
              <div className="input-file-inline">
                <input
                  type="text"
                  disabled={true}
                  placeholder={this.translate("QR code picture")}
                  defaultValue={this.selectedFilename}/>
                <button
                  className="button primary"
                  type="button"
                  disabled={this.hasAllInputDisabled()}
                  onClick={this.handleSelectFile}>
                  <span><Trans>Select a file</Trans></span>
                </button>
              </div>
              {this.state.fileError &&
                <div className="error-message">
                  {this.state.fileError}
                </div>
              }
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton
              disabled={this.hasAllInputDisabled()}
              onClick={this.handleCancel}/>
            <FormSubmitButton
              value={this.translate("Save")}
              disabled={this.hasAllInputDisabled()}
              processing={this.state.processing}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

UploadQrCode.propTypes = {
  title: PropTypes.string, // The title of the dialog
  onClose: PropTypes.func, // The onClose function
  onSave: PropTypes.func, // The onSave function
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(UploadQrCode);
