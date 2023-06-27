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
import {withAppContext} from "../../shared/context/AppContext/AppContext";
import {MfaPolicyEnumerationTypes} from "../../shared/models/mfaPolicy/MfaPolicyEnumeration";
import MFAService from "../../shared/services/api/Mfa/MfaService";
import MfaPolicyService from "../../shared/services/api/mfaPolicy/MfaPolicyService";


/**
 * The Mfa Context
 * @type {React.Context<Object>}
 */
export const MfaContext = React.createContext({
  getPolicy: () => {}, // Returns settings for UI changes
  findPolicy: () => {}, // Find the current self registraiton settings and store it in the state
  setProcessing: () => {}, //Update processing object
  isProcessing: () => {}, // returns true if a process is running and the UI must be disabled
  clearContext: () => {}, // put the data to its default state value
  isMfaChoiceRequired: () => {}, //return is an user has to perform a mfa or not
  checkMfaChoiceRequired: () => {}, //return is an user has to perform a mfa or not
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
    if (this.props.context.getApiClientOptions) {
      this.mfaService = new MFAService(this.props.context.getApiClientOptions());
      this.mfaPolicyService = new MfaPolicyService(this.props.context.getApiClientOptions());
    }
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      policy: null,
      processing: true, // Context is processing data
      mfaUserSettings: null, // Check if settings are defined
      mfaOrganisationSettings: null, // Check if settings are defined
      mfaChoiceRequired: false, // Check if user has to perform mfa
      getPolicy: this.getPolicy.bind(this), // Returns policy for MFA Policy
      findPolicy: this.findPolicy.bind(this), // Find the current MFA Policy
      findMfaSettings: this.findMfaSettings.bind(this), // Find the current MFA settings
      isProcessing: this.isProcessing.bind(this), // returns true if a process is running and the UI must be disabled
      setProcessing: this.setProcessing.bind(this), // set processing
      hasMfaSettings: this.hasMfaSettings.bind(this), // returns if user and organisation has already defined his mfa settings
      hasMfaOrganisationSettings: this.hasMfaOrganisationSettings.bind(this), // returns if organisation has already defined his mfa settings
      hasMfaUserSettings: this.hasMfaUserSettings.bind(this), // returns if user has already defined his mfa settings
      clearContext: this.clearContext.bind(this), // put the data to its default state value
      checkMfaChoiceRequired: this.checkMfaChoiceRequired.bind(this), //return is an user has to perform a mfa or not
      isMfaChoiceRequired: this.isMfaChoiceRequired.bind(this) //return is an user has to perform a mfa or not
    };
  }

  /**
   * Find the mfa policy settings
   * @return {Promise<void>}
   */
  async findPolicy() {
    if (this.getPolicy() === null) {
      this.setProcessing(true);
      let policy = null;
      let result = null;
      if (this.mfaPolicyService) {
        result = await this.mfaPolicyService.find();
      } else {
        result = await this.props.context.port.request("passbolt.mfa-policy.get-policy");
      }
      policy = result ? result.policy : null;
      this.setState({policy});
      this.setProcessing(false);
    }
  }

  /**
   * Find the mfa settings of the current user
   * @return {Promise<void>}
   */
  async findMfaSettings() {
    this.setProcessing(true);
    let settings = null;
    let mfaUserSettings =  null;
    let mfaOrganisationSettings = null;
    if (this.mfaService) {
      settings = await this.mfaService.getUserSettings();
    } else {
      settings = await this.props.context.port.request("passbolt.mfa-policy.get-mfa-settings");
    }
    mfaUserSettings = settings.MfaAccountSettings;
    mfaOrganisationSettings = settings.MfaOrganizationSettings;
    this.setState({mfaUserSettings});
    this.setState({mfaOrganisationSettings});
    this.setProcessing(false);
  }

  /**
   * Returns the policy for MFA.
   * @returns {object}
   */
  getPolicy() {
    return this.state.policy;
  }

  /**
   * Returns if mfa settings are defined.
   * @returns {object}
   */
  hasMfaSettings() {
    return !this.hasMfaOrganisationSettings() || this.hasMfaUserSettings();
  }

  /**
   * Returns true organization settings has MFA defined
   * @returns {boolean}
   */
  hasMfaOrganisationSettings() {
    return this.state.mfaOrganisationSettings &&
      Object.values(this.state.mfaOrganisationSettings).some(value => value);
  }

  /**
   * Returns true user settings has MFA defined
   * @returns {boolean}
   */
  hasMfaUserSettings() {
    return this.state.mfaUserSettings &&
      Object.values(this.state.mfaUserSettings).some(value => value);
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
    this.setState({processing});
  }

  /**
   * Puts the state to its default in order to avoid keeping the data users didn't want to save.
   */
  clearContext() {
    const {policy, processing} = this.defaultState;
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
    await this.findPolicy();
    if (this.getPolicy() === null || this.getPolicy() !== MfaPolicyEnumerationTypes.MANDATORY) {
      return false;
    }
    await this.findMfaSettings();
    this.setState({mfaChoiceRequired: !this.hasMfaSettings()});
  }


  /**
   * Returns true if the current user has to choose for a mfa setting.
   * @returns {bool}
   */
  isMfaChoiceRequired() {
    return this.state.mfaChoiceRequired;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <MfaContext.Provider value={this.state}>
        {this.props.children}
      </MfaContext.Provider>
    );
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
          {mfaContext => (
            <WrappedComponent
              mfaContext={mfaContext}
              {...this.props}
            />
          )}
        </MfaContext.Consumer>
      );
    }
  };
}
