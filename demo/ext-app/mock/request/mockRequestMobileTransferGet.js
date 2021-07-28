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
let count = 0;
const mockResponse = {
  "id": "5af08ebf-4ecd-4dd8-b124-f24fb96ef565",
  "current_page": 0,
  "total_pages": 6,
  "status": "start",
  "created": "2021-01-25T06:10:39+00:00",
  "modified": "2021-01-25T06:10:39+00:00"
};

export default () => {
  switch (count) {
    case 0:
      mockResponse.status = 'start'
      mockResponse.current_page = 0;
      break;
    case 1:
      mockResponse.status = 'in progress'
      mockResponse.current_page = 1;
      break;
    case 2:
      mockResponse.current_page = 2;
      break;
    case 3:
      mockResponse.current_page = 3;
      break;
    case 4:
      mockResponse.current_page = 4;
      break;
    case 5:
      mockResponse.current_page = 5;
      break;
    case 6:
      mockResponse.status = 'complete';
      count = -1; // reset count.
      break;
  }
  count++;
  return mockResponse;
};