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
 * @since         5.13.0
 */

import PropTypes from "prop-types";
import React, { Component } from "react";
import { Trans, withTranslation } from "react-i18next";
import memoize from "memoize-one";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import { withDialog } from "../../../contexts/DialogContext";
import { withActionFeedback } from "../../../contexts/ActionFeedbackContext";
import OfflineModeSettingsServiceWorkerService from "../../../../shared/services/serviceWorker/offline/offlineModeSettingsServiceWorkerService";
import OfflineSettingsEntity from "../../../../shared/models/entity/offline/offlineSettingsEntity";
import Select from "../../Common/Select/Select";
import { createSafePortal } from "../../../../shared/utils/portals";
import DisplayOfflineAdministrationHelp from "./DisplayOfflineAdministrationHelp";

const SESSION_DURATION_OPTIONS = [
  { value: 300, label: "5 minutes" },
  { value: 900, label: "15 minutes" },
  { value: 3600, label: "1 hour" },
  { value: 86400, label: "1 day" },
];

const MAXIMUM_RETENTION_PERIOD_OPTIONS = [
  { value: 86400, label: "1 day" },
  { value: 604800, label: "7 days" },
  { value: 1209600, label: "14 days" },
  { value: 2592000, label: "30 days" },
];

const DEFAULT_OFFLINE_SETTINGS = {
  max_session_duration: SESSION_DURATION_OPTIONS[0].value,
  data_retention_period: MAXIMUM_RETENTION_PERIOD_OPTIONS[0].value,
};

class DisplayOfflineAdministration extends Component {
  /** @type {OfflineSettingsEntity} */
  originalSettings = null;

  /** @type {OfflineSettingsEntity} */
  formSettings = null;

  /**
   * The Offline settings service.
   * @type {OfflineModeSettingsServiceWorkerService}
   */
  offlineModeSettingsServiceWorkerService = null;

