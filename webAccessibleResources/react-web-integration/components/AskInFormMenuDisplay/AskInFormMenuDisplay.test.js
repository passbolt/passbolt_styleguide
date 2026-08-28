/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

/**
 * Unit tests on AskInFormMenuDisplay in regard of specifications
 */

import { waitFor } from "@testing-library/react";
import AskInFormMenuDisplayTestPage from "./AskInFormMenuDisplay.test.page";
import {
  getContextWithAuthenticatedUser,
  getContextWithAuthenticatedUserAndAppOverlaid,
  getContextWithAuthenticatedUserAndResources,
  getContextWithUnauthenticatedUser,
  getContextWithUnauthenticatedUserAndAppOverlaid,
} from "./AskInFormMenuDisplay.test.data";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("AskInFormMenuDisplay", () => {
  describe("As a logged out user on a webpage with a form", () => {
    it("I shouldn't see a Passbolt icon while the authentication status is being checked, then a grey icon after", async () => {
      const context = getContextWithUnauthenticatedUser();
      jest.spyOn(context.port, "request");

      const page = new AskInFormMenuDisplayTestPage(context);

      expect(page.hasChildren).toBe(false);

      await waitFor(() => expect(context.port.request).toHaveBeenCalledTimes(1));

      expect(page.isActive).toBe(false);
      expect(page.hasChildren).toBe(false);
    });

    it("I should trigger the menu toggling when clicking the icon while the application is not overlaid", async () => {
      const context = getContextWithUnauthenticatedUserAndAppOverlaid(false);
      jest.spyOn(context.port, "request");

      const page = new AskInFormMenuDisplayTestPage(context);

      await waitFor(() => expect(context.port.request).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(page.hasChildren).toBe(true));

      page.clickIcon();

      await waitFor(() => expect(context.port.request).toHaveBeenCalledTimes(3));
      expect(context.port.request).toHaveBeenCalledWith("passbolt.in-form-cta.is-application-overlaid", 1);
      expect(context.port.request).toHaveBeenCalledWith("passbolt.in-form-cta.execute");
    });

    it("I should not trigger menu opening when clicking the icon while the application is overlaid", async () => {
      const context = getContextWithUnauthenticatedUserAndAppOverlaid(true);
      jest.spyOn(context.port, "request");

      const page = new AskInFormMenuDisplayTestPage(context);

      await waitFor(() => expect(context.port.request).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(page.hasChildren).toBe(true));

      page.clickIcon();

      await waitFor(() => expect(context.port.request).toHaveBeenCalledTimes(2));
      expect(context.port.request).toHaveBeenCalledWith("passbolt.in-form-cta.is-application-overlaid", 1);
      expect(context.port.request).not.toHaveBeenCalledWith("passbolt.in-form-cta.execute");
    });
  });

  describe("As a logged in user on a webpage with a form", () => {
    it("I shouldn't see a Passbolt icon while the authentication status is being checked, then a red icon after", async () => {
      const context = getContextWithAuthenticatedUser();
      jest.spyOn(context.port, "request");

      const page = new AskInFormMenuDisplayTestPage(context);

      expect(page.hasChildren).toBe(false);

      await waitFor(() => expect(context.port.request).toHaveBeenCalledTimes(2));

      expect(page.hasChildren).toBe(true);
      expect(page.isActive).toBe(true);
    });

    it("I should see a Passbolt icon with a badge when resources are suggested", async () => {
      const context = getContextWithAuthenticatedUserAndResources();
      jest.spyOn(context.port, "request");

      const page = new AskInFormMenuDisplayTestPage(context);

      await waitFor(() => expect(context.port.request).toHaveBeenCalledTimes(2));

      expect(page.iconCount).toEqual("4");
    });

    it("I should see a Passbolt icon with a '5+' badge when more than 5 resources are suggested", async () => {
      const context = getContextWithAuthenticatedUserAndResources(10);
      jest.spyOn(context.port, "request");

      const page = new AskInFormMenuDisplayTestPage(context);

      await waitFor(() => expect(context.port.request).toHaveBeenCalledTimes(2));

      expect(page.iconCount).toEqual("5+");
    });

    it("I should trigger the menu toggling when clicking the icon while the application is not overlaid", async () => {
      const context = getContextWithAuthenticatedUserAndAppOverlaid(false);
      jest.spyOn(context.port, "request");

      const page = new AskInFormMenuDisplayTestPage(context);

      await waitFor(() => expect(context.port.request).toHaveBeenCalledTimes(2));

      page.clickIcon();

      await waitFor(() => expect(context.port.request).toHaveBeenCalledTimes(4));
      expect(context.port.request).toHaveBeenCalledWith("passbolt.in-form-cta.is-application-overlaid", 1);
      expect(context.port.request).toHaveBeenCalledWith("passbolt.in-form-cta.execute");
    });

    it("I should not trigger menu opening when clicking the icon while the application is overlaid", async () => {
      const context = getContextWithAuthenticatedUserAndAppOverlaid(true);
      jest.spyOn(context.port, "request");

      const page = new AskInFormMenuDisplayTestPage(context);

      await waitFor(() => expect(context.port.request).toHaveBeenCalledTimes(2));

      page.clickIcon();

      await waitFor(() => expect(context.port.request).toHaveBeenCalledTimes(3));
      expect(context.port.request).toHaveBeenCalledWith("passbolt.in-form-cta.is-application-overlaid", 1);
      expect(context.port.request).not.toHaveBeenCalledWith("passbolt.in-form-cta.execute");
    });
  });

  describe("Authentication status changes", () => {
    it("As a logged in user, I should see a grey icon after logging out", async () => {
      const context = getContextWithAuthenticatedUserAndResources();
      jest.spyOn(context.port, "request");

      const page = new AskInFormMenuDisplayTestPage(context);

      await waitFor(() => expect(context.port.request).toHaveBeenCalledTimes(2));

      expect(page.isActive).toBe(true);
      expect(page.iconCount).toEqual("4");

      await context.port.emit("passbolt.auth.after-logout");

      expect(page.isActive).toBe(false);
      expect(page.hasChildren).toBe(true);
    });

    it("As a logged out user, I should see an active icon after logging in", async () => {
      const context = getContextWithUnauthenticatedUser();
      context.port.addRequestListener("passbolt.in-form-cta.suggested-resources", () => 3);
      jest.spyOn(context.port, "request");

      const page = new AskInFormMenuDisplayTestPage(context);

      await waitFor(() => expect(context.port.request).toHaveBeenCalledTimes(1));

      expect(page.isActive).toBe(false);

      await context.port.emit("passbolt.auth.after-login");

      await waitFor(() => expect(context.port.request).toHaveBeenCalledTimes(2));

      expect(page.isActive).toBe(true);
      expect(page.iconCount).toBe("3");
    });
  });
});
