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
 * @since         4.5.0
 */

import "../../../../../../test/mocks/mockClipboard";
import each from "jest-each";
import {waitFor} from "@testing-library/dom";
import OAuth2SsoProviderFormPage from "./OAuth2SsoProviderForm.test.page";
import {defaultOAuth2Props} from "./SsoProviderForm.test.data";
import EntityValidationError from "../../../../../shared/models/entity/abstract/entityValidationError";
import {waitForTrue} from "../../../../../../test/utils/waitFor";

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  jest.resetAllMocks();
});

/**
 * Unit tests on OAuth2SsoProviderForm in regard of specifications
 */
describe("OAuth2SsoProviderForm", () => {
  it("Should display the form", () => {
    expect.assertions(1);
    const page = new OAuth2SsoProviderFormPage(defaultOAuth2Props());
    expect(page.exists()).toStrictEqual(true);
  });

  it("Should copy the redirect URL in the clipboard", async() => {
    expect.assertions(3);
    const props = defaultOAuth2Props();
    const page = new OAuth2SsoProviderFormPage(props);
    page.clickOn(page.redirectUrlButton);
    await waitFor(() => {});

    const expectedRedirectUrl = "http://localhost/sso/oauth2/redirect";
    expect(page.redirect_url.value).toStrictEqual(expectedRedirectUrl);
    expect(props.clipboardContext.copy).toHaveBeenCalledTimes(1);
    expect(props.clipboardContext.copy).toHaveBeenCalledWith(expectedRedirectUrl, "The redirection URL has been copied to the clipboard.");
  });

  describe("Should handle errors", () => {
    const rawErrors = {
      url: "url is not a valid URL",
      client_id: "client_id should not be empty",
      client_secret: "client_secret should not be empty",
      openid_configuration_path: "openid_configuration_path should not be empty",
      scope: "scope should not be empty",
    };

    it("Should show the error in the form", async() => {
      expect.assertions(10);

      const errors = new EntityValidationError();
      Object.keys(rawErrors).forEach(key => {
        errors.addError(key, "format", rawErrors[key]);
      });

      const props = defaultOAuth2Props();
      props.adminSsoContext.getErrors = () => errors;
      const page = new OAuth2SsoProviderFormPage(props);
      await waitFor(() => {});

      expect(page.urlError).not.toBeNull();
      expect(page.urlError.textContent).toStrictEqual(rawErrors.url);
      expect(page.clientIdError).not.toBeNull();
      expect(page.clientIdError.textContent).toStrictEqual(rawErrors.client_id);
      expect(page.clientSecretError).not.toBeNull();
      expect(page.clientSecretError.textContent).toStrictEqual(rawErrors.client_secret);
      expect(page.openidConfigurationPathError).not.toBeNull();
      expect(page.openidConfigurationPathError.textContent).toStrictEqual(rawErrors.openid_configuration_path);
      expect(page.scopeError).not.toBeNull();
      expect(page.scopeError.textContent).toStrictEqual(rawErrors.scope);
    });

    each(
      Object.keys(rawErrors).map(key => ({field: key}))
    ).describe("Should focus on the right erroneous field in the form", scenario => {
      it(`For: ${scenario.field}`, async() => {
        expect.assertions(1);

        const errors = new EntityValidationError();
        errors.addError(scenario.field, "format", "field is erroneous");

        const props = defaultOAuth2Props();
        const page = new OAuth2SsoProviderFormPage(props);
        await waitFor(() => {});

        //force a call to `componentDidUpdate`
        const newProps = defaultOAuth2Props();
        newProps.adminSsoContext.getErrors = () => errors;
        newProps.adminSsoContext.consumeFocusOnError = () => true;
        page.render(newProps);

        await waitForTrue(() => page.hasActiveElement);

        expect(page.currentActiveElement).toStrictEqual(page[scenario.field]);
      });
    });
  });
});
