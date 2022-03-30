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
 * @since         3.6.0
 */

export default () => {
  return {
    body: {
      user: {
        "id": "f848277c-5398-58f8-a82a-72397af2d450",
        "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
        "username": "ada@passbolt.com",
        "first_name": "Ada",
        "last_name": "Lovelace",
        "active": true,
        "deleted": false,
        "created": "2020-06-19T14:56:53+00:00",
        "modified": "2020-07-19T14:56:53+00:00",
        "profile": {
          "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
          "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
          "created": "2020-08-19T14:56:53+00:00",
          "modified": "2020-08-19T14:56:53+00:00",
          "avatar": {
            "id": "25d91392-b040-49b2-9585-36bf10779576",
            "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
            "foreign_key": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
            "model": "Avatar",
            "filename": "ada.png",
            "filesize": 170049,
            "mime_type": "image\/png",
            "extension": "png",
            "hash": "97e36ab6528e26e3b9f988444ef490f125f49a39",
            "path": "Avatar\/25\/51\/3e\/25d91392b04049b2958536bf10779576\/25d91392b04049b2958536bf10779576.png",
            "adapter": "Local",
            "created": "2020-08-13T15:07:19+00:00",
            "modified": "2020-08-13T15:07:19+00:00",
            "url": {
              "medium": "img\/public\/Avatar\/25\/51\/3e\/25d91392b04049b2958536bf10779576\/25d91392b04049b2958536bf10779576.a99472d5.png",
              "small": "img\/public\/Avatar\/25\/51\/3e\/25d91392b04049b2958536bf10779576\/25d91392b04049b2958536bf10779576.65a0ba70.png"
            }
          }
        },
        "role": {
          "id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
          "name": "user",
          "description": "Logged in user",
          "created": "2012-07-04T13:39:25+00:00",
          "modified": "2012-07-04T13:39:25+00:00"
        },
      }
    }
  };
};
