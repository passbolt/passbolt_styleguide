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
import {defaultAppContext, defaultProps} from "./DefineResourceFolderMoveStrategy.test.data";
import DefineResourceFolderMoveStrategyPage from "./DefineResourceFolderMoveStrategy.test.page";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

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
    page = new DefineResourceFolderMoveStrategyPage(context, props);
  });

  describe('As LU I should move a folder', () => {
    it('As System I should send a move request with the change permission option by default', async() => {
      expect.assertions(1);
      const expectedParameters =  ["some request id", "SUCCESS", {moveOption: "change"}];
      jest.spyOn(context.port, 'emit').mockImplementationOnce(() => {});
      await page.move('change');
      expect(context.port.emit).toHaveBeenCalledWith(...expectedParameters);
    });

    it('As System I should send a move request with the keep permissions option', async() => {
      expect.assertions(1);
      const expectedParameters =  ["some request id", "SUCCESS", {moveOption: "keep"}];
      jest.spyOn(context.port, 'emit').mockImplementationOnce(() => {});
      await page.move('keep');
      expect(context.port.emit).toHaveBeenCalledWith(...expectedParameters);
    });

    it('As LU I should see the close of the dialog', async() => {
      expect.assertions(1);
      jest.spyOn(context.port, 'emit').mockImplementationOnce(() => {});
      jest.spyOn(props, 'onClose').mockImplementationOnce(jest.fn());
      await page.move('change');
      expect(props.onClose).toHaveBeenCalled();
    });
  });

  describe('As LU I should be informed when the folder move failed', () => {
    it('AS LU I should see the error message when the folder move failed', async() => {
      expect.assertions(1);
      const error = new Error("Some error message");
      jest.spyOn(context.port, 'emit').mockImplementationOnce(() => Promise.reject(error));
      jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn());
      await page.move('change');
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
    it('AS LU I should not cancel during the folder move', async() => {
      expect.assertions(1);
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canCancel).toBeFalsy();
      };
      await page.move('change', inProgressFn);
    });

    it('AS LU I should not close during the folder move', async() => {
      expect.assertions(1);
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canClose).toBeFalsy();
      };
      await page.move('change', inProgressFn);
    });

    it('AS LU I should not change data during the folder move', async() => {
      expect.assertions(1);
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canChangeData).toBeFalsy();
      };
      await page.move('change', inProgressFn);
    });

    it('AS LU I should not re-submit during the folder move', async() => {
      expect.assertions(1);
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => ({id: 'some folder id'}));
      const inProgressFn = () => {
        expect(page.canSubmit).toBeFalsy();
      };
      await page.move('change', inProgressFn);
    });
  });
});
