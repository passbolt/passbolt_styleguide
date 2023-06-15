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
 * Unit tests on DisplayResourceDetailsInformation in regard of specifications
 */

import {
  defaultProps, propsWithDenyUiAction,
} from "./DisplayResourceDetailsInformation.test.data";
import DisplayResourceDetailsInformationPage from "./DisplayResourceDetailsInformation.test.page";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import {waitFor} from "@testing-library/dom";
import {DateTime} from "luxon";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";

beforeEach(() => {
  jest.resetModules();
  let clipboardData = ''; //initalizing clipboard data so it can be used in testing
  const mockClipboard = {
    writeText: jest.fn(data => clipboardData = data),
    readText: jest.fn(() => document.activeElement.value = clipboardData),
  };
  global.navigator.clipboard = mockClipboard;
});

describe("DisplayResourceDetailsInformation", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass
  const mockContextRequest = implementation => jest.spyOn(props.context.port, 'request').mockImplementation(implementation);
  const copyClipboardMockImpl = jest.fn((message, data) => data);

  /**
   * Given a selected resource having information
   * When I open the “Information” section of the secondary sidebar
   * Then I should see the information made on the resource
   * And I should be able to identify each information name
   * And I should be able to see each information value
   */
  describe(' As LU I can see information of a resource', () => {
    it('I should see the information of a resource', async() => {
      page = new DisplayResourceDetailsInformationPage(props);
      await waitFor(() => {});
      expect.assertions(2);
      expect(page.title.hyperlink.textContent).toBe("Information");
      expect(page.displayInformationList.exists()).toBeTruthy();
    });

    it('I should be able to identify each information name', async() => {
      page = new DisplayResourceDetailsInformationPage(props);
      await waitFor(() => {});

      const absoluteModificationDate = props.resourceWorkspaceContext.details.resource.modified;
      const modificationDate = DateTime.fromISO(absoluteModificationDate).toRelative();
      const absoluteCreationDate = props.resourceWorkspaceContext.details.resource.created;
      const creationDate = DateTime.fromISO(absoluteCreationDate).toRelative();
      expect.assertions(18);
      expect(page.displayInformationList.usernameLabel).toBe('Username');
      expect(page.displayInformationList.username.textContent).toBe(props.resourceWorkspaceContext.details.resource.username);
      expect(page.displayInformationList.passwordLabel).toBe('Password');
      expect(page.displayInformationList.password.textContent).toBe("Copy password to clipboard");
      expect(page.displayInformationList.uriLabel).toBe('URI');
      expect(page.displayInformationList.uri.textContent).toBe(props.resourceWorkspaceContext.details.resource.uri);
      expect(page.displayInformationList.modifiedLabel(1)).toBe('Modified');
      expect(page.displayInformationList.modified(1).textContent).toBe(modificationDate);
      expect(page.displayInformationList.modified(1).getAttribute("title")).toBe(absoluteModificationDate);
      expect(page.displayInformationList.modifiedByLabel(1)).toBe('Modified by');
      expect(page.displayInformationList.modifiedBy(1).textContent).toBe('ada@passbolt.com');
      expect(page.displayInformationList.modifiedLabel(2)).toBe('Created');
      expect(page.displayInformationList.modified(2).textContent).toBe(creationDate);
      expect(page.displayInformationList.modified(2).getAttribute("title")).toBe(absoluteCreationDate);
      expect(page.displayInformationList.modifiedByLabel(2)).toBe('Created by');
      expect(page.displayInformationList.modifiedBy(2).textContent).toBe('ada@passbolt.com');
      expect(page.displayInformationList.locationLabel).toBe('Location');
      expect(page.displayInformationList.location.textContent).toBe("root");
    });

    it('I can see the folder a resource is contained in', async() => {
      page = new DisplayResourceDetailsInformationPage(props);
      expect.assertions(2);
      expect(page.displayInformationList.locationLabel).toBe('Location');
      expect(page.displayInformationList.location.textContent).toBe("root");
    });

    it('I scannot see the folder a resource is contained in if disbaled by RBAC', async() => {
      const props = propsWithDenyUiAction();
      page = new DisplayResourceDetailsInformationPage(props);
      expect.assertions(1);
      expect(page.displayInformationList.location).toBeNull();
    });
  });

  describe(' As LU I can copy username of a resource to clipboard', () => {
    it('AS LU, I should be able to copy the username of a resource to clipboard', async() => {
      expect.assertions(3);
      page = new DisplayResourceDetailsInformationPage(props);
      await waitFor(() => {
      });
      mockContextRequest(copyClipboardMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {
      });

      await page.displayInformationList.click(page.displayInformationList.username);

      expect.assertions(2);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(props.resourceWorkspaceContext.details.resource.username);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The username has been copied to clipboard");
    });
  });

  describe(' As LU I can copy password of a resource to clipboard', () => {
    it('AS LU, I should be able to copy the password of a resource to clipboard', async() => {
      page = new DisplayResourceDetailsInformationPage(props);
      await waitFor(() => {});
      mockContextRequest(copyClipboardMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.displayInformationList.click(page.displayInformationList.password);

      expect.assertions(2);
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.secret.decrypt", props.resourceWorkspaceContext.details.resource.id, {"showProgress": true});
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The secret has been copied to clipboard");
    });

    it('AS LU, I cannot copy secret of resource if denied by RBAC', async() => {
      const props = propsWithDenyUiAction();
      page = new DisplayResourceDetailsInformationPage(props);
      await waitFor(() => {});

      expect.assertions(1);
      expect(page.displayInformationList.passwordLink.hasAttribute("disabled")).toBeTruthy();
    });
  });

  describe(' As LU I can preview secret of a resource', () => {
    it('AS LU, I should be able to preview secret of a resource', async() => {
      page = new DisplayResourceDetailsInformationPage(props);
      await waitFor(() => {});
      mockContextRequest(() => 'secret-copy');
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementationOnce(() => {});

      expect.assertions(3);
      await page.displayInformationList.click(page.displayInformationList.viewPassword);
      expect(page.displayInformationList.password.textContent).toBe('secret-copy');
      expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.decrypt', props.resourceWorkspaceContext.details.resource.id, {showProgress: true});
      await page.displayInformationList.click(page.displayInformationList.viewPassword);
      expect(page.displayInformationList.password.textContent).toBe('Copy password to clipboard');
    });

    it('AS LU, I cannot preview secret of resource if disabled by API flag', async() => {
      const context = defaultUserAppContext({
        siteSettings: {
          getServerTimezone: () => '',
          canIUse: () => false,
        }
      });
      const props = defaultProps({context});
      page = new DisplayResourceDetailsInformationPage(props);
      await waitFor(() => {});

      expect.assertions(1);
      expect(page.displayInformationList.isViewPasswordExist).toBeFalsy();
    });

    it('AS LU, I cannot preview secret of resource if denied by RBAC', async() => {
      const props = propsWithDenyUiAction();
      page = new DisplayResourceDetailsInformationPage(props);
      await waitFor(() => {});

      expect.assertions(1);
      expect(page.displayInformationList.isViewPasswordExist).toBeFalsy();
    });
  });
});
