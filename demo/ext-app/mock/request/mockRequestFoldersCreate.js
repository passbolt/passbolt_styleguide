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

import {v4 as uuidv4} from "uuid";
import moment from 'moment/moment';

export default (eventObject, storage) => {
  return new Promise(async (resolve) => {
    const {folders} = await storage.local.get(["folders"]);
    eventObject.id = uuidv4();
    eventObject.created = moment().format("YYYY-MM-DD[T]HH:mm:ss[+]00:00");
    eventObject.created_by = "f848277c-5398-58f8-a82a-72397af2d450";
    eventObject.modified = moment().format("YYYY-MM-DD[T]HH:mm:ss[+]00:00");
    eventObject.modified_by = "f848277c-5398-58f8-a82a-72397af2d450";
    eventObject.private = true;
    eventObject.permission = {
      id: uuidv4(),
      aco: "Folder",
      aco_foreign_key: eventObject.id,
      aro: "User",
      aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
      type: 15
    };
    folders.push(eventObject);
    await storage.local.set({folders});
    resolve(eventObject);
  });
};
