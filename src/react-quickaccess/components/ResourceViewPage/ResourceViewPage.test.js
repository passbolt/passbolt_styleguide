/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import ResourceViewPagePage from "./ResourceViewPage.test.page";
import {defaultProps} from "./ResourceViewPage.test.data";
import {denyRbacContext} from "../../../shared/context/Rbac/RbacContext.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("ResourceViewPage", () => {
  describe('As LU I can see the resource', () => {
    it('As LU I can copy and preview the password if I am allowed to', async() => {
      const props = defaultProps(); // The props to pass
      const page = new ResourceViewPagePage(props);

      expect(page.passwordText).toStrictEqual("Copy password to clipboard");
      expect(page.password.hasAttribute("disabled")).toBeFalsy();
      expect(page.previewButton.hasAttribute("disabled")).toBeFalsy();

      await page.click(page.password);
      await page.click(page.previewButton);

      expect(page.passwordText).toStrictEqual("secret_password");
    });

    it('As LU I cannot copy and preview the password if I am not allowed to', () => {
      const props = defaultProps({rbacContext: denyRbacContext()}); // The props to pass
      const page = new ResourceViewPagePage(props);

      expect(page.passwordText).toStrictEqual("Copy password to clipboard");
      expect(page.password.hasAttribute("disabled")).toBeTruthy();
      expect(page.previewButton).toBeNull();
    });
  });
});
