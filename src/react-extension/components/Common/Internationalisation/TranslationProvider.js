/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since        3.2.0
 */
import { use, changeLanguage } from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";

/**
 * The locales default path.
 * @type {string}
 */
const defaultLocalesPath = "/locales/{{lng}}/{{ns}}.json";

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
      ready: false, // if i18n ready
    };
  }

  async componentDidMount() {
    await use(initReactI18next)
      .use(HttpApi)
      // init i18next, for all options read: https://www.i18next.com/overview/configuration-options
      .init({
        lng: this.locale,
        load: "currentOnly",
        interpolation: {
          escapeValue: false, // not needed since react already escape - https://github.com/i18next/react-i18next/issues/277
        },
        react: {
          useSuspense: false,
          /*
           * For information, some autoclosing tags are not transformed by the <Trans> component but are transformed by the library we
           * are using to externalize the strings. Therefore, the string containing these tags can generate missingKey error
           * while executing the i18next.t function. Avoid using these tags in the <Trans> component:
           * @see https://react.i18next.com/latest/trans-component#using-for-less-than-br-greater-than-and-other-simple-html-elements-in-translations-v-10-4-0
           * transSupportBasicHtmlNodes: true,
           * transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p']
           */
        },
        backend: {
          loadPath: (lngs, namespaces) => this.getTranslationPath(lngs, namespaces),
        },
        supportedLngs: this.supportedLocales,
        fallbackLng: false,
        ns: ["common"],
        defaultNS: "common",
        keySeparator: false, // don't use the dot for separator of nested json object
        nsSeparator: false, // allowed ':' in key to avoid namespace separator
        debug: false,
      });
    this.setState({ ready: true });
  }

  /**
   * Generates the translation file path for i18next with en-GB to en-UK locale mapping.
   *
   * i18next no longer supports the non-canonical locale code 'en-UK' and automatically
   * falls back to the canonical 'en-GB' code. To maintain our existing implementation
   * which uses 'en-UK' folder structure, this method intercepts the en-GB fallback
   * and redirects it to our en-UK translation files.
   * See: https://www.i18next.com/misc/migration-guide#v23.x.x-to-v24.0.0
   *
   * @param {string[]} lngs - Array of language codes from i18next
   * @param {string[]} namespaces - Array of namespace identifiers
   * @returns {string} The resolved translation file path with en-GB mapped to en-UK
   */
  getTranslationPath(lngs, namespaces) {
    const lng = lngs[0];
    const ns = namespaces[0];
    // i18next is doing a fallback on en-GB we are redirecting to our en-UK folder
    const actualLng = lng === "en-GB" ? "en-UK" : lng;
    const basePath = this.props.loadingPath || defaultLocalesPath;
    return basePath.replace("{{lng}}", actualLng).replace("{{ns}}", ns);
  }

  /**
   * Get supported locales.
   * @returns {string[]}
   */
  get supportedLocales() {
    let locales = [];
    if (!this.props.context.siteSettings?.supportedLocales) {
      locales.push(this.locale);
    } else {
      locales = this.props.context.siteSettings?.supportedLocales.map((supportedLocale) => supportedLocale.locale);
    }

    if (locales.includes("en-UK")) {
      locales.push("en-GB"); //Need to add the locale to support i18next fallback as en-UK is not supported
    }
    return locales;
  }

  /**
   * Get the locale
   * @type {string}
   */
  get locale() {
    return this.props.context.locale;
  }

  /**
   * Whenever the component has updated in terms of props
   * @param prevProps
   */
  async componentDidUpdate(prevProps) {
    await this.handleLocaleChange(prevProps.context.locale);
  }

  /**
   * Check if the locale has changed and update
   * @param previousLocale
   */
  async handleLocaleChange(previousLocale) {
    const hasLocaleChanged = this.locale !== previousLocale;
    if (hasLocaleChanged) {
      await changeLanguage(this.locale);
    }
  }

  /**
   * Returns true when the component can be rendered
   */
  get isReady() {
    // Waiting for the i18n initialization to be completed
    return this.state.ready;
  }

  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    return <>{this.isReady && this.props.children}</>;
  }
}

TranslationProvider.propTypes = {
  context: PropTypes.any, // The application context
  loadingPath: PropTypes.any, // The way to load translations files
  children: PropTypes.any, // The children components
};

export default withAppContext(TranslationProvider);
