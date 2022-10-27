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
 * @since         2.13.0
 */
import React from "react";
import PropTypes from "prop-types";
import Icon from "../../../../shared/components/Icons/Icon";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import DisplayAdministrationMfaActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationMfaActions/DisplayAdministrationMfaActions";
import {withAdminMfa} from "../../../contexts/Administration/AdministrationMfa/AdministrationMfaContext";
import MfaFormService from '../../../../shared/services/forms/Mfa/MfaFormService';
import Password from "../../../../shared/components/Password/Password";

/**
 * This component allows to display the MFA for the administration
 */
class DisplayMfaAdministration extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.mfaFormService = MfaFormService.getInstance(this.props.adminMfaContext, this.props.t);
    this.bindCallbacks();
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */

  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationMfaActions);
    this.props.adminMfaContext.findMfaSettings();
  }

  /**
   * componentWillUnmount
   * Use to clear the data from the form in case the user put something that needs to be cleared.
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    this.props.adminMfaContext.clearContext();
    MfaFormService.killInstance();
    this.mfaFormService = null;
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
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
    this.props.adminMfaContext.setSettings(name, value);
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.props.adminMfaContext.isProcessing();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const isSubmitted = this.props.adminMfaContext.isSubmitted();
    const settings = this.props.adminMfaContext.getSettings();
    const errors = this.props.adminMfaContext.getErrors();

    return (
      <div className="row">
        <div className="mfa-settings col7 main-column">
          <h3>Multi Factor Authentication</h3>
          <p><Trans>In this section you can choose which multi factor authentication will be available.</Trans></p>
          <h4 className="no-border">
            <span className="input toggle-switch form-element ready">
              <input id="totp-provider-toggle-button" type="checkbox" className="toggle-switch-checkbox checkbox" name="totpProviderToggle"
                onChange={this.handleInputChange} checked={settings.totpProviderToggle} disabled={this.hasAllInputDisabled()}/>
              <label htmlFor="totp-provider-toggle-button"><Trans>Time-based One Time Password</Trans></label>
            </span>
          </h4>
          {!settings.totpProviderToggle &&
          <p className="description">
            <Trans>The Time-based One Time Password provider is disabled for all users.</Trans>
          </p>
          }
          {settings.totpProviderToggle &&
          <p className="description">
            <Trans>The Time-based One Time Password provider is enabled for all users. They can setup this provider in their profile and use it as second factor authentication.</Trans>
          </p>
          }
          <h4>
            <span className="input toggle-switch form-element">
              <input id="yubikey-provider-toggle-button" type="checkbox" className="toggle-switch-checkbox checkbox" name="yubikeyToggle"
                onChange={this.handleInputChange} checked={settings.yubikeyToggle} disabled={this.hasAllInputDisabled()}/>
              <label htmlFor="yubikey-provider-toggle-button">Yubikey</label>
            </span>
          </h4>
          {!settings.yubikeyToggle &&
          <p className="description">
            <Trans>The Yubikey provider is disabled for all users.</Trans>
          </p>
          }
          {settings.yubikeyToggle &&
          <>
            <p className="description">
              <Trans>The Yubikey provider is enabled for all users. They can setup this provider in their profile and use it as second factor authentication.</Trans>
            </p>
            <div className={`input text required ${errors.yubikeyClientIdentifierError && isSubmitted ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label><Trans>Client identifier</Trans></label>
              <input id="yubikeyClientIdentifier" type="text" name="yubikeyClientIdentifier" required="required" className="required fluid form-element ready" placeholder="123456789"
                onChange={this.handleInputChange} value={settings.yubikeyClientIdentifier} disabled={this.hasAllInputDisabled()} onBlur={e => this.mfaFormService.validateYubikeyClientIdentifier(e.target.value)}/>
              {errors.yubikeyClientIdentifierError  && isSubmitted &&
              <div className="yubikey_client_identifier error-message">{errors.yubikeyClientIdentifierError}</div>
              }
            </div>
            <div className={`input required input-secret ${this.state.yubikeySecretKeyError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label><Trans>Secret key</Trans></label>
              <Password
                id="yubikeySecretKey"
                onChange={this.handleInputChange}
                autoComplete="off"
                name="yubikeySecretKey"
                placeholder="**********"
                disabled={this.hasAllInputDisabled()}
                value={this.state.yubikeySecretKey}
                preview={true}></Password>
              {this.state.yubikeySecretKeyError &&
              <div className="yubikey_secret_key error-message">{this.state.yubikeySecretKeyError}</div>
              }
            </div>
          </>
          }
          <h4>
            <span className="input toggle-switch form-element ready">
              <input id="duo-provider-toggle-button" type="checkbox" className="toggle-switch-checkbox checkbox" name="duoToggle"
                onChange={this.handleInputChange} checked={settings.duoToggle} disabled={this.hasAllInputDisabled()}/>
              <label htmlFor="duo-provider-toggle-button">Duo</label>
            </span>
          </h4>
          {!settings.duoToggle &&
          <p className="description">
            <Trans>The Duo provider is disabled for all users.</Trans>
          </p>
          }
          {settings.duoToggle &&
          <>
            <p className="description enabled">
              <Trans>The Duo provider is enabled for all users. They can setup this provider in their profile and use it as second factor authentication.</Trans>
            </p>
            <div className={`input text required ${errors.duoHostnameError  && isSubmitted ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label><Trans>Hostname</Trans></label>
              <input id="duoHostname" type="text" name="duoHostname" required="required" className="required fluid form-element ready"
                placeholder="api-24zlkn4.duosecurity.com" value={settings.duoHostname}
                onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()} onBlur={e => this.mfaFormService.validateDuoHostname(e.target.value)}/>
              {(errors.duoHostnameError  && isSubmitted) &&
              <div className="duo_hostname error-message">{errors.duoHostnameError}</div>
              }
            </div>
            <div className={`input text required ${errors.duoIntegrationKeyError  && isSubmitted ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label><Trans>Integration key</Trans></label>
              <input id="duoIntegrationKey" type="text" name="duoIntegrationKey" required="required" className="required fluid form-element ready"
                placeholder="HASJKDSQJO213123KQSLDF" value={settings.duoIntegrationKey}
                onChange={this.handleInputChange} disabled={this.hasAllInputDisabled()} onBlur={e => this.mfaFormService.validateDuoIntegrationKey(e.target.value)}/>
              {(errors.duoIntegrationKeyError  && isSubmitted) &&
              <div className="duo_integration_key error-message">{errors.duoIntegrationKeyError}</div>
              }
            </div>
            <div className={`input text required ${errors.duoSaltError  && isSubmitted ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label><Trans>Salt</Trans></label>
              <Password
                id="duoSalt"
                onChange={this.handleInputChange}
                autoComplete="off"
                name="duoSalt"
                placeholder="**********"
                disabled={this.hasAllInputDisabled()}
                value={this.state.duoSalt}
                preview={true}></Password>
              {this.state.duoSaltError &&
              <div className="duo_salt error-message">{this.state.duoSaltError}</div>
              }
            </div>
            <div className={`input text required ${errors.duoSecretKeyError  && isSubmitted ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label><Trans>Secret key</Trans></label>
              <Password
                id="duoSecretKey"
                onChange={this.handleInputChange}
                autoComplete="off"
                name="duoSecretKey"
                placeholder="**********"
                disabled={this.hasAllInputDisabled()}
                value={this.state.duoSecretKey}
                preview={true}></Password>
              {this.state.duoSecretKeyError &&
              <div className="duo_secret_key error-message">{this.state.duoSecretKeyError}</div>
              }
            </div>
          </>
          }
        </div>
        <div className="col4 last">
          <div className="sidebar-help">
            <h3><Trans>Need help?</Trans></h3>
            <p><Trans>Check out our Multi Factor Authentication configuration guide.</Trans></p>
            <a className="button" href="https://help.passbolt.com/configure" target="_blank" rel="noopener noreferrer">
              <Icon name="document"/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

DisplayMfaAdministration.propTypes = {
  adminMfaContext: PropTypes.object, // The administration workspace context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  t: PropTypes.func, // The translation function
};

export default withAdminMfa(withAdministrationWorkspace(withTranslation('common')(DisplayMfaAdministration)));
