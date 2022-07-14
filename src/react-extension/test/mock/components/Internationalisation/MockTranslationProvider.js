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
 * @since        3.0.3
 */
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {Component} from "react";
import PropTypes from "prop-types";
import deTranslations from "../../../../../locales/de-DE/common.json";
import enTranslations from "../../../../../locales/en-UK/common.json";
import esTranslations from "../../../../../locales/es-ES/common.json";
import frTranslations from "../../../../../locales/fr-FR/common.json";
import jaTranslations from "../../../../../locales/ja-JP/common.json";
import ltTranslations from "../../../../../locales/lt-LT/common.json";
import nlTranslations from "../../../../../locales/nl-NL/common.json";
import plTranslations from "../../../../../locales/pl-PL/common.json";
import svTranslations from "../../../../../locales/sv-SE/common.json";

/**
 * This component set up the translation process
 */
class MockTranslationProvider extends Component {
  /**
   *
   * @returns {Promise<void>}
   * @constructor
   */
  constructor(props) {
    super();
    i18n
      // pass the i18n instance to react-i18next.
      .use(initReactI18next)
      // init i18next, for all options read: https://www.i18next.com/overview/configuration-options
      .init({
        lng: props.language || 'en-UK',
        resources: {
          "de-DE": {
            common: deTranslations
          },
          "en-UK": {
            common: enTranslations
          },
          "es-ES": {
            common: esTranslations
          },
          "fr-FR": {
            common: frTranslations
          },
          "ja-JP": {
            common: jaTranslations
          },
          "lt-LT": {
            common:  ltTranslations
          },
          "nl-NL": {
            common: nlTranslations
          },
          "pl-PL": {
            common: plTranslations
          },
          "sv-SE": {
            common: svTranslations
          }
        },
        react: {
          useSuspense: false,
        },
        fallbackLng: false,
        ns: ['common'],
        defaultNS: 'common',
        keySeparator: false, // don't use the dot for separator of nested json object
        nsSeparator: false, // allowed ':' in key to avoid namespace separator
        debug: false,
      });
  }

  /**
   * Applies a language change whenever it's needed.
   * This method is use isntead of the others to provide the new locale before an updates occur.
   * This way the translation used and displayed is the right one.
   *
   * @param {*} nextProps
   * @returns
   */
  async shouldComponentUpdate(nextProps) {
    await this.handleChangeLanguage(nextProps.language);
    return nextProps.language !== this.props.language;
  }

  /**
   * Whenever the translation language change
   * @param nextLanguage The previous language
   * @returns {Promise<void>}
   */
  async handleChangeLanguage(nextLanguage) {
    if (nextLanguage !== this.props.language) {
      await i18n.changeLanguage(nextLanguage);
    }
  }

  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    return ({...this.props.children});
  }
}

MockTranslationProvider.propTypes = {
  children: PropTypes.any, // The children components,
  language: PropTypes.string // The current translation language
};

export default MockTranslationProvider;

