/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.3
 */

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import SelfRegistrationService from "../../../../shared/services/api/selfRegistration/selfRegistrationService";
import SelfRegistrationDomainsViewModel from "../../../../shared/models/selfRegistration/SelfRegistrationDomainsViewModel";
import MapObject from "../../../lib/Map/MapObject";
import SelfRegistrationDto from "../../../../shared/models/selfRegistration/SelfRegistrationDto";
import SelfRegistrationFormService from "../../../../shared/services/forms/selfRegistration/SelfRegistrationFormService";
import ConfirmSaveSelfRegistrationSettings from "../../../components/Administration/DisplaySelfRegistrationAdministration/ConfirmSaveSelfRegistrationSettings/ConfirmSaveSelfRegistrationSettings";
import NotifyError from "../../../components/Common/Error/NotifyError/NotifyError";
import {withActionFeedback} from "../../ActionFeedbackContext";
import {withDialog} from "../../DialogContext";
import {withTranslation} from "react-i18next";
import ConfirmDeletionSelfRegistrationSettings from "../../../components/Administration/DisplaySelfRegistrationAdministration/ConfirmDeletionSelfRegistrationSettings/ConfirmDeletionSelfRegistrationSettings";

/**
 * The Administration Self registration Context
 * @type {React.Context<Object>}
 */
export const AdminSelfRegistrationContext = React.createContext({
  getCurrentSettings: () => {}, // Returns settings saved
  getAllowedDomains: () => {}, // Returns allowed domains for UI changes
  setAllowedDomains: () => {}, // Returns allowed domains for UI changes
  hasSettingsChanges: () => {}, // Check if the policy has changes
  setDomains: () => {}, // change domains
  findSettings: () => {}, // Find the current self registraiton settings and store it in the state
  setProcessing: () => {}, //Update processing object
  isProcessing: () => {}, // returns true if a process is running and the UI must be disabled
  clearContext: () => {}, // put the data to its default state value
  isSubmitted: () => {}, // returns the value submitted
  setSubmitted: () => {}, // Set the submitted variable
  setErrors: () => {}, // Set errors to object object
  getErrors: () => {}, // Return current errors
  setError: () => {}, // Init errors object message
  save: () => {}, // Save settings,
  delete: () => {}, // Delete settings,
  shouldFocus: () => {}, // Return the focus object,
  setFocus: () => {}, // Set the focus object,
  isSaved: () => {}, // return saved value
  setSaved: () => {}, // init saved value
  validateForm: () => {} // Validate the form
});

/**
 * The Administration self registration context provider
 */
