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
 * @since         5.19.0
 */

import { createMemoryHistory } from "history";
import { waitForTrue } from "../../../../test/utils/waitFor";
import { defaultPasswordDrafts, defaultProps } from "./UnsavedPasswordsPage.test.data";
import UnsavedPasswordsPagePage from "./UnsavedPasswordsPage.test.page";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("UnsavedPasswordsPage", () => {
  describe("As LU I can see the generated passwords waiting to be saved", () => {
    it("should display the loading state while the password drafts are retrieved", () => {
      expect.assertions(1);
      const page = new UnsavedPasswordsPagePage(defaultProps());

      expect(page.displayedMainMessage).toStrictEqual("Retrieving your passwords");
    });

    it("should display all the password drafts in the order they are returned", async () => {
      expect.assertions(5);
      const passwordDrafts = defaultPasswordDrafts();
      const page = new UnsavedPasswordsPagePage(defaultProps(passwordDrafts));

      await waitForTrue(() => page.passwordDrafts.length > 0);

      expect(page.passwordDrafts).toHaveLength(2);
      expect(page.getPasswordDraft(0).querySelector(".title").textContent).toStrictEqual(passwordDrafts[0].name);
      expect(page.getPasswordDraft(0).querySelector(".url").textContent).toStrictEqual(passwordDrafts[0].uri);
      expect(page.getPasswordDraft(1).querySelector(".title").textContent).toStrictEqual(passwordDrafts[1].name);
      expect(page.getPasswordDraft(1).querySelector(".username").textContent).toStrictEqual(" (ada@passbolt.com)");
    });

    it("should display a message if there is no password draft", async () => {
      expect.assertions(1);
      const page = new UnsavedPasswordsPagePage(defaultProps([]));

      await waitForTrue(() => page.displayedMainMessage !== "Retrieving your passwords");

      expect(page.displayedMainMessage).toStrictEqual("No unsaved passwords.");
    });

    it("should display a message if the password drafts cannot be retrieved", async () => {
      expect.assertions(2);
      const props = defaultProps();
      const error = new Error("Unable to retrieve the password drafts.");
      props.context.port.addRequestListener("passbolt.quickaccess.get-password-drafts", () => {
        throw error;
      });
      jest.spyOn(console, "error").mockImplementation(() => {});
      const page = new UnsavedPasswordsPagePage(props);

      await waitForTrue(() => page.displayedMainMessage !== "Retrieving your passwords");

      expect(console.error).toHaveBeenCalledWith(error);
      expect(page.displayedMainMessage).toStrictEqual("No unsaved passwords.");
    });
  });

  describe("As LU I can navigate from the unsaved passwords page", () => {
    it("should open the save screen of the selected password draft", async () => {
      expect.assertions(2);
      const passwordDrafts = defaultPasswordDrafts();
      const props = defaultProps(passwordDrafts);
      props.history = createMemoryHistory();
      const page = new UnsavedPasswordsPagePage(props);
      await waitForTrue(() => page.passwordDrafts.length > 0);

      await page.clickOnPasswordDraft(1);

      expect(props.history.location.pathname).toStrictEqual("/webAccessibleResources/quickaccess/resources/autosave");
      expect(props.history.location.state).toStrictEqual({ passwordDraftId: passwordDrafts[1].id });
    });

    it("should go back to the previous page", async () => {
      expect.assertions(1);
      const props = defaultProps();
      props.history = createMemoryHistory({
        initialEntries: [
          "/webAccessibleResources/quickaccess/home",
          "/webAccessibleResources/quickaccess/unsaved-passwords",
        ],
        initialIndex: 1,
      });
      const page = new UnsavedPasswordsPagePage(props);

      await page.clickOnBackButton();

      expect(props.history.location.pathname).toStrictEqual("/webAccessibleResources/quickaccess/home");
    });
  });
});
