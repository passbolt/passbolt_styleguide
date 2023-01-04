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
 * @since         3.9.0
 */

import {defaultAppContext} from "./ApiAppContext.test.data";


/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(data = {}, userId) {
  const defaultProps = {
    context: defaultAppContext(data?.context, userId),
  };
  return Object.assign(defaultProps, data);
}

/**
 * If param is empty all plugin are allowed
 * If param is not this plugin will be disable
 * @param {String} name The plugin to disable
 * @returns {object}
 */
export function listOfPlugins(plugin = "") {
  const props = defaultProps();
  props.context.siteSettings.canIUse = name => name !== plugin;
  return props;
}

