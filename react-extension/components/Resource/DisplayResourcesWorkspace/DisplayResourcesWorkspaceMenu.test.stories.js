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
import {denyRbacContext} from "../../../../shared/context/Rbac/RbacContext.test.data";
import {overridenPasswordExpirySettingsEntityDto} from "../../../../shared/models/passwordExpirySettings/PasswordExpirySettingsDto.test.data";
import {defaultPasswordExpirySettingsContext} from "../../../contexts/PasswordExpirySettingsContext.test.data";
import DisplayResourcesWorkspaceMenu from "./DisplayResourcesWorkspaceMenu";
import {
  defaultPropsMultipleResource,
  defaultPropsMultipleResourceUpdateRights,
  defaultPropsOneResourceNotOwned,
  defaultPropsOneResourceOwned,
  defaultPropsOneStandaloneTotpResourceOwned,
  defaultPropsOneTotpResourceOwned,
} from "./DisplayResourcesWorkspaceMenu.test.data";
import React from "react";

/**
 * DisplayResourcesWorkspaceMenu stories
 */
export default {
  title: 'Components/Resource/DisplayResourcesWorkspaceMenu',
  decorators: [
    Story => (
      <div className="top-bar">
        <div className="action-bar">
          <div className="actions-wrapper">
            <Story/>
          </div>
        </div>
      </div>
    ),
  ],
  component: DisplayResourcesWorkspaceMenu
};

export const OneResourceOwned = {
  args: defaultPropsOneResourceOwned(),
};

export const ResourceWithTotpOwned = {
  args: defaultPropsOneTotpResourceOwned(),
};

export const ResourceStandaloneTotpOwned = {
  args: defaultPropsOneStandaloneTotpResourceOwned(),
};

export const ResourceNotOwned = {
  args: defaultPropsOneResourceNotOwned(),
};

export const MultipleResourcesNotOwnedWithAllDenyOnRBAC = {
  args: defaultPropsMultipleResource({
    rbacContext: denyRbacContext(),
  }),
};

export const MultipleResource = {
  args:  defaultPropsMultipleResourceUpdateRights(),
};

export const MultipleResourceNotOwned = {
  args:  defaultPropsMultipleResource(),
};

const propsResourcesWithAllFeatures = defaultPropsOneTotpResourceOwned({
  passwordExpiryContext: defaultPasswordExpirySettingsContext({
    getSettings: overridenPasswordExpirySettingsEntityDto,
  })
});
export const WithAllFeatureDisplayed = {
  args: propsResourcesWithAllFeatures
};
