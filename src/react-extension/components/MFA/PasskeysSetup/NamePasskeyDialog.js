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
 * @since         5.17.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import PasskeyAuthenticatorIcon from "../../../../shared/components/Icons/PasskeyAuthenticatorIcon";
import { getPasskeyAuthenticatorName } from "../../../../shared/utils/passkeyAuthenticator";
import { withMfa } from "../../../contexts/MFAContext";
import { withActionFeedback } from "../../../contexts/ActionFeedbackContext";

const PASSKEY_NAME_MAX_LENGTH = 255;

/**
 * This component asks the user to name the passkey created on their device and finishes its registration.
 */
class NamePasskeyDialog extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.nameRef = React.createRef();
    this.bindCallbacks();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      name: this.suggestedName,
      nameError: null,
      processing: false,
      hasAlreadyBeenValidated: false,
    };
  }

  /**
   * The authenticator name, numbered when the user already has a passkey with that name: "YubiKey 5 (2)".
   * @returns {string}
   */
  get suggestedName() {
    const authenticatorName = getPasskeyAuthenticatorName(this.props.aaguid) ?? this.props.t("Passkey");
    let name = authenticatorName;
    for (let count = 2; this.isNameUsed(name); count++) {
      name = `${authenticatorName} (${count})`;
    }
    return name;
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.nameRef.current.select();
  }

  /**
   * Handle the name change
   * @param {ReactEvent} event The react event
   */
  handleNameChange(event) {
    const name = event.target.value;
    const nameError = this.state.hasAlreadyBeenValidated ? this.validateName(name) : null;
    this.setState({ name, nameError });
  }

  /**
   * Handle form submit event.
   * @param {ReactEvent} event The react event
   * @returns {Promise<void>}
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.processing) {
      return;
    }

    const nameError = this.validateName(this.state.name);
    this.setState({ nameError, hasAlreadyBeenValidated: true });
    if (nameError) {
      this.nameRef.current.focus();
      return;
    }

    await this.save();
  }

  /**
   * Handle close and cancel click: the passkey created on the device is not registered.
   */
  handleCloseClick() {
    this.props.mfaContext.abortPasskeyRegistration();
    this.props.onClose();
    this.props.onAborted();
  }

  /**
   * Validate the name
   * @param {string} name
   * @returns {string|null} the error message if any
   */
  validateName(name) {
    const trimmedName = name.trim();
    if (!trimmedName.length) {
      return this.props.t("A name is required.");
    }
    if (this.isNameUsed(trimmedName)) {
      return this.props.t("This name already exists, please provide another one.");
    }
    return null;
  }

  /**
   * Is the name used by another passkey of the user, ignoring case and surrounding spaces
   * @param {string} name
   * @returns {boolean}
   */
  isNameUsed(name) {
    const lowerCaseName = name.trim().toLowerCase();
    return this.props.passkeys.some((passkey) => passkey.name?.trim().toLowerCase() === lowerCaseName);
  }

  /**
   * Finish the registration with the given name.
   * @returns {Promise<void>}
   */
  async save() {
    this.setState({ processing: true });
    try {
      await this.props.mfaContext.finishPasskeyRegistration(this.state.name.trim());
      await this.props.actionFeedbackContext.displaySuccess(this.props.t("The passkey has been added successfully."));
      this.props.onClose();
      this.props.onSaved();
    } catch (error) {
      if (this.isNameError(error)) {
        // The ceremony is still pending on a name error, the user can retry.
        const nameError = Object.values(error.data.body.name)[0];
        this.setState({ nameError, processing: false }, () => this.nameRef.current.focus());
      } else {
        this.props.onClose();
        this.props.onFailed(error);
      }
    }
  }

  /**
   * Is the error a validation error of the name
   * @param {object} error
   * @returns {boolean}
   */
  isNameError(error) {
    return error?.name === "PassboltApiFetchError" && error.data?.code === 400 && Boolean(error.data.body?.name);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <DialogWrapper
        title={this.props.t("Name your passkey")}
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="name-passkey-dialog"
      >
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <p>
              <Trans>The passkey was created on your device. Give it a name to finish adding it to your account.</Trans>
            </p>
            <div
              className={`input text required ${this.state.nameError ? "error" : ""} ${this.state.processing ? "disabled" : ""}`}
            >
              <label htmlFor="passkey-name-input">
                <Trans>Passkey name</Trans>
              </label>
              <div className="passkey-name-row">
                <PasskeyAuthenticatorIcon aaguid={this.props.aaguid} className="passkey-icon" />
                <input
                  id="passkey-name-input"
                  name="name"
                  ref={this.nameRef}
                  type="text"
                  value={this.state.name}
                  maxLength={PASSKEY_NAME_MAX_LENGTH}
                  required="required"
                  onChange={this.handleNameChange}
                  disabled={this.state.processing}
                  autoComplete="off"
                  autoFocus={true}
                />
              </div>
              {this.state.nameError && <div className="name error-message">{this.state.nameError}</div>}
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.state.processing} onClick={this.handleCloseClick} />
            <FormSubmitButton
              disabled={this.state.processing}
              processing={this.state.processing}
              value={this.props.t("Save")}
            />
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

NamePasskeyDialog.propTypes = {
  aaguid: PropTypes.string, // The AAGUID of the authenticator which created the passkey, if known
  passkeys: PropTypes.array.isRequired, // The passkeys of the user, to detect a duplicate name
  onSaved: PropTypes.func.isRequired, // Called once the passkey is registered
  onFailed: PropTypes.func.isRequired, // Called with the error when the registration failed and cannot be retried
  onAborted: PropTypes.func.isRequired, // Called when the user closed the dialog without saving
  onClose: PropTypes.func, // Called when the dialog is closed
  mfaContext: PropTypes.object, // The mfa context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // The translation function
};

export default withMfa(withActionFeedback(withTranslation("common")(NamePasskeyDialog)));
