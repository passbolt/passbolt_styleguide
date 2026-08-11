/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2024 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2024 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.7.0
 */

/**
 * Unit tests on DisplayInFormIntegrationSettings in regard of specifications
 */

import { waitFor } from "@testing-library/react";
import { defaultProps } from "./DisplayInFormIntegrationSettings.test.data";
import DisplayInFormIntegrationSettingsPage from "./DisplayInFormIntegrationSettings.test.page";

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

describe("DisplayInFormIntegrationSettings", () => {
  let page, props;

  describe("As LU I should see the current in-form menu preference", () => {
    it("As LU the toggle should be checked when the in-form menu is enabled", async () => {
      props = defaultProps();
      props.context.port.addRequestListener("passbolt.in-form-integration-settings.get", () => ({
        isInFormMenuEnabled: true,
      }));
      page = new DisplayInFormIntegrationSettingsPage(props);
      await waitFor(() => {
        if (page.inFormMenuCheckbox === null) {
          throw new Error("The toggle is not rendered yet.");
        }
      });
      expect(page.isInFormMenuChecked).toBe(true);
    });

    it("As LU the toggle should be unchecked when the in-form menu is disabled", async () => {
      props = defaultProps();
      props.context.port.addRequestListener("passbolt.in-form-integration-settings.get", () => ({
        isInFormMenuEnabled: false,
      }));
      page = new DisplayInFormIntegrationSettingsPage(props);
      await waitFor(() => {
        if (page.isInFormMenuChecked !== false) {
          throw new Error("The toggle has not been updated yet.");
        }
      });
      expect(page.isInFormMenuChecked).toBe(false);
    });
  });

  describe("As LU I should be able to change the in-form menu preference", () => {
    it("As LU disabling the in-form menu should persist the choice and notify me", async () => {
      props = defaultProps();
      props.context.port.addRequestListener("passbolt.in-form-integration-settings.get", () => ({
        isInFormMenuEnabled: true,
      }));
      const setListener = jest.fn(() => ({ isInFormMenuEnabled: false }));
      props.context.port.addRequestListener("passbolt.in-form-integration-settings.set", setListener);
      page = new DisplayInFormIntegrationSettingsPage(props);
      await waitFor(() => {
        if (!page.isInFormMenuChecked) {
          throw new Error("The toggle is not ready yet.");
        }
      });

      await page.toggleInFormMenu();

      await waitFor(() => {
        if (setListener.mock.calls.length === 0) {
          throw new Error("The setting has not been saved yet.");
        }
      });
      expect(setListener.mock.calls[0][0]).toEqual({ isInFormMenuEnabled: false });
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    });

    it("As LU a failure to save should revert the toggle and notify the error", async () => {
      props = defaultProps();
      props.context.port.addRequestListener("passbolt.in-form-integration-settings.get", () => ({
        isInFormMenuEnabled: true,
      }));
      props.context.port.addRequestListener("passbolt.in-form-integration-settings.set", () => {
        throw new Error("Unable to save");
      });
      page = new DisplayInFormIntegrationSettingsPage(props);
      await waitFor(() => {
        if (!page.isInFormMenuChecked) {
          throw new Error("The toggle is not ready yet.");
        }
      });

      await page.toggleInFormMenu();

      await waitFor(() => {
        if (props.dialogContext.open.mock.calls.length === 0) {
          throw new Error("The error has not been notified yet.");
        }
      });
      expect(props.dialogContext.open).toHaveBeenCalled();
      // the optimistic toggle is reverted on failure
      expect(page.isInFormMenuChecked).toBe(true);
    });
  });
});
