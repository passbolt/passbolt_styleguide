
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
 * @since         4.6.0
 */
import React from "react";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {withActionFeedback} from "../../../../contexts/ActionFeedbackContext";
import {withAdminSso} from "../../../../contexts/AdminSsoContext";
import {withAppContext} from "../../../../../shared/context/AppContext/AppContext";
import Password from "../../../../../shared/components/Password/Password";
import CopySVG from "../../../../../img/svg/copy.svg";
import {withClipboard} from "../../../../contexts/Clipboard/ManagedClipboardServiceProvider";

/**
 * This component displays the Adfs SSO settings form
 */
class AdfsSsoProviderForm extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
    this.createRefs();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCopyRedirectUrl = this.handleCopyRedirectUrl.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.urlInputRef = React.createRef();
    this.clientIdInputRef = React.createRef();
    this.clientSecretInputRef = React.createRef();
    this.openIdConfigurationPathInputRef = React.createRef();
    this.scopeInputRef = React.createRef();
  }

  /**
   * Whenever the component has updated in terms of props or state
   */
  componentDidUpdate() {
    if (!this.props.adminSsoContext.consumeFocusOnError()) {
      return;
    }

    const errors = this.props.adminSsoContext.getErrors();
    const fieldToFocus = this.getFirstFieldInError(errors, ["url", "openid_configuration_path", "scope", "client_id", "client_secret"]);

    switch (fieldToFocus) {
      case "url":
        this.urlInputRef.current.focus();
        break;
      case "openid_configuration_path":
        this.openIdConfigurationPathInputRef.current.focus();
        break;
      case "scope":
        this.scopeInputRef.current.focus();
        break;
      case "client_id":
        this.clientIdInputRef.current.focus();
        break;
      case "client_secret":
        this.clientSecretInputRef.current.focus();
        break;
    }
  }

  /**
   * Returns the first field with an error (first in the given list)
   * @param {EntityValidationError} errors
   * @param {Array<string>} fieldPriority the ordered list of field to check
   * @returns {string|null}
   */
  getFirstFieldInError(errors, fieldPriority) {
    for (let i = 0; i < fieldPriority.length; i++) {
      const fieldName = fieldPriority[i];
      if (errors.hasError(fieldName)) {
        return fieldName;
      }
    }
    return null;
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const {value, name} = event.target;
    this.props.adminSsoContext.setValue(name, value);
  }

  /**
   * Handle the copy to clipboard button
   */
  async handleCopyRedirectUrl() {
    await this.props.clipboardContext.copy(this.fullRedirectUrl, this.translate("The redirection URL has been copied to the clipboard."));
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.props.adminSsoContext.isProcessing();
  }

  /**
   * Returns an array of string from the errors so React can display them.
   * @param {Object} errors
   * @returns {Array<string>}
   */
  displayErrors(errors) {
    return Object.values(errors);
  }

  /**
   * Get the full redirection URL;
   */
  get fullRedirectUrl() {
    const trustedDomain = this.props.context.userSettings.getTrustedDomain();
    return `${trustedDomain}/sso/adfs/redirect`;
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
    const ssoContext = this.props.adminSsoContext;
    const ssoConfig = ssoContext.getSsoConfiguration();
    const errors = ssoContext.getErrors();
    return (
      <>
        <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
          <label><Trans>Login URL</Trans></label>
          <input id="sso-adfs-url-input" type="text" className="fluid form-element" name="url" ref={this.urlInputRef}
            value={ssoConfig.url} onChange={this.handleInputChange} placeholder={this.translate("Login URL")}
            disabled={this.hasAllInputDisabled()}/>
          {errors?.hasError('url') &&
            <div className="error-message">{this.displayErrors(errors.getError('url'))}</div>
          }
          <p>
            <Trans>The AD FS authentication endpoint.</Trans>
          </p>
        </div>
        <div className={`input text input-wrapper ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
          <label><Trans>Redirect URL</Trans></label>
          <div className="button-inline">
            <input id="sso-redirect-url-input" type="text" className="fluid form-element disabled" name="redirect_url"
              value={this.fullRedirectUrl} placeholder={this.translate("Redirect URL")} readOnly disabled={true}/>
            <button type="button" onClick={this.handleCopyRedirectUrl} className="copy-to-clipboard button button-icon">
              <CopySVG/>
            </button>
          </div>
          <p>
            <Trans>The URL to provide to the AD FS platform when registering the application.</Trans>
          </p>
        </div>
        <div className={`input text input-wrapper ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
          <label><Trans>OpenId Configuration Path</Trans></label>
          <input id="sso-adfs-openid-configuration-path-input" type="text" className="fluid form-element" name="openid_configuration_path" ref={this.openIdConfigurationPathInputRef}
            value={ssoConfig.openid_configuration_path} onChange={this.handleInputChange} placeholder={this.translate("OpenId Configuration Path")}
            disabled={this.hasAllInputDisabled()}/>
          {errors?.hasError('openid_configuration_path') &&
            <div className="error-message">{this.displayErrors(errors.getError('openid_configuration_path'))}</div>
          }
          <p>
            <Trans>The AD FS configuration relative path from the given login url.</Trans>
          </p>
        </div>
        <div className={`input text input-wrapper ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
          <label><Trans>Scope</Trans></label>
          <input id="sso-adfs-scope-input" type="text" className="fluid form-element" name="scope" ref={this.scopeInputRef}
            value={ssoConfig.scope} onChange={this.handleInputChange} placeholder={this.translate("Scope")}
            disabled={this.hasAllInputDisabled()}/>
          {errors?.hasError('scope') &&
            <div className="error-message">{this.displayErrors(errors.getError('scope'))}</div>
          }
          <p>
            <Trans>The AD FS scope.</Trans>
          </p>
        </div>
        <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
          <label><Trans>Application (client) ID</Trans></label>
          <input id="sso-adfs-client-id-input" type="text" className="fluid form-element" name="client_id" ref={this.clientIdInputRef}
            value={ssoConfig.client_id} onChange={this.handleInputChange} placeholder={this.translate("Application (client) ID")}
            disabled={this.hasAllInputDisabled()}/>
          {errors?.hasError('client_id') &&
            <div className="error-message">{this.displayErrors(errors.getError('client_id'))}</div>
          }
          <p>
            <Trans>The public identifier for the AD FS app.</Trans>
          </p>
        </div>
        <div className={`input text required ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
          <label><Trans>Secret</Trans></label>
          <Password
            id="sso-adfs-secret-input"
            className="fluid form-element"
            onChange={this.handleInputChange}
            autoComplete="off"
            name="client_secret"
            placeholder={this.translate("Secret")}
            disabled={this.hasAllInputDisabled()}
            value={ssoConfig.client_secret}
            preview={true}
            inputRef={this.clientSecretInputRef}/>
          {errors?.hasError('client_secret') &&
            <div className="error-message">{this.displayErrors(errors.getError('client_secret'))}</div>
          }
          <p>
            <Trans>Allows your AD FS provider and Passbolt API to securely share information.</Trans>
          </p>
        </div>
      </>
    );
  }
}

AdfsSsoProviderForm.propTypes = {
  adminSsoContext: PropTypes.object, // The administration sso configuration context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  context: PropTypes.any, // The application context
  clipboardContext: PropTypes.object, // the clipboard service provider
  t: PropTypes.func, // The translation function
};

export default withAppContext(withActionFeedback(withAdminSso(withClipboard(withTranslation('common')(AdfsSsoProviderForm)))));
