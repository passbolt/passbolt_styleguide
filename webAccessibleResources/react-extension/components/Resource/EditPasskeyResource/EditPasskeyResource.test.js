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
 * Unit tests on EditPasskeyResource in regard of specifications
 */

import { defaultProps } from "./EditPasskeyResource.test.data";
import EditPasskeyResourcePage from "./EditPasskeyResource.test.page";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("EditPasskeyResource", () => {
  describe("As LU I can see the passkey edition form", () => {
    it("As LU I should see the passkey name and no appearance form", () => {
      expect.assertions(3);

      const page = new EditPasskeyResourcePage(defaultProps());

      expect(page.title.textContent).toEqual("Edit a passkey");
      expect(page.name.value).toEqual("Example passkey");
      expect(page.iconButton).toBeNull();
    });
  });

  describe("As LU I can rename a passkey", () => {
    it("As LU I should submit the resource with the new name and its other metadata unchanged", async () => {
      expect.assertions(1);

      const props = defaultProps();
      const page = new EditPasskeyResourcePage(props);
      await page.typeName("Renamed passkey");
      await page.click(page.saveButton);

      const resource = props.resource;
      expect(props.onSubmit).toHaveBeenCalledWith({
        id: resource.id,
        resource_type_id: resource.resource_type_id,
        folder_parent_id: resource.folder_parent_id,
        expired: resource.expired,
        metadata: { ...resource.metadata, name: "Renamed passkey" },
      });
    });

    it('As LU I should submit "no name" when I clear the name', async () => {
      expect.assertions(1);

      const props = defaultProps();
      const page = new EditPasskeyResourcePage(props);
      await page.clearName();
      await page.click(page.saveButton);

      expect(props.onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ metadata: { ...props.resource.metadata, name: "no name" } }),
      );
    });

    it("As LU I can cancel the edition", async () => {
      expect.assertions(1);

      const props = defaultProps();
      const page = new EditPasskeyResourcePage(props);
      await page.click(page.cancelButton);

      expect(props.onClose).toHaveBeenCalled();
    });
  });
});
