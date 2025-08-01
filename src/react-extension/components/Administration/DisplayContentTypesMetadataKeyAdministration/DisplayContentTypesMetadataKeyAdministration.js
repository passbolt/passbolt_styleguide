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
 * @since         4.11.0
 */

import PropTypes from "prop-types";
import React, {Component} from 'react';
import {Trans, withTranslation} from "react-i18next";
import memoize from "memoize-one";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import MetadataSettingsServiceWorkerService
  from "../../../../shared/services/serviceWorker/metadata/metadataSettingsServiceWorkerService";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withDialog} from "../../../contexts/DialogContext";
import {formatDateTimeAgo} from "../../../../shared/utils/dateUtils";
import MetadataKeysServiceWorkerService
  from "../../../../shared/services/serviceWorker/metadata/metadataKeysServiceWorkerService";
import Fingerprint from "../../Common/Fingerprint/Fingerprint";
import GpgServiceWorkerService from "../../../../shared/services/serviceWorker/crypto/gpgServiceWorkerService";
import MetadataKeysCollection from "../../../../shared/models/entity/metadata/metadataKeysCollection";
import MetadataKeysSettingsFormEntity from "../../../../shared/models/entity/metadata/metadataKeysSettingsFormEntity";
import MetadataKeyEntity from "../../../../shared/models/entity/metadata/metadataKeyEntity";
import DisplayContentTypesMetadataKeyAdministrationActions from "./DisplayContentTypesMetadataKeyAdministrationActions";
import EntityValidationError from "../../../../shared/models/entity/abstract/entityValidationError";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import MetadataKeysSettingsEntity from "../../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import {createSafePortal} from "../../../../shared/utils/portals";
import FileTextSVG from "../../../../img/svg/file_text.svg";

class DisplayContentTypesMetadataKeyAdministration extends Component {
  /**
   * The original settings.
   * @type {MetadataKeysSettingsFormEntity}
   */
  originalSettings = null;

  /**
   * The form settings.
   * @type {MetadataKeysSettingsFormEntity}
   */
  formSettings = null;

  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.metadataSettingsServiceWorkerService = props.metadataSettingsServiceWorkerService
      ?? new MetadataSettingsServiceWorkerService(props.context.port);
    this.metadataKeysServiceWorkerService = props.metadataKeysServiceWorkerService
      ?? new MetadataKeysServiceWorkerService(props.context.port);
    this.gpgServiceWorkerService = props.gpgServiceWorkerService
      ?? new GpgServiceWorkerService(props.context.port);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {Object}
   */
  get defaultState() {
    return {
      isProcessing: true, // Is the form processing (loading, submitting).
      hasAlreadyBeenValidated: false, // True if the form has already been submitted once.
      settings: { // Form data
        allow_usage_of_personal_keys: true,
        zero_knowledge_key_share: false,
        generated_metadata_key: null, // The generated metadata key.
      },
      activeMetadataKeys: null, // Active metadata keys.
      expiredMetadataKeys: null, // Expired metadata keys.
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.generateMetadataKey = this.generateMetadataKey.bind(this);
    this.save = this.save.bind(this);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    await this.loadKeysSettings();
    await this.loadKeys();
    this.setState({isProcessing: false});
  }

  /**
   * Load the metadata key settings.
   * If the settings cannot be loaded, display the error dialog.
   * @returns {Promise<void>}
   */
  async loadKeysSettings() {
    try {
      const settings = await this.metadataSettingsServiceWorkerService.findKeysSettings();
      this.originalSettings = new MetadataKeysSettingsFormEntity(settings.toDto(), {validate: false});
      this.formSettings = new MetadataKeysSettingsFormEntity(settings.toDto(), {validate: false});
      this.setState({settings: this.formSettings.toDto()});
    } catch (error) {
      await this.handleUnexpectedError(error);
    }
  }

  /**
   * Handle unexpected error
   * @param {Error} error The error
   * @returns {Promise<string>} Return the dialog key identifier.
   */
  handleUnexpectedError(error) {
    console.error(error);
    if (error.name !== "UserAbortsOperationError") {
      return this.props.dialogContext.open(NotifyError, {error});
    }
  }

  /**
   * Load the metadata keys.
   * If the metadata keys cannot be loaded, display the error dialog.
   * @returns {Promise<void>}
   */
  async loadKeys() {
    try {
      const metadataKeys = await this.metadataKeysServiceWorkerService.findAll();
      const activeMetadataKeys = (new MetadataKeysCollection(metadataKeys));
      activeMetadataKeys.filterByCallback(metadataKey => !metadataKey.expired);
      const expiredMetadataKeys = (new MetadataKeysCollection(metadataKeys));
      expiredMetadataKeys.filterByCallback(metadataKey => metadataKey.expired);
      const armoredKeys = metadataKeys.items.map(metadataKey => metadataKey.armoredKey);
      const metadataKeysInfo = await this.gpgServiceWorkerService.keysInfo(armoredKeys);
      this.setState({activeMetadataKeys, expiredMetadataKeys, metadataKeysInfo});
    } catch (error) {
      await this.handleUnexpectedError(error);
    }
  }

  /**
   * Check if the data have been changed.
   * @param {object} formSetingsDto The form settings dto store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   * @param {MetadataKeysSettingsFormEntity} originalSettings The metadata key settings as originally provided by the API.
   * @param {MetadataKeysSettingsFormEntity} formSettings The metadata key settings updated by the user.
   * @param {object} formSetingsDto The form settings dto store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   * @param {ResourceTypesCollection} resourceTypes The resource types.
   * @return {EntityValidationError}
   */
  // eslint-disable-next-line no-unused-vars
  hasSettingsChanges = memoize((originalSettings, formSettings, formSettingsDto) => originalSettings?.hasDiffProps(formSettings)
      || originalSettings?.generatedMetadataKey !== formSettings?.generatedMetadataKey);

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    if (this.hasAllInputDisabled()) {
      return;
    }
    const {type, checked, value, name} = event.target;
    let parsedValue = value;
    if (type === "checkbox") {
      parsedValue = checked;
    }
    if (name === "allow_usage_of_personal_keys" || name === "zero_knowledge_key_share") {
      parsedValue = value === "true";
    }
    this.setFormPropertyValue(name, parsedValue);
  }

