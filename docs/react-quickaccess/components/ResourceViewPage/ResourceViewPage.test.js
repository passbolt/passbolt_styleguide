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
import {defaultProps, deniedRbacProps, disabledApiFlagsProps} from "./ResourceViewPage.test.data";
import {waitFor} from "@testing-library/react";
import resourcesFixture from "../../../react-extension/test/fixture/Resources/resources";

beforeEach(() => {
  jest.resetModules();
  let clipboardData = ''; //initalizing clipboard data so it can be used in testing
  const mockClipboard = {
    writeText: jest.fn(data => clipboardData = data),
    readText: jest.fn(() => document.activeElement.value = clipboardData),
  };
  global.navigator.clipboard = mockClipboard;
});

describe("ResourceViewPage", () => {
  describe('As LU, I should preview the secret.', () => {
    it('As LU, I should preview the secret of a resource ', async() => {
      const props = defaultProps(); // The props to pass
      const page = new ResourceViewPagePage(props);
      await waitFor(() => {});

      expect(page.previewButton.hasAttribute("disabled")).toBeFalsy();

      await page.click(page.previewButton);

      await waitFor(() => {
        expect(page.passwordText).toStrictEqual("secret_password");
      });
    });

    it('As LU, I shouldn\'t be able to preview secret of a resource if disabled by API flag', async() => {
      expect.assertions(1);
      const props = disabledApiFlagsProps();
      const page = new ResourceViewPagePage(props);
      await waitFor(() => {});
      expect(page.previewButton).toBeNull();
    });

    it('As LU, I shouldn\'t be able to preview secret of a resource if denied by RBAC.', async() => {
      expect.assertions(1);
      const props = deniedRbacProps(); // The props to pass
      const page = new ResourceViewPagePage(props);
      await waitFor(() => {});
      expect(page.previewButton).toBeNull();
    });
  });

  describe('As LU, I should copy the secret.', () => {
    it('As LU, I should be able to copy the secret of resource by clicking on the password', async() => {
      const props = defaultProps(); // The props to pass
      const page = new ResourceViewPagePage(props);
      await waitFor(() => {});
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => 'secret-copy');

      expect(page.passwordText).toStrictEqual("Copy password to clipboard");
      expect(page.password.hasAttribute("disabled")).toBeFalsy();

      await page.click(page.password);

      await waitFor(() => expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.decrypt', resourcesFixture[0].id, {"showProgress": true}));
      await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith('secret-copy'));
    });

    it('As LU, I should be able to copy the secret of resource by clicking on the copy icon', async() => {
      const props = defaultProps(); // The props to pass
      const page = new ResourceViewPagePage(props);
      await waitFor(() => {});
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => 'secret-copy');

      await page.click(page.copyPasswordButton);

      await waitFor(() => expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.decrypt', resourcesFixture[0].id, {"showProgress": true}));
      await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith('secret-copy'));
    });

    it('As LU, I should not be able to copy the secret of resource  if denied by RBAC.', async() => {
      const props = deniedRbacProps(); // The props to pass
      const page = new ResourceViewPagePage(props);
      await waitFor(() => {});

      expect(page.passwordText).toStrictEqual("Copy password to clipboard");
      expect(page.password.hasAttribute("disabled")).toBeTruthy();
      expect(page.copyPasswordButton).toBeNull();
    });
  });
});
