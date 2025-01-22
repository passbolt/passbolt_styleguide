/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license Password, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.0.0
 */

/**
 * Unit tests on DisplayResourceDetailsPassword in regard of specifications
 */

import "../../../../../test/mocks/mockClipboard";
import {
  defaultProps, propsWithDenyUiAction,
} from "./DisplayResourceDetailsPassword.test.data";
import DisplayResourceDetailsPasswordPage from "./DisplayResourceDetailsPassword.test.page";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import {waitFor} from "@testing-library/dom";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";

describe("DisplayResourceDetailsPassword", () => {
  let page, props;
  const mockContextRequest = implementation => jest.spyOn(props.context.port, 'request').mockImplementation(implementation);
  const copyClipboardMockImpl = jest.fn((message, data) => data);

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    props = defaultProps(); // The props to pass
  });

  /**
   * Given a selected resource having Password
   * When I open the “Password” section of the secondary sidebar
   * Then I should see the Password made on the resource
   * And I should be able to identify each Password name
   * And I should be able to see each Password value
   */
  describe(' As LU I can see Password of a resource', () => {
    it('I should see the Password of a resource', async() => {
      page = new DisplayResourceDetailsPasswordPage(props);
      await waitFor(() => {});
      expect.assertions(2);
      expect(page.title.textContent).toBe("Password");
      expect(page.exists()).toBeTruthy();
    });

    it('I should close the Password of a resource', async() => {
      page = new DisplayResourceDetailsPasswordPage(props);
      await waitFor(() => {});
      await page.click(page.title);
      expect.assertions(1);
      expect(page.exists()).toBeFalsy();
    });

    it('I should be able to identify each Password name', async() => {
      page = new DisplayResourceDetailsPasswordPage(props);
      await waitFor(() => {});
      expect.assertions(6);
      expect(page.usernameLabel).toBe('Username');
      expect(page.username.textContent).toBe(props.resourceWorkspaceContext.details.resource.metadata.username);
      expect(page.passwordLabel).toBe('Password');
      expect(page.password.textContent).toBe("Copy password to clipboard");
      expect(page.uriLabel).toBe('URI');
      expect(page.uri.textContent).toBe(props.resourceWorkspaceContext.details.resource.metadata.uris[0]);
    });
  });

  describe(' As LU I can copy username of a resource to clipboard', () => {
    it('AS LU, I should be able to copy the username of a resource to clipboard', async() => {
      expect.assertions(3);
      page = new DisplayResourceDetailsPasswordPage(props);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.click(page.username);

      expect.assertions(2);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(props.resourceWorkspaceContext.details.resource.metadata.username);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The username has been copied to clipboard");
    });
  });

  describe(' As LU I can copy a secret of a resource to clipboard', () => {
    it('AS LU, I should be able to copy the secret of a resource to clipboard', async() => {
      page = new DisplayResourceDetailsPasswordPage(props);
      await waitFor(() => {});
      mockContextRequest(copyClipboardMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({password: 'secret-copy'}));

      await page.click(page.password);

      expect.assertions(3);
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.secret.find-by-resource-id", props.resourceWorkspaceContext.details.resource.id);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('secret-copy');
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The secret has been copied to clipboard");
    });

    it('AS LU, I cannot copy secret of resource if denied by RBAC', async() => {
      const props = propsWithDenyUiAction();
      page = new DisplayResourceDetailsPasswordPage(props);
      await waitFor(() => {});

      expect.assertions(1);
      expect(page.passwordLink.hasAttribute("disabled")).toBeTruthy();
    });
  });

  describe(' As LU I can preview secret of a resource', () => {
    it('AS LU, I should be able to preview secret of a resource', async() => {
      page = new DisplayResourceDetailsPasswordPage(props);
      await waitFor(() => {});
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({password: 'secret-copy'}));
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementationOnce(() => {});

      expect.assertions(4);
      await page.click(page.viewPassword);
      expect(page.password.textContent).toBe('secret-copy');
      expect(props.resourceWorkspaceContext.onResourcePreviewed).toHaveBeenCalled();
      expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.find-by-resource-id', props.resourceWorkspaceContext.details.resource.id);
      await page.click(page.viewPassword);
      expect(page.password.textContent).toBe('Copy password to clipboard');
    });

    it('AS LU, I cannot preview secret of resource if disabled by API flag', async() => {
      const context = defaultUserAppContext({
        siteSettings: {
          getServerTimezone: () => '',
          canIUse: () => false,
        }
      });
      const props = defaultProps({context});
      page = new DisplayResourceDetailsPasswordPage(props);
      await waitFor(() => {});

      expect.assertions(1);
      expect(page.isViewPasswordExist).toBeFalsy();
    });

    it('AS LU, I cannot preview secret of resource if denied by RBAC', async() => {
      const props = propsWithDenyUiAction();
      page = new DisplayResourceDetailsPasswordPage(props);
      await waitFor(() => {});

      expect.assertions(1);
      expect(page.isViewPasswordExist).toBeFalsy();
    });
  });
});
