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
 * @since         4.4.0
 */

/**
 * Modes available for the TOTP workflow
 * @type {{ADD_TOTP: string, EDIT_STANDALONE_TOTP: string, EDIT_TOTP: string, CREATE_STANDALONE_TOTP: string}}
 */
export const TotpWorkflowMode = {
  ADD_TOTP: "AddTotp",
  EDIT_TOTP: "EditTotp",
  CREATE_STANDALONE_TOTP: "CreateStandaloneTotp",
  EDIT_STANDALONE_TOTP: "EditStandaloneTotp",
};
