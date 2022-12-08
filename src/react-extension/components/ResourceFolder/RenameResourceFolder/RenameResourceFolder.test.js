/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

/**
 * Unit tests on FolderRenameDialog in regard of specifications
 */
import {defaultAppContext, defaultProps} from "./RenameResourceFolder.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import RenameResourceFolderPage from "./RenameResourceFolder.test.page";

beforeEach(() => {
  jest.resetModules();
});
const truncatedWarningMessage = "Warning: this is the maximum size for this field, make sure your data was not truncated.";

describe("Rename Folder", () => {
  let page; // The page to test against
  let props = null; // The page props
  let context = null; // The page context

  beforeEach(() => {
    context = defaultAppContext(); // The applicative context
    props = defaultProps(); // The props to pass
    page = new RenameResourceFolderPage(context, props);
  });

  describe('As LU I should rename a folder', () => {
    it('As System I should send a rename request', async() => {
      expect.assertions(1);
      const expectedParameters =  ["passbolt.folders.update", {id: "some folder id", name: "My super folder"}];
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      await page.rename({name: 'My super folder'});
      expect(context.port.request).toHaveBeenCalledWith(...expectedParameters);
    });

    it('As LU I should see a success message when I successfully renamed a folder', async() => {
      expect.assertions(1);
      const expectedMessage = "The folder was renamed successfully";
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      jest.spyOn(props.actionFeedbackContext, 'displaySuccess').mockImplementationOnce(jest.fn());
      await page.rename({name: 'My super folder'});
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith(expectedMessage);
    });

    it('As LU I should see the renamed folder as selected and scrolled', async() => {
      expect.assertions(1);
      const folderId = 'some folder id';
      const expectedParameters = ["passbolt.folders.select-and-scroll-to", folderId];
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: folderId}));
      jest.spyOn(context.port, 'emit').mockImplementationOnce(jest.fn());
      await page.rename({name: 'My super folder'});
      expect(context.port.emit).toHaveBeenCalledWith(...expectedParameters);
    });

    it('As LU I should see the close of the dialog', async() => {
      expect.assertions(1);
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      jest.spyOn(props, 'onClose').mockImplementationOnce(jest.fn());
      await page.rename({name: 'My super folder'});
      expect(props.onClose).toHaveBeenCalled();
    });
  });

  describe('As LU I should input appropriate data to rename a folder', () => {
    it('AS LU I should not fill an empty folder name', async() => {
      expect.assertions(1);
      await page.rename({name: ''});
      expect(page.hasInvalidName).toBeTruthy();
    });

    it('AS LU I should not fill a folder name longer than 256 characters', async() => {
      expect.assertions(1);
      await page.rename({name: '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'});
      expect(page.hasInvalidName).toBeTruthy();
    });
  });

  describe('As LU I should be informed when the folder rename failed', () => {
    it('AS LU I should stays on the dialog if the user have not input the passphrase', async() => {
      expect.assertions(1);
      const error = {name: "UserAbortsOperationError"};
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => Promise.reject(error));
      jest.spyOn(props.actionFeedbackContext, 'displaySuccess').mockImplementationOnce(jest.fn());
      await page.rename({name: 'My super folder'});
      expect(props.actionFeedbackContext.displaySuccess).not.toHaveBeenCalled();
    });

    it('AS LU I should see the error message when the folder rename failed', async() => {
      expect.assertions(1);
      const error = {message: "Some error message"};
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => Promise.reject(error));
      jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn());
      await page.rename({name: 'My super folder'});
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: error});
    });
  });

  describe('AS LU I should cancel the operation', () => {
    it('AS LU I should cancel the operation by closing the dialog', async() => {
      expect.assertions(1);
      jest.spyOn(props, 'onClose').mockImplementationOnce(jest.fn());
      await page.close();
      expect(props.onClose).toHaveBeenCalled();
    });

    it('AS LU I should cancel the operation by explicitely cancelling', async() => {
      expect.assertions(1);
      jest.spyOn(props, 'onClose').mockImplementationOnce(jest.fn());
      await page.cancel();
      expect(props.onClose).toHaveBeenCalled();
    });
  });

  describe('AS LU I should not perform actions during the folder rename', () => {
    it('AS LU I should not cancel during the folder rename', async() => {
      expect.assertions(1);
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canCancel).toBeFalsy();
      };
      await page.rename({name: 'My super folder'}, inProgressFn);
    });

    it('AS LU I should not close during the folder rename', async() => {
      expect.assertions(1);
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canClose).toBeFalsy();
      };
      await page.rename({name: 'My super folder'}, inProgressFn);
    });

    it('AS LU I should not change data during the folder rename', async() => {
      expect.assertions(1);
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canChangeData).toBeFalsy();
      };
      await page.rename({name: 'My super folder'}, inProgressFn);
    });

    it('AS LU I should not re-submit during the folder rename', async() => {
      expect.assertions(1);
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canSubmit).toBeFalsy();
      };
      await page.rename({name: 'My super folder'}, inProgressFn);
    });

    it("As a user I should see a feedback when name field content is truncated by a field limit", async() => {
      expect.assertions(1);
      page.fillInput(page.inputName, 'a'.repeat(256));
      await page.keyUpInput(page.inputName);
      expect(page.nameWarningMessage.textContent).toEqual(truncatedWarningMessage);
    });
  });
});
