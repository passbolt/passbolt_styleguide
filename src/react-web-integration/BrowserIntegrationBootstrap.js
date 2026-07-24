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
 * @since         3.3.0
 */

import { QuickAccessEvent } from "./Events/Quickaccess/QuickAccessEvent";
import { AuthLogin } from "./AuthLogin/AuthLogin";
import InFormManager from "./lib/InForm/InFormManager";
import SiteSettingsEntity from "../shared/models/entity/siteSettings/siteSettingsEntity";
import ShadowDomFocusHealerService from "./lib/Dom/ShadowDom/ShadowDomFocusHealerService";

/**
 * Bootstrap the browser integration with browsed pages.
 */
async function init() {
  AuthLogin.legacyAuthLogin();

  QuickAccessEvent.fillForm();

  const siteSettings = await getSiteSettings();
  if (siteSettings?.canIUse("inFormIntegration")) {
    ShadowDomFocusHealerService.installFocusinHealer();
    InFormManager.initialize();
  }
}

/**
 * Get the site settings.
 * @returns {Promise<SiteSettingsEntity>}
 */
async function getSiteSettings() {
  try {
    const siteSettingsDto = await port.request("passbolt.site-settings.get-or-find", false);
    return new SiteSettingsEntity(siteSettingsDto);
  } catch (error) {
    console.error(error);
  }
}

export const BrowserIntegrationBootstrap = { init };
