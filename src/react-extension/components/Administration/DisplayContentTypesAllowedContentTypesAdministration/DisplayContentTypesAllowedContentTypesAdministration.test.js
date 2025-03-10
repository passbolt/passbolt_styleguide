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
 * @since         4.12.0
 */

import {waitForTrue} from '../../../../../test/utils/waitFor';
import DisplayContentTypesAllowedContentTypesAdministration from "./DisplayContentTypesAllowedContentTypesAdministration.test.page";
import {
  defaultProps,
  withOnlyTotpV4Enabled,
  withOnlyTotpV5Enabled,
  withoutMetadataKeys,
} from "./DisplayContentTypesAllowedContentTypesAdministration.test.data";

describe("DisplayContentTypesAllowedContentTypesAdministration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe("As a signed-in administrator I can see the allow content type administration settings", () => {
    it("As a signed-in administrator I can see the settings", async() => {
      expect.assertions(1);

      const page = new DisplayContentTypesAllowedContentTypesAdministration(defaultProps());
      await waitForTrue(() => page.exists());

      expect(page.title.textContent).toBe("Allow content types");
    });
  });

  describe("As a signed-in administrator, I should see warnings", () => {
    it("Displays warningif settings have changed", async() => {
      expect.assertions(2);
      const props = defaultProps();

      const page = new DisplayContentTypesAllowedContentTypesAdministration(props);
      await waitForTrue(() => page.exists());

      await page.clickOnPasswordV4();

      expect(page.formBanner).not.toBeNull();
      expect(page.formBanner.textContent).toStrictEqual("Warning: Don't forget to save your settings to apply your modification.");
    });

    it("displays warning on v4 fields if creation is allowed but there is not content types available", async() => {
      expect.assertions(6);

      const page = new DisplayContentTypesAllowedContentTypesAdministration(withOnlyTotpV5Enabled());
      await waitForTrue(() => page.exists());

      expect(page.passwordV4Warning).not.toBeNull();
      expect(page.passwordV4Warning.textContent).toStrictEqual("Creation of content type v4 is allowed but all content types having passwords are deleted.");

      expect(page.totpV4Warning).not.toBeNull();
      expect(page.totpV4Warning.textContent).toStrictEqual("Creation of content type v4 is allowed but all content types having totp are deleted.");

      await page.clickOnPasswordV4();
      await page.clickOnTotpV5();

      expect(page.totpV5Warning).toBeNull();
      expect(page.passwordV5Warning).toBeNull();
    });

    it("displays warning on v5 fields if creation is allowed but there is not content types available", async() => {
      expect.assertions(6);

      const page = new DisplayContentTypesAllowedContentTypesAdministration(withOnlyTotpV4Enabled());
      await waitForTrue(() => page.exists());

      expect(page.passwordV5Warning).not.toBeNull();
      expect(page.passwordV5Warning.textContent).toStrictEqual("Creation of content type v5 is allowed but all content types having passwords are deleted.");

      expect(page.totpV5Warning).not.toBeNull();
      expect(page.totpV5Warning.textContent).toStrictEqual("Creation of content type v5 is allowed but all content types having totp are deleted.");

      await page.clickOnPasswordV5();
      await page.clickOnTotpV4();

      expect(page.totpV4Warning).toBeNull();
      expect(page.passwordV4Warning).toBeNull();
    });

    it("displays error on fields if v5 is enabled but there is no metadata key set", async() => {
      expect.assertions(4);

      const page = new DisplayContentTypesAllowedContentTypesAdministration(withoutMetadataKeys());
      await waitForTrue(() => page.exists());

      expect(page.passwordV5Warning).not.toBeNull();
      expect(page.totpV5Warning).not.toBeNull();
      expect(page.passwordV5Warning.textContent).toStrictEqual("No active metadata key defined.");
      expect(page.totpV5Warning.textContent).toStrictEqual("No active metadata key defined.");
    });
  });

  describe("As a signed-in administrator, I should see errors", () => {
    it("displays error on fields if no resource types is selected and admin tries to save", async() => {
      expect.assertions(8);

      const page = new DisplayContentTypesAllowedContentTypesAdministration(defaultProps());
      await waitForTrue(() => page.exists());

      await page.clickOnPasswordV4();
      await page.clickOnTotpV4();
      await page.clickOnPasswordV5();
      await page.clickOnTotpV5();

      await page.save();

      expect(page.passwordV4Error).not.toBeNull();
      expect(page.totpV4Error).not.toBeNull();
      expect(page.passwordV5Error).not.toBeNull();
      expect(page.totpV5Error).not.toBeNull();
      expect(page.passwordV4Error.textContent).toStrictEqual("At least one content type should be allowed");
      expect(page.totpV4Error.textContent).toStrictEqual("At least one content type should be allowed");
      expect(page.passwordV5Error.textContent).toStrictEqual("At least one content type should be allowed");
      expect(page.totpV5Error.textContent).toStrictEqual("At least one content type should be allowed");
    });
  });
});
