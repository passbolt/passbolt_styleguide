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
 * @since         5.11.0
 */
import PingOneSsoProviderFormPage from "./PingOneSsoProviderForm.test.page";
import { defaultPingOneProps } from "./SsoProviderForm.test.data";
import EntityValidationError from "../../../../../shared/models/entity/abstract/entityValidationError";
import { waitForTrue } from "../../../../../../test/utils/waitFor";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("PingOneSsoProviderForm", () => {
  it("Should display the form", () => {
    expect.assertions(8);

    const page = new PingOneSsoProviderFormPage(defaultPingOneProps());

    expect(page.exists()).toStrictEqual(true);
    expect(page.redirectUrl).toBeDefined();
    expect(page.redirectUrlCopyButton).toBeDefined();
    expect(page.environmentId).toBeDefined();
    expect(page.clientId).toBeDefined();
    expect(page.clientSecret).toBeDefined();
    expect(page.emailClaim).toBeDefined();
    expect(page.scope.getAttribute("disabled")).toEqual("");
  });

  describe("Should handle errors", () => {
    const rawErrors = {
      environment_id: "environment_id should not be empty",
      client_id: "client_id should not be empty",
      client_secret: "client_secret should not be empty",
      email_claim: "email_claim should not be empty",
    };

    const fieldMap = {
      environment_id: "environmentId",
      client_id: "clientId",
      client_secret: "clientSecret",
      email_claim: "emailClaim",
    };

    it("Should show the error in the form", () => {
      expect.assertions(5);

      const errors = new EntityValidationError();
      Object.keys(rawErrors).forEach((key) => {
        errors.addError(key, "format", rawErrors[key]);
      });

      const props = defaultPingOneProps();
      props.adminSsoContext.getErrors = jest.fn().mockImplementation(() => errors);
      const page = new PingOneSsoProviderFormPage(props);

      expect(props.adminSsoContext.getErrors).toHaveBeenCalledTimes(1);
      expect(page.environmentIdError.textContent).toStrictEqual(rawErrors.environment_id);
      expect(page.clientIdError.textContent).toStrictEqual(rawErrors.client_id);
      expect(page.clientSecretError.textContent).toStrictEqual(rawErrors.client_secret);
      expect(page.emailClaimError.textContent).toStrictEqual(rawErrors.email_claim);
    });

    describe.each(Object.keys(rawErrors))("Should focus on the right erroneous field in the form", (fieldName) => {
      it(`When ${fieldName} is erroneous`, async () => {
        expect.assertions(4);

        const errors = new EntityValidationError();
        errors.addError(fieldName, "format", "field is erroneous");

        const props = defaultPingOneProps();
        const page = new PingOneSsoProviderFormPage(props);

        const newProps = defaultPingOneProps();
        newProps.adminSsoContext.getErrors = jest.fn().mockImplementation(() => errors);
        newProps.adminSsoContext.consumeFocusOnError = jest.fn().mockImplementation(() => true);

        // Re-render to trigger `componentDidUpdate`
        page.render(newProps);

        await waitForTrue(() => page.hasActiveElement);

        // `getErrors` is called 2 times in `componentDidUpdate` and in `render`
        expect(newProps.adminSsoContext.getErrors).toHaveBeenCalledTimes(2);
        expect(newProps.adminSsoContext.consumeFocusOnError).toHaveBeenCalledTimes(1);

        const targetElement = page[fieldMap[fieldName]];
        expect(targetElement).toBeDefined();
        expect(page.currentActiveElement).toStrictEqual(targetElement);
      });
    });
  });

  describe("Redirect URL", () => {
    it("Should generate the redirect URL", () => {
      expect.assertions(1);

      const page = new PingOneSsoProviderFormPage(defaultPingOneProps());

      expect(page.redirectUrl.value).toEqual("http://localhost/sso/pingone/redirect");
    });

    it("Should copy the redirect URL", () => {
      expect.assertions(2);

      const copyMock = jest.fn().mockResolvedValue(null);
      const page = new PingOneSsoProviderFormPage(
        defaultPingOneProps({
          clipboardContext: {
            copy: copyMock,
          },
        }),
      );

      page.redirectUrlCopyButton.click();

      expect(copyMock).toHaveBeenCalledTimes(1);
      expect(copyMock).toHaveBeenCalledWith(
        "http://localhost/sso/pingone/redirect",
        "The redirection URL has been copied to the clipboard.",
      );
    });
  });
});
