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
 * Unit tests on CreateUserDialog in regard of specifications
 */
import {defaultAppContext, defaultProps} from "./ConfirmDisableUserMFA.test.data";
import ConfirmDisableUserMFATestPage from "./ConfirmDisableUserMFA.test.page";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import {waitFor} from "@testing-library/react";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

beforeEach(() => {
  jest.resetModules();
});

describe("See the Create Dialog User", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  describe('As AD I should confirm to disable MFA', () => {
    beforeEach(() => {
      page = new ConfirmDisableUserMFATestPage(context, props);
    });

    it('As AD I should see a success toaster message after disabling a user MFA with success', async() => {
      expect.assertions(2);
      mockContextRequest(context, () => Promise.resolve());
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});
      await page.confirm();
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.onClose).toBeCalled();
    });

    it('As AD I should not perform any action while I am disabling an user MFA', async() => {
      let confirmResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        confirmResolve = resolve;
      }));
      mockContextRequest(context, requestMockImpl);

      page.confirmWithoutWaitFor();

      await waitFor(() => {
        expect(page.confirmButton.hasAttribute("disabled")).toBeTruthy();
        expect(page.cancelButton.hasAttribute("disabled")).toBeTruthy();
        confirmResolve();
      });
    });

    it('As AD I should cancel the operation', async() => {
      expect.assertions(1);
      await page.cancel();
      expect(props.onClose).toBeCalled();
    });

    it('As AD I should see an error message if the user MFA disabling goes wrong', async() => {
      expect.assertions(1);
      const error = new Error("Some error");
      mockContextRequest(context, () => Promise.reject(error));
      jest.spyOn(props.dialogContext, 'open').mockImplementation(() => {});
      await page.confirm();
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: error});
    });
  });
});
