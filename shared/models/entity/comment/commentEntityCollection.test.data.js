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
 * @since         4.9.3
 */
import { defaultUserDto, users } from "../user/userEntity.test.data";
import { defaultCommentDto } from "./commentEntity.test.data";
import { v4 as uuidv4 } from "uuid";

/**
 * Build default comment collection dto.
 * @param {object} data The data to override the default dto.
 * @returns {object}
 */
export const defaultCommentCollectionDto = (data = {}) => {
    return [
        //First row can be customized
        defaultCommentDto(data, {
            withCreator: true,
            withModifier: true,
        }),
        //Creator Carol Shaw
        defaultCommentDto({
            creator: defaultUserDto(users[1]),
        }, {
            withCreator: true,
            withModifier: true,
        }
        ),
        //Betty Holberton Shaw
        defaultCommentDto({
            creator: defaultUserDto(users[2]),
        }, {
            withCreator: true,
            withModifier: true,
        }
        ),
        //Not owned
        defaultCommentDto({
            creator: users[0],
            created_by: uuidv4()
        }, {
            withCreator: true,
            withModifier: true,
        })
    ];
};