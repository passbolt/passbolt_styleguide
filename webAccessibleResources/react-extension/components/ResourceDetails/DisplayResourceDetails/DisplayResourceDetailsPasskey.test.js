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
 * @since         5.18.0
 */

/**
 * Unit tests on DisplayResourceDetailsPasskey in regard of specifications
 */

import "../../../../../test/mocks/mockClipboard";
import { defaultProps } from "./DisplayResourceDetailsPasskey.test.data";
import DisplayResourceDetailsPasskeyPage from "./DisplayResourceDetailsPasskey.test.page";
import { defaultResourceWorkspaceContext } from "../../../contexts/ResourceWorkspaceContext.test.data";
import { resourcePasskeyDto } from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import { defaultResourceMetadataDto } from "../../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";

describe("DisplayResourceDetailsPasskey", () => {
  let props;

  beforeEach(() => {
    jest.clearAllMocks();
    props = defaultProps();
  });

  describe("As LU I can see the passkey section", () => {
    it("I should see the website and username of the passkey", async () => {
      expect.assertions(5);

      const page = new DisplayResourceDetailsPasskeyPage(props);

      expect(page.title.textContent).toEqual("Passkey");
      expect(page.websiteLabel).toEqual("Website");
      expect(page.website.textContent).toEqual("example.com");
      expect(page.usernameLabel).toEqual("Username");
      expect(page.username.textContent).toEqual("ada@example.com");
    });

    it("I should not see a website link if the uris do not name a relying party", async () => {
      expect.assertions(1);

      const resource = resourcePasskeyDto({
        metadata: defaultResourceMetadataDto({ uris: ["https://example.com/path"] }),
      });
      props = defaultProps({
        resourceWorkspaceContext: defaultResourceWorkspaceContext({ details: { resource } }),
      });
      const page = new DisplayResourceDetailsPasskeyPage(props);

      expect(page.website).toBeNull();
    });

    it("I should be able to close the passkey section", async () => {
      expect.assertions(1);

      const page = new DisplayResourceDetailsPasskeyPage(props);

      await page.click(page.title);
      expect(page.exists()).toEqual(false);
    });
  });

  describe("As LU I can use the passkey account information", () => {
    it("I should be able to copy the username to clipboard", async () => {
      expect.assertions(1);

      const page = new DisplayResourceDetailsPasskeyPage(props);

      await page.click(page.username);
      expect(props.clipboardContext.copy).toHaveBeenCalledWith(
        "ada@example.com",
        "The username has been copied to clipboard.",
      );
    });

    it("I should be able to open the website", async () => {
      expect.assertions(1);

      const page = new DisplayResourceDetailsPasskeyPage(props);

      await page.click(page.website);
      expect(props.resourceWorkspaceContext.onGoToResourceUriRequested).toHaveBeenCalledWith("https://example.com");
    });
  });
});
