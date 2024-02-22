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
 * @since         4.6.0
 */

import "../../../../../../test/mocks/mockClipboard";
import each from "jest-each";
import EntityValidationError from "../../../../../shared/models/entity/abstract/entityValidationError";
import AdfsSsoProviderFormPage from "./AdfsSsoProviderForm.test.page";
import {defaultAdfsProps} from "./SsoProviderForm.test.data";
import {waitFor} from "@testing-library/dom";
import {waitForTrue} from "../../../../../../test/utils/waitFor";

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  jest.resetAllMocks();
});

/**
 * Unit tests on AdfsSsoProviderForm in regard of specifications
 */
describe("AdfsSsoProviderForm", () => {
  it("Should display the form", () => {
    expect.assertions(1);
    const page = new AdfsSsoProviderFormPage(defaultAdfsProps());
    expect(page.exists()).toStrictEqual(true);
  });

  it("Should copy the redirect URL in the clipboard", async() => {
    expect.assertions(5);
    const props = defaultAdfsProps();
    const page = new AdfsSsoProviderFormPage(props);
    page.clickOn(page.redirectUrlButton);
    await waitFor(() => {});

    const expectedRedirectUrl = "http://localhost/sso/adfs/redirect";
    expect(page.redirect_url.value).toStrictEqual(expectedRedirectUrl);
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expectedRedirectUrl);
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledTimes(1);
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The redirection URL has been copied to the clipboard.");
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

      const props = defaultAdfsProps();
      props.adminSsoContext.getErrors = () => errors;
      const page = new AdfsSsoProviderFormPage(props);
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

        const props = defaultAdfsProps();
        const page = new AdfsSsoProviderFormPage(props);
        await waitFor(() => {});

        //force a call to `componentDidUpdate`
        const newProps = defaultAdfsProps();
        newProps.adminSsoContext.getErrors = () => errors;
        newProps.adminSsoContext.consumeFocusOnError = () => true;
        page.render(newProps);

        await waitForTrue(() => page.hasActiveElement);

        expect(page.currentActiveElement).toStrictEqual(page[scenario.field]);
      });
    });

    it("As an administrator I should not have focus on field when there is no error", async() => {
      expect.assertions(1);

      const props = defaultAdfsProps();
      const page = new AdfsSsoProviderFormPage(props);
      await waitFor(() => {});

      //force a call to `componentDidUpdate`
      const newProps = defaultAdfsProps();
      newProps.adminSsoContext.getErrors = () => new EntityValidationError();
      newProps.adminSsoContext.consumeFocusOnError = () => true;
      page.render(newProps);
      await waitFor(() => {});

      expect(page.hasActiveElement).toStrictEqual(false);
    });
  });
});
