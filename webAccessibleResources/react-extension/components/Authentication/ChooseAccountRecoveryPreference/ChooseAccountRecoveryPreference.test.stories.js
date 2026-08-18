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
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ChooseAccountRecoveryPreference from "./ChooseAccountRecoveryPreference";
import {
  mandatoryPolicyProps,
  mandatoryPolicyPropsWithImportedKey,
  optInPolicyProps,
  optInPolicyPropsWithImportedKey,
  optOutPolicyProps,
  optOutPolicyPropsWithImportedKey,
} from "./ChooseAccountRecoveryPreference.test.data";

export default {
  title: "Components/Authentication/ChooseAccountRecoveryPreference",
  component: ChooseAccountRecoveryPreference,
};

const Template = (args) => (
  <MockTranslationProvider>
    <div id="container" className="container page login">
      <div className="content">
        <div className="login-form">
          <MemoryRouter initialEntries={["/"]}>
            <Route component={(routerProps) => <ChooseAccountRecoveryPreference {...args} {...routerProps} />} />
          </MemoryRouter>
        </div>
      </div>
    </div>
  </MockTranslationProvider>
);

const defaultParameters = {
  css: "ext_authentication",
};

export const MandatoryWithLink = {
  render: Template,
  args: mandatoryPolicyPropsWithImportedKey(),
  parameters: defaultParameters,
};

export const OptOutWithLink = {
  render: Template,
  args: optOutPolicyPropsWithImportedKey(),
  parameters: defaultParameters,
};

export const OptInWithLink = {
  render: Template,
  args: optInPolicyPropsWithImportedKey(),
  parameters: defaultParameters,
};

export const Mandatory = {
  render: Template,
  args: mandatoryPolicyProps(),
  parameters: defaultParameters,
};

export const OptOut = {
  render: Template,
  args: optOutPolicyProps(),
  parameters: defaultParameters,
};

export const OptIn = {
  render: Template,
  args: optInPolicyProps(),
  parameters: defaultParameters,
};