  /**
   * Default constructor
   */
  constructor(props) {
    super(props);

    this.offlineModeSettingsServiceWorkerService = new OfflineModeSettingsServiceWorkerService(props.context.port);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {Object}
   */
  get defaultState() {
    return {
      isProcessing: false, // Is the form processing (loading, submitting).
      hasAlreadyBeenValidated: false, // True if the form has already been submitted once.
      enabled: false, // Is the offline mode feature enabled.
      settings: null,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleToggleEnabled = this.handleToggleEnabled.bind(this);
    this.save = this.save.bind(this);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.loadSettingsForm();
  }

  /**
   * Load the offline settings form using the service worker service.
   * @return {Promise<void>}
   */
  async loadSettingsForm() {
    try {
      const offlineSettings = await this.offlineModeSettingsServiceWorkerService.findSettings();
      if (offlineSettings) {
        this.originalSettings = new OfflineSettingsEntity(offlineSettings.toDto(), { validate: false });
        this.formSettings = new OfflineSettingsEntity(offlineSettings.toDto(), { validate: false });
        this.setState({
          settings: this.formSettings.toDto(),
          enabled: true,
        });
      }
    } catch (error) {
      console.error(error);
      this.props.dialogContext.open(NotifyError, { error });
    }
    this.setState({ isProcessing: false });
  }

  /**
   * Set the form with default settings.
   */
  setDefaultSettings() {
    this.formSettings = new OfflineSettingsEntity(DEFAULT_OFFLINE_SETTINGS, { validate: false });
    this.setState({ settings: this.formSettings.toDto() });
  }

  /**
   * Validate form.
   * @return {EntityValidationError|null}
   */
  validateForm() {
    if (!this.formSettings) {
      return null;
    }
    return this.formSettings.validate();
  }

  /**
   * Check if the data have been changed.
   * @param {OfflineSettingsEntity} originalSettings The original settings as provided by the API.
   * @param {OfflineSettingsEntity} formSettings The settings updated by the user.
   * @return {boolean}
   */
  hasSettingsChanges = memoize(
    // eslint-disable-next-line no-unused-vars
    (originalSettings, formSettings, settings) => originalSettings?.hasDiffProps(formSettings) || false,
  );

  /**
   * Handle form input changes.
   * @param {ReactEvent} event The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const { value, name } = event.target;
    const parsedValue = parseInt(value, 10);
    this.setFormPropertyValue(name, parsedValue);
  }

  /**
   * Set a form property value.
   * @param {string} name The property name
   * @param {*} parsedValue The parsed value
   */
  setFormPropertyValue(name, parsedValue) {
    this.formSettings.set(name, parsedValue, { validate: false });
    this.setState({ settings: this.formSettings.toDto() });
  }

  /**
   * Handle enable feature toggle.
   * @returns {void}
   */
  handleToggleEnabled() {
    if (!this.state.enabled) {
      this.setDefaultSettings();
    }
    this.setState({ enabled: !this.state.enabled });
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.isProcessing;
  }

  /**
   * Handle form submission that can be triggered when hitting `enter`
   * @param {Event} event The html event triggering the form submit.
   */
  async handleFormSubmit(event) {
    // Avoid the form to be submitted natively by the browser and avoid a redirect to a broken page.
    event.preventDefault();
    await this.save();
  }

  /**
   * Save the settings.
   * @returns {Promise<void>}
   */
  async save() {
    if (this.state.isProcessing) {
      return;
    }
    this.setState({ isProcessing: true });

    const validationError = this.validateForm();
    if (validationError?.hasErrors()) {
      this.setState({ isProcessing: false, hasAlreadyBeenValidated: true });
      return;
    }

    try {
      const result = await this.saveOfflineSettings();
      this.formSettings = result ? new OfflineSettingsEntity(result.toDto(), { validate: false }) : null;
      this.originalSettings = result ? new OfflineSettingsEntity(this.formSettings.toDto(), { validate: false }) : null;
      this.setState({
        settings: result ? this.formSettings.toDto() : null,
        enabled: result !== null,
      });
      await this.props.actionFeedbackContext.displaySuccess(this.props.t("The offline settings were updated."));
    } catch (error) {
      console.error(error);
      this.props.dialogContext.open(NotifyError, { error });
    }

    this.setState({
      isProcessing: false,
      hasAlreadyBeenValidated: true,
    });
  }

  /**
   * Save the offline settings.
   * @returns {Promise<OfflineSettingsEntity|null>}
   */
  async saveOfflineSettings() {
    if (this.state.enabled) {
      return await this.offlineModeSettingsServiceWorkerService.saveSettings(this.formSettings);
    } else if (this.originalSettings) {
      await this.offlineModeSettingsServiceWorkerService.disableSettings(this.originalSettings.id);
    }
    return null;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const errors = this.state.hasAlreadyBeenValidated ? this.validateForm() : null;
    const hasSettingsChanges = this.hasSettingsChanges(this.originalSettings, this.formSettings, this.state.settings);
    const shouldDisplayAWarningBlock = hasSettingsChanges || Boolean(this.originalSettings) !== this.state.enabled;

    return (
      <div className="row">
        <div id="offline-settings" className="main-column">
          <div className="main-content">
            <form onSubmit={this.handleFormSubmit}>
              <h3 id="offline-settings-title" className="title">
                <span className="input toggle-switch form-element">
                  <input
                    type="checkbox"
                    className="toggle-switch-checkbox checkbox"
                    name="offlineSettingsToggle"
                    onChange={this.handleToggleEnabled}
                    checked={this.state.enabled}
                    id="offlineSettingsToggle"
                  />
                  <label htmlFor="offlineSettingsToggle">
                    <Trans>Offline mode</Trans>
                  </label>
                </span>
              </h3>
              <p className="description">
                <Trans>
                  Enable read-only access to critical credentials when the Passbolt server is unreachable or network
                  connectivity is unavailable.
                </Trans>
              </p>
              {this.state.enabled && this.state.settings && (
                <>
                  <div className={`input text input-wrapper ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
                    <label htmlFor="offline-settings-session-duration">
                      <Trans>Session duration</Trans>
                    </label>
                    <Select
                      id="offline-settings-session-duration"
                      items={SESSION_DURATION_OPTIONS}
                      name="max_session_duration"
                      value={this.state.settings.max_session_duration}
                      onChange={this.handleInputChange}
                      disabled={this.hasAllInputDisabled()}
                    />
                    <p>
                      <Trans>
                        Set how long a user remains authenticated in offline mode before being required to re-enter
                        their passphrase to view cached secrets.
                      </Trans>
                    </p>
                    {errors?.hasError("max_session_duration") && (
                      <div id="session-duration-error" className="error-message">
                        <Trans>The session duration is invalid.</Trans>
                      </div>
                    )}
                  </div>
                  <div className={`input text input-wrapper ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
                    <label htmlFor="offline-settings-maximum-retention-period">
                      <Trans>Maximum data retention period</Trans>
                    </label>
                    <Select
                      id="offline-settings-maximum-retention-period"
                      items={MAXIMUM_RETENTION_PERIOD_OPTIONS}
                      name="data_retention_period"
                      value={this.state.settings.data_retention_period}
                      onChange={this.handleInputChange}
                      disabled={this.hasAllInputDisabled()}
                    />
                    <p>
                      <Trans>
                        Define the maximum amount of time encrypted data is stored on a user&apos;s device before it is
                        automatically cleared to prevent unauthorised access.
                      </Trans>
                    </p>
                    {errors?.hasError("data_retention_period") && (
                      <div id="maximum-retention-period-error" className="error-message">
                        <Trans>The maximum data retention period is invalid.</Trans>
                      </div>
                    )}
                  </div>
                </>
              )}
            </form>
          </div>
          {shouldDisplayAWarningBlock && (
            <div className="warning message">
              <div className="form-banner">
                <p>
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
            disabled={this.state.isProcessing || errors?.hasErrors()}
            onClick={this.handleFormSubmit}
          >
            <span>
              <Trans>Save</Trans>
            </span>
          </button>
        </div>
        {createSafePortal(
          <DisplayOfflineAdministrationHelp
            shouldDisplayWarning={!hasSettingsChanges && this.state.enabled && this.formSettings?.id}
          />,
          document.getElementById("administration-help-panel"),
        )}
      </div>
    );
  }
}

DisplayOfflineAdministration.propTypes = {
  context: PropTypes.object, // The application context
  dialogContext: PropTypes.object, // The dialog context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  t: PropTypes.func, // translation function
};

export default withAppContext(withActionFeedback(withDialog(withTranslation("common")(DisplayOfflineAdministration))));
