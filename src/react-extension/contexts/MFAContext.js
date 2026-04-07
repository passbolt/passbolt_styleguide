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
 * @since         3.10.0
 */

import React from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../../shared/context/AppContext/AppContext";
import { MfaPolicyEnumerationTypes } from "../../shared/models/mfaPolicy/MfaPolicyEnumeration";
import MfaPolicyService from "../../shared/services/api/mfaPolicy/MfaPolicyService";
import MFAService from "../../shared/services/api/Mfa/MfaService";

// The mfa settings workflow states.
export const MfaSettingsWorkflowStates = {
  OVERVIEW: "Overview",
  TOTPOVERVIEW: "Totp Overview",
  SCANTOTPCODE: "Scan totp code",
  VIEWCONFIGURATION: "View a totp configuration",
  SETUPYUBIKEY: "Setup Yubikey",
  SETUPDUO: "Setup Duo",
};

export const Providers = {
  TOTP: "totp",
  YUBIKEY: "yubikey",
  DUO: "duo",
};

/**
 * The Mfa Context
 * @type {React.Context<Object>}
 */
export const MfaContext = React.createContext({
  state: null, // Orchestration state
  setup: null, // Orchestration the setup flow
  provider: null, //The actual provider selected
  getPolicy: () => {}, // Returns settings for UI changes
  getMfaOrganisationSettings: () => {}, // Returns the organization mfa setting
  getMfaUserSettings: () => {}, // Returns the user mfa settings
  findPolicy: () => {}, // Find the current self registraiton settings and store it in the state
  setProcessing: () => {}, //Update processing object
  isProcessing: () => {}, // returns true if a process is running and the UI must be disabled
  clearContext: () => {}, // put the data to its default state value
  isMfaChoiceRequired: () => {}, //return is an user has to perform a mfa or not
  checkMfaChoiceRequired: () => {}, //return is an user has to perform a mfa or not
  hasMfaUserSettings: () => {}, // returns if user has already defined its mfa settings
  navigate: () => {}, // Change state for orchestration
  setProvider: () => {}, //Init the provider and the state to follow
  goToProviderList: () => {}, //Cancel a setup process or/and go to mfa providers
  validateTotpCode: () => {}, //Validate the totp code
  removeProvider: () => {}, //Remove an existing provider
  validateYubikeyCode: () => {}, //Validate the yubikey code
});

/**
 * The MFA context provider
 */
