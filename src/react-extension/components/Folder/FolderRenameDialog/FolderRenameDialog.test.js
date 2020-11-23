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
import {defaultAppContext, defaultProps} from "./FolderRenameDialog.test.data";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import FolderRenameDialogPage from "./FolderRenameDialog.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("Rename Folder", () => {
  let page; // The page to test against
  let props = null; // The page props
  let context = null; // The page context

  beforeEach(() => {
    context = defaultAppContext(); // The applicative context
    props = defaultProps(); // The props to pass
    page = new FolderRenameDialogPage(context, props);
  });

  describe('As LU I should rename a folder', () => {
    it('As System I should send a rename request', async() => {
      const expectedParameters =  ["passbolt.folders.update", {id: "some folder id", name: "My super folder"}];
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      await page.rename({name: 'My super folder'});
      expect(context.port.request).toHaveBeenCalledWith(...expectedParameters);
    });

    it('As LU I should see a success message when I successfully renamed a folder', async() => {
      const expectedMessage = "The folder was renamed successfully";
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      jest.spyOn(props.actionFeedbackContext, 'displaySuccess').mockImplementationOnce(jest.fn());
      await page.rename({name: 'My super folder'});
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith(expectedMessage);
    });

    it('As LU I should see the renamed folder as selected and scrolled', async() => {
      const folderId = 'some folder id';
      const expectedParameters = ["passbolt.folders.select-and-scroll-to", folderId];
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: folderId}));
      jest.spyOn(context.port, 'emit').mockImplementationOnce(jest.fn());
      await page.rename({name: 'My super folder'});
      expect(context.port.emit).toHaveBeenCalledWith(...expectedParameters);
    });

    it('As LU I should see the close of the dialog', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      jest.spyOn(props, 'onClose').mockImplementationOnce(jest.fn());
      await page.rename({name: 'My super folder'});
      expect(props.onClose).toHaveBeenCalled();
    });
  });

  describe('As LU I should input appropriate data to rename a folder', () => {
    it('AS LU I should not fill an empty folder name', async() => {
      await page.rename({name: ''});
      expect(page.hasInvalidName).toBeTruthy();
    });

    it('AS LU I should not fill a folder name longer than 64 characters', async() => {
      await page.rename({name: '1111111111 1111111111 1111111111 1111111111 1111111111 1111111111 1111'});
      expect(page.hasInvalidName).toBeTruthy();
    });
  });

  describe('As LU I should be informed when the folder rename failed', () => {
    it('AS LU I should stays on the dialog if the user have not input the passphrase', async() => {
      const error = {name: "UserAbortsOperationError"};
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => Promise.reject(error));
      jest.spyOn(props.actionFeedbackContext, 'displaySuccess').mockImplementationOnce(jest.fn());
      await page.rename({name: 'My super folder'});
      expect(props.actionFeedbackContext.displaySuccess).not.toHaveBeenCalled();
    });

    it('AS LU I should see the error message when the folder rename failed', async() => {
      const error = {message: "Some error message"};
      const dialogErrorProps = {errorDialogProps: {title: "There was an unexpected error...", message: error.message}};
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => Promise.reject(error));
      jest.spyOn(context, 'setContext').mockImplementationOnce(jest.fn());
      jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn());
      await page.rename({name: 'My super folder'});
      expect(context.setContext).toHaveBeenCalledWith(dialogErrorProps);
      expect(props.dialogContext.open).toHaveBeenCalledWith(ErrorDialog);
    });
  });

  describe('AS LU I should cancel the operation', () => {
    it('AS LU I should cancel the operation by closing the dialog', async() => {
      jest.spyOn(props, 'onClose').mockImplementationOnce(jest.fn());
      await page.close();
      expect(props.onClose).toHaveBeenCalled();
    });

    it('AS LU I should cancel the operation by explicitely cancelling', async() => {
      jest.spyOn(props, 'onClose').mockImplementationOnce(jest.fn());
      await page.cancel();
      expect(props.onClose).toHaveBeenCalled();
    });
  });

  describe('AS LU I should not perform actions during the folder rename', () => {
    it('AS LU I should not cancel during the folder rename', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canCancel).toBeFalsy();
      };
      await page.rename({name: 'My super folder'}, inProgressFn);
    });

    it('AS LU I should not close during the folder rename', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canClose).toBeFalsy();
      };
      await page.rename({name: 'My super folder'}, inProgressFn);
    });

    it('AS LU I should not change data during the folder rename', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canChangeData).toBeFalsy();
      };
      await page.rename({name: 'My super folder'}, inProgressFn);
    });

    it('AS LU I should not re-submit during the folder rename', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canSubmit).toBeFalsy();
      };
      await page.rename({name: 'My super folder'}, inProgressFn);
    });
  });
});
