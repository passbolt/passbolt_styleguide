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

/**
 * This component set up the translation process
 */
class MockTranslationProvider extends Component {
  /**
   *
   * @returns {Promise<void>}
   * @constructor
   */
  async UNSAFE_componentWillMount() {
    await i18n
      // pass the i18n instance to react-i18next.
      .use(initReactI18next)
      // init i18next, for all options read: https://www.i18next.com/overview/configuration-options
      .init({
        lng: 'en-UK',
        load: 'currentOnly',
        resources: [],
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
   * Render the component.
   * @returns {JSX}
   */
  render() {
    return ({...this.props.children});
  }
}

MockTranslationProvider.propTypes = {
  children: PropTypes.any, // The children components
};

export default MockTranslationProvider;
