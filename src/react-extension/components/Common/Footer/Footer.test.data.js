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
 * @since         5.14.0
 */

import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";
import SiteSettingsEntity from "../../../../shared/models/entity/siteSettings/siteSettingsEntity";
import {
  defaultCeSiteSettings,
  defaultProSiteSettings,
} from "../../../../shared/models/entity/siteSettings/siteSettingsEntity.test.data";

/**
 * Build a SiteSettingsEntity with a custom url, edition and/or a server version.
 * @param {object} [options]
 * @param {string} [options.url] Override the instance url
 * @param {boolean} [options.community=false] Build a Community Edition settings
 * @param {boolean} [options.withVersion=true] Keep the server version (app.version)
 * @returns {SiteSettingsEntity}
 */
function buildSiteSettings({ url, community, withVersion = true } = {}) {
  const dto = community ? defaultCeSiteSettings() : defaultProSiteSettings();

  if (url) {
    dto.app.url = url;
  }

  if (!withVersion) {
    delete dto.app.version;
  }

  return new SiteSettingsEntity(dto);
}

/**
 * Default props
 * @param {object} [data] Override the default app context.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultAppContext(data),
  };
}

/**
 * Props for a CE instance (http)
 * @returns {object}
 */
export function communityEditionProps() {
  return {
    context: defaultAppContext({}, true),
  };
}

/**
 * Props for Passbolt cloud
 * @returns {object}
 */
export function cloudProps() {
  return {
    context: defaultAppContext({ siteSettings: buildSiteSettings({ url: "https://cloud.passbolt.com" }) }),
  };
}

/**
 * Props for a Pro instance served securely (https).
 * @returns {object}
 */
export function selfHostedSecureProps() {
  return {
    context: defaultAppContext({ siteSettings: buildSiteSettings({ url: "https://passbolt.company.com" }) }),
  };
}

/**
 * Props with both the client and the server versions.
 * @returns {object}
 */
export function withClientAndServerVersionProps() {
  return {
    context: defaultAppContext({ extensionVersion: "4.10.0" }),
  };
}

/**
 * Props with the client version only.
 * @returns {object}
 */
export function withClientVersionOnlyProps() {
  return {
    context: defaultAppContext({
      extensionVersion: "4.10.0",
      siteSettings: buildSiteSettings({ withVersion: false }),
    }),
  };
}
