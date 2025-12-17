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

import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import ConfirmCreatePage, { ConfirmCreatePageRuleVariations } from "./ConfirmCreatePage";

export default {
  title: "Components/QuickAccess/ConfirmCreatePage",
  component: ConfirmCreatePage,
};

const Template = (args) => (
  <MemoryRouter initialEntries={[{ pathname: "/", state: args.state }]}>
    <Route
      component={(routerProps) => (
        <div className="container quickaccess">
          <ConfirmCreatePage {...args} {...routerProps} />
        </div>
      )}
    />
  </MemoryRouter>
);

const parameters = {
  css: "ext_quickaccess",
};

export const Initial = Template.bind({});
Initial.args = {
  state: {
    rule: ConfirmCreatePageRuleVariations.IN_DICTIONARY,
    resourceName: "Resource Name",
  },
};
Initial.parameters = parameters;

export const VeryWeakEntropy = Template.bind({});
VeryWeakEntropy.args = {
  state: {
    rule: ConfirmCreatePageRuleVariations.MINIMUM_ENTROPY,
    resourceName: "Resource Name",
  },
};
VeryWeakEntropy.parameters = parameters;
