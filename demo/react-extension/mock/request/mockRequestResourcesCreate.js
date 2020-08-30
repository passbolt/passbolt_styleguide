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

export default (resourceDto, password, storage) => {
  return new Promise(async (resolve) => {
    const {resources} = await storage.local.get(["resources"]);
    resourceDto.id = uuidv4();
    resourceDto.created = moment().format("YYYY-MM-DD[T]HH:mm:ss[+]00:00");
    resourceDto.created_by = "f848277c-5398-58f8-a82a-72397af2d450";
    resourceDto.modified = moment().format("YYYY-MM-DD[T]HH:mm:ss[+]00:00");
    resourceDto.modified_by = "f848277c-5398-58f8-a82a-72397af2d450";
    resourceDto.private = true;
    resourceDto.favorite = null;
    resourceDto.permission = {
      id: uuidv4(),
      aco: "Resource",
      aco_foreign_key: resourceDto.id,
      aro: "User",
      aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
      type: 15
    };
    resources.push(resourceDto);
    await storage.local.set({resources});
    resolve(resourceDto);
  });
};
