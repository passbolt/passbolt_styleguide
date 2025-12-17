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
import GoogleSsoProviderFormPage from "./GoogleSsoProviderForm.test.page";
import { defaultGoogleProps } from "./SsoProviderForm.test.data";
import EntityValidationError from "../../../../../shared/models/entity/abstract/entityValidationError";
import { waitForTrue } from "../../../../../../test/utils/waitFor";

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  jest.resetAllMocks();
});

/**
 * Unit tests on GoogleSsoProviderForm in regard of specifications
 */
describe("GoogleSsoProviderForm", () => {
  it("Should display the form", () => {
    expect.assertions(1);
    const page = new GoogleSsoProviderFormPage(defaultGoogleProps());
    expect(page.exists()).toStrictEqual(true);
  });

  it("Should copy the redirect URL in the clipboard", async () => {
    expect.assertions(3);
    const props = defaultGoogleProps();
    const page = new GoogleSsoProviderFormPage(props);
    page.clickOn(page.redirectUrlButton);
    await waitFor(() => {});

    const expectedRedirectUrl = "http://localhost/sso/google/redirect";
    expect(page.redirect_url.value).toStrictEqual(expectedRedirectUrl);
    expect(props.clipboardContext.copy).toHaveBeenCalledTimes(1);
    expect(props.clipboardContext.copy).toHaveBeenCalledWith(
      expectedRedirectUrl,
      "The redirection URL has been copied to the clipboard.",
    );
  });

  describe("Should handle errors", () => {
    const rawErrors = {
      client_id: "client_id shouldn't be empty",
      client_secret: "client_secret shouldn't be empty",
    };

    it("Should show the error in the form", async () => {
      expect.assertions(4);

      const errors = new EntityValidationError();
      Object.keys(rawErrors).forEach((key) => {
        errors.addError(key, "format", rawErrors[key]);
      });

      const props = defaultGoogleProps();
      props.adminSsoContext.getErrors = () => errors;
      const page = new GoogleSsoProviderFormPage(props);
      await waitFor(() => {});

      expect(page.clientIdError).not.toBeNull();
      expect(page.clientIdError.textContent).toStrictEqual(rawErrors.client_id);
      expect(page.clientSecretError).not.toBeNull();
      expect(page.clientSecretError.textContent).toStrictEqual(rawErrors.client_secret);
    });

    each(Object.keys(rawErrors).map((key) => ({ field: key }))).describe(
      "Should focus on the right erroneous field in the form",
      (scenario) => {
        it(`For: ${scenario.field}`, async () => {
          expect.assertions(1);

          const errors = new EntityValidationError();
          errors.addError(scenario.field, "format", "field is erroneous");

          const props = defaultGoogleProps();
          const page = new GoogleSsoProviderFormPage(props);
          await waitFor(() => {});

          //force a call to `componentDidUpdate`
          const newProps = defaultGoogleProps();
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
