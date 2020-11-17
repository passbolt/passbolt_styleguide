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
 * Unit tests on PasswordSidebarInformationSection in regard of specifications
 */


import {
  defaultAppContext,
  defaultProps,
} from "./PasswordSidebarInformationSection.test.data";
import PasswordSidebarInformationSectionPage from "./PasswordSidebarInformationSection.test.page";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";

beforeEach(() => {
  jest.resetModules();
});

describe("See information", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const mockContextRequest = implementation => jest.spyOn(context.port, 'request').mockImplementation(implementation);
  const copyClipboardMockImpl = jest.fn((message, data) => data);

  describe(' As LU I can see information of a resource', () => {
    /**
     * Given a selected resource having information
     * When I open the “Information” section of the secondary sidebar
     * Then I should see the information made on the resource
     * And I should be able to identify each information name
     * And I should be able to see each information value
     */

    beforeEach(() => {
      page = new PasswordSidebarInformationSectionPage(context, props);
    });

    it('I should see the information of a resource', async() => {
      expect(page.title.hyperlink.textContent).toBe("Information");

      expect(page.displayInformationList.exists()).toBeTruthy();
      await page.title.click();
    });

    it('I should be able to identify each information name', async() => {
      mockContextRequest(copyClipboardMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      expect(page.displayInformationList.usernameLabel).toBe('Username');
      expect(page.displayInformationList.username.textContent).toBe(props.resourceWorkspaceContext.details.resource.username);
      await page.displayInformationList.click(page.displayInformationList.username);
      expect(context.port.request).toHaveBeenCalledWith("passbolt.clipboard.copy", props.resourceWorkspaceContext.details.resource.username);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The username has been copied to clipboard");
      expect(page.displayInformationList.passwordLabel).toBe('Password');
      expect(page.displayInformationList.password.textContent).toBe("copy password to clipboard");
      await page.displayInformationList.click(page.displayInformationList.password);
      expect(context.port.request).toHaveBeenCalledWith("passbolt.secret.decrypt", props.resourceWorkspaceContext.details.resource.id, {"showProgress": true});
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The secret has been copied to clipboard");
      expect(page.displayInformationList.uriLabel).toBe('URI');
      expect(page.displayInformationList.uri.textContent).toBe(props.resourceWorkspaceContext.details.resource.uri);
      expect(page.displayInformationList.modifiedLabel(1)).toBe('Modified');
      expect(page.displayInformationList.modified(1).textContent).toBe('a year ago');
      expect(page.displayInformationList.modifiedByLabel(1)).toBe('Modified by');
      expect(page.displayInformationList.modifiedBy(1).textContent).toBe('ada@passbolt.com');
      expect(page.displayInformationList.modifiedLabel(2)).toBe('Created');
      expect(page.displayInformationList.modified(2).textContent).toBe('a year ago');
      expect(page.displayInformationList.modifiedByLabel(2)).toBe('Created by');
      expect(page.displayInformationList.modifiedBy(2).textContent).toBe('ada@passbolt.com');
      expect(page.displayInformationList.locationLabel).toBe('Location');
      expect(page.displayInformationList.location.textContent).toBe(" root");
      await page.displayInformationList.click(page.displayInformationList.location);
    });
  });
});