  /**
   * Set a form property value. Trigger the validation if the form has already been submitted once.
   * @param name
   * @param parsedValue
   */
  setFormPropertyValue(name, parsedValue) {
    this.formSettings.set(name, parsedValue, {validate: false});
    this.setState({settings: this.formSettings.toDto()});
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.isProcessing;
  }

  /**
   * Generate a new metadata key
   * @return {Promise}
   */
  async generateMetadataKey() {
    const metadataKeysInfo = this.state.metadataKeysInfo;
    const activeMetadataKeys = this.state.activeMetadataKeys;

    this.setState({isProcessing: true});
    try {
      const metadataKeyPair = await this.metadataKeysServiceWorkerService.generateKeyPair();
      const metadataKeyInfo = await this.gpgServiceWorkerService.keyInfo(metadataKeyPair.publicKey.armoredKey);
      metadataKeysInfo.push(metadataKeyInfo);
      const metadataKey = new MetadataKeyEntity({armored_key: metadataKeyPair.publicKey.armoredKey, fingerprint: metadataKeyInfo.fingerprint});
      activeMetadataKeys.push(metadataKey);
      this.formSettings.generatedMetadataKey = metadataKeyPair;
      this.setState({activeMetadataKeys, metadataKeysInfo, settings: this.formSettings.toDto()});
    } catch (error) {
      await this.handleUnexpectedError(error);
    }

    this.setState({isProcessing: false});
  }

  /**
   * Handle form submission that can be trigger when hitting `enter`
   * @param {Event} event The html event triggering the form submit.
   */
  handleFormSubmit(event) {
    // Avoid the form to be submitted natively by the browser and avoid a redirect to a broken page.
    event.preventDefault();
    this.save();
  }

  /**
   * Save the settings.
   * @returns {Promise<void>}
   */
  async save() {
    if (this.state.isProcessing) {
      return;
    }

    this.setState({isProcessing: true});
    const validationError = this.validateForm(this.state.settings);
    if (validationError?.hasErrors()) {
      this.setState({isProcessing: false, hasAlreadyBeenValidated: true});
      return;
    }

    try {
      await this.saveMetadataKeysSettings();
      await this.createMetadataKey();
      await this.props.actionFeedbackContext.displaySuccess(this.props.t("The metadata key settings were updated."));
    } catch (error) {
      await this.handleUnexpectedError(error);
    }

    this.setState({
      isProcessing: false,
      settings: this.formSettings.toDto()
    });
  }

