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

import {DateTime} from "luxon";

export default (eventObject, storage) => {
  return new Promise(async (resolve) => {
    const {folders} = await storage.local.get(["folders"]);
    const folderIndex = folders.findIndex(item => item.id === eventObject.id);
    const folder = folders[folderIndex];
    folder.modified = DateTime.now().toISO();
    folder.modified_by = "f848277c-5398-58f8-a82a-72397af2d450";
    folder.name = eventObject.name;
    folders[folderIndex] = folder;
    await storage.local.set({folders});
    resolve(folder);
  });
};
