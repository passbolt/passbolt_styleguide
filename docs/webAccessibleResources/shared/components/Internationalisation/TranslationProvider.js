/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since        3.2.0
 */
import i18n from 'i18next';
import {I18nextProvider} from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import React, {Component} from "react";
import PropTypes from "prop-types";

/**
 * The locales default url.
 * @type {string}
 */
const DEFAULT_LOCALE_URL = '/locales/{{lng}}/{{ns}}.json';

/**
 * This component set up the translation process
 */
class TranslationProvider extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      i18next: null // The i18next instance
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    if (this.props.locale) {
      this.initI18next();
    }
  }

  /**
   * Whenever the component has updated in terms of props
   */
  async componentDidUpdate(prevProps) {
    await this.handleLocaleChange(prevProps);
  }

  /**
   * Check if the locale has changed and update
   */
  async handleLocaleChange(prevProps) {
    if (this.props.locale !== prevProps?.locale) {
      this.initI18next();
    }
  }

  /**
   * Initialize i18next.
   * @returns {Promise<void>}
   */
  async initI18next() {
    const i18next = i18n.createInstance();
    await i18next
      // I18next plugin used to load the translations json over http.
      .use(HttpApi)
      // init i18next, once done store the i18next instance in the state.
      .init(this.i18nextOptions, () => this.setState({i18next, locale: this.props.locale}));
  }

  /**
   * Get the i18next options.
   * For more information, checkout: https://www.i18next.com/overview/configuration-options
   * @returns {Object}
   */
  get i18nextOptions() {
    return {
      lng: this.props.locale,
      load: "currentOnly",
      react: {
        useSuspense: false,
      },
      backend: {
        loadPath: this.props.loadingPath
      },
      supportedLngs: [this.props.locale],
      fallbackLng: false,
      ns: ["common"],
      defaultNS: "common",
      keySeparator: false, // don't use the dot for separator of nested json object
      nsSeparator: false, // allowed ':' in key to avoid namespace separator
      debug: false,
    };
  }

  /**
   * Returns true when the component can be rendered
   */
  get isReady() {
    return this.state.i18next !== null;
  }

  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    return (
      <>
        {// Waiting for the i18n initialization to be completed
          this.isReady &&
          <I18nextProvider i18n={this.state.i18next}>
            {this.props.children}
          </I18nextProvider>
        }
      </>
    );
  }
}

TranslationProvider.propTypes = {
  loadingPath: PropTypes.any, // The way to load translations files
  children: PropTypes.any, // The children components
  locale: PropTypes.string // The locale to use. i.e. en-UK
};

TranslationProvider.defaultProps = {
  loadingPath: DEFAULT_LOCALE_URL
};

export default TranslationProvider;