export class MfaContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      state: MfaSettingsWorkflowStates.OVERVIEW, // The current mfa settings workflow state.
      setup: null, // The current mfa settings workflow state.
      policy: null,
      provider: null, //Current selected provider
      processing: true, // Context is processing data
      mfaUserSettings: null, // Check if settings are defined
      mfaOrganisationSettings: null, // Check if settings are defined
      mfaChoiceRequired: false, // Check if user has to perform mfa
      getPolicy: this.getPolicy.bind(this), // Returns policy for MFA Policy
      getMfaOrganisationSettings: this.getMfaOrganisationSettings.bind(this), // Returns the organization mfa setting
      getMfaUserSettings: this.getMfaUserSettings.bind(this), // Returns the user mfa settings
      findPolicy: this.findPolicy.bind(this), // Find the current MFA Policy
      findMfaSettings: this.findMfaSettings.bind(this), // Find the current MFA settings
      isProcessing: this.isProcessing.bind(this), // returns true if a process is running and the UI must be disabled
      setProcessing: this.setProcessing.bind(this), // set processing
      hasMfaOrganisationSettings: this.hasMfaOrganisationSettings.bind(this), // returns if organisation has already defined his mfa settings
      hasMfaUserSettings: this.hasMfaUserSettings.bind(this), // returns if user has already defined his mfa settings
      clearContext: this.clearContext.bind(this), // put the data to its default state value
      checkMfaChoiceRequired: this.checkMfaChoiceRequired.bind(this), //return is an user has to perform a mfa or not
      isMfaChoiceRequired: this.isMfaChoiceRequired.bind(this), //return is an user has to perform a mfa or not
      navigate: this.navigate.bind(this), //navigate to step
      setProvider: this.setProvider.bind(this), //Init the provider and the state to follow
      goToProviderList: this.goToProviderList.bind(this), //Cancel a setup process or/and go to mfa providers
      validateTotpCode: this.validateTotpCode.bind(this), //Validate the totp code
      removeProvider: this.removeProvider.bind(this), //Remove an existing provider
      validateYubikeyCode: this.validateYubikeyCode.bind(this), //Validate the yubikey code
      handleGetStartedWithDuo: this.handleGetStartedWithDuo.bind(this), //Handle the "Get started" button click for DUO.
    };
  }

  /**
   * Find the mfa policy settings
   * @return {Promise<void>}
   */
  async findPolicy() {
    const { policy: currentPolicy } = this.state;
    if (currentPolicy !== null) {
      return currentPolicy;
    }

    this.setProcessing(true);
    let result;
    if (this.props.context.port) {
      result = await this.props.context.port.request("passbolt.mfa-policy.get-policy");
    } else {
      // Fallback for pages served by API
      const mfaPolicyService = new MfaPolicyService(this.props.context.getApiClientOptions());
      result = await mfaPolicyService.find();
    }
    const policy = result ? result.policy : null;
    this.setState({ policy });
    this.setProcessing(false);
    return policy;
  }

  /**
   * Find the mfa settings of the current user
   * @return {Promise<void>}
   */
  async findMfaSettings() {
    this.setProcessing(true);
    let settings;
    if (this.props.context.port) {
      settings = await this.props.context.port.request("passbolt.mfa-policy.get-mfa-settings");
    } else {
      // Fallback for pages served by API
      const mfaService = new MFAService(this.props.context.getApiClientOptions());
      settings = await mfaService.findAllSettings();
    }
    const mfaUserSettings = settings.MfaAccountSettings;
    const mfaOrganisationSettings = settings.MfaOrganizationSettings;
    this.setState({ mfaUserSettings, mfaOrganisationSettings });
    this.setProcessing(false);
    return { mfaUserSettings, mfaOrganisationSettings };
  }

  /**
   * Returns the policy for MFA.
   * @returns {object}
   */
  getPolicy() {
    return this.state.policy;
  }

  /**
   * Returns the mfa organisations settings.
   * @returns {object}
   */
  getMfaOrganisationSettings() {
    return this.state.mfaOrganisationSettings;
  }

  /**
   * Returns the mfa user settings.
   * @returns {object}
   */
  getMfaUserSettings() {
    return this.state.mfaUserSettings;
  }

  /**
   * Returns true organization settings has MFA defined
   * @returns {boolean}
   */
  hasMfaOrganisationSettings() {
    return (
      this.state.mfaOrganisationSettings && Object.values(this.state.mfaOrganisationSettings).some((value) => value)
    );
  }

  /**
   * Returns true user settings has MFA defined
   * @returns {boolean}
   */
  hasMfaUserSettings() {
    return this.state.mfaUserSettings && Object.values(this.state.mfaUserSettings).some((value) => value);
  }

  /**
   * Returns true when the data is under processing
   * @returns {boolean}
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
    this.setState({ processing });
  }

  /**
   * Puts the state to its default in order to avoid keeping the data users didn't want to save.
   */
  clearContext() {
    const { policy, processing } = this.defaultState;
    this.setState({
      policy,
      processing,
    });
  }

  /**
   * checkMfaChoiceRequired if mfa settings is required
   * @returns {bool}
   */
  async checkMfaChoiceRequired() {
    const policy = await this.findPolicy();
    if (policy === null || policy !== MfaPolicyEnumerationTypes.MANDATORY) {
      return false;
    }
    const { mfaUserSettings, mfaOrganisationSettings } = await this.findMfaSettings();
    const hasOrgSettings = mfaOrganisationSettings && Object.values(mfaOrganisationSettings).some((value) => value);
    const hasUserSettings = mfaUserSettings && Object.values(mfaUserSettings).some((value) => value);
    // set the latest value returned from findMfaSettings instead of reading stale data
    this.setState({ mfaChoiceRequired: hasOrgSettings && !hasUserSettings });
  }

  /**
   * Returns true if the current user has to choose for a mfa setting.
   * @returns {bool}
   */
  isMfaChoiceRequired() {
    return this.state.mfaChoiceRequired;
  }

  /**
   * Change mfa settings state
   * @params {string} next state step
   * @returns {void}
   */
  navigate(state) {
    this.setState({ state });
  }

  /**
   * Cancel a setup process or go back to mfa settings providers
   */
  goToProviderList() {
    this.setState({ state: MfaSettingsWorkflowStates.OVERVIEW, provider: null });
  }

  /**
   * Set the selected provider and the next step
   * @params {string} next setup state
   * @returns {void}
   */
  setProvider(provider) {
    this.setState({ provider });
  }

  /**
   * Validate the totp provider with code and uri provided during setup
   * @param {string} otpProvisioningUri
   * @param {string} totp
   * @returns {Promise<void>}
   */
  async validateTotpCode(otpProvisioningUri, totp) {
    try {
      this.setProcessing(true);
      await this.props.context.port.request("passbolt.mfa-setup.verify-totp-code", {
        otpProvisioningUri,
        totp,
      });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this.setProcessing(false);
    }
  }

  /**
   * Validate the totp provider with code and uri provided during setup
   * @param {string} hotp
   * @returns {Promise<void>}
   */
  async validateYubikeyCode(hotp) {
    try {
      this.setProcessing(true);
      await this.props.context.port.request("passbolt.mfa-setup.verify-yubikey-code", {
        hotp,
      });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this.setProcessing(false);
    }
  }

  /**
   * Delete the totp provider from configuration
   * @returns {Promise<void>}
   */
  async removeProvider() {
    try {
      this.setProcessing(true);
      await this.props.context.port.request("passbolt.mfa-setup.remove-provider", { provider: this.state.provider });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this.setProcessing(false);
    }
  }

  /**
   * Handle the start of the Duo MFA setup process.
   * Sends a request to the background page to initiate the Duo provider configuration.
   * @returns {Promise<void>}
   */
  async handleGetStartedWithDuo() {
    await this.props.context.port.request("passbolt.mfa-setup.start-with-duo");
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return <MfaContext.Provider value={this.state}>{this.props.children}</MfaContext.Provider>;
  }
}

MfaContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};

export default withAppContext(MfaContextProvider);

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withMfa(WrappedComponent) {
  return class WithMfa extends React.Component {
    render() {
      return (
        <MfaContext.Consumer>
          {(mfaContext) => <WrappedComponent mfaContext={mfaContext} {...this.props} />}
        </MfaContext.Consumer>
      );
    }
  };
}
