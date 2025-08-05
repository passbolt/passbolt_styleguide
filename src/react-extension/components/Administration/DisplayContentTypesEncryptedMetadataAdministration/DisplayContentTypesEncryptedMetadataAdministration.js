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
import MetadataTypesSettingsFormEntity from "../../../../shared/models/entity/metadata/metadataTypesSettingsFormEntity";
import MetadataSettingsServiceWorkerService from "../../../../shared/services/serviceWorker/metadata/metadataSettingsServiceWorkerService";
import DisplayContentTypesEncryptedMetadataAdministrationActions from "./DisplayContentTypesEncryptedMetadataAdministrationActions";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withDialog} from "../../../contexts/DialogContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {createSafePortal} from "../../../../shared/utils/portals";
import FileTextSVG from "../../../../img/svg/file_text.svg";
import MetadataKeysServiceWorkerService from "../../../../shared/services/serviceWorker/metadata/metadataKeysServiceWorkerService";

class DisplayContentTypesEncryptedMetadataAdministration extends Component {
  /**
   * The original settings.
   * @type {MetadataTypesSettingsEntity}
   */
  originalSettings = null;

  /**
   * The form settings.
   * @type {MetadataTypesSettingsFormEntity}
   */
  formSettings = null;

  /**
   * the metadata keys collections
   * @type {MetadataKeysCollection}
   */
  metadataKeys = undefined;

  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.metadataSettingsServiceWorkerService = props.metadataSettingsServiceWorkerService
      ?? new MetadataSettingsServiceWorkerService(props.context.port);

