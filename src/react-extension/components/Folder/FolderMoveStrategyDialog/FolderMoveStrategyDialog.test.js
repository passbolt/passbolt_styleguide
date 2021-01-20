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
 * Unit tests on FolderMoveStrategyDialog in regard of specifications
 */
import {defaultAppContext, defaultProps} from "./FolderMoveStrategyDialog.test.data";
import FolderMoveStrategyDialogPage from "./FolderMoveStrategyDialog.test.page";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";

beforeEach(() => {
  jest.resetModules();
});

describe("Move Folder", () => {
  let page; // The page to test against
  let context = null; // The applicative context
  let props = null; // The props to pass

  beforeEach(() => {
    context = defaultAppContext(); // The applicative context
    props = defaultProps(); // The props to pass
    page = new FolderMoveStrategyDialogPage(context, props);
  });

  describe('As LU I should move a folder', () => {
    it('As System I should send a move request with the change permission option by default', async() => {
      const expectedParameters =  ["some request id", "SUCCESS", {moveOption: "change"}];
      jest.spyOn(context.port, 'emit').mockImplementationOnce(() => {});
      await page.move('change');
      expect(context.port.emit).toHaveBeenCalledWith(...expectedParameters);
    });

    it('As System I should send a move request with the keep permissions option', async() => {
      const expectedParameters =  ["some request id", "SUCCESS", {moveOption: "keep"}];
      jest.spyOn(context.port, 'emit').mockImplementationOnce(() => {});
      await page.move('keep');
      expect(context.port.emit).toHaveBeenCalledWith(...expectedParameters);
    });

    it('As LU I should see the close of the dialog', async() => {
      jest.spyOn(context.port, 'emit').mockImplementationOnce(() => {});
      jest.spyOn(props, 'onClose').mockImplementationOnce(jest.fn());
      await page.move('change');
      expect(props.onClose).toHaveBeenCalled();
    });
  });

  describe('As LU I should be informed when the folder move failed', () => {
    it('AS LU I should see the error message when the folder move failed', async() => {
      const error = {message: "Some error message"};
      const dialogErrorProps = {errorDialogProps: {title: "There was an unexpected error...", message: error.message}};
      jest.spyOn(context.port, 'emit').mockImplementationOnce(() => Promise.reject(error));
      jest.spyOn(context, 'setContext').mockImplementationOnce(jest.fn());
      jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn());
      await page.move('change');
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

  describe('AS LU I should not perform actions during the folder creation', () => {
    it('AS LU I should not cancel during the folder move', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canCancel).toBeFalsy();
      };
      await page.move('change', inProgressFn);
    });

    it('AS LU I should not close during the folder move', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canClose).toBeFalsy();
      };
      await page.move('change', inProgressFn);
    });

    it('AS LU I should not change data during the folder move', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canChangeData).toBeFalsy();
      };
      await page.move('change', inProgressFn);
    });

    it('AS LU I should not re-submit during the folder move', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canSubmit).toBeFalsy();
      };
      await page.move('change', inProgressFn);
    });
  });
});
