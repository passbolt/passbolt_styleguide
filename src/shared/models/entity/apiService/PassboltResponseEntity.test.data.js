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
 * @since         4.12.0
 */
import {defaultPassboltResponseHeaderDto, paginatedPassboltResponseDto} from "./PassboltResponseHeaderEntity.test.data";

export const defaultPassboltResponseDto = (data = {}) => ({
  body: {},
  ...data,
  header: defaultPassboltResponseHeaderDto(data?.header),
});

export const passboltReponseWithCollectionDto = (collection, data = {}) => ({
  body: collection,
  ...data,
  header: paginatedPassboltResponseDto(collection, data?.header),
});
