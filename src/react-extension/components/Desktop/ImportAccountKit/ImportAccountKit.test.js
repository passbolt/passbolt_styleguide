/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import ImportAccountKitPage from "./ImportAccountKit.test.page";
import {defaultProps, mockFile} from "./importAccountKit.test.data";

describe("ImportAccountKit", () => {
  let page,
    props;
  beforeEach(() => {
    props = defaultProps();
    page = new ImportAccountKitPage(props);
  });

  describe("As an unknown user configuring the desktop app I should be able to import an account kit", () => {
    it('As an unknown user I can see the import account kit page', () => {
      expect.assertions(1);

      expect(page.exists()).toBeTruthy();
    });
    it('As an unknown user I can see the upload input', () => {
      expect.assertions(6);

      expect(page.uploadParent).not.toBeNull();
      expect(page.uploadLabel.textContent).toEqual("Account kit");
      expect(page.uploadButton).not.toBeNull();
      expect(page.uploadInput).not.toBeNull();
      expect(page.uploadAcceptFile).toEqual("application/passbolt");
      expect(page.importButton.textContent).toEqual("Import account");
    });

    it('As an unknown user I should be notified if I have uploaded a wrong file format', async() => {
      expect.assertions(2);

      const file = mockFile({
        name: "test.txt",
        contentType: "plain/text"
      });

      await page.chooseFile(file);
      await page.click(page.importButton);

      expect(page.hasError).toBeTruthy();
      expect(page.errorMessage.textContent).toEqual("Only passbolt format is allowed.");
    });

    it('As an unknown user I should see the upload button disable if I did not upload any file', async() => {
      expect.assertions(1);

      await page.click(page.importButton);

      expect(page.importButton.hasAttribute("disabled")).toBeTruthy();
    });

    it('As an unknown user I should be able to upload a account kit', async() => {
      expect.assertions(3);

      jest.spyOn(props.importAccountKitContext, "verifyAccountKit");
      const file = mockFile();

      await page.chooseFile(file);
      await page.click(page.importButton);

      expect(page.hasError).toBeFalsy();
      expect(page.uploadFilename.value).toEqual(file.name);
      expect(props.importAccountKitContext.verifyAccountKit).toHaveBeenCalledWith(file.content);
    });
  });
});
