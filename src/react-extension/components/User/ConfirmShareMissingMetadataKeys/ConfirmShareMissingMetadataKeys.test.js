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
 * @since         5.2.0
 */

import MetadataKeysServiceWorkerService from "../../../../shared/services/serviceWorker/metadata/metadataKeysServiceWorkerService";
import {
  defaultProps,
  notOwnedAllMisingMetadataKeysProps,
  ownedPartiallyMisingMetadataKeysProps,
} from "./ConfirmShareMissingMetadataKeys.test.data";
import ConfirmShareMissingMetadataKeysPage from "./ConfirmShareMissingMetadataKeys.test.page";

describe("Display the Confirm share missing metadata keys Dialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });
  describe("As AD I should be able to share missing metadata keys", () => {
    it("As an AD, I should be able to share all missing metadata keys if I own all of them.", async () => {
      expect.assertions(6);

      const props = defaultProps();
      const page = new ConfirmShareMissingMetadataKeysPage(props);

      expect(page.dialogContent).toEqual("Share missing metadata keys with Ada Lovelace (ada@passbolt.com)");
      expect(page.confirmButton.textContent).toEqual("Share");
      expect(page.cancelButton).toBeDefined();

      jest.spyOn(MetadataKeysServiceWorkerService.prototype, "share").mockImplementation(() => jest.fn());

      await page.confirm();

      expect(MetadataKeysServiceWorkerService.prototype.share).toHaveBeenCalledWith(
        "f848277c-5398-58f8-a82a-72397af2d450",
      );
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
      expect(props.onClose).toHaveBeenCalled();
    });

    it("As an AD, I should be able to share partially the missing metadata keys that I own.", async () => {
      expect.assertions(6);

      const props = ownedPartiallyMisingMetadataKeysProps();
      const page = new ConfirmShareMissingMetadataKeysPage(props);

      expect(page.dialogContent).toEqual(
        "Share your available metadata keys with Ada Lovelace (ada@passbolt.com)? You're missing some keys yourself. Ask another administrator to share the remaining keys.",
      );
      expect(page.confirmButton.textContent).toEqual("Share");
      expect(page.cancelButton).toBeDefined();

      jest.spyOn(MetadataKeysServiceWorkerService.prototype, "share").mockImplementation(() => jest.fn());

      await page.confirm();

      expect(MetadataKeysServiceWorkerService.prototype.share).toHaveBeenCalledWith(
        "f848277c-5398-58f8-a82a-72397af2d450",
      );
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
      expect(props.onClose).toHaveBeenCalled();
    });

    it("As an AD, I should not be able to share missing metadata keys if I missed all these keys.", async () => {
      expect.assertions(6);

      const props = notOwnedAllMisingMetadataKeysProps();
      const page = new ConfirmShareMissingMetadataKeysPage(props);

      expect(page.dialogContent).toEqual(
        "You can't share metadata keys with Ada Lovelace (ada@passbolt.com) because you don't have access to them. Ask another administrator for help.",
      );
      expect(page.confirmButton.textContent).toEqual("Ok");
      expect(page.cancelButton).toEqual(null);

      jest.spyOn(MetadataKeysServiceWorkerService.prototype, "share");

      await page.confirm();

      expect(MetadataKeysServiceWorkerService.prototype.share).not.toHaveBeenCalled();
      expect(props.actionFeedbackContext.displaySuccess).not.toHaveBeenCalled();
      expect(props.onClose).toHaveBeenCalled();
    });

    it("As AD I should cancel the operation when I cannot share keys", async () => {
      expect.assertions(1);

      const props = notOwnedAllMisingMetadataKeysProps();
      const page = new ConfirmShareMissingMetadataKeysPage(props);

      await page.confirm();

      expect(props.onClose).toBeCalled();
    });

    it("As AD I should cancel the operation", async () => {
      expect.assertions(1);

      const props = defaultProps();
      const page = new ConfirmShareMissingMetadataKeysPage(props);

      await page.cancel();

      expect(props.onClose).toBeCalled();
    });

    it("As AD I should see an error message if the user MFA disabling goes wrong", async () => {
      expect.assertions(1);

      const props = defaultProps();
      const page = new ConfirmShareMissingMetadataKeysPage(props);
      const error = new Error("Some error");

      jest.spyOn(MetadataKeysServiceWorkerService.prototype, "share").mockImplementation(() => {
        throw error;
      });

      await page.confirm();

      expect(props.actionFeedbackContext.displayError).toHaveBeenCalled();
    });
  });
});
