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
 * @since         5.8.0
 */

/**
 * Unit tests on DeleteRole in regard of specifications
 */
import { defaultProps } from "./DeleteRole.test.data";
import DeleteRolePage from "./DeleteRole.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("Delete role", () => {
  let page; // The page to test against
  let props = null; // The page props

  beforeEach(() => {
    props = defaultProps(); // The props to pass
    page = new DeleteRolePage(props);
  });

  describe("As AD I should delete a role", () => {
    it("As AD I should submit an delete request with nothing updated", async () => {
      expect.assertions(2);
      await page.delete();
      expect(props.onSubmit).toHaveBeenCalledWith(props.role);
      expect(props.onClose).toHaveBeenCalled();
    });
  });

  describe("AS AD I should cancel the operation", () => {
    it("AS AD I should cancel the operation by closing the dialog", async () => {
      expect.assertions(1);
      await page.close();
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it("AS AD I should cancel the operation by explicitly cancelling", async () => {
      expect.assertions(1);
      await page.cancel();
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("AS AD I should not perform actions during the role deletion", () => {
    it("AS AD I should not cancel, submit or change data during the role deletion", async () => {
      expect.assertions(3);
      const inProgressFn = () => {
        expect(page.canCancel).toBeFalsy();
        expect(page.canClose).toBeFalsy();
        expect(page.canSubmit).toBeFalsy();
      };
      await page.delete(inProgressFn);
    });
  });
});
