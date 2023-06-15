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
 * @since         3.8.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import InternationalisationService from '../../../../shared/services/api/Internationalisation/InternationalisationService';

/**
 * The Administration Internationalization Context
 * @type {React.Context<Object>}
 */
export const AdminInternationalizationContext = React.createContext({
  getCurrentLocale: () => {}, // Returns settings saved
  getLocale: () => {}, // Returns settings for UI changes
  supportedLocales: () => {}, // Return supported locales
  setLocale: () => {}, // Set the settings object with changes
  hasLocaleChanges: () => {}, // Check if the settings has changes
  findLocale: () => {}, // Find the current Internalisation settings and store it in the state
  save: () => {}, // Save settings
  setProcessing: () => {}, //Update processing object
  isProcessing: () => {}, // returns true if a process is running and the UI must be disabled
  clearContext: () => {}, // put the data to its default state value
});

/**
 * The Administration Internationalization context provider
 */
export class AdminInternationalizationContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    const apiClientOptions = props.context.getApiClientOptions();
    this.internalisationService = new InternationalisationService(apiClientOptions);
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      currentLocale: null, // The current locale
      locale: "en-UK", // Change done to the current
      processing: true, // Context is processing data
      getCurrentLocale: this.getCurrentLocale.bind(this), // Returns locale saved
      getLocale: this.getLocale.bind(this), // Returns locale for UI changes
      setLocale: this.setLocale.bind(this),  // Set the locale with changes
      findLocale: this.findLocale.bind(this), // Find the current settings and store it in the state
      hasLocaleChanges: this.hasLocaleChanges.bind(this), // Check if locale has changes
      isProcessing: this.isProcessing.bind(this), // returns true if a process is running and the UI must be disabled
      setProcessing: this.setProcessing.bind(this),
      save: this.save.bind(this), // Save the policy changes
      clearContext: this.clearContext.bind(this), // put the data to its default state value
    };
  }

  /**
   * Find locale from API
   * @returns {string}
   */
  findLocale() {
    this.setProcessing(true);
    const result = this.props.context.siteSettings.locale;
    //Init saved locale
    this.setState({currentLocale: result});
    //Init locale which will interact with UI
    this.setState({locale: result});

    this.setProcessing(false);
  }

  /**
   * Returns the locale actually saved
   * @returns {object}
   */
  getCurrentLocale() {
    return this.state.currentLocale;
  }

  /**
   * Returns the locale that have been fetch previously.
   * @returns {object}
   */
  getLocale() {
    return this.state.locale;
  }

  /**
   * Handle locale changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async setLocale(locale) {
    await this.setState({locale});
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
   * Check if there are changes to apply
   * @returns {Boolean}
   */
  hasLocaleChanges() {
    return this.state.locale !== this.state.currentLocale;
  }

  /**
   * Puts the state to its default in order to avoid keeping the data users didn't want to save.
   */
  clearContext() {
    const {currentLocale, locale, processing} = this.defaultState;
    this.setState({
      currentLocale, locale, processing
    });
  }

  /**
   * Whenever the save has been requested
   */
  async save() {
    this.setProcessing(true);
    await this.internalisationService.save({value: this.state.locale});
    this.props.context.onRefreshLocaleRequested(this.state.locale);
    this.findLocale();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AdminInternationalizationContext.Provider value={this.state}>
        {this.props.children}
      </AdminInternationalizationContext.Provider>
    );
  }
}

AdminInternationalizationContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
};

export default withAppContext(AdminInternationalizationContextProvider);

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminInternationalization(WrappedComponent) {
  return class WithAdminInternationalization extends React.Component {
    render() {
      return (
        <AdminInternationalizationContext.Consumer>
          {
            adminInternationalizationContext => <WrappedComponent adminInternationalizationContext={adminInternationalizationContext} {...this.props} />
          }
        </AdminInternationalizationContext.Consumer>
      );
    }
  };
}
