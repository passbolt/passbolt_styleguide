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
import {createPortal} from "react-dom";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import MetadataSettingsServiceWorkerService from "../../../../shared/services/serviceWorker/metadata/metadataSettingsServiceWorkerService";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withDialog} from "../../../contexts/DialogContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import ResourceTypesFormEntity from "../../../../shared/models/entity/resourceType/resourceTypesFormEntity";
import ResourceTypesServiceWorkerService from "../../../../shared/services/serviceWorker/resourceTypes/resourceTypesServiceWorkerService";
import MetadataKeysServiceWorkerService from "../../../../shared/services/serviceWorker/metadata/metadataKeysServiceWorkerService";

class DisplayContentTypesAllowedContentTypesAdministration extends Component {
  /** @type {ResourceTypesFormEntity}*/
  originalSettings = null;

  /** @type {ResourceTypesFormEntity} */
  formSettings = null;

  /** @type {MetadataTypesSettingsEntity} */
  metadataTypesSettings = undefined;

  /** @type {MetadataKeysCollection} */
  metadataKeys = undefined;

  /**
   * Default constructor
   */
  constructor(props) {
    super(props);

    this.resourceTypesServiceWorkerService = props.resourceTypesServiceWorkerService
      ?? new ResourceTypesServiceWorkerService(props.context.port);

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
        password_v4: false,
        password_v5: false,
        totp_v4: false,
        totp_v5: false,
        password_v4_count: 0,
        password_v5_count: 0,
        totp_v4_count: 0,
        totp_v5_count: 0,
        has_password_v4: false,
        has_totp_v4: false,
        has_password_v5: false,
        has_totp_v5: false,
        has_v4_resource_types: false,
        has_v5_resource_types: false,
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
    const resourceTypes = await this.resourceTypesServiceWorkerService.findAllByDeletedAndNonDeleted();

    this.metadataTypesSettings = await this.metadataSettingsServiceWorkerService.findTypesSettings();
    this.metadataKeys = await this.metadataKeysServiceWorkerService.findAll();

    this.originalSettings = ResourceTypesFormEntity.createFormResourcesTypesCollection(resourceTypes);
    this.formSettings = new ResourceTypesFormEntity(this.originalSettings.toFormDto(), {validate: false});

    this.setState({
      settings: this.formSettings.toFormDto(),
      isProcessing: false
    });
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
   * @return {EntityValidationError}
   */
  verifyDataHealth = memoize((formSettingsDto, metadataTypeSettings, metadataKeys) => this.formSettings?.verifyHealth(metadataTypeSettings, metadataKeys));

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
   * Returns true if the checkbox is disabled.
   * It is disabled if:
   *  - the form is processing
   *  - or there are resources and the box is unchecked (to allow admins to check it back)
   * @param {integer} resourceCount
   * @param {boolean} checkboxState
   * @returns {boolean}
   */
  isInputDisabled(resourceCount, isCheckboxChecked) {
    return this.hasAllInputDisabled() || (resourceCount > 0 && isCheckboxChecked);
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
      this.setState({hasAlreadyBeenValidated: true});
      return;
    }

    this.setState({isProcessing: true});

    try {
      const resourceTypesToUpdate = this.formSettings.toResourceTypesCollection();
      await this.resourceTypesServiceWorkerService.updateAllDeletedStatus(resourceTypesToUpdate);

      const resourceTypes = await this.resourceTypesServiceWorkerService.findAllByDeletedAndNonDeleted();
      this.originalSettings = ResourceTypesFormEntity.createFormResourcesTypesCollection(resourceTypes);
      this.formSettings = new ResourceTypesFormEntity(this.originalSettings.toFormDto());

      await this.props.actionFeedbackContext.displaySuccess(this.props.t("The allowed content types were updated."));
    } catch (error) {
      console.error(error);
      this.props.dialogContext.open(NotifyError, {error});
    }

    this.setState({
      hasAlreadyBeenValidated: true,
      isProcessing: false,
      settings: this.formSettings.toFormDto()
    });
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const errors = this.state.hasAlreadyBeenValidated ? this.validateForm(this.state.settings) : null;
    const warnings = this.verifyDataHealth(this.state.settings, this.metadataTypesSettings, this.metadataKeys);
    const hasSettingsChanges = this.hasSettingsChanges(this.originalSettings, this.formSettings, this.state.settings);

    return (
      <div className="row">
        {(this.props.createPortal || createPortal)(
          <div className="col2_3 actions-wrapper">
            <div className="actions">
              <ul>
                <li>
                  <button type="button" disabled={this.state.isProcessing} onClick={this.handleFormSubmit}>
                    <span><Trans>Save</Trans></span>
                  </button>
                </li>
              </ul>
            </div>
          </div>,
          document.getElementById("administration-actions-content-action")
        )}
        <div id="allow-content-types" className="col8 main-column">
          <form onSubmit={this.handleFormSubmit} data-testid="submit-form">
            <h3><label><Trans>Allow content types</Trans></label></h3>
            {hasSettingsChanges &&
              <div className="warning message form-banner">
                <p><Trans>Don&apos;t forget to save your settings to apply your modification.</Trans></p>
              </div>
            }
            {this.state.settings.has_v5_resource_types &&
              <>
                <h4 className="no-border"><Trans>Encrypted metadata</Trans></h4>
                <p className="description"><Trans>Select which content type with encrypted metadata is available for your whole organisation.</Trans></p>

                <div className="checkboxlist">
                  <span className={`input checkbox form-element ${errors?.hasError("password_v5") && "error"} ${!errors?.hasError("password_v5") && warnings?.hasError("password_v5") && "warning"}`}>
                    <input type="checkbox"
                      id="passwordV5Input"
                      className="checkbox"
                      name="password_v5"
                      onChange={this.handleInputChange}
                      checked={this.state.settings.password_v5}
                      disabled={this.isInputDisabled(this.state.settings.password_v5_count, this.state.settings.password_v5)}/>
                    <label htmlFor="passwordV5Input">
                      <span className="name"><Trans>Password</Trans></span>
                      <span className="info">{this.props.t(`({{count}} resources)`, {count: this.state.settings.password_v5_count})}</span>
                      {errors?.hasError("password_v5", "has_content") &&
                        <div className="error-message"><Trans>One (or more) resource type v5 having a password is deleted but its resources count is not 0.</Trans></div>
                      }
                      {errors?.hasError("password_v5", "minimum_requirement") &&
                        <div className="error-message"><Trans>At least one family of resource types should be selected</Trans></div>
                      }
                      {!errors?.hasError("password_v5") &&
                        <>
                          {warnings?.hasError("password_v5", "is_creation_alowed") &&
                            <div className="warning-message"><Trans>Creation of resource type v5 is allowed but all resource types having passwords are deleted.</Trans></div>
                          }
                          {warnings?.hasError("password_v5", "active_metadata_key") &&
                            <div className="warning-message"><Trans>No active metadata key defined.</Trans></div>
                          }
                        </>
                      }
                    </label>
                  </span>
                  <span className={`input checkbox form-element ${errors?.hasError("totp_v5") && "error"} ${!errors?.hasError("totp_v5") && warnings?.hasError("totp_v5") && "warning"}`}>
                    <input type="checkbox"
                      id="totpV5Input"
                      className="checkbox"
                      name="totp_v5"
                      onChange={this.handleInputChange}
                      checked={this.state.settings.totp_v5}
                      disabled={this.isInputDisabled(this.state.settings.totp_v5_count, this.state.settings.totp_v5)}/>
                    <label htmlFor="totpV5Input">
                      <span className="name"><Trans>TOTP</Trans></span>
                      <span className="info">{this.props.t(`({{count}} resources)`, {count: this.state.settings.totp_v5_count})}</span>
                      {errors?.hasError("totp_v5", "has_content") &&
                        <div className="error-message"><Trans>One (or more) resource type v5 having a totp is deleted but its resources count is not 0.</Trans></div>
                      }
                      {errors?.hasError("totp_v5", "minimum_requirement") &&
                        <div className="error-message"><Trans>At least one family of resource types should be selected</Trans></div>
                      }
                      {!errors?.hasError("totp_v5") &&
                        <>
                          {warnings?.hasError("totp_v5", "is_creation_alowed") &&
                            <div className="warning-message"><Trans>Creation of resource type v5 is allowed but all resource types having totp are deleted.</Trans></div>
                          }
                          {warnings?.hasError("totp_v5", "active_metadata_key") &&
                            <div className="warning-message"><Trans>No active metadata key defined.</Trans></div>
                          }
                        </>
                      }
                    </label>
                  </span>
                </div>
              </>
            }

            {this.state.settings.has_v4_resource_types &&
            <>
              <h4 className={`${!this.state.settings.has_password_v5 && "no-border"}`}><Trans>Legacy cleartext metadata</Trans></h4>
              <p className="description"><Trans>Select which content type with cleartext metadata is available for your whole organisation.</Trans></p>
              <div className="checkboxlist">
                <span className={`input checkbox form-element ${errors?.hasError("password_v4") && "error"} ${!errors?.hasError("password_v4") && warnings?.hasError("password_v4") && "warning"}`}>
                  <input type="checkbox"
                    id="passwordV4Input"
                    className="checkbox"
                    name="password_v4"
                    onChange={this.handleInputChange}
                    checked={this.state.settings.password_v4}
                    disabled={this.isInputDisabled(this.state.settings.password_v4_count, this.state.settings.password_v4)}/>
                  <label htmlFor="passwordV4Input">
                    <span className="name"><Trans>Password</Trans></span>
                    <span className="info">{this.props.t(`({{count}} resources)`, {count: this.state.settings.password_v4_count})}</span>
                    {errors?.hasError("password_v4", "has_content") &&
                      <div className="error-message"><Trans>One (or more) resource type v4 having a password is deleted but its resources count is not 0.</Trans></div>
                    }
                    {errors?.hasError("password_v4", "minimum_requirement") &&
                      <div className="error-message"><Trans>At least one family of resource types should be selected</Trans></div>
                    }
                    {!errors?.hasError("password_v4") && warnings?.hasError("password_v4", "is_creation_alowed") &&
                      <div className="warning-message"><Trans>Creation of resource type v4 is allowed but all resource types having passwords are deleted.</Trans></div>
                    }
                  </label>
                </span>
                <span className={`input checkbox form-element ${errors?.hasError("totp_v4") && "error"} ${!errors?.hasError("totp_v4") && warnings?.hasError("totp_v4") && "warning"}`}>
                  <input type="checkbox"
                    id="totpV4Input"
                    className="checkbox"
                    name="totp_v4"
                    onChange={this.handleInputChange}
                    checked={this.state.settings.totp_v4}
                    disabled={this.isInputDisabled(this.state.settings.totp_v4_count, this.state.settings.totp_v4)}/>
                  <label htmlFor="totpV4Input">
                    <span className="name"><Trans>TOTP</Trans></span>
                    <span className="info">{this.props.t(`({{count}} resources)`, {count: this.state.settings.totp_v4_count})}</span>
                    {errors?.hasError("totp_v4", "has_content") &&
                      <div className="error-message"><Trans>One (or more) resource type v4 having a totp is deleted but its resources count is not 0.</Trans></div>
                    }
                    {errors?.hasError("totp_v4", "minimum_requirement") &&
                      <div className="error-message"><Trans>At least one family of resource types should be selected</Trans></div>
                    }
                    {!errors?.hasError("totp_v4") && warnings?.hasError("totp_v4", "is_creation_alowed") &&
                      <div className="warning-message"><Trans>Creation of resource type v4 is allowed but all resource types having totp are deleted.</Trans></div>
                    }
                  </label>
                </span>
              </div>
            </>
            }
          </form>
        </div>
      </div>
    );
  }
}

DisplayContentTypesAllowedContentTypesAdministration.propTypes = {
  context: PropTypes.object, // Defined the expected type for context
  dialogContext: PropTypes.object, // The dialog context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  createPortal: PropTypes.func, // The mocked create portal react dom primitive if test needed.
  resourceTypesServiceWorkerService: PropTypes.object,
  metadataKeysServiceWorkerService: PropTypes.object,
  metadataSettingsServiceWorkerService: PropTypes.object, // The bext service that handle metadata settings.
  t: PropTypes.func, // translation function
};

export default withAppContext(withActionFeedback(withDialog(withTranslation('common')(DisplayContentTypesAllowedContentTypesAdministration))));
