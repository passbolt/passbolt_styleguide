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
 * @since         3.0.0
 */

import moment from 'moment/moment';

export default (resourceId, resourceDto, password, storage) => {
  return new Promise(async (resolve) => {
    const {resources} = await storage.local.get(["resources"]);
    const resourceIndex = resources.findIndex(item => item.id === resourceId);
    const resource = resources[resourceIndex];
    resource.modified = moment().format("YYYY-MM-DD[T]HH:mm:ss[+]00:00");
    resource.modified_by = "f848277c-5398-58f8-a82a-72397af2d450";
    resource.name = resourceDto.name;
    resource.uri = resourceDto.uri;
    resource.username = resourceDto.username;
    resource.description = resourceDto.description;
    resources[resourceIndex] = resource;
    await storage.local.set({resources});
    resolve(resource);
  });
};
