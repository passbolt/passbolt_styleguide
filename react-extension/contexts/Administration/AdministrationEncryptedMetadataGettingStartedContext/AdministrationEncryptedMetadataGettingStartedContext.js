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
 * @since         5.4.0
 */
import React from "react";
import PropTypes from "prop-types";
import FindMetadataGettingStartedSettingsService
  from "../../../../shared/services/metadata/findMetadataGettingStartedSettingsService";
import GettingStartedWithEncryptedMetadataServiceWorkerService
  from "../../../../shared/services/serviceWorker/metadata/gettingStartedWithEncryptedMetadataServiceWorkerService";

export const AdministrationEncryptedMetadataGettingStartedContext = React.createContext({
  get: () => {}, // Get the metadata getting started from the API and init them if not the case already
  metadataGettingStartedSettings: null, // the current metadata getting started settings loaded from the API
  update: () => {}, // triggers an update
});


/**
 * The metadata getting started context provider
 */
class AdministrationEncryptedMetadataGettingStartedContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.runningUpdatePromise = null;
  }

  /**
   * Returns the default component state
   * @returns {Object}
   */
  get defaultState() {
    return {
      get: this.get.bind(this), // Get the metadata getting started or init them if not the case already
      metadataGettingStartedSettings: null, // the current metadata getting started loaded from the API
      update: this.update.bind(this), // triggers an update
    };
  }

  /**
   * Set metadataGettingStartedSettings.
   * @param {MetadataGettingStartedSettingsEntity} metadataGettingStartedSettings The metadata getting started to set.
   * @private
   */
  set(metadataGettingStartedSettings) {
    this.setState({metadataGettingStartedSettings});
  }

  /**
   * Get the metadata getting started and/or init them if not the case already.
   * @returns {MetadataGettingStartedSettingsEntity|null}
   */
  get() {
    if (this.state.metadataGettingStartedSettings === null) {
      this.update();
      return null;
    }

    return this.state.metadataGettingStartedSettings;
  }

  /**
   * Forces the update of the metadata getting started.
   * @return {Promise<void>}
   */
  async update() {
    if (this.runningUpdatePromise === null) {
      this.runningUpdatePromise = this.props.service.findGettingStartedSettings();
      const metadataGettingStartedSettings = await this.runningUpdatePromise;
      this.set(metadataGettingStartedSettings);
      this.runningUpdatePromise = null;
    } else {
      await this.runningUpdatePromise;
    }
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AdministrationEncryptedMetadataGettingStartedContext.Provider value={this.state}>
        {this.props.children}
      </AdministrationEncryptedMetadataGettingStartedContext.Provider>
    );
  }
}

AdministrationEncryptedMetadataGettingStartedContextProvider.propTypes = {
  service: PropTypes.oneOfType([PropTypes.instanceOf(FindMetadataGettingStartedSettingsService), PropTypes.instanceOf(GettingStartedWithEncryptedMetadataServiceWorkerService)]), // The service
  children: PropTypes.any, // The children components
};
export default AdministrationEncryptedMetadataGettingStartedContextProvider;

/**
 * Administration Encrypted Metadata Getting Started Settings Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdministrationEncryptedMetadataGettingStarted(WrappedComponent) {
  return class withAdministrationEncryptedMetadataGettingStarted extends React.Component {
    render() {
      return (
        <AdministrationEncryptedMetadataGettingStartedContext.Consumer>
          {
            administrationEncryptedMetadataGettingStartedContext => <WrappedComponent
              administrationEncryptedMetadataGettingStartedContext={administrationEncryptedMetadataGettingStartedContext}
              metadataGettingStartedSettings={administrationEncryptedMetadataGettingStartedContext.get()}
              {...this.props}
            />
          }
        </AdministrationEncryptedMetadataGettingStartedContext.Consumer>
      );
    }
  };
}

