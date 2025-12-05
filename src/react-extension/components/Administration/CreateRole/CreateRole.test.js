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
 * Unit tests on CreateRole in regard of specifications
 */
import {defaultProps} from "./CreateRole.test.data";
import CreateRolePage from "./CreateRole.test.page";
import RoleEntity from "../../../../shared/models/entity/role/roleEntity";
import each from "jest-each";

beforeEach(() => {
  jest.resetModules();
});

describe("Create role", () => {
  let page; // The page to test against
  let props = null; // The page props

  beforeEach(() => {
    props = defaultProps(); // The props to pass
    page = new CreateRolePage(props);
  });

  describe('As AD I should create a role', () => {
    it('As AD I should send a create request', async() => {
      expect.assertions(2);
      await page.fillInput(page.inputName, "role");
      await page.create();
      expect(props.onSubmit).toHaveBeenCalledWith(new RoleEntity({name: "role"}));
      expect(props.onClose).toHaveBeenCalled();
    });
  });

  describe('As AD I should see error if name is invalid', () => {
    it('AS AD I should not fill an empty role name', async() => {
      expect.assertions(2);
      await page.create();
      expect(page.hasInvalidName).toBeTruthy();
      expect(page.errorMessage).toStrictEqual("A name is required.");
    });

    it('AS AD I should not fill a role name longer than 255 characters', async() => {
      expect.assertions(2);
      await page.fillInput(page.inputName, 'a'.repeat(256));
      await page.create();
      expect(page.hasInvalidName).toBeTruthy();
      expect(page.errorMessage).toStrictEqual("A name can not be more than 255 char in length.");
    });

    each([
      {scenario: 'admin', value: RoleEntity.ROLE_ADMIN},
      {scenario: 'user', value: RoleEntity.ROLE_USER},
      {scenario: 'guest', value: RoleEntity.ROLE_GUEST},
    ]).describe("Should display error message role is reserved", test => {
      it(`AS AD I should not fill a role name that is reserved: ${test.scenario}`, async() => {
        expect.assertions(2);
        await page.fillInput(page.inputName, test.value);
        await page.create();
        expect(page.hasInvalidName).toBeTruthy();
        expect(page.errorMessage).toStrictEqual("This name is reserved by the system.");
      });
    });
  });

  describe('As AD I should see warning if name has reached the maximum length', () => {
    it("As a user I should see a feedback when name field content is truncated by a field limit", async() => {
      expect.assertions(1);
      await page.fillInput(page.inputName, 'a'.repeat(50));
      expect(page.nameWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
    });
  });

  describe('AS AD I should cancel the operation', () => {
    it('AS AD I should cancel the operation by closing the dialog', async() => {
      expect.assertions(1);
      await page.close();
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it('AS AD I should cancel the operation by explicitly cancelling', async() => {
      expect.assertions(1);
      await page.cancel();
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('AS AD I should not perform actions during the role creation', () => {
    it('AS AD I should not cancel, submit or change data during the role creation', async() => {
      expect.assertions(4);
      await page.fillInput(page.inputName, "role");
      const inProgressFn = () => {
        expect(page.canCancel).toBeFalsy();
        expect(page.canClose).toBeFalsy();
        expect(page.canChangeData).toBeFalsy();
        expect(page.canSubmit).toBeFalsy();
      };
      await page.create(inProgressFn);
    });
  });
});
