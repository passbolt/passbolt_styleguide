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

import "../../../../../test/mocks/mockClipboard";
import React from 'react';
import {defaultProps} from "./DisplayResourceDetails.test.data";
import DisplayResourceDetailsPage from "./DisplayResourceDetails.test.page";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import {
  resourceLegacyDto,
  resourceStandaloneTotpDto, resourceWithTotpDto
} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {denyRbacContext} from "../../../../shared/context/Rbac/RbacContext.test.data";

jest.mock("./DisplayResourceDetailsInformation", () => () => <></>);
jest.mock("./DisplayResourceDetailsPassword", () => () => <div className="password"></div>);
jest.mock("./DisplayResourceDetailsTotp", () => () => <div className="totp"></div>);
jest.mock("./DisplayResourceDetailsActivity", () => () => <></>);
jest.mock("./DisplayResourceDetailsPermission", () => () => <></>);
jest.mock("./DisplayResourceDetailsDescription", () => () => <div className="description"></div>);
jest.mock("./DisplayResourceDetailsTag", () => () => <></>);
jest.mock("./DisplayResourceDetailsComment", () => () => <></>);

beforeEach(() => {
  jest.resetModules();
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
      expect(page.name).toBe(props.resourceWorkspaceContext.details.resource.metadata.name);
      expect(page.subtitle).toBe('Password and Encrypted description');
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
  });

  describe('As LU I can use tabs in the resource sidebar', () => {
    let props, page;

    beforeEach(() => {
      props = defaultProps(); // The props to pass
      page = new DisplayResourceDetailsPage(props);
    });

    it('I should see tabs a in the resource sidebar', () => {
      expect.assertions(3);
      expect(page.tabs()).toBeTruthy();
      expect(page.tab(0).textContent).toStrictEqual("Details");
      expect(page.tab(1).textContent).toStrictEqual("Activity");
    });

    it('I should not see tabs a in the resource sidebar if RBAC denies it', () => {
      expect.assertions(1);

      const props = defaultProps({
        rbacContext: denyRbacContext()
      });
      page = new DisplayResourceDetailsPage(props);

      expect(page.tabs()).toBeFalsy();
    });

    it('I can see activity tab context', async() => {
      expect.assertions(2);

      page = new DisplayResourceDetailsPage(props);

      expect(page.activeTab.textContent).toStrictEqual("Details");
      await page.click(page.tab(1));
      expect(page.activeTab.textContent).toStrictEqual("Activity");
    });
  });

  describe('As LU I can see the details section', () => {
    it.todo('As LU I can see the details section');
  });

  describe('As LU I can see the password section', () => {
    it('As LU I can see the password section', () => {
      expect.assertions(1);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourceDetailsPage(props);
      expect(page.password).toBeDefined();
    });

    it('As LU I cannot see the password section if resource type has no password', () => {
      expect.assertions(1);
      const props = defaultProps({resourceWorkspaceContext: {details: {resource: resourceStandaloneTotpDto()}}}); // The props to pass
      const page = new DisplayResourceDetailsPage(props);
      expect(page.password).toBeNull();
    });
  });

  describe('As LU I can see the totp section', () => {
    it('As LU I can see the totp section for a resource with password description and totp', () => {
      expect.assertions(1);
      const props = defaultProps({resourceWorkspaceContext: {details: {resource: resourceWithTotpDto()}}}); // The props to pass
      const page = new DisplayResourceDetailsPage(props);
      expect(page.totp).toBeDefined();
    });

    it('As LU I can see the totp section for a standalone totp', () => {
      expect.assertions(1);
      const props = defaultProps({resourceWorkspaceContext: {details: {resource: resourceStandaloneTotpDto()}}}); // The props to pass
      const page = new DisplayResourceDetailsPage(props);
      expect(page.totp).toBeDefined();
    });

    it('As LU I cannot see the totp section if resource type has no totp', () => {
      expect.assertions(1);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourceDetailsPage(props);
      expect(page.totp).toBeNull();
    });
  });

  describe('As LU I can see the description section', () => {
    it('As LU I can see the description section', () => {
      expect.assertions(1);
      const props = defaultProps({resourceWorkspaceContext: {details: {resource: resourceLegacyDto()}}}); // The props to pass
      const page = new DisplayResourceDetailsPage(props);
      expect(page.description).toBeDefined();
    });

    it('As LU I cannot see the description section if resource type has no description', () => {
      expect.assertions(1);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourceDetailsPage(props);
      expect(page.description).toBeNull();
    });
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