    this.metadataKeysServiceWorkerService = props.metadataKeysServiceWorkerService
      ?? new MetadataKeysServiceWorkerService(props.context.port);

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
      settings: {
        default_resource_types: "v4",
        allow_creation_of_v5_resources: false,
        allow_creation_of_v4_resources: false,
        allow_v4_v5_upgrade: false,
        allow_v5_v4_downgrade: false,
      }
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.save = this.save.bind(this);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    this.originalSettings = await this.metadataSettingsServiceWorkerService.findTypesSettings();
    this.formSettings = new MetadataTypesSettingsFormEntity(this.originalSettings.toDto(), {validate: false});
    this.metadataKeys = await this.metadataKeysServiceWorkerService.findAll();
    const isProcessing = false;
    this.setState({settings: this.formSettings.toFormDto(), isProcessing});
  }

  /**
   * Validate form.
   * @param {object} formSetingsDto The form settings dto store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   * @param {ResourceTypesCollection} resourceTypes The resource types.
   * @return {EntityValidationError}
   */
  // eslint-disable-next-line no-unused-vars
  validateForm = memoize(formSettingsDto => this.formSettings?.validate());

  /**
   * Verify the data health. This intends for administrators, helping them adjust settings to prevent unusual or
   * problematic situations. By instance enabling a metadata types without active related content types.
   * @param {object} formSetingsDto The form settings dto store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   * @param {ResourceTypesCollection} resourceTypes The resource types.
   * @param {MetadataKeysCollection} metadataKeysCollection The metadata keys collection.
   * @return {EntityValidationError}
   */
  verifyDataHealth = memoize((formSettingsDto, resourceTypes, metadataKeysCollection) => this.formSettings?.verifyHealth(resourceTypes, metadataKeysCollection));

  /**
   * Check if the data have been changed.
   * @param {object} formSetingsDto The form settings dto store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   * @param {MetadataTypesSettingsFormEntity} originalSettings The metadata settings as originally provided by the API.
   * @param {MetadataTypesSettingsFormEntity} formSettings The metadata settings updated by the user.
   * @param {object} formSetingsDto The form settings dto store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   * @param {ResourceTypesCollection} resourceTypes The resource types.
   * @return {EntityValidationError}
   */
  // eslint-disable-next-line no-unused-vars
  hasSettingsChanges = memoize((originalSettings, formSettings, formSettingsDto) => this.originalSettings?.hasDiffProps(this.formSettings));

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
    const parsedValue =  type === "checkbox" ? checked : value;
    this.setFormPropertyValue(name, parsedValue);
  }

  /**
   * Set a form property value. Trigger the validation if the form has already been submitted once.
   * @param name
   * @param parsedValue
   */
  setFormPropertyValue(name, parsedValue) {
    this.formSettings.set(name, parsedValue, {validate: false});
    this.setState({settings: this.formSettings.toFormDto()});
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.isProcessing;
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
   * Save the settings
   * @returns {Promise<void>}
   */
  async save() {
    if (this.state.isProcessing) {
      return;
    }

    const validationError = this.validateForm(this.state.settings);
    if (validationError?.hasErrors()) {
      const hasAlreadyBeenValidated = true;
      this.setState({hasAlreadyBeenValidated});
      return;
    }

    this.setState({isProcessing: true});

    try {
      this.originalSettings = await this.metadataSettingsServiceWorkerService.saveTypesSettings(this.formSettings);
      this.formSettings = new MetadataTypesSettingsFormEntity(this.originalSettings.toDto());
      await this.props.actionFeedbackContext.displaySuccess(this.props.t("The encrypted metadata settings were updated."));
    } catch (error) {
      this.props.dialogContext.open(NotifyError, {error});
    }

    this.setState({
      hasAlreadyBeenValidated: true,
      isProcessing: false,
      settings: this.formSettings.toDto()
    });
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const errors = this.state.hasAlreadyBeenValidated ? this.validateForm(this.state.settings) : null;
    const warnings = this.verifyDataHealth(this.state.settings, this.props.resourceTypes, this.metadataKeys);
    const hasSettingsChanges = this.hasSettingsChanges(this.originalSettings, this.formSettings, this.state.settings);
    const isFeatureBeta = this.props.context.siteSettings.isFeatureBeta("metadata");

    const shouldDisplayAWarningBlock = isFeatureBeta || hasSettingsChanges;

    return (
      <div className="row">
        <div id="content-types-encrypted-metadata-settings" className="main-column">
          <div className="main-content">
            <form onSubmit={this.handleFormSubmit} data-testid="submit-form">
              <h3 className="title"><label><Trans>Encrypted metadata</Trans></label></h3>
              <p className="description">
                <Trans>Encrypted metadata for resources is available.</Trans> <Trans>Define the strategy to manage and migrate the legacy items.</Trans>
              </p>

              <h4><Trans>Supported metadata types</Trans></h4>
              <p className="description"><Trans>Define which metadata types are enabled for this instance.</Trans></p>
              <div
                className={`input toggle-switch form-element
              ${errors?.hasError("allow_creation_of_v5_resources") ? "error" : ""}
              ${warnings?.hasError("allow_creation_of_v5_resources") ? "warning" : ""}`}>
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="allow_creation_of_v5_resources"
                  id="allowCreationOfV5ResourcesInput"
                  onChange={this.handleInputChange} checked={this.state.settings.allow_creation_of_v5_resources}
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="allowCreationOfV5ResourcesInput">
                  <span className="name"><Trans>Enable encrypted metadata (recommended)</Trans></span>
                  <span className="info">
                    <Trans>Enable encrypted metadata for resources.</Trans>
                  </span>
                  {errors?.hasError("allow_creation_of_v5_resources", "is_default") &&
                    <div className="name error-message"><Trans>Encrypted metadata must be enabled to set it as the default type.</Trans></div>
                  }
                  {!errors?.hasError("allow_creation_of_v5_resources") &&
                    <>
                      {warnings?.hasError("allow_creation_of_v5_resources", "resource_types_deleted") &&
                        <div className="name warning-message"><Trans>All encrypted metadata resource types were previously disabled. Re-enable them if you want users to create resources of this type.</Trans></div>
                      }
                      {warnings?.hasError("allow_creation_of_v5_resources", "active_metadata_key") &&
                        <div className="name warning-message"><Trans>A metadata key should be enabled to allow users to create resources of this type.</Trans></div>
                      }
                    </>
                  }
                </label>
              </div>

              <div
                className={`input toggle-switch form-element
              ${errors?.hasError("allow_creation_of_v4_resources") ? "error" : ""}
              ${warnings?.hasError("allow_creation_of_v4_resources") ? "warning" : ""}`}>
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="allow_creation_of_v4_resources"
                  id="allowCreationOfV4ResourcesInput"
                  onChange={this.handleInputChange} checked={this.state.settings.allow_creation_of_v4_resources}
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="allowCreationOfV4ResourcesInput">
                  <span className="name"><Trans>Enable legacy cleartext metadata</Trans></span>
                  <span className="info">
                    <Trans>Enable legacy cleartext metadata for resources.</Trans>
                  </span>
                  {errors?.hasError("allow_creation_of_v4_resources", "is_default") &&
                    <div className="name error-message"><Trans>Legacy cleartext metadata must be enabled to set it as the default type.</Trans></div>
                  }
                  {!errors?.hasError("allow_creation_of_v4_resources") && warnings?.hasError("allow_creation_of_v4_resources", "resource_types_deleted") &&
                    <div className="name warning-message"><Trans>All legacy cleartext resource types were previously disabled. Re-enable them if you want users to create resources of this type.</Trans></div>
                  }
                </label>
              </div>

              <h4><Trans>Default metadata type</Trans></h4>
              <p className="description"><Trans>Define which metadata type is used by default.</Trans></p>
              <div className="radiolist-alt">
                <div className={`input radio
                  ${this.state.settings.default_resource_types === "v5" ? "checked" : ""}
                  ${errors?.hasError("default_resource_types", "allow_create_v5") ? "error" : ""}
                  ${!errors?.hasError("default_resource_types", "allow_create_v5") && warnings?.hasError("default_resource_types", "resource_types_v5_deleted") ? "warning" : ""}`}>
                  <input type="radio"
                    value="v5"
                    onChange={this.handleInputChange}
                    name="default_resource_types"
                    checked={this.state.settings.default_resource_types === "v5"}
                    id="defaultResourceTypesV5Input"
                    disabled={this.hasAllInputDisabled()}/>
                  <label htmlFor="defaultResourceTypesV5Input">
                    <span className="name bold"><Trans>Encrypted metadata (recommended)</Trans></span>
                    <span className="info">
                      <Trans>Users can create resources with encrypted metadata by default.</Trans><br/>
                    </span>
                    {errors?.hasError("default_resource_types", "allow_create_v5") &&
                      <div className="name error-message"><Trans>Encrypted metadata must be enabled to set it as the default type.</Trans></div>
                    }
                    {!errors?.hasError("default_resource_types", "allow_create_v5") && warnings?.hasError("default_resource_types", "resource_types_v5_deleted") &&
                      <div className="name warning-message"><Trans>All encrypted metadata resource types were previously disabled. Re-enable them if you want users to create resources of this type.</Trans></div>
                    }
                  </label>
                </div>

                <div className={`input radio ${this.state.settings.default_resource_types === "v4" ? 'checked' : ''}
                  ${errors?.hasError("default_resource_types", "allow_create_v4") ? "error" : ""}
                  ${!errors?.hasError("default_resource_types", "allow_create_v4") && warnings?.hasError("default_resource_types", "resource_types_v4_deleted") ? "warning" : ""}`}>
                  <input type="radio"
                    value="v4"
                    onChange={this.handleInputChange}
                    name="default_resource_types"
                    checked={this.state.settings.default_resource_types === "v4"}
                    id="defaultResourceTypesV4Input"
                    disabled={this.hasAllInputDisabled()}/>
                  <label htmlFor="defaultResourceTypesV4Input">
                    <span className="name bold"><Trans>Legacy cleartext metadata</Trans></span>
                    <span className="info">
                      <Trans>Users can create legacy resources with cleartext metadata by default.</Trans>
                    </span>
                    {errors?.hasError("default_resource_types", "allow_create_v4") &&
                      <div className="name error-message"><Trans>Legacy cleartext metadata must be enabled to set it as the default type.</Trans></div>
                    }
                    {!errors?.hasError("default_resource_types", "allow_create_v4") && warnings?.hasError("default_resource_types", "resource_types_v4_deleted") &&
                      <div className="name warning-message"><Trans>All legacy cleartext resource types were previously disabled. Re-enable them if you want users to create resources of this type.</Trans></div>
                    }
                  </label>
                </div>
              </div>
              <h4 className="no-border"><Trans>Self served migration</Trans></h4>
              <div className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="allow_v4_v5_upgrade"
                  id="allowV4V5UpgradeInput"
                  onChange={this.handleInputChange} checked={this.state.settings.allow_v4_v5_upgrade}
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="allowV4V5UpgradeInput" className="text">
                  <Trans>Allow users to upgrade their content from cleartext to encrypted metadata type.</Trans>
                  {warnings?.hasError("allow_v4_v5_upgrade", "resource_types_deleted") &&
                    <div className="name warning-message"><Trans>All encrypted metadata resource types were previously disabled. Re-enable them if you want users to upgrade their resources.</Trans></div>
                  }
                  {warnings?.hasError("allow_v4_v5_upgrade", "allow_creation") &&
                    <div className="name warning-message"><Trans>Encrypted metadata should be enabled to allow users to upgrade their resources.</Trans></div>
                  }
                </label>
              </div>
              <div
                className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="allow_v5_v4_downgrade"
                  id="allowV5V4DowngradeInput"
                  onChange={this.handleInputChange} checked={this.state.settings.allow_v5_v4_downgrade}
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="allowV5V4DowngradeInput" className="text">
                  <Trans>Allow users to downgrade their content from encrypted to cleartext metadata type.</Trans>
                  {warnings?.hasError("allow_v5_v4_downgrade", "resource_types_deleted") &&
                    <div className="name warning-message"><Trans>All legacy cleartext resource types were previously disabled. Re-enable them if you want users to downgrade their resources.</Trans></div>
                  }
                  {warnings?.hasError("allow_v5_v4_downgrade", "allow_creation") &&
                    <div className="name warning-message"><Trans>Legacy cleartext metadata should be enabled to allow users to downgrade their resources.</Trans></div>
                  }
                </label>
              </div>
            </form>
          </div>
          {shouldDisplayAWarningBlock &&
            <div className="warning message">
              {isFeatureBeta &&
                <div>
                  <b><Trans>Warning:</Trans></b> <Trans>Your current API version includes beta support for encrypted metadata and new resource types.</Trans> <Trans>To ensure stability and avoid potential issues, upgrade to the latest version before enabling these features.</Trans>
                </div>
              }
              {hasSettingsChanges &&
                <div className="form-banner">
                  <p><b><Trans>Warning:</Trans></b> <Trans>Don&apos;t forget to save your settings to apply your modification.</Trans></p>
                </div>
              }
            </div>
          }
        </div>
        <DisplayContentTypesEncryptedMetadataAdministrationActions
          onSaveRequested={this.save}
          isProcessing={this.state.isProcessing}
        />
        {createSafePortal(
          <div className="sidebar-help-section">
            <h3><Trans>Need help?</Trans></h3>
            <p><Trans>For more information about the content type support and migration, checkout the dedicated page on the official website.</Trans></p>
            <a className="button" target="_blank" rel="noopener noreferrer" href="https://passbolt.com/docs/admin/metadata-encryption/encrypted-metadata/" >
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

DisplayContentTypesEncryptedMetadataAdministration.propTypes = {
  context: PropTypes.object, // Defined the expected type for context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  dialogContext: PropTypes.object, // The dialog context
  createPortal: PropTypes.func, // The mocked create portal react dom primitive if test needed.
  metadataSettingsServiceWorkerService: PropTypes.object, // The bext service that handle metadata settings.
  metadataKeysServiceWorkerService: PropTypes.object, // The bext service that handle metadata keys
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  t: PropTypes.func, // translation function
};

export default withAppContext(
  withActionFeedback(
    withDialog(
      withResourceTypesLocalStorage(
        withTranslation('common')(DisplayContentTypesEncryptedMetadataAdministration)))));
