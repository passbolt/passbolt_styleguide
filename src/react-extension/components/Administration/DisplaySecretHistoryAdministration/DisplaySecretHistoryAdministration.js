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
 * @since         5.7.0
 */

import PropTypes from "prop-types";
import React, { Component } from "react";
import { Trans, withTranslation } from "react-i18next";
import memoize from "memoize-one";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import { withDialog } from "../../../contexts/DialogContext";
import { withActionFeedback } from "../../../contexts/ActionFeedbackContext";
import SecretRevisionsSettingsServiceWorkerService from "../../../../shared/services/serviceWorker/secretRevision/secretRevisionsSettingsServiceWorkerService";
import SecretRevisionsSettingsEntity from "../../../../shared/models/entity/secretRevision/secretRevisionsSettingsEntity";

class DisplaySecretHistoryAdministration extends Component {
  /** @type {SecretRevisionsSettingsEntity}*/
  originalSettings = null;

  /** @type {SecretRevisionsSettingsEntity} */
  formSettings = null;

  /**
   * Default constructor
   */
  constructor(props) {
    super(props);

    this.secretRevisionsSettingsServiceWorkerService = new SecretRevisionsSettingsServiceWorkerService(
      props.context.port,
    );

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
      isFeatureEnabled: false, // Is the feature enabled.
      settings: {},
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEnableFeature = this.handleEnableFeature.bind(this);
    this.save = this.save.bind(this);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    this.originalSettings = await this.secretRevisionsSettingsServiceWorkerService.findSettings();
    this.formSettings = new SecretRevisionsSettingsEntity(this.originalSettings.toDto(), { validate: false });
    const settings = this.formSettings.toDto();

    this.setState({
      settings: settings,
      isFeatureEnabled: this.originalSettings.isFeatureEnabled,
      isProcessing: false,
    });
  }

  /**
   * Validate form.
   * @param {object} formSetingsDto The form settings dto store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   * @param {object} formSettingsDto The formSettingsDto.
   * @return {EntityValidationError}
   */
  // eslint-disable-next-line no-unused-vars
  validateForm = memoize((formSettingsDto) => this.formSettings?.validate());

