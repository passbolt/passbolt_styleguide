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
 * Unit tests on FolderDeleteDialog in regard of specifications
 */
import {defaultAppContext, defaultProps} from "./DeleteResourceFolder.test.data";
import DeleteResourceFolderPage from "./DeleteResourceFolder.test.page";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

beforeEach(() => {
  jest.resetModules();
});

describe("Delete Folder", () => {
  let page; // The page to test against
  let context = null; // The applicative context
  let props = null; // The props to pass

  beforeEach(() => {
    context = defaultAppContext(); // The applicative context
    props = defaultProps(); // The props to pass
    page = new DeleteResourceFolderPage(context, props);
  });

  describe('As LU I should delete a folder', () => {
    it('As System I should send a create request', async() => {
      const expectedParameters =  ["passbolt.folders.delete", "some folder id", false];
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      await page.delete(false);
      expect(context.port.request).toHaveBeenCalledWith(...expectedParameters);
    });

    it('As LU I should see a success message when I successfully created a folder', async() => {
      const expectedMessage = "The folder was deleted successfully";
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      jest.spyOn(props.actionFeedbackContext, 'displaySuccess').mockImplementationOnce(jest.fn());
      await page.delete(false);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith(expectedMessage);
    });

    it('As LU I should see the close of the dialog', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      jest.spyOn(props, 'onClose').mockImplementationOnce(jest.fn());
      await page.delete(false);
      expect(props.onClose).toHaveBeenCalled();
    });

    it('As LU I should delete the sub-folders of the folder to delete', async() => {
      const expectedParameters =  ["passbolt.folders.delete", "some folder id", true];
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      await page.delete(true);
      expect(context.port.request).toHaveBeenCalledWith(...expectedParameters);
    });
  });

  describe('As LU I should be informed when the folder deletion failed', () => {
    it('AS LU I should stays on the dialog if the user have not input the passphrase', async() => {
      const error = {name: "UserAbortsOperationError"};
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => Promise.reject(error));
      jest.spyOn(props.actionFeedbackContext, 'displaySuccess').mockImplementationOnce(jest.fn());
      await page.delete(false);
      expect(props.actionFeedbackContext.displaySuccess).not.toHaveBeenCalled();
    });

    it('AS LU I should see the error message when the folder deletion failed', async() => {
      const error = new Error("Some error message");
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => Promise.reject(error));
      jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn());
      await page.delete(false);
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: error});
    });

    it('As LU I want to see a long  resource/tag/folders name fitting its delete dialog', async() => {
      expect(page.tagName.classList.contains("dialog-variable")).toBeTruthy();
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

  describe('AS LU I should not perform actions during the folder deletion', () => {
    it('AS LU I should not cancel during the folder deletion', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canCancel).toBeFalsy();
      };
      await page.delete(false, inProgressFn);
    });

    it('AS LU I should not close during the folder deletion', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canClose).toBeFalsy();
      };
      await page.delete(false, inProgressFn);
    });

    it('AS LU I should not change data during the folder deletion', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canChangeData).toBeFalsy();
      };
      await page.delete(false, inProgressFn);
    });

    it('AS LU I should not re-submit during the folder deletion', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canSubmit).toBeFalsy();
      };
      await page.delete(false, inProgressFn);
    });
  });
});
