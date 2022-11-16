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

const SsoProviders = [
  {
    id: "azure",
    name: "Microsoft",
    icon: "microsoft.svg",
    defaultConfig: {
      url: "https://login.microsoftonline.com",
      redirect_url: "https://passbolt.example.com/sso/azure/redirect",
    }
  },
  {
    id: "google",
    name: "Google",
    disabled: true,
    icon: "google.svg"
  },
];

export default SsoProviders;