export class AdminSelfRegistrationContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    const apiClientOptions = props.context.getApiClientOptions();
    this.selfRegistrationService = new SelfRegistrationService(
      apiClientOptions
    );
    this.selfRegistrationFormService = new SelfRegistrationFormService(
      this.props.t
    );
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      errors: new Map(), // The error map object
      submitted: false, // The informations about the form state
      currentSettings: null, // The current settings
      focus: false, // return request to focus to input
      saved: false, // return request to inform about a saved
      domains: new SelfRegistrationDomainsViewModel(), // Change done to the allowed domains object
      processing: true, // Context is processing data
      getCurrentSettings: this.getCurrentSettings.bind(this), // Returns settings saved
      getAllowedDomains: this.getAllowedDomains.bind(this), // Returns allowed domains for UI changes
      setAllowedDomains: this.setAllowedDomains.bind(this), // Returns allowed domains for UI changes
      setDomains: this.setDomains.bind(this), // change domains
      findSettings: this.findSettings.bind(this), // Find the current self registraiton settings and store it in the state
      hasSettingsChanges: this.hasSettingsChanges.bind(this), // Check if setting has changes
      isProcessing: this.isProcessing.bind(this), // returns true if a process is running and the UI must be disabled
      setProcessing: this.setProcessing.bind(this),
      clearContext: this.clearContext.bind(this), // put the data to its default state value
      isSubmitted: this.isSubmitted.bind(this), // returns the value submitted
      setSubmitted: this.setSubmitted.bind(this), // Set the submitted variable
      getErrors: this.getErrors.bind(this), // Return current errors
      setError: this.setError.bind(this), // Set an error to object object
      setErrors: this.setErrors.bind(this), // Set errors to object object
      save: this.save.bind(this), // Save the policy changes
      shouldFocus: this.shouldFocus.bind(this), // Return the focus object,
      setFocus: this.setFocus.bind(this), // Set the focus object
      isSaved: this.isSaved.bind(this), // return saved value
      setSaved: this.setSaved.bind(this), // init saved value
      deleteSettings: this.deleteSettings.bind(this), // Delete settings,
      validateForm: this.validateForm.bind(this), // Validate the form
    };
  }

  /**
   * Find the self registration settings
   * @return {Promise<void>}
   */
  async findSettings(callback = () => {}) {
    this.setProcessing(true);
    const result = await this.selfRegistrationService.find();
    //Init saved setting
    this.setState({currentSettings: result});
    const domains = new SelfRegistrationDomainsViewModel(result);
    //Init allowed domains which will interact with UI
    this.setDomains(domains, callback);
    this.setProcessing(false);
  }

  /**
   * Returns the setting actually saved inside DB
   * @returns {object}
   */
  getCurrentSettings() {
    return this.state.currentSettings;
  }

  /**
   * Returns the allowed domains settings that have been fetch previously.
   * @returns {object}
   */
  getAllowedDomains() {
    return this.state.domains.allowedDomains;
  }


  /**
   * Handle settings changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  setAllowedDomains(key, value, callback = () => {}) {
    this.setState(prevState => {
      const allowedDomains = MapObject.clone(prevState.domains.allowedDomains);
      allowedDomains.set(key, value);
      return {domains: {allowedDomains}};
    }, callback);
  }

  /**
   * Handle domains changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  setDomains(domains, callback = () => {}) {
    this.setState({domains}, callback);
  }

  /**
   * Returns true when the data is under processing
   * @returns {boolean}
   *
   */
  isProcessing() {
    return this.state.processing;
  }

  /**
   * Handle processing change.
   * @params {Boolean} processing value
   * @returns {void}
   */
  setProcessing(processing) {
    this.setState({processing});
  }

  /**
   * return true if the form has been submitted
   * @returns {Boolean}
   */
  isSubmitted() {
    return this.state.submitted;
  }

  /**
   * change value for isSubmitted
   * @params  {Boolean}
   * @returns {Boolean}
   */
  setSubmitted(submitted) {
    this.setState({submitted});
    this.setFocus(submitted);
  }

  /**
   * return the errors object
   */
  getErrors() {
    return this.state.errors;
  }

  /**
   * return the focus object
   */
  shouldFocus() {
    return this.state.focus;
  }

  /**
   * change value for isSubmitted
   * @params  {Boolean}
   * @returns {Boolean}
   */
  setFocus(focus) {
    this.setState({focus});
  }

  /**
   * set an error to object
   */
  setError(key, value) {
    this.setState(prevState => {
      const errors = MapObject.clone(prevState.errors);
      errors.set(key, value);
      return {errors};
    });
  }

  /**
   * set errors to object
   */
  setErrors(errors) {
    this.setState({errors});
  }

  /**
   * Check if there are changes to apply
   * @returns {Boolean}
   */
  hasSettingsChanges() {
    // we compare the domains from the server vs the UI
    const savedDomains = this.state.currentSettings?.data?.allowed_domains || [];
    const uiDomains = MapObject.listValues(this.state.domains.allowedDomains);

    return (
      (JSON.stringify(savedDomains) !== JSON.stringify(uiDomains))
    );
  }

  /**
   * Puts the state to its default in order to avoid keeping the data users didn't want to save.
   */
  clearContext() {
    const {currentSettings, domains, processing} = this.defaultState;
    this.setState({
      currentSettings,
      domains,
      processing,
    });
  }

  /**
   * Whenever the save has been requested
   */
  async save() {
    this.setSubmitted(true);
    const isValid = await this.validateForm();
    if (isValid) {
      if (this.hasSettingsChanges() && this.getAllowedDomains().size === 0) {
        this.displayConfirmDeletionDialog();
      } else {
        this.displayConfirmSummaryDialog();
      }
    }
  }

  /**
   * validate the form
   * @returns {void}
   */
  async validateForm() {
    const errors = await this.selfRegistrationFormService.validate(this.state.getAllowedDomains());
    this.state.setErrors(errors);
    return errors.size === 0;
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  async handleSubmitError(error) {
    if (error.name !== "UserAbortsOperationError") {
      // Unexpected error occurred.
      console.error(error);
      await this.handleError(error);
    }
  }

  /**
   * Whenever the submit request is done
   */
  async saveSettings() {
    try {
      this.setProcessing(true);
      const newSettings = new SelfRegistrationDto(
        this.state.domains,
        this.state.currentSettings
      );
      await this.selfRegistrationService.save(newSettings);
      await this.findSettings(() => this.setSaved(true));
      await this.props.actionFeedbackContext.displaySuccess(
        this.props.t(
          "The self registration settings for the organization were updated."
        )
      );
    } catch (error) {
      this.handleSubmitError(error);
    } finally {
      this.setProcessing(false);
      this.setSubmitted(false);
    }
  }

  /**
   * handle error to display the error dialog
   * @param error
   */
  async handleError(error) {
    this.handleCloseDialog();
    const errorDialogProps = {
      error: error,
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Handle close dialog
   */
  handleCloseDialog() {
    this.props.dialogContext.close();
  }

  /**
   * Display the confirmation summary dialog
   * @returns {Promise<void>}
   */
  displayConfirmSummaryDialog() {
    this.props.dialogContext.open(ConfirmSaveSelfRegistrationSettings, {
      domains: this.getAllowedDomains(),
      onSubmit: () => this.saveSettings(),
      onClose: () => this.handleCloseDialog(),
    });
  }

  /**
   * Display the confirmation dialog for deletion seytings
   * @returns {Promise<void>}
   */
  displayConfirmDeletionDialog() {
    this.props.dialogContext.open(ConfirmDeletionSelfRegistrationSettings, {
      onSubmit: () => this.deleteSettings(),
      onClose: () => this.handleCloseDialog(),
    });
  }

  /**
   * Whenever the delete has been requested
   */
  async deleteSettings() {
    try {
      this.setProcessing(true);
      await this.selfRegistrationService.delete(this.state.currentSettings.id);
      await this.findSettings();
      await this.props.actionFeedbackContext.displaySuccess(
        this.props.t(
          "The self registration settings for the organization were updated."
        )
      );
    } catch (error) {
      this.handleSubmitError(error);
    } finally {
      this.setProcessing(false);
      this.setSubmitted(false);
    }
  }

  /**
   * return the saved state
   */
  isSaved() {
    return this.state.saved;
  }

  /**
   * Set saved state
   * @Param {Boolean}
   */
  setSaved(saved) {
    return this.setState({saved});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AdminSelfRegistrationContext.Provider value={this.state}>
        {this.props.children}
      </AdminSelfRegistrationContext.Provider>
    );
  }
}

AdminSelfRegistrationContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
  t: PropTypes.any, // The translate context
  dialogContext: PropTypes.any, // The dialog context
  actionFeedbackContext: PropTypes.object, // The action feedback context
};

export default withAppContext(withDialog(withActionFeedback(withTranslation("common")(AdminSelfRegistrationContextProvider))));

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminSelfRegistration(WrappedComponent) {
  return class WithAdminSelfRegistration extends React.Component {
    render() {
      return (
        <AdminSelfRegistrationContext.Consumer>
          {adminSelfRegistrationContext => (
            <WrappedComponent
              adminSelfRegistrationContext={adminSelfRegistrationContext}
              {...this.props}
            />
          )}
        </AdminSelfRegistrationContext.Consumer>
      );
    }
  };
}
