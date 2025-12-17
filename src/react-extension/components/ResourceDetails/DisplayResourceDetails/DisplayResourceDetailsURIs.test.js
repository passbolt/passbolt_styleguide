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
 * @since         5.3.0
 */

import DisplayResourceDetailsURIsPage from "./DisplayResourceDetailsURIs.test.page";
import { defaultProps, resourceWithMultipleUris } from "./DisplayResourceDetailsURIs.test.data";

describe("DisplayResourceDetailsURIs", () => {
  let page, props;

  beforeEach(() => {
    props = defaultProps({ resourceWorkspaceContext: { details: { resource: resourceWithMultipleUris } } });
    page = new DisplayResourceDetailsURIsPage(props);
  });
  describe("As LU, I should see all uris of a resource.", () => {
    it("should display the URIs section when the title is clicked", async () => {
      expect.assertions(2);

      expect(page.isOpen).toBe(false);
      await page.clickOn(page.title);
      expect(page.isOpen).toBe(true);
    });

    it("should display the main URI", async () => {
      expect.assertions(3);

      await page.clickOn(page.title);

      expect(page.mainUriLabel).not.toBeNull();
      expect(page.mainUriValue).not.toBeNull();
      expect(page.mainUriValue.textContent).toBe("http://www.apache.org/");
    });

    it("should display additional URIs", async () => {
      expect.assertions(4);

      await page.clickOn(page.title);

      expect(page.additionalUrisLabel).not.toBeNull();
      expect(page.additionalUrisCount).toBe(2);
      expect(page.additionalUrisValues[0].textContent).toBe("https://www.passbolt.com/");
      expect(page.additionalUrisValues[1].textContent).toBe("http://www.mastodon.social/");
    });
  });
  describe("As LU, I should open the uri of a resource.", () => {
    it("As LU, I should be able to follow the uri of a resource", async () => {
      expect.assertions(1);
      jest.spyOn(props.resourceWorkspaceContext, "onGoToResourceUriRequested").mockImplementationOnce(() => jest.fn());

      await page.clickOn(page.title);
      await page.clickOn(page.mainUriValue);

      expect(props.resourceWorkspaceContext.onGoToResourceUriRequested).toHaveBeenCalled();
    });

    it("As LU, I should be able to follow the second additional URI", async () => {
      expect.assertions(1);
      jest.spyOn(props.resourceWorkspaceContext, "onGoToResourceUriRequested").mockImplementationOnce(() => jest.fn());

      await page.clickOn(page.title);
      await page.clickOn(page.additionalUrisValues[1]);

      expect(props.resourceWorkspaceContext.onGoToResourceUriRequested).toHaveBeenCalled();
    });
  });
});
