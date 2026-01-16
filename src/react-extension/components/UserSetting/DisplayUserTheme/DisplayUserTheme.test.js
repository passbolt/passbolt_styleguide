/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import { defaultProps, themes } from "./DisplayUserTheme.test.data";
import DisplayUserThemePage from "./DisplayUserTheme.test.page";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import { screen } from "@testing-library/react";

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

describe("Display user theme", () => {
  let page, props;

  beforeEach(() => {
    props = defaultProps();
    props.context.port.addRequestListener("passbolt.themes.find-all", () => themes);
    page = new DisplayUserThemePage(props);
  });

  describe("As LU, I should see the appropriate list of themes", () => {
    it("As LU, I should see initially an empty content when there are no resources", async () => {
      expect.assertions(4);
      const themeButtons = await screen.findAllByRole("button");
      expect(themeButtons.length).toBeGreaterThan(0);
      expect(page.themesCount).toStrictEqual(4);
      expect(props.loadingContext.add).toHaveBeenCalledTimes(1);
      expect(props.loadingContext.remove).toHaveBeenCalledTimes(1);
    });
  });

  describe("As LU, I should select themes", () => {
    it("As LU, I should select midgar theme", async () => {
      expect.assertions(5);

      jest.spyOn(props.context.port, "request");

      const themeButtons = await screen.findAllByRole("button");
      expect(themeButtons.length).toBeGreaterThan(0);
      await page.theme(2).select();

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.themes.change", "midgar");
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
      expect(props.loadingContext.add).toHaveBeenCalledTimes(2);
      expect(props.loadingContext.remove).toHaveBeenCalledTimes(2);
    });

    it("As LU selecting the already selected theme should not trigger a change", async () => {
      expect.assertions(4);

      jest.spyOn(props.context.port, "request");

      const themeButtons = await screen.findAllByRole("button");
      expect(themeButtons.length).toBeGreaterThan(0);

      await page.theme(2).select();
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.themes.change", "midgar");
      expect(props.context.port.request).toHaveBeenCalledTimes(1);
      await page.theme(2).select();
      expect(props.context.port.request).toHaveBeenCalledTimes(1);
    });

    it("As LU, I should select a theme with failure", async () => {
      expect.assertions(6);
      const themeButtons = await screen.findAllByRole("button");
      expect(themeButtons.length).toBeGreaterThan(0);

      jest.spyOn(props.context.port, "request").mockImplementationOnce(() => Promise.reject("error"));
      await page.theme(3).select();
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.themes.change", "solarized_dark");
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledTimes(0);
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error: "error" });
      expect(props.loadingContext.add).toHaveBeenCalledTimes(2);
      expect(props.loadingContext.remove).toHaveBeenCalledTimes(2);
    });
  });
});
