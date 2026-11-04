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
 * @since         4.5.0
 */

import React from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import HealthcheckService from "../../../../shared/services/api/healthcheck/HealthcheckService";
import HealthcheckEntity from "../../../../shared/models/entity/healthcheck/healthcheckEntity";
import { withActionFeedback } from "../../ActionFeedbackContext";

/**
 * The administration healthcheck context
 * @type{React.Context<Object>}
 */
export const AdministrationHealthcheckContext = React.createContext({
  healthcheckData: null, // The healthcheck data
  endpointEnabled: true, // true if the endpoint is enabled
  setProcessing: () => {}, //Update processing object
  isProcessing: () => {}, // returns true if a process is running and the UI must be disabled
  loadHealthcheckData: () => {}, // Load the healthcheck data
  clearContext: () => {},
  isHealthcheckEndpointEnabled: () => {}, // returns true of the Healthcheck API endpoint is enabled
});

/**
 * The Healthcheck context provider
 */
export class AdministrationHealthcheckContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    const apiClientOptions = props.context.getApiClientOptions();
    this.healthcheckService = new HealthcheckService(apiClientOptions);
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      healthcheckData: null,
      endpointEnabled: true,
      processing: false,
      isProcessing: this.isProcessing.bind(this),
      loadHealthcheckData: this.fetchHealthcheckData.bind(this),
      clearContext: this.clearContext.bind(this),
      isHealthcheckEndpointEnabled: this.isHealthcheckEndpointEnabled.bind(this),
    };
  }

  /**
   * Returns true if the healthcheck API endpoint is enabled.
   * It is true by default as it requires a first call to the endpoint to know if it crashes or not.
   * @returns {boolean}
   */
  isHealthcheckEndpointEnabled() {
    return this.state.endpointEnabled;
  }

  /**
   * Fetches the healthcheck data and updates the state.
   * @return {Promise<void>}
   */
  async fetchHealthcheckData() {
    if (!this.isHealthcheckEndpointEnabled()) {
      return;
    }

    this.setProcessing(true);
    try {
      const result = await this.healthcheckService.fetchHealthcheck();
      if (result) {
        const healthData = new HealthcheckEntity(result);
        this.setState({ healthcheckData: healthData });
      } else {
        this.props.actionFeedbackContext.displayError("No data received from the server");
      }
    } catch (error) {
      console.error(error);
      this.setState({ endpointEnabled: false });
      this.props.actionFeedbackContext.displayError(error.message);
    } finally {
      this.setProcessing(false);
    }
  }

  /**
   * Resets the state to its default.
   */
  /**
   * Puts the state to its default in order to avoid keeping the data users didn't want to save.
   */
  clearContext() {
    this.setState(this.defaultState);
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
   * Render the component
   * @returns{JSX}
   */
  render() {
    return (
      <AdministrationHealthcheckContext.Provider value={this.state}>
        {this.props.children}
      </AdministrationHealthcheckContext.Provider>
    );
  }
}

AdministrationHealthcheckContextProvider.propTypes = {
  context: PropTypes.any,
  actionFeedbackContext: PropTypes.any,
  children: PropTypes.any,
};

export default withAppContext(withActionFeedback(AdministrationHealthcheckContextProvider));

/**
 * Healthcheck Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdministrationHealthcheck(WrappedComponent) {
  return class WithAdministrationHealthcheck extends React.Component {
    render() {
      return (
        <AdministrationHealthcheckContext.Consumer>
          {(adminHealthcheckContext) => (
            <WrappedComponent adminHealthcheckContext={adminHealthcheckContext} {...this.props} />
          )}
        </AdministrationHealthcheckContext.Consumer>
      );
    }
  };
}
