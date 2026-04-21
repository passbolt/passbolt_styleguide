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
import { waitFor } from "@testing-library/dom";
import AzureSsoProviderFormPage from "./AzureSsoProviderForm.test.page";
import { defaultAzureProps } from "./SsoProviderForm.test.data";
import EntityValidationError from "../../../../../shared/models/entity/abstract/entityValidationError";
import { waitForTrue } from "../../../../../../test/utils/waitFor";

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  jest.resetAllMocks();
});

/**
 * Unit tests on AzureSsoProviderForm in regard of specifications
 */
describe("AzureSsoProviderForm", () => {
  it("Should display the form", () => {
    expect.assertions(1);
    const page = new AzureSsoProviderFormPage(defaultAzureProps());
    expect(page.exists()).toStrictEqual(true);
  });

  it("Should copy the redirect URL in the clipboard", async () => {
    expect.assertions(3);
    const props = defaultAzureProps();
    const page = new AzureSsoProviderFormPage(props);
    page.clickOn(page.redirectUrlButton);
    await waitFor(() => {});

    const expectedRedirectUrl = "http://localhost/sso/azure/redirect";
    expect(page.redirect_url.value).toStrictEqual(expectedRedirectUrl);
    expect(props.clipboardContext.copy).toHaveBeenCalledTimes(1);
    expect(props.clipboardContext.copy).toHaveBeenCalledWith(
      expectedRedirectUrl,
      "The redirection URL has been copied to the clipboard.",
    );
  });

  it("Should toggle the advanced settings", async () => {
    expect.assertions(3);
    const props = defaultAzureProps();
    const page = new AzureSsoProviderFormPage(props);

    expect(page.isAdvancedSettingsVisible).toStrictEqual(false);

    await page.toggleAdvancedSettings();
    expect(page.isAdvancedSettingsVisible).toStrictEqual(true);

    await page.toggleAdvancedSettings();
    expect(page.isAdvancedSettingsVisible).toStrictEqual(false);
  });

  describe("Should handle errors", () => {
    const rawErrors = {
      client_id: "client_id is not a valid UUID",
      tenant_id: "tenant_id is not a valid UUID",
      client_secret: "client_secret is not a valid UUID",
      client_secret_expiry: "client_secret_expiry is not a valid date",
    };

    it("Should show the error in the form", async () => {
      expect.assertions(8);

      const errors = new EntityValidationError();
      Object.keys(rawErrors).forEach((key) => {
        errors.addError(key, "format", rawErrors[key]);
      });

      const props = defaultAzureProps();
      props.adminSsoContext.getErrors = () => errors;
      const page = new AzureSsoProviderFormPage(props);
      await waitFor(() => {});

      expect(page.clientIdError).not.toBeNull();
      expect(page.clientIdError.textContent).toStrictEqual(rawErrors.client_id);
      expect(page.tenantIdError).not.toBeNull();
      expect(page.tenantIdError.textContent).toStrictEqual(rawErrors.tenant_id);
      expect(page.clientSecretError).not.toBeNull();
      expect(page.clientSecretError.textContent).toStrictEqual(rawErrors.client_secret);
      expect(page.clientSecretExpiryError).not.toBeNull();
      expect(page.clientSecretExpiryError.textContent).toStrictEqual(rawErrors.client_secret_expiry);
    });

    each(Object.keys(rawErrors).map((key) => ({ field: key }))).describe(
      "Should focus on the right erroneous field in the form",
      (scenario) => {
        it(`For: ${scenario.field}`, async () => {
          expect.assertions(1);

          const errors = new EntityValidationError();
          errors.addError(scenario.field, "format", "field is erroneous");

          const props = defaultAzureProps();
          const page = new AzureSsoProviderFormPage(props);
          await waitFor(() => {});

          //force a call to `componentDidUpdate`
          const newProps = defaultAzureProps();
          newProps.adminSsoContext.getErrors = () => errors;
          newProps.adminSsoContext.consumeFocusOnError = () => true;
          page.render(newProps);

          await waitForTrue(() => page.hasActiveElement);

          expect(page.currentActiveElement).toStrictEqual(page[scenario.field]);
        });
      },
    );
  });
});