  /**
   * Validate form.
   * @param {object} formSetingsDto The form settings dto store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   * @return {EntityValidationError|null}
   */
  // eslint-disable-next-line no-unused-vars
  validateForm = memoize(formSettingsDto => {
    if (!this.formSettings) {
      return null;
    }
    let validationErrors = this.formSettings.validate();
    // An active metadata key is required to save the settings. If none is yet defined and no new key was generated, notify the administrator.
    if (!this.state.activeMetadataKeys.length) {
      validationErrors = validationErrors || new EntityValidationError();
      validationErrors.addError("generated_metadata_key", "required", this.props.t("A shared metadata key is required."));
    }

    return validationErrors;
  });

  /**
   * Save the metadata keys settings.
   * @returns {Promise<void>}
   */
  async saveMetadataKeysSettings() {
    const metadataKeysSettings = new MetadataKeysSettingsEntity(this.formSettings.toDto());
    const savedMetadataKeysSettings = await this.metadataSettingsServiceWorkerService.saveKeysSettings(metadataKeysSettings);
    // Update the form settings information with the saved metadata keys settings return by the API.
    this.originalSettings = new MetadataKeysSettingsFormEntity({...this.originalSettings.toDto(), ...savedMetadataKeysSettings.toDto()});
    this.formSettings = new MetadataKeysSettingsFormEntity({...this.formSettings.toDto(), ...savedMetadataKeysSettings.toDto()});
  }

