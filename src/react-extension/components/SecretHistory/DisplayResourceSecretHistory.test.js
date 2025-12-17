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
 * @since         5.7.0
 */

/**
 * Unit tests on Display Resource Secret History in regard of specifications
 */
import DisplayResourceSecretHistoryPage from "./DisplayResourceSecretHistory.test.page";
import { defaultProps, secretRevisionsDtos } from "./DisplayResourceSecretHistory.test.data";
import { formatDateTimeAgo } from "../../../shared/utils/dateUtils";
import { act } from "react";

describe("See the Display Resource Secret History", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe("As a signed-in user I can see a secret revision of a resource", () => {
    it("As a signed-in user I can see the creator and the revision of a resource", async () => {
      expect.assertions(8);
      const props = defaultProps(); // The props to pass
      let page, expectedSecretRevisions;
      jest.spyOn(props.context.port, "request").mockImplementationOnce((resourceId) => {
        expectedSecretRevisions = secretRevisionsDtos(resourceId);
        return expectedSecretRevisions;
      });
      await act(async () => (page = new DisplayResourceSecretHistoryPage(props)));
      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();
      expect(page.header.textContent).toBe("Secret history");
      expect(page.subtitle.textContent).toBe(props.resource.metadata.name);

      // Close button exists
      expect(page.dialogClose).not.toBeNull();
      expect(page.secretRevisionLength).toStrictEqual(9);
      expect(page.secretRevisionContentTitle.textContent).toStrictEqual(
        `Secret revision${formatDateTimeAgo(expectedSecretRevisions[0].modified)}`,
      );
      expect(page.secretRevisionContent.textContent).toStrictEqual(
        JSON.stringify(expectedSecretRevisions[0].secrets[0].data, null, 2),
      );

      // Save button exists
      expect(page.submitButton.textContent).toBe("Close");
    });

    describe("should select a resource secret revision", () => {
      it("As a signed-in user I should be able to select another secret revision", async () => {
        expect.assertions(5);
        const props = defaultProps(); // The props to pass
        let page, expectedSecretRevisions;
        jest.spyOn(props.context.port, "request").mockImplementationOnce((resourceId) => {
          expectedSecretRevisions = secretRevisionsDtos(resourceId);
          return expectedSecretRevisions;
        });
        await act(async () => (page = new DisplayResourceSecretHistoryPage(props)));
        // Dialog title exists and correct
        expect(page.exists()).toBeTruthy();

        // select description form
        await page.click(page.getSecretRevisionCreatorItem(2).element);
        // expectations
        expect(page.secretRevisionCreatorItemSelected.name).toStrictEqual(
          `${expectedSecretRevisions[1].creator.profile.first_name} ${expectedSecretRevisions[1].creator.profile.last_name}`,
        );
        expect(page.secretRevisionCreatorItemSelected.username).toStrictEqual(
          expectedSecretRevisions[1].creator.username,
        );
        expect(page.secretRevisionCreatorItemSelected.status).toStrictEqual("Suspended");
        expect(page.secretRevisionContent.textContent).toStrictEqual(
          JSON.stringify(expectedSecretRevisions[1].secrets[0].data, null, 2),
        );
      });

      it("As a signed-in user I should not be able to select a revision I have no access", async () => {
        expect.assertions(6);
        const props = defaultProps(); // The props to pass
        let page, expectedSecretRevisions;
        jest.spyOn(props.context.port, "request").mockImplementationOnce((resourceId) => {
          expectedSecretRevisions = secretRevisionsDtos(resourceId);
          return expectedSecretRevisions;
        });
        await act(async () => (page = new DisplayResourceSecretHistoryPage(props)));
        // Dialog title exists and correct
        expect(page.exists()).toBeTruthy();

        // select description form
        await page.click(page.getSecretRevisionCreatorItem(8).element);
        // expectations
        expect(page.secretRevisionCreatorItemSelected.name).toStrictEqual(
          `${expectedSecretRevisions[0].creator.profile.first_name} ${expectedSecretRevisions[0].creator.profile.last_name}`,
        );
        expect(page.secretRevisionCreatorItemSelected.username).toStrictEqual(
          expectedSecretRevisions[0].creator.username,
        );
        expect(page.secretRevisionCreatorItemSelected.status).toBeUndefined();
        expect(page.secretRevisionContent.textContent).toStrictEqual(
          JSON.stringify(expectedSecretRevisions[0].secrets[0].data, null, 2),
        );
        expect(page.getSecretRevisionCreatorItem(8).element.hasAttribute("disabled")).not.toBeNull();
      });
    });
  });

  describe("Close dialog", () => {
    it("As LU I can stop looking secret revision by clicking on the submit button", async () => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      jest.spyOn(props.context.port, "request").mockImplementationOnce((resourceId) => secretRevisionsDtos(resourceId));
      const page = new DisplayResourceSecretHistoryPage(props);

      expect(page.exists()).toBeTruthy();
      await page.click(page.submitButton);
      expect(props.onClose).toHaveBeenCalled();
    });

    it("As LU I can stop looking secret revision by closing the dialog", async () => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      jest.spyOn(props.context.port, "request").mockImplementationOnce((resourceId) => secretRevisionsDtos(resourceId));
      const page = new DisplayResourceSecretHistoryPage(props);

      expect(page.exists()).toBeTruthy();
      await page.click(page.dialogClose);
      expect(props.onClose).toHaveBeenCalled();
    });

    it("As LU I can stop looking secret revision with the keyboard (escape)", async () => {
      expect.assertions(2);
      let page;
      const props = defaultProps(); // The props to pass
      jest.spyOn(props.context.port, "request").mockImplementationOnce((resourceId) => secretRevisionsDtos(resourceId));
      await act(async () => (page = new DisplayResourceSecretHistoryPage(props)));
      expect(page.exists()).toBeTruthy();
      await page.escapeKey(page.dialogClose);
      expect(props.onClose).toHaveBeenCalled();
    });
  });
});
