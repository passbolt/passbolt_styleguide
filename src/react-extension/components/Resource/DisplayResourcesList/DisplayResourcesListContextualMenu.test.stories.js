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
 * @since         5.0.0
 */
import DisplayResourcesListContextualMenu from "./DisplayResourcesListContextualMenu";
import {defaultProps, propsDenyUIActions, propsResourceStandaloneTotp, propsResourceWithReadOnlyPermission, propsResourceWithUpdatePermission} from "./DisplayResourcesListContextualMenu.test.data";

/**
 * DisplayResourcesListContextualMenu stories
 */
export default {
  title: 'Components/Resource/DisplayResourcesListContextualMenu',
  component: DisplayResourcesListContextualMenu
};

export const Default = {
  args: defaultProps(),
};

export const StandaloneTotp = {
  args: propsResourceStandaloneTotp(),
};

export const ReadOnlyPermission = {
  args: propsResourceWithReadOnlyPermission(),
};

export const UpdatePermission = {
  args: propsResourceWithUpdatePermission(),
};

export const DenyUiActions = {
  args: propsDenyUIActions(),
};
