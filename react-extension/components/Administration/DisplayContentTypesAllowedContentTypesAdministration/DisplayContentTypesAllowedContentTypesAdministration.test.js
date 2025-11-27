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
import {act} from 'react';

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

      let page;
      await act(
        async() => page = new DisplayContentTypesAllowedContentTypesAdministration(props)
      );

      await page.clickOn(page.passwordV4Checkbox);

      expect(page.formBanner).not.toBeNull();
      expect(page.formBanner.textContent).toStrictEqual("Warning: Don't forget to save your settings to apply your modification.");
    });

    it("displays warning on v4 fields if creation is allowed but there is not content types available", async() => {
      expect.assertions(7);

      let page;
      await act(
        async() => page = new DisplayContentTypesAllowedContentTypesAdministration(withOnlyTotpV5Enabled())
      );

      expect(page.passwordV4Warning).not.toBeNull();
      expect(page.passwordV4Warning.textContent).toStrictEqual("Creation of content type v4 is allowed but all content types having passwords are deleted.");

      expect(page.totpV4Warning).not.toBeNull();
      expect(page.totpV4Warning.textContent).toStrictEqual("Creation of content type v4 is allowed but all content types having totp are deleted.");

      await page.clickOn(page.passwordV4Checkbox);
      await page.clickOn(page.totpV5Checkbox);

      expect(page.totpV5Warning).toBeNull();
      expect(page.passwordV5Warning).toBeNull();
      expect(page.noteV5Warning).toBeNull();
    });

    it("displays warning on v5 fields if creation is allowed but there is not content types available", async() => {
      expect.assertions(10);

      let page;
      await act(
        async() => page = new DisplayContentTypesAllowedContentTypesAdministration(withOnlyTotpV4Enabled())
      );

      expect(page.passwordV5Warning).not.toBeNull();
      expect(page.passwordV5Warning.textContent).toStrictEqual("Creation of content type v5 is allowed but all content types having passwords are deleted.");

      expect(page.totpV5Warning).not.toBeNull();
      expect(page.totpV5Warning.textContent).toStrictEqual("Creation of content type v5 is allowed but all content types having totp are deleted.");

      expect(page.customFieldsV5Warning).not.toBeNull();
      expect(page.customFieldsV5Warning.textContent).toStrictEqual("Creation of content type v5 is allowed but custom fields resource type is deleted.");

      expect(page.noteV5Warning).not.toBeNull();
      expect(page.noteV5Warning.textContent).toStrictEqual("Creation of content type v5 is allowed but note resource type is deleted.");

      await page.clickOn(page.passwordV5Checkbox);
      await page.clickOn(page.totpV4Checkbox);

      expect(page.totpV4Warning).toBeNull();
      expect(page.passwordV4Warning).toBeNull();
    });

    it("displays error on fields if v5 is enabled but there is no metadata key set", async() => {
      expect.assertions(8);

      let page;
      await act(
        async() => page = new DisplayContentTypesAllowedContentTypesAdministration(withoutMetadataKeys())
      );

      expect(page.passwordV5Warning).not.toBeNull();
      expect(page.totpV5Warning).not.toBeNull();
      expect(page.customFieldsV5Warning).not.toBeNull();
      expect(page.noteV5Warning).not.toBeNull();
      expect(page.passwordV5Warning.textContent).toStrictEqual("No active metadata key defined.");
      expect(page.totpV5Warning.textContent).toStrictEqual("No active metadata key defined.");
      expect(page.customFieldsV5Warning.textContent).toStrictEqual("No active metadata key defined.");
      expect(page.noteV5Warning.textContent).toStrictEqual("No active metadata key defined.");
    });
  });

  describe("As a signed-in administrator, I should see errors", () => {
    it("displays error on fields if no resource types is selected and admin tries to save", async() => {
      expect.assertions(11);

      let page;
      await act(
        async() => page = new DisplayContentTypesAllowedContentTypesAdministration(defaultProps())
      );

      await page.clickOn(page.passwordV4Checkbox);
      await page.clickOn(page.totpV4Checkbox);
      await page.clickOn(page.passwordV5Checkbox);
      await page.clickOn(page.totpV5Checkbox);
      await page.clickOn(page.noteV5Checkbox);

      await page.save();

      expect(page.passwordV4Error).not.toBeNull();
      expect(page.totpV4Error).not.toBeNull();
      expect(page.passwordV5Error).not.toBeNull();
      expect(page.totpV5Error).not.toBeNull();
      expect(page.noteV5Error).not.toBeNull();
      expect(page.passwordV4Error.textContent).toStrictEqual("At least one content type should be allowed");
      expect(page.totpV4Error.textContent).toStrictEqual("At least one content type should be allowed");
      expect(page.passwordV5Error.textContent).toStrictEqual("At least one content type should be allowed");
      expect(page.totpV5Error.textContent).toStrictEqual("At least one content type should be allowed");
      expect(page.customFieldsV5Error.textContent).toStrictEqual("At least one content type should be allowed");
      expect(page.noteV5Error.textContent).toStrictEqual("At least one content type should be allowed");
    });
  });
});
