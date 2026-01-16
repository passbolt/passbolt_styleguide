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
 * @since         6.0.0
 */

export const minimalSubscriptionDto = (data = {}) => ({
  subscription_id: "test",
  users: 10,
  created: "2021-03-12T00:00:00.661Z",
  expiry: "4096-03-12T00:00:00.661Z",
  data: "key",
  ...data,
});

export const defaultSubscriptionDto = (data = {}) => ({
  ...minimalSubscriptionDto(),
  customer_id: "2",
  email: "abc@example.com",
  ...data,
});
