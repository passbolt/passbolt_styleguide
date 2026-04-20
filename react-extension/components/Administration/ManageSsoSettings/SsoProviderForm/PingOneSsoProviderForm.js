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
 * @since         5.11.0
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";

import { withAdminSso } from "../../../../contexts/AdminSsoContext";
import { withAppContext } from "../../../../../shared/context/AppContext/AppContext";
import { withClipboard } from "../../../../contexts/Clipboard/ManagedClipboardServiceProvider";

import PingOneSsoSettingsEntity from "../../../../../shared/models/entity/ssoSettings/PingOneSsoSettingsEntity";

import Select from "../../../Common/Select/Select";
import Password from "../../../../../shared/components/Password/Password";
import PingOneSsoSettingsFormEntity from "../../../../../shared/models/entity/ssoSettings/PingOneSsoSettingsFormEntity";

import CopySVG from "../../../../../img/svg/copy.svg";

/**
 * This component displays the PingOne SSO settings form
 */
class PingOneSsoProviderForm extends PureComponent {
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
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCopyRedirectUrl = this.handleCopyRedirectUrl.bind(this);
  }

  /**
   * Create input refs
   */
  createRefs() {
    this.inputRefs = {
      url: React.createRef(),
      environment_id: React.createRef(),
      client_id: React.createRef(),
      client_secret: React.createRef(),
      email_claim: React.createRef(),
    };
  }

  /**
   * Focus the first available field in error
   */
  componentDidUpdate() {
    if (!this.props.adminSsoContext.consumeFocusOnError()) {
      return;
    }

    const errors = this.props.adminSsoContext.getErrors();
    const fieldToFocus = this.getFirstFieldInError(
      errors,
      Object.keys(PingOneSsoSettingsEntity.getSchema().properties),
    );

    this.inputRefs[fieldToFocus]?.current?.focus();
  }

  /**
   * Returns the first field with an error (first in the given list)
   * @param {EntityValidationError} errors
   * @param {Array<string>} fieldPriority the ordered list of field to check
   * @returns {string|undefined}
   */
  getFirstFieldInError(errors, fieldPriority) {
    return fieldPriority.find((fieldName) => errors.hasError(fieldName));
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.props.adminSsoContext.setValue(name, value);
  }

  /**
   * Handle the copy to clipboard button
   */
  async handleCopyRedirectUrl() {
    await this.props.clipboardContext.copy(
      this.fullRedirectUrl,
      this.translate("The redirection URL has been copied to the clipboard."),
    );
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
   * Get the URL select items
   * @returns {Array<{value: string, label: string}>}
   */
  get urlSelectItems() {
    return PingOneSsoSettingsEntity.SUPPORTED_URLS.map((url) => ({
      value: url,
      label: url,
    }));
  }

  /**
   * Get the full redirection URL;
   */
  get fullRedirectUrl() {
    const trustedDomain = this.props.context.userSettings.getTrustedDomain();
    return `${trustedDomain}/sso/pingone/redirect`;
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
        <div className={`select-wrapper input required ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
          <label htmlFor="sso-pingone-url-input">
            <Trans>URL</Trans>
          </label>
          <Select
            id="sso-pingone-url-input"
            name="url"
            items={this.urlSelectItems}
            value={ssoConfig.url}
            onChange={this.handleInputChange}
            disabled={this.hasAllInputDisabled()}
          />
          {errors?.hasError("url") && <div className="error-message">{this.displayErrors(errors.getError("url"))}</div>}
          <p>
            <Trans>The PingOne authentication URL for your region.</Trans>
          </p>
        </div>
        <div className={`input text input-wrapper ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
          <label>
            <Trans>Redirect URL</Trans>
          </label>
          <div className="button-inline">
            <input
              id="sso-pingone-redirect-url-input"
              type="text"
              className="fluid form-element disabled"
              name="redirect_url"
              value={this.fullRedirectUrl}
              placeholder={this.translate("Redirect URL")}
              readOnly
              disabled
            />
            <button type="button" onClick={this.handleCopyRedirectUrl} className="copy-to-clipboard button button-icon">
              <CopySVG />
            </button>
          </div>
          <p>
            <Trans>The URL to provide to PingOne when registering the application.</Trans>
          </p>
        </div>
        <div className={`input text required ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
          <label htmlFor="sso-pingone-environment-id-input">
            <Trans>Environment ID</Trans>
          </label>
          <input
            id="sso-pingone-environment-id-input"
            type="text"
            className="fluid form-element"
            name="environment_id"
            ref={this.inputRefs.environment_id}
            value={ssoConfig.environment_id}
            onChange={this.handleInputChange}
            placeholder={this.translate("Environment ID")}
            disabled={this.hasAllInputDisabled()}
          />
          {errors?.hasError("environment_id") && (
            <div className="error-message">{this.displayErrors(errors.getError("environment_id"))}</div>
          )}
          <p>
            <Trans>The public identifier for the PingOne application.</Trans>{" "}
            <a
              href="https://docs.pingidentity.com/pingone/applications/p1_edit_application_oidc.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Trans>Where to find it?</Trans>
            </a>
          </p>
        </div>
        <div className={`input text required ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
          <label htmlFor="sso-pingone-client-id-input">
            <Trans>Application (client) ID</Trans>
          </label>
          <input
            id="sso-pingone-client-id-input"
            type="text"
            className="fluid form-element"
            name="client_id"
            ref={this.inputRefs.client_id}
            value={ssoConfig.client_id}
            onChange={this.handleInputChange}
            placeholder={this.translate("Application (client) ID")}
            disabled={this.hasAllInputDisabled()}
          />
          {errors?.hasError("client_id") && (
            <div className="error-message">{this.displayErrors(errors.getError("client_id"))}</div>
          )}
          <p>
            <Trans>The public identifier for the app in PingOne in UUID format.</Trans>{" "}
            <a
              href="https://docs.pingidentity.com/pingone/applications/p1_edit_application_oidc.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Trans>Where to find it?</Trans>
            </a>
          </p>
        </div>
        <div className={`input text required ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
          <label htmlFor="sso-pingone-secret-input">
            <Trans>Secret</Trans>
          </label>
          <Password
            id="sso-pingone-secret-input"
            className="fluid form-element"
            onChange={this.handleInputChange}
            autoComplete="off"
            name="client_secret"
            placeholder={this.translate("Secret")}
            disabled={this.hasAllInputDisabled()}
            value={ssoConfig.client_secret}
            preview
            inputRef={this.inputRefs.client_secret}
          />
          {errors?.hasError("client_secret") && (
            <div className="error-message">{this.displayErrors(errors.getError("client_secret"))}</div>
          )}
          <p>
            <Trans>Allows PingOne and Passbolt API to securely share information.</Trans>{" "}
            <a
              href="https://docs.pingidentity.com/pingone/applications/p1_edit_application_oidc.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Trans>Where to find it?</Trans>
            </a>
          </p>
        </div>

        <div className="input text required disabled">
          <label htmlFor="sso-pingone-scope-input">
            <Trans>Scope</Trans>
          </label>
          <input
            id="sso-pingone-scope-input"
            type="text"
            className="fluid form-element"
            name="scope"
            value={PingOneSsoSettingsFormEntity.SCOPE}
            disabled
          />
          <p>
            <Trans>Defines which PingOne field needs to be used as Passbolt username.</Trans>
          </p>
        </div>
        <div className={`input text required ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
          <label htmlFor="sso-pingone-email-claim-input">
            <Trans>Email claim</Trans>
          </label>
          <input
            id="sso-pingone-email-claim-input"
            type="text"
            className="fluid form-element"
            name="email_claim"
            ref={this.inputRefs.email_claim}
            value={ssoConfig.email_claim}
            onChange={this.handleInputChange}
            placeholder={this.translate("Email claim")}
            disabled={this.hasAllInputDisabled()}
          />
          {errors?.hasError("email_claim") && (
            <div className="error-message">{this.displayErrors(errors.getError("email_claim"))}</div>
          )}
          <p>
            <Trans>Defines which PingOne field needs to be used as Passbolt username.</Trans>
          </p>
        </div>
      </>
    );
  }
}

PingOneSsoProviderForm.propTypes = {
  adminSsoContext: PropTypes.object, // The administration sso configuration context
  clipboardContext: PropTypes.object, // The clipboard context
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withClipboard(withAdminSso(withTranslation("common")(PingOneSsoProviderForm))));
