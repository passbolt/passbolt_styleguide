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
 * @since         4.6.1
 */
import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import ConfirmCreateEdit, {
  ConfirmEditCreateOperationVariations,
  ConfirmEditCreateRuleVariations
} from "./ConfirmCreateEdit";
import {defaultResourceDto} from "../../../../shared/models/entity/resource/resourceEntity.test.data";

export default {
  title: 'Components/Resource/ConfirmCreateEdit',
  component: ConfirmCreateEdit
};

const Template = () => args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <ConfirmCreateEdit {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;

export const CreateConfirmPwnedPassword = Template().bind({});
CreateConfirmPwnedPassword.args = {
  operation: ConfirmEditCreateOperationVariations.CREATE,
  rule: ConfirmEditCreateRuleVariations.IN_DICTIONARY,
  resourceName: defaultResourceDto().name
};

export const CreateConfirmMinimumEntropyPassword = Template().bind({});
CreateConfirmPwnedPassword.args = {
  operation: ConfirmEditCreateOperationVariations.CREATE,
  rule: ConfirmEditCreateRuleVariations.MINIMUM_ENTROPY,
  resourceName: defaultResourceDto().name
};
