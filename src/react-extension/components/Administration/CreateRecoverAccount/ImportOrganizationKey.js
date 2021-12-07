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
 * @since         3.4.0
 */
import React from "react";
import PropTypes from "prop-types";
import Icon from "../../Common/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";

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
   * @returns {*}
   */
  get defaultState() {
    return {
      processing: false, // component is processing or not
      key: "", // The subscription key
      keyError: "", // The error subscription key
      hasAlreadyBeenValidated: false, // true if the form has already validated once
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyInputKeyUp = this.handleKeyInputKeyUp.bind(this);
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
   * Handle key input keyUp event.
   */
  handleKeyInputKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validateKeyInput();
      this.setState(state);
    }
  }

  /**
   * Whenever the user select a organization key file
   * @param event The file dom event
   */
  async handleSelectOrganizationKeyFile(event) {
    const [organizationFile] = event.target.files;
    const organizationKey = await this.readOrganizationKeyFile(organizationFile);
    await this.fillOrganizationKey(organizationKey);
    if (this.state.hasAlreadyBeenValidated) {
      await this.validate();
    }
  }

  /**
   * Read the selected subscription key file and returns its content in a base 64
   * @param organizationFile A subscription key file
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
   * Fill the organization key
   * @param organizationKey A subscription key
   */
  async fillOrganizationKey(organizationKey) {
    await this.setState({key: organizationKey});
  }

  /**
   * Validate the key input.
   * @return {Promise}
   */
  validateKeyInput() {
    const key = this.state.key.trim();
    let keyError = "";
    if (!key.length) {
      keyError = this.translate("An organization key is required.");
    }

    return new Promise(resolve => {
      this.setState({keyError}, resolve);
    });
  }

  /**
   * Validate the form.
   * @return {Promise<boolean>}
   */
  async validate() {
    // Reset the form errors.
    this.setState({
      keyError: "",
    });

    // Validate the form inputs.
    await this.validateKeyInput();

    return this.state.keyError === "";
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
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
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <form onSubmit={this.handleFormSubmit} noValidate>
        <div className="form-content import-organization-key">
          <div className={`input textarea required ${this.state.keyError ? "error" : ""}`}>
            <label htmlFor="organization-recover-form-key"><Trans>Import an Open PGP Public key</Trans></label>
            <textarea id="organization-recover-form-key" name="key" value={this.state.key}
              onKeyUp={this.handleKeyInputKeyUp} onChange={this.handleInputChange}
              disabled={this.hasAllInputDisabled()} ref={this.keyInputRef} className="required"
              placeholder='Add Open PGP Public key' required="required" autoComplete="off" autoFocus={true}/>
          </div>
          <div className="input-file-chooser-wrapper">
            <div className="input text">
              <input
                type="file"
                ref={this.fileUploaderRef}
                disabled={this.hasAllInputDisabled()}
                onChange={this.handleSelectOrganizationKeyFile}/>
              {this.state.keyError &&
              <div className="key error-message">{this.state.keyError}</div>
              }
            </div>
          </div>
        </div>
        {!this.state.hasAlreadyBeenValidated &&
        <div className="message notice">
          <Icon baseline={true} name="info-circle"/>
          <strong><Trans>Pro tip</Trans>:</strong> <Trans>Learn how to <a>generate a key separately.</a></Trans>
        </div>
        }
        <div className="submit-wrapper clearfix">
          <FormSubmitButton disabled={this.hasAllInputDisabled()} processing={this.state.processing} value={this.translate("Apply")}/>
          <FormCancelButton disabled={this.hasAllInputDisabled()} onClick={this.props.onClose} />
        </div>
      </form>
    );
  }
}

ImportOrganizationKey.propTypes = {
  onClose: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(ImportOrganizationKey);
