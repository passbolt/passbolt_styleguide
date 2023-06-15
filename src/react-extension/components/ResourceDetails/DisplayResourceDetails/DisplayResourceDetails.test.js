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
 * Unit tests on PasswordSidebar in regard of specifications
 */

import React from 'react';
import {defaultProps} from "./DisplayResourceDetails.test.data";
import DisplayResourceDetailsPage from "./DisplayResourceDetails.test.page";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";

jest.mock("./DisplayResourceDetailsInformation", () => () => <></>);
jest.mock("./DisplayResourceDetailsActivity", () => () => <></>);
jest.mock("./DisplayResourceDetailsPermission", () => () => <></>);
jest.mock("./DisplayResourceDetailsDescription", () => () => <></>);
jest.mock("./DisplayResourceDetailsTag", () => () => <></>);
jest.mock("./DisplayResourceDetailsComment", () => () => <></>);

beforeEach(() => {
  jest.resetModules();
  let clipboardData = ''; //initalizing clipboard data so it can be used in testing
  const mockClipboard = {
    writeText: jest.fn(data => clipboardData = data),
    readText: jest.fn(() => document.activeElement.value = clipboardData),
  };
  global.navigator.clipboard = mockClipboard;
});

describe("DisplayResourceDetails", () => {
  describe('As LU I can see the resource sidebar common part', () => {
    let props, page;

    beforeEach(() => {
      props = defaultProps(); // The props to pass
      page = new DisplayResourceDetailsPage(props);
    });

    it('I should see a resource details sidebar', () => {
      expect(page.exists()).toBeTruthy();
    });

    it('I can see the name of the selected resource', async() => {
      expect.assertions(2);
      expect(page.name).toBe(props.resourceWorkspaceContext.details.resource.name);
      expect(page.subtitle).toBe('Resource');
    });

    it('I can copy the resource permalink', async() => {
      const mockContextRequest = implementation => jest.spyOn(props.context.port, 'request').mockImplementation(implementation);
      const copyClipboardMockImpl = jest.fn((message, data) => data);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourceDetailsPage(props);

      expect.assertions(2);
      mockContextRequest(copyClipboardMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.selectPermalink();
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(`${props.context.userSettings.getTrustedDomain()}/app/passwords/view/${props.resourceWorkspaceContext.details.resource.id}`);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The permalink has been copied to clipboard");
    });

    it('As LU I should be able to close the resource details', async() => {
      await page.closeResourceDetails();
      expect(props.resourceWorkspaceContext.onLockDetail).toHaveBeenCalled();
    });
  });

  describe('As LU I can see the details section', () => {
    it.todo('As LU I can see the details section');
  });

  describe('As LU I can see the description section', () => {
    it.todo('As LU I can see the description section');
  });

  describe('As LU I can see the share section', () => {
    it.todo('As LU I can see the share section');
    it.todo('As LU I cannot see the share section if denied by RBAC');
  });

  describe('As LU I can see the tags section', () => {
    it.todo('As LU I can see the tags section');
    it.todo('As LU I cannot see the tags section if denied by RBAC');
  });

  describe('As LU I can see the comments section', () => {
    it.todo('As LU I can see the comments section');
    it.todo('As LU I cannot see the comments section if denied by RBAC');
  });

  describe('As LU I can see the activity section', () => {
    it.todo('As LU I can see the activity section');
    it.todo('As LU I cannot see the activity section if denied by RBAC');
  });
});
