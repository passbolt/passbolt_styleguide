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
 * @since         3.6.0
 */

import React from "react";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import Icon from "../../../../shared/components/Icons/Icon";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";

/**
 * This component allows to display the import organization key for the administration
 */
class ImportOrganizationKey extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
    this.createInputRef();
  }

  /**
   * Get default state
   * @returns {Object}
   */
  get defaultState() {
    return {
      processing: false, // component is processing or not
      key: "", // The subscription key
      keyError: "", // The error subscription key
      hasAlreadyBeenValidated: false, // true if the form has already validated once,
      selectedFile: null, // the file to import
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectOrganizationKeyFile = this.handleSelectOrganizationKeyFile.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.keyInputRef = React.createRef();
    this.fileUploaderRef = React.createRef();
  }

  /**
   * Whenever the user select a organization key file
   * @param event The file dom event
   */
  async handleSelectOrganizationKeyFile(event) {
    const [organizationFile] = event.target.files;
    const organizationKey = await this.readOrganizationKeyFile(organizationFile);
    this.setState({key: organizationKey, selectedFile: organizationFile});
  }

  /**
   * Read the selected file and returns its content in text form
   * @param organizationFile The given file
   * @return {Promise}
   */
  readOrganizationKeyFile(organizationFile) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        try {
          resolve(reader.result);
        } catch (e) {
          reject(e);
        }
      };
      reader.readAsText(organizationFile);
    });
  }

  /**
   * Validate the key input.
   * @return {Promise}
   */
  async validateKeyInput() {
    const key = this.state.key.trim();
    if (key === "") {
      return Promise.reject(new Error(this.translate("The key can't be empty.")));
    }
    return await this.props.context.port.request('passbolt.account-recovery.validate-organization-key', key);
  }

  /**
   * Check if the form is valid.
   * @return {Promise<boolean>}
   */
  async validate() {
    // Reset the form errors.
    this.setState({
      keyError: "",
    });

    return await this.validateKeyInput()
      .then(() => true)
      .catch(error => {
        this.setState({keyError: error.message});
        return false;
      });
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  /**
   * Handle the selection of a file by file explorer
   */
  handleSelectFile() {
    this.fileUploaderRef.current.click();
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (!this.state.processing) {
      await this.save();
    }
  }

  /**
   * Save the changes.
   */
  async save() {
    await this.setState({hasAlreadyBeenValidated: true});
    await this.toggleProcessing();

    if (!await this.validate()) {
      this.handleValidateError();
      await this.toggleProcessing();
      return;
    }

    await this.props.onUpdateOrganizationKey(this.state.key.trim());
  }

  /**
   * Handle validation error.
   */
  handleValidateError() {
    this.focusFieldError();
  }

  /**
   * Focus the field of the form which is in error state.
   */
  focusFieldError() {
    if (this.state.keyError) {
      this.keyInputRef.current.focus();
    }
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({processing: !this.state.processing});
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Returns the selected file's name
   */
  get selectedFilename() {
    return this.state.selectedFile ? this.state.selectedFile.name : "";
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <form onSubmit={this.handleFormSubmit} noValidate>
        <div className="form-content import-organization-key">
          <div className={`input textarea required ${this.state.keyError ? "error" : ""}`}>
            <label htmlFor="organization-recover-form-key"><Trans>Import an OpenPGP Public key</Trans></label>
            <textarea id="organization-recover-form-key" name="key" value={this.state.key}
              onKeyUp={this.handleKeyInputKeyUp} onChange={this.handleInputChange}
              disabled={this.hasAllInputDisabled()} ref={this.keyInputRef} className="required"
              placeholder={this.translate('Add Open PGP Public key')} required="required" autoComplete="off" autoFocus={true} />
          </div>
          <div className="input file">
            <input
              type="file"
              id="dialog-import-private-key"
              ref={this.fileUploaderRef}
              disabled={this.hasAllInputDisabled()}
              onChange={this.handleSelectOrganizationKeyFile} />
            <label htmlFor="dialog-import-private-key">
              <Trans>Select a file to import</Trans>
            </label>
            <div className="input-file-inline">
              <input
                type="text"
                disabled={true}
                placeholder={this.translate("No file selected")}
                defaultValue={this.selectedFilename} />
              <button
                className="button primary"
                type='button'
                disabled={this.hasAllInputDisabled()}
                onClick={this.handleSelectFile}>
                <span><Trans>Choose a file</Trans></span>
              </button>
            </div>
            {this.state.keyError &&
              <div className="key error-message">{this.state.keyError}</div>
            }
          </div>
        </div>
        {!this.state.hasAlreadyBeenValidated &&
          <div className="message notice">
            <Icon baseline={true} name="info-circle" />
            <strong><Trans>Pro tip</Trans>:</strong> <Trans>Learn how to <a href="https://help.passbolt.com/configure/account-recovery" target="_blank" rel="noopener noreferrer">generate a key separately.</a></Trans>
          </div>
        }
        <div className="submit-wrapper clearfix">
          <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.props.onClose} />
          <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Apply")} />
        </div>
      </form>
    );
  }
}

ImportOrganizationKey.propTypes = {
  context: PropTypes.object,
  onUpdateOrganizationKey: PropTypes.func,
  onClose: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(ImportOrganizationKey));
