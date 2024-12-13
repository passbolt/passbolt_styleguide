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
 * @since         2.11.0
 */
import DisplayResourcesWorkspaceMainMenu from "./DisplayResourcesWorkspaceMainMenu";
import {
  defaultPropsFolderNotOwned,
  defaultPropsFolderOwned
} from "./DisplayResourcesWorkspaceMainMenu.test.data";

/**
 * DisplayResourcesWorkspaceMainMenu stories
 */
export default {
  title: 'Components/Resource/DisplayResourcesWorkspaceMainMenu',
  component: DisplayResourcesWorkspaceMainMenu
};

export const FolderOwned = {
  args: defaultPropsFolderOwned()
};

export const FolderNotOwned = {
  args: defaultPropsFolderNotOwned()
};