  /**
   * Create the metadata key.
   * @returns {Promise<void>}
   */
  async createMetadataKey() {
    if (!this.formSettings.generatedMetadataKey) {
      return;
    }
    const metadataKey = await this.metadataKeysServiceWorkerService.createKey(this.formSettings.generatedMetadataKey);
    const activeMetadataKeys = this.state.activeMetadataKeys;
    activeMetadataKeys.pushOrReplace(metadataKey, {}, {replacePropertyName: "fingerprint"});
    this.formSettings.generatedMetadataKey = null;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const errors = this.state.hasAlreadyBeenValidated ? this.validateForm(this.state.settings) : null;
    const hasSettingsChanges = this.hasSettingsChanges(this.originalSettings, this.formSettings, this.state.settings);

    return (
      <div className="row">
        <div id="content-types-metadata-key-settings" className="main-column">
          <div className="main-content">
            <form onSubmit={this.handleFormSubmit} data-testid="submit-form">
              <h3 className="title"><label><Trans>Metadata key</Trans></label></h3>
              <p className="description">
                <Trans>This section controls the layer of encryption that is used to protect metadata such as the name of
                  a resource, URIs, etc.</Trans>
              </p>

              <h4 className="no-border">
                <Trans>Metadata key policy</Trans></h4>

              <p className="description">
                <Trans>It is possible for users to use their personal keys to encrypt resources metadata for more
                  security. However you can elect to enforce the use of the shared metadata keys for all resources
                  metadata for auditing purposes. Secrets such as passwords will always be encrypted using the user
                  personal keys.</Trans>
              </p>

              <div className="radiolist-alt">
                <div
                  className={`input radio ${this.state.settings.allow_usage_of_personal_keys === true ? "checked" : ""} ${this.hasAllInputDisabled() && 'disabled'}`}>
                  <input type="radio"
                    value="true"
                    onChange={this.handleInputChange}
                    name="allow_usage_of_personal_keys"
                    checked={this.state.settings.allow_usage_of_personal_keys === true}
                    id="allowUsageOfPersonalKeysInput"
                    disabled={this.hasAllInputDisabled()}/>
                  <label htmlFor="allowUsageOfPersonalKeysInput">
                    <span className="name"><Trans>Allow the use of personal keys. (Recommended)</Trans></span>
                    <span className="info">
                      <Trans>Users can use shared and personal keys. By default personal resources that are not shared
                  will be encrypted with the users personal keys.</Trans><br/>
                    </span>
                  </label>
                </div>
                <div
                  className={`input radio ${this.state.settings.allow_usage_of_personal_keys === false ? "checked" : ""} ${this.hasAllInputDisabled() && 'disabled'}`}>
                  <input type="radio"
                    value="false"
                    onChange={this.handleInputChange}
                    name="allow_usage_of_personal_keys"
                    checked={this.state.settings.allow_usage_of_personal_keys === false}
                    id="disallowUsageOfPersonalKeysInput"
                    disabled={this.hasAllInputDisabled()}/>
                  <label htmlFor="disallowUsageOfPersonalKeysInput">
                    <span className="name"><Trans>Enforce the use of shared metadata keys.</Trans></span>
                    <span className="info">
                      <Trans>By default, metadata wil be encrypted with the shared keys. It is not possible to use
                    personal keys to encrypt metadata.</Trans><br/>
                    </span>
                  </label>
                </div>
              </div>

              <h4><Trans>Zero knowledge (Coming soon)</Trans></h4>

              <p className="description">
                <Trans>This section defines how the shared metadata key is shared with users.</Trans>
              </p>

              <div className="radiolist-alt">
                <div
                  className={`input radio ${this.state.settings.zero_knowledge_key_share === false ? "checked" : ""} ${this.hasAllInputDisabled() && 'disabled'}`}>
                  <input type="radio"
                    value="true"
                    name="zero_knowledge_key_share"
                    checked={this.state.settings.zero_knowledge_key_share === false}
                    id="disableZeroKnowledgeKeyShareInput"
                    disabled={true}/>
                  <label htmlFor="disableZeroKnowledgeKeyShareInput">
                    <span className="name"><Trans>User-friendly mode (Better on-boarding)</Trans></span>
                    <span className="info">
                      <Trans>The shared metadata key is accessible to the server and can be shared by the server when a
                    user completes the setup. In practice, an attacker with full server access can see the shared metadata.</Trans><br/>
                    </span>
                  </label>
                </div>
                <div
                  className={`input radio ${this.state.settings.zero_knowledge_key_share === true ? "checked" : ""} disabled`}>
                  <input type="radio"
                    value="true"
                    name="zero_knowledge_key_share"
                    checked={this.state.settings.zero_knowledge_key_share === true}
                    id="enableZeroKnowledgeKeyShareInput"
                    disabled={true}/>
                  <label htmlFor="enableZeroKnowledgeKeyShareInput">
                    <span className="name"><Trans>Zero-knowledge mode (More secure)</Trans></span>
                    <span className="info">
                      <Trans>The shared metadata key is not available to the server and must be shared with users by the
                    admins. New users are not allowed to create or access shared content until they are provided the
                    metadata key. It is recommended to rotate the key if you switch to that mode.</Trans><br/>
                    </span>
                  </label>
                </div>
              </div>
              <h4><Trans>Shared metadata keys</Trans></h4>

              <div className={`metadata-key-info ${errors?.hasError("generated_metadata_key", "required") && "error"}`}>
                {this.state.activeMetadataKeys?.length > 0 &&
                  <div id="metadata-active-keys">
                    {this.state.activeMetadataKeys?.items.map(metadataKey => {
                      const metadataKeyInfo = this.state.metadataKeysInfo?.getFirst("fingerprint", metadataKey.fingerprint);
                      return <table key={metadataKey.fingerprint}className="table-info">
                        <tbody>
                          <tr className="fingerprint">
                            <td className="label"><Trans>Fingerprint</Trans></td>
                            <td className="value"><Fingerprint fingerprint={metadataKey.fingerprint}/></td>
                          </tr>
                          <tr className="algorithm">
                            <td className="label"><Trans>Algorithm</Trans></td>
                            <td
                              className="value">{metadataKeyInfo?.algorithm} {metadataKeyInfo?.curve}</td>
                          </tr>
                          <tr className="key-length">
                            <td className="label"><Trans>Key length</Trans></td>
                            <td className="value">{metadataKeyInfo?.length}</td>
                          </tr>
                          <tr className="created">
                            <td className="label"><Trans>Created</Trans></td>
                            {metadataKey.created &&
                            <td className="value"><span
                              title={metadataKey.created}>{formatDateTimeAgo(metadataKey.created, this.props.t, this.props.context.locale)}</span>
                            </td>
                            }
                            {!metadataKey.created &&
                            <td className="empty-value"><Trans>Pending</Trans></td>
                            }
                          </tr>
                        </tbody>
                      </table>;
                    })}
                  </div>
                }

                {!this.state.activeMetadataKeys?.length &&
                  <div id="no-metadata-active-keys">
                    <table className="table-info">
                      <tbody>
                        <tr>
                          <td className="empty-value"><Trans>You need to generate a new shared key to enable encrypted metadata.</Trans></td>
                          <td className="table-button">
                            <button className="button primary medium" type="button" disabled={this.hasAllInputDisabled()}
                              onClick={this.generateMetadataKey} data-testid="generate-key-buton">
                              <Trans>Generate key</Trans>
                            </button>
                          </td>
                        </tr>
                        {errors?.hasError("generated_metadata_key", "required") &&
                        <tr className="error-message">
                          <Trans>A shared metadata key is required.</Trans>
                        </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                }

                {this.state.expiredMetadataKeys?.length > 0 &&
                  <>
                    <h4><Trans>Previous keys</Trans></h4>

                    <div id="metadata-expired-keys">
                      {this.state.expiredMetadataKeys?.items.map(metadataKey => {
                        const metadataKeyInfo = this.state.metadataKeysInfo.getFirst("fingerprint", metadataKey.fingerprint);
                        return <table key={metadataKey.fingerprint} className="table-info">
                          <tbody>
                            <tr className="fingerprint">
                              <td className="label"><Trans>Fingerprint</Trans></td>
                              <td className="value"><Fingerprint fingerprint={metadataKey.fingerprint}/></td>
                            </tr>
                            <tr className="algorithm">
                              <td className="label"><Trans>Algorithm</Trans></td>
                              <td
                                className="value">{metadataKeyInfo?.algorithm} {metadataKeyInfo?.curve}</td>
                            </tr>
                            <tr className="key-length">
                              <td className="label"><Trans>Key length</Trans></td>
                              <td className="value">{metadataKeyInfo?.length}</td>
                            </tr>
                            <tr className="created">
                              <td className="label"><Trans>Created</Trans></td>
                              <td className="value"><span
                                title={metadataKey.created}>{formatDateTimeAgo(metadataKey.created, this.props.t, this.props.context.locale)}</span>
                              </td>
                            </tr>
                            <tr className="expired">
                              <td className="label"><Trans>Expired</Trans></td>
                              <td className="value"><span
                                title={metadataKey.expired}>{formatDateTimeAgo(metadataKey.expired, this.props.t, this.props.context.locale)}</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>;
                      })}
                    </div>
                  </>
                }
              </div>
            </form>
          </div>
          {hasSettingsChanges &&
            <div className="warning message form-banner">
              <div>
                <p>
                  <Trans>Don&apos;t forget to save your settings to apply your modification.</Trans>
                </p>
              </div>
            </div>
          }
          {errors?.hasError("generated_metadata_key", "required") &&
            <div className="warning message form-banner">
              <div>
                <p>
                  <Trans>A shared metadata key is required to save the metadata keys settings.</Trans>
                </p>
              </div>
            </div>
          }
        </div>
        <DisplayContentTypesMetadataKeyAdministrationActions
          onSaveRequested={this.save}
          isProcessing={this.state.isProcessing}
        />
        {createSafePortal(
          <div className="sidebar-help-section">
            <h3><Trans>Need help?</Trans></h3>
            <p><Trans>For more information about the content type support and migration, checkout the dedicated page on the official website.</Trans></p>
            <a className="button" target="_blank" rel="noopener noreferrer" href="https://passbolt.com/docs/admin/metadata-encryption/manage-metadata-key/" >
              <FileTextSVG/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>,
          document.getElementById("administration-help-panel")
        )}
      </div>
    );
  }
}

DisplayContentTypesMetadataKeyAdministration.propTypes = {
  context: PropTypes.object, // Defined the expected type for context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  dialogContext: PropTypes.object, // The dialog context
  createPortal: PropTypes.func, // The mocked create portal react dom primitive if test needed.
  metadataSettingsServiceWorkerService: PropTypes.object, // The Bext service that handle metadata settings requests.
  metadataKeysServiceWorkerService: PropTypes.object, // The Bext service that handle metadata keys requests.
  gpgServiceWorkerService: PropTypes.object, // The Bext service that handle gpg requests.
  t: PropTypes.func, // translation function
};

export default withAppContext(
  withDialog(
    withActionFeedback(
      withTranslation('common')(DisplayContentTypesMetadataKeyAdministration))));
