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
 * @since         4.9.0
 */

/**
 * Unit tests on ConfirmCreateEdit in regard of specifications
 */
import { waitFor } from "@testing-library/react";
import ConfirmCreateEditPage from "./ConfirmCreateEdit.test.page";
import { defaultProps } from "./ConfirmCreateEdit.test.data";
import { ConfirmEditCreateOperationVariations, ConfirmEditCreateRuleVariations } from "./ConfirmCreateEdit";

beforeEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});

describe("ConfirmCreateEdit", () => {
  describe("As LU I can confirm or cancel a created resource", () => {
    it("As LU I can confirm a resource", async () => {
      expect.assertions(6);
      const props = defaultProps({
        operation: ConfirmEditCreateOperationVariations.CREATE,
        rule: ConfirmEditCreateRuleVariations.IN_DICTIONARY,
      }); // The props to pass
      const page = new ConfirmCreateEditPage(props);
      await waitFor(() => {});

      expect(page.exists).toBeTruthy();
      expect(page.title).toBe("Confirm resource creation");
      expect(page.rule).toBe("The password is part of an exposed data breach.");
      expect(page.operation).toBe(`Are you sure you want to create the resource ${props.resourceName}?`);

      await page.save();

      expect(props.onConfirm).toHaveBeenCalled();
      expect(props.onClose).toHaveBeenCalled();
    });

    it("As LU I can cancel a resource", async () => {
      expect.assertions(6);
      const props = defaultProps({
        operation: ConfirmEditCreateOperationVariations.CREATE,
        rule: ConfirmEditCreateRuleVariations.MINIMUM_ENTROPY,
      }); // The props to pass
      const page = new ConfirmCreateEditPage(props);
      await waitFor(() => {});

      expect(page.exists).toBeTruthy();
      expect(page.title).toBe("Confirm resource creation");
      expect(page.rule).toBe("The password is very weak and might be part of an exposed data breach.");
      expect(page.operation).toBe(`Are you sure you want to create the resource ${props.resourceName}?`);

      await page.cancel();

      expect(props.onReject).toHaveBeenCalled();
      expect(props.onClose).toHaveBeenCalled();
    });

    it("As LU I should see buttons disabled when the save is not finished", async () => {
      expect.assertions(4);
      const props = defaultProps();
      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(
        () =>
          new Promise((resolve) => {
            updateResolve = resolve;
          }),
      );
      jest.spyOn(props, "onConfirm").mockImplementation(requestMockImpl);

      const page = new ConfirmCreateEditPage(props);
      await waitFor(() => {});

      page.saveWithoutWaiting();

      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.dialogClose.getAttribute("disabled")).not.toBeNull();
        expect(page.saveButton.hasAttribute("disabled")).toBeTruthy();
        expect(page.cancelButton.className).toBe("link cancel");
        expect(page.cancelButton.hasAttribute("disabled")).toBeTruthy();
        updateResolve();
      });
    });

    it("As LU I can cancel by closing the dialog", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const page = new ConfirmCreateEditPage(props);
      await waitFor(() => {});
      await page.closeDialog();
      expect(props.onClose).toBeCalled();
    });

    it("As LU I can cancel with the keyboard (escape)", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const page = new ConfirmCreateEditPage(props);
      await waitFor(() => {});
      await page.escapeKey();
      expect(props.onClose).toBeCalled();
    });
  });

  describe("As LU I can confirm or cancel an edited resource", () => {
    it("As LU I can confirm a resource", async () => {
      expect.assertions(6);
      const props = defaultProps({
        operation: ConfirmEditCreateOperationVariations.EDIT,
        rule: ConfirmEditCreateRuleVariations.IN_DICTIONARY,
      }); // The props to pass
      const page = new ConfirmCreateEditPage(props);
      await waitFor(() => {});

      expect(page.exists).toBeTruthy();
      expect(page.title).toBe("Confirm resource edition");
      expect(page.rule).toBe("The password is part of an exposed data breach.");
      expect(page.operation).toBe(`Are you sure you want to edit the resource ${props.resourceName}?`);

      await page.save();

      expect(props.onConfirm).toHaveBeenCalled();
      expect(props.onClose).toHaveBeenCalled();
    });

    it("As LU I can cancel a resource", async () => {
      expect.assertions(6);
      const props = defaultProps({
        operation: ConfirmEditCreateOperationVariations.EDIT,
        rule: ConfirmEditCreateRuleVariations.MINIMUM_ENTROPY,
      }); // The props to pass
      const page = new ConfirmCreateEditPage(props);
      await waitFor(() => {});

      expect(page.exists).toBeTruthy();
      expect(page.title).toBe("Confirm resource edition");
      expect(page.rule).toBe("The password is very weak and might be part of an exposed data breach.");
      expect(page.operation).toBe(`Are you sure you want to edit the resource ${props.resourceName}?`);

      await page.cancel();

      expect(props.onReject).toHaveBeenCalled();
      expect(props.onClose).toHaveBeenCalled();
    });
  });
});
