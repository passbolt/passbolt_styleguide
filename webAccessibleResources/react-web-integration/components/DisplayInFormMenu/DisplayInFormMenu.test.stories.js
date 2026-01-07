/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

import React from "react";
import MockPort from "../../../react-extension/test/mock/MockPort";
import DisplayInFormMenu from "./DisplayInFormMenu";
import { defaultPasswordPoliciesDto } from "../../../shared/models/passwordPolicies/PasswordPoliciesDto.test.data";
import { defaultAppContext } from "../../../react-extension/contexts/ExtAppContext.test.data";
import { defaultProps } from "./DisplayInformMenu.test.data";

export default {
  title: "Components/WebIntegration/InFormMenu",
  component: DisplayInFormMenu,
};

const suggestion = [
  {
    name: "Twitter (company account)",
    username: "companyaccount@pasbolt.com",
    key: 0,
  },
  {
    name: "Matching Credentials",
    username: "john@pasbolt.com",
    key: 1,
  },
  {
    name: "Matching Credentials 2",
    username: "john2@pasbolt.com",
    key: 2,
  },
];

const initMockPort = (
  mockPort,
  initResponse = { inputType: "", inputValue: "", suggestedResources: suggestion },
  passwordSettings = defaultPasswordPoliciesDto(),
) => {
  mockPort.addRequestListener("passbolt.in-form-menu.init", () => initResponse);
  mockPort.addRequestListener("passbolt.password-policies.get", () => passwordSettings);
};

const mockPortUsernameEmpty = new MockPort();
initMockPort(mockPortUsernameEmpty, { inputType: "username" });

const mockPortUsernameFilled = new MockPort();
initMockPort(mockPortUsernameFilled, { inputType: "username", inputValue: "john@passbolt.com" });

const mockPortPasswordNoSuggestion = new MockPort();
initMockPort(mockPortPasswordNoSuggestion, { inputType: "password", inputValue: null });

const mockPortPasswordEmpty = new MockPort();
initMockPort(mockPortPasswordEmpty, { inputType: "password", inputValue: "" });

const customPasswordPoliciesDto = defaultPasswordPoliciesDto({
  default_generator: "passphrase",
});
const mockPortPasswordEmptyWitCustomPasswordPolicies = new MockPort();
initMockPort(
  mockPortPasswordEmptyWitCustomPasswordPolicies,
  { inputType: "password", inputValue: "" },
  customPasswordPoliciesDto,
);

const mockPortPasswordFilled = new MockPort();
initMockPort(mockPortPasswordFilled, { inputType: "password", inputValue: "test" });

const Template = (args) => (
  <div className="web-integration">
    <DisplayInFormMenu {...args} />
  </div>
);

export const OnUsernameFieldWithEmptyValue = Template.bind({});
export const OnUsernameFieldWithValue = Template.bind({});
export const OnPasswordFieldWithoutSuggestion = Template.bind({});
export const OnPasswordFieldWithEmptyValue = Template.bind({});
export const OnPasswordFieldWithEmptyValueAndCustomPasswordPolicies = Template.bind({});
export const OnPasswordFieldWithValue = Template.bind({});

OnUsernameFieldWithEmptyValue.args = defaultProps({
  context: defaultAppContext({ port: mockPortUsernameEmpty }),
});
OnUsernameFieldWithValue.args = defaultProps({
  context: defaultAppContext({ port: mockPortUsernameFilled }),
});
OnPasswordFieldWithoutSuggestion.args = defaultProps({
  context: defaultAppContext({
    port: mockPortPasswordNoSuggestion,
  }),
});
OnPasswordFieldWithEmptyValue.args = defaultProps({
  context: defaultAppContext({
    port: mockPortPasswordEmpty,
  }),
});
OnPasswordFieldWithEmptyValueAndCustomPasswordPolicies.args = defaultProps({
  context: defaultAppContext({
    port: mockPortPasswordEmptyWitCustomPasswordPolicies,
  }),
});
OnPasswordFieldWithValue.args = defaultProps({
  context: defaultAppContext({
    port: mockPortPasswordFilled,
  }),
});

const inFormMenuCss = { css: "ext_in_form_menu" };
OnUsernameFieldWithEmptyValue.parameters = inFormMenuCss;
OnUsernameFieldWithValue.parameters = inFormMenuCss;
OnPasswordFieldWithoutSuggestion.parameters = inFormMenuCss;
OnPasswordFieldWithEmptyValue.parameters = inFormMenuCss;
OnPasswordFieldWithEmptyValueAndCustomPasswordPolicies.parameters = inFormMenuCss;
OnPasswordFieldWithValue.parameters = inFormMenuCss;
