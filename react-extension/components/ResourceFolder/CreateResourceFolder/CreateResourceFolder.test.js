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
 * Unit tests on FolderCreateDialog in regard of specifications
 */
import {defaultProps} from "./CreateResourceFolder.test.data";
import CreateResourceFolderPage from "./CreateResourceFolder.test.page";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

beforeEach(() => {
  jest.resetModules();
});
const truncatedWarningMessage = "Warning: this is the maximum size for this field, make sure your data was not truncated.";

describe("Create Folder", () => {
  let page; // The page to test against
  let props = null; // The page props

  beforeEach(() => {
    props = defaultProps(); // The props to pass
    page = new CreateResourceFolderPage(props);
  });

  describe('As LU I should create a folder', () => {
    it('As System I should send a create request', async() => {
      expect.assertions(1);
      const expectedParameters =  ["passbolt.folders.create", {folder_parent_id: props.folderParentId, name: "My super folder"}];
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      await page.create({name: 'My super folder'});
      expect(props.context.port.request).toHaveBeenCalledWith(...expectedParameters);
    });

    it('As LU I should see a success message when I successfully created a folder', async() => {
      expect.assertions(1);
      const expectedMessage = "The folder has been added successfully";
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      jest.spyOn(props.actionFeedbackContext, 'displaySuccess').mockImplementationOnce(jest.fn());
      await page.create({name: 'My super folder'});
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith(expectedMessage);
    });

    it('As LU I should see the newly created folder as selected and scrolled', async() => {
      expect.assertions(1);
      const folderId = 'some folder id';
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({id: folderId}));
      await page.create({name: 'My super folder'});
      expect(props.history.push).toHaveBeenCalledWith(`/app/passwords/view/${folderId}`);
    });

    it('As LU I should see the close of the dialog', async() => {
      expect.assertions(1);
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      jest.spyOn(props, 'onClose').mockImplementationOnce(jest.fn());
      await page.create({name: 'My super folder'});
      expect(props.onClose).toHaveBeenCalled();
    });
  });

  describe('As LU I should input appropriate data to create a folder', () => {
    it('AS LU I should not fill an empty folder name', async() => {
      expect.assertions(1);
      await page.create({name: ''});
      expect(page.hasInvalidName).toBeTruthy();
    });

    it('AS LU I should not fill a folder name longer than 256 characters', async() => {
      expect.assertions(1);
      await page.create({name: '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'});
      expect(page.hasInvalidName).toBeTruthy();
    });
  });

  describe('As LU I should be informed when the folder creation failed', () => {
    it('AS LU I should stays on the dialog if the user have not input the passphrase', async() => {
      expect.assertions(1);
      const error = {name: "UserAbortsOperationError"};
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => Promise.reject(error));
      jest.spyOn(props.actionFeedbackContext, 'displaySuccess').mockImplementationOnce(jest.fn());
      await page.create({name: 'My super folder'});
      expect(props.actionFeedbackContext.displaySuccess).not.toHaveBeenCalled();
    });

    it('AS LU I should see the error message when the folder creation failed', async() => {
      expect.assertions(1);
      const error = new Error("Some error message");
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => Promise.reject(error));
      jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn());
      await page.create({name: 'My super folder'});
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

  describe('AS LU I should not perform actions during the folder creation', () => {
    it('AS LU I should not cancel during the folder creation', async() => {
      expect.assertions(1);
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canCancel).toBeFalsy();
      };
      await page.create({name: 'My super folder'}, inProgressFn);
    });

    it('AS LU I should not close during the folder creation', async() => {
      expect.assertions(1);
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canClose).toBeFalsy();
      };
      await page.create({name: 'My super folder'}, inProgressFn);
    });

    it('AS LU I should not change data during the folder creation', async() => {
      expect.assertions(1);
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canChangeData).toBeFalsy();
      };
      await page.create({name: 'My super folder'}, inProgressFn);
    });

    it('AS LU I should not re-submit during the folder creation', async() => {
      expect.assertions(1);
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canSubmit).toBeFalsy();
      };
      await page.create({name: 'My super folder'}, inProgressFn);
    });

    it("As a user I should see a feedback when name field content is truncated by a field limit", async() => {
      expect.assertions(1);
      page.fillInput(page.inputName, 'a'.repeat(256));
      await page.keyUpInput(page.inputName);
      expect(page.nameWarningMessage.textContent).toEqual(truncatedWarningMessage);
    });
  });
});
