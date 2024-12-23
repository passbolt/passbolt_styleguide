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
 * @since         3.0.0
 */

import {TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP} from "../../src/shared/models/entity/resourceType/resourceTypeEntity.test.data";
import {v4 as uuidv4} from "uuid";

const createResource = (index, data = {}) => ({
  id: uuidv4(),
  metadata: {
    name: `password-${index}`,
    username: "www-data",
    uris: ["http:\/\/www.apache.org\/"],
    description: "Apache is the world\u0027s most used web server software.",
  },
  deleted: false,
  created: "2020-08-25T08:35:19+00:00",
  modified: "2020-08-26T08:35:19+00:00",
  created_by: "f848277c-5398-58f8-a82a-72397af2d450",
  modified_by: "f848277c-5398-58f8-a82a-72397af2d450",
  favorite: {
    id: "56216dba-b6da-592b-87cb-fb5cbbd0a424",
    user_id: "f848277c-5398-58f8-a82a-72397af2d450",
    foreign_key: "8e3874ae-4b40-590b-968a-418f704b9d9a",
    foreign_model: "Resource",
    created: "2020-08-27T08:35:21+00:00",
    modified: "2020-08-27T08:35:21+00:00"
  },
  permission: {
    id: uuidv4(),
    aco: "Resource",
    aco_foreign_key: "8e3874ae-4b40-590b-968a-418f704b9d9a",
    aro: "User",
    aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
    type: 15,
    created: "2020-08-27T08:35:19+00:00",
    modified: "2020-08-27T08:35:19+00:00"
  },
  folder_parent_id: null,
  personal: false,
  resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
  ...data,
  tags: [
    {
      id: "1c8afebc-7e23-51bd-a0b6-2e695afeb32f",
      slug: "#charlie",
      is_shared: true
    },
    {
      id: "ecd059e8-4cb3-574b-a063-6083e272ef27",
      slug: "#golf",
      is_shared: true
    },
    ...data.tags
  ],
});

export default (() => {
  const resources = [];
  const tags = [{
    id: "1c8afebc-7e23-51bd-a0b6-2e695afeb330",
    slug: "even",
    is_shared: false
  }, {
    id: "ecd059e8-4cb3-574b-a063-6083e272ef28",
    slug: "odd",
    is_shared: false
  }];
  for (let i = 0; i < 100; i++) {
    const tag = tags[i % 2 === 0 ? 0 : 1];
    resources.push(createResource(i, {tags: [tag]}));
  }
  return resources;
})();