  /**
   * Check if the data have been changed.
   * @param {object} formSetingsDto The form settings dto store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   * @param {boolean} isFeatureEnaled The is feature enabled store in state, not used but required to ensure the memoized
   *   function is only triggered when the form is updated.
   * @return {EntityValidationError}
   */
  hasSettingsChanges = memoize(
    (formSettingsDto, isFeatureEnabled) =>
      this.originalSettings?.hasDiffProps(this.formSettings) ||
      this.originalSettings?.isFeatureEnabled !== isFeatureEnabled,
  );

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const { value, name } = event.target;
    // Add the revision for the current one to be part of the settings but not displayed. (It can be confusing for the administrator)
    const parsedValue = parseInt(value, 10) + 1;
    this.setFormPropertyValue(name, parsedValue);
  }

  /**
   * Set a form property value. Trigger the validation if the form has already been submitted once.
   * @param name
   * @param parsedValue
   */
  setFormPropertyValue(name, parsedValue) {
    this.formSettings.set(name, parsedValue, { validate: false });
    this.setState({ settings: this.formSettings.toDto() });
  }

  /**
   * Get the max revision limit from the organization settings
   * @return {number}
   */
  get maxRevisionsLimit() {
    return this.props.context.siteSettings.getPluginSettings("secretRevisions")?.maxRevisionsLimit || 11;
  }

  /**
   * Get the max revision limit from the organization settings -1 in string to display at the administrator
   * @return {string}
   */
  get maxRevisionsLimitToDisplay() {
    // Remove the current revision only for the display
    return (this.maxRevisionsLimit - 1).toString();
  }

  /**
   * Handle form enable feature changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleEnableFeature(event) {
    const { checked } = event.target;
    if (checked && this.state.settings.max_revisions === 1) {
      // In case the feature is disabled and be enabled set to a default value
      this.setFormPropertyValue("max_revisions", 2);
    }
    this.setState({ isFeatureEnabled: checked });
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
  async handleFormSubmit(event) {
    // Avoid the form to be submitted natively by the browser and avoid a redirect to a broken page.
    event.preventDefault();
    await this.save();
  }

  /**
   * Has max revision error
   * @return {boolean}
   */
  get hasMaxRevisionsError() {
    return this.state.settings.max_revisions < 2 || this.state.settings.max_revisions > this.maxRevisionsLimit;
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
    if (validationError?.hasErrors() || this.hasMaxRevisionsError) {
      this.setState({ hasAlreadyBeenValidated: true });
      return;
    }

    this.setState({ isProcessing: true });

    try {
      const hasToDeleteSettings = !this.state.isFeatureEnabled;
      if (hasToDeleteSettings) {
        await this.deleteSettings();
      } else if (this.state.isFeatureEnabled) {
        await this.saveSettings();
      }
      await this.props.actionFeedbackContext.displaySuccess(this.props.t("The secret history settings were updated."));
    } catch (error) {
      console.error(error);
      this.props.dialogContext.open(NotifyError, { error });
    }

    this.setState({
      hasAlreadyBeenValidated: true,
      isProcessing: false,
      settings: this.formSettings.toDto(),
    });
  }

  /**
   * Delete the settings
   * @return {Promise<void>}
   */
  async deleteSettings() {
    await this.secretRevisionsSettingsServiceWorkerService.deleteSettings();
    this.originalSettings = SecretRevisionsSettingsEntity.createFromDefault();
    this.formSettings = new SecretRevisionsSettingsEntity(this.originalSettings.toDto(), { validate: false });
  }

  /**
   * Save the settings
   * @return {Promise<void>}
   */
  async saveSettings() {
    const settings = this.formSettings.toDto();
    this.originalSettings = new SecretRevisionsSettingsEntity(settings, { validate: false });
    this.originalSettings = await this.secretRevisionsSettingsServiceWorkerService.saveSettings(
      new SecretRevisionsSettingsEntity(settings),
    );
    this.formSettings = new SecretRevisionsSettingsEntity(this.originalSettings.toDto(), { validate: false });
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const errors = this.state.hasAlreadyBeenValidated ? this.validateForm(this.state.settings) : null;
    const hasSettingsChanges = this.hasSettingsChanges(this.state.settings, this.state.isFeatureEnabled);
    const hasMaxRevisionsError =
      errors?.hasError("max_revisions") || (this.state.hasAlreadyBeenValidated && this.hasMaxRevisionsError);

    return (
      <div className="row">
        <div id="secret-history" className="main-column">
          <div className="main-content">
            <form onSubmit={this.handleFormSubmit}>
              <h3 id="secret-history-settings-title" className="title">
                <span className="input toggle-switch form-element">
                  <input
                    type="checkbox"
                    className="toggle-switch-checkbox checkbox"
                    name="secretHistorySettingsToggle"
                    onChange={this.handleEnableFeature}
                    checked={this.state.isFeatureEnabled}
                    disabled={this.hasAllInputDisabled()}
                    id="passwordExpirySettingsToggle"
                  />
                  <label htmlFor="passwordExpirySettingsToggle">
                    <Trans>Secret history</Trans>
                  </label>
                </span>
              </h3>
              {!this.state.isFeatureEnabled && (
                <p className="description">
                  <Trans>
                    No secret history is configured. Enable it to activate and set the number of passwords revisions.
                  </Trans>
                </p>
              )}
              {this.state.isFeatureEnabled && (
                <>
                  <p className="description">
                    <Trans>
                      Control how many revisions are retained, enabling users to view and restore historical data.
                    </Trans>
                  </p>
                  <div className={`input text ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
                    <h4>
                      <label htmlFor="configure-secret-history-form-length">
                        <Trans>History length</Trans>
                      </label>
                    </h4>
                    <div className="slider">
                      {/* Remove the current revision only for the display*/}
                      <input
                        name="max_revisions"
                        min="1"
                        max={this.maxRevisionsLimit - 1}
                        value={this.state.settings.max_revisions - 1}
                        step="1"
                        type="range"
                        onChange={this.handleInputChange}
                        disabled={this.hasAllInputDisabled()}
                      />
                      <input
                        id="configure-secret-history-form-length"
                        type="number"
                        name="max_revisions"
                        min="1"
                        max={this.maxRevisionsLimit - 1}
                        value={this.state.settings.max_revisions - 1}
                        onChange={this.handleInputChange}
                        disabled={this.hasAllInputDisabled()}
                      />
                    </div>
                    <p className="description">
                      <Trans>This is the number of revisions kept once users have access.</Trans>
                    </p>
                    {hasMaxRevisionsError && (
                      <div id="maxRevisions-error" className="error-message">
                        <Trans>The history length must be between 1 and {this.maxRevisionsLimitToDisplay}.</Trans>
                      </div>
                    )}
                  </div>
                </>
              )}
            </form>
          </div>
          {hasSettingsChanges && (
            <div className="warning message">
              <div>
                <p>
                  <b>
                    <Trans>Warning:</Trans>
                  </b>{" "}
                  <Trans>Don&apos;t forget to save your settings to apply your modification.</Trans>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="actions-wrapper">
          <button
            type="button"
            className="button primary"
            disabled={this.state.isProcessing}
            onClick={this.handleFormSubmit}
          >
            <span>
              <Trans>Save</Trans>
            </span>
          </button>
        </div>
      </div>
    );
  }
}

DisplaySecretHistoryAdministration.propTypes = {
  context: PropTypes.object, // Defined the expected type for context
  dialogContext: PropTypes.object, // The dialog context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // translation function
};

export default withAppContext(
  withActionFeedback(withDialog(withTranslation("common")(DisplaySecretHistoryAdministration))),
);
