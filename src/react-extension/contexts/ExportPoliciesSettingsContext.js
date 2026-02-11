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
 * @since         5.10.0
 */

import React from "react";
import PropTypes from "prop-types";
import ExportPoliciesSettingsServiceWorkerService from "../../shared/services/serviceWorker/exportPoliciesSettings/exportPoliciesSettingsServiceWorkerService";
import { withAppContext } from "../../shared/context/AppContext/AppContext";

export const ExportPoliciesSettingsContext = React.createContext({
  getSettings: () => {},
});

export class ExportPoliciesSettingsContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState();
    this.runningGetSettingsPromise = null;
    this.exportPoliciesSettingsServiceWorkerService = new ExportPoliciesSettingsServiceWorkerService(
      props.context.port,
    );
  }

  /**
   * Returns the default component state
   */
  defaultState() {
    return {
      exportPoliciesSettings: null,
      getSettings: this.getSettings.bind(this),
    };
  }

  /**
   * Get the export policies settings.
   * If the settings are not yet loaded, triggers a load and returns null.
   * @returns {ExportPoliciesSettingsEntity|null}
   */
  getSettings() {
    if (!this.state.exportPoliciesSettings) {
      this.loadSettings();
      return null;
    }

    return this.state.exportPoliciesSettings;
  }

  /**
   * Load the export policies settings from the service worker.
   * Deduplicates concurrent calls.
   * @returns {Promise<void>}
   */
  async loadSettings() {
    if (this.runningGetSettingsPromise !== null) {
      await this.runningGetSettingsPromise;
      return;
    }

    this.runningGetSettingsPromise = this.exportPoliciesSettingsServiceWorkerService.getSettings();
    const exportPoliciesSettings = await this.runningGetSettingsPromise;
    this.runningGetSettingsPromise = null;
    this.setState({ exportPoliciesSettings });
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <ExportPoliciesSettingsContext.Provider value={this.state}>
        {this.props.children}
      </ExportPoliciesSettingsContext.Provider>
    );
  }
}

ExportPoliciesSettingsContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children component
};

ExportPoliciesSettingsContextProvider.displayName = "ExportPoliciesSettingsContextProvider";

export default withAppContext(ExportPoliciesSettingsContextProvider);

/**
 * Export Policies Settings Context Consumer HOC
 * @param WrappedComponent
 */
export function withExportPoliciesSettings(WrappedComponent) {
  return class withExportPoliciesSettings extends React.Component {
    render() {
      return (
        <ExportPoliciesSettingsContext.Consumer>
          {(context) => (
            <WrappedComponent
              exportPoliciesSettingsContext={context}
              exportPoliciesSettings={context.getSettings()}
              {...this.props}
            />
          )}
        </ExportPoliciesSettingsContext.Consumer>
      );
    }
  };
}
