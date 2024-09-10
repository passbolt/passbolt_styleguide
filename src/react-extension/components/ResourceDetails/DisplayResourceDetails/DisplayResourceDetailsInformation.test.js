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

import "../../../../../test/mocks/mockClipboard";
import {
  defaultProps, propsWithDenyUiAction,
} from "./DisplayResourceDetailsInformation.test.data";
import DisplayResourceDetailsInformationPage from "./DisplayResourceDetailsInformation.test.page";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import {waitFor} from "@testing-library/dom";
import {DateTime} from "luxon";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {TotpCodeGeneratorService} from "../../../../shared/services/otp/TotpCodeGeneratorService";
import {defaultTotpViewModelDto} from "../../../../shared/models/totp/TotpDto.test.data";

describe("DisplayResourceDetailsInformation", () => {
  let page, props;
  const mockContextRequest = implementation => jest.spyOn(props.context.port, 'request').mockImplementation(implementation);
  const copyClipboardMockImpl = jest.fn((message, data) => data);

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    props = defaultProps(); // The props to pass

    const user = props.context.users[0];
    const resourceWithContain = Object.assign({}, props.resourceWorkspaceContext.details.resource, {creator: user, modifier: user});
    props.context.port.addRequestListener("passbolt.resources.find-details", async() => resourceWithContain);
  });

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
      expect.assertions(22);
      await waitFor(() => {});
      expect(page.displayInformationList.usernameLabel).toBe('Username');
      expect(page.displayInformationList.username.textContent).toBe(props.resourceWorkspaceContext.details.resource.metadata.username);
      expect(page.displayInformationList.passwordLabel).toBe('Password');
      expect(page.displayInformationList.password.textContent).toBe("Copy password to clipboard");
      expect(page.displayInformationList.totpLabel).toBe('TOTP');
      expect(page.displayInformationList.totp.textContent).toBe("Copy TOTP to clipboard");
      expect(page.displayInformationList.uriLabel).toBe('URI');
      expect(page.displayInformationList.uri.textContent).toBe(props.resourceWorkspaceContext.details.resource.metadata.uris[0]);
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
      expect(page.displayInformationList.expiryLabel).toBe('Expiry ');
      expect(page.displayInformationList.expiry.textContent).toBe("Not set");
    });

    it('I can see the folder a resource is contained in', async() => {
      page = new DisplayResourceDetailsInformationPage(props);
      expect.assertions(2);
      expect(page.displayInformationList.locationLabel).toBe('Location');
      expect(page.displayInformationList.location.textContent).toBe("root");
    });

    it('I cannot see the folder a resource is contained in if disbaled by RBAC', async() => {
      const props = propsWithDenyUiAction();
      const user = props.context.users[0];
      const resourceWithContain = Object.assign({}, props.resourceWorkspaceContext.details.resource, {creator: user, modifier: user});
      props.context.port.addRequestListener("passbolt.resources.find-details", async() => resourceWithContain);
      page = new DisplayResourceDetailsInformationPage(props);
      expect.assertions(1);
      expect(page.displayInformationList.location).toBeNull();
    });

    it('I cannot see the expiry information if the feature is disbaled', async() => {
      const props = defaultProps({
        passwordExpiryContext: {
          isFeatureEnabled: () => false
        }
      });
      const user = props.context.users[0];
      const resourceWithContain = Object.assign({}, props.resourceWorkspaceContext.details.resource, {creator: user, modifier: user});
      props.context.port.addRequestListener("passbolt.resources.find-details", async() => resourceWithContain);

      page = new DisplayResourceDetailsInformationPage(props);
      expect.assertions(1);
      expect(page.displayInformationList.expiry).toBeNull();
    });
  });

  describe(' As LU I can copy username of a resource to clipboard', () => {
    it('AS LU, I should be able to copy the username of a resource to clipboard', async() => {
      expect.assertions(3);
      page = new DisplayResourceDetailsInformationPage(props);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.displayInformationList.click(page.displayInformationList.username);

      expect.assertions(2);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(props.resourceWorkspaceContext.details.resource.metadata.username);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The username has been copied to clipboard");
    });
  });

  describe(' As LU I can copy a secret of a resource to clipboard', () => {
    it('AS LU, I should be able to copy the secret of a resource to clipboard', async() => {
      page = new DisplayResourceDetailsInformationPage(props);
      const totp = defaultTotpViewModelDto();
      await waitFor(() => {});
      mockContextRequest(copyClipboardMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({password: 'secret-copy'}));

      await page.displayInformationList.click(page.displayInformationList.password);

      expect.assertions(5);
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.secret.find-by-resource-id", props.resourceWorkspaceContext.details.resource.id);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('secret-copy');
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The secret has been copied to clipboard");

      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({password: 'secret-password', description: "", totp: totp}));
      await page.displayInformationList.click(page.displayInformationList.totp);
      const code = TotpCodeGeneratorService.generate(totp);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
    });

    it('AS LU, I cannot copy secret of resource if denied by RBAC', async() => {
      const props = propsWithDenyUiAction();
      const user = props.context.users[0];
      const resourceWithContain = Object.assign({}, props.resourceWorkspaceContext.details.resource, {creator: user, modifier: user});
      props.context.port.addRequestListener("passbolt.resources.find-details", async() => resourceWithContain);
      page = new DisplayResourceDetailsInformationPage(props);
      await waitFor(() => {});

      expect.assertions(2);
      expect(page.displayInformationList.passwordLink.hasAttribute("disabled")).toBeTruthy();
      expect(page.displayInformationList.totpLink.hasAttribute("disabled")).toBeTruthy();
    });
  });

  describe(' As LU I can preview secret of a resource', () => {
    it('AS LU, I should be able to preview secret of a resource', async() => {
      page = new DisplayResourceDetailsInformationPage(props);
      const totp = defaultTotpViewModelDto();
      await waitFor(() => {});
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({password: 'secret-copy'}));
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementationOnce(() => {});

      expect.assertions(7);
      await page.displayInformationList.click(page.displayInformationList.viewPassword);
      expect(page.displayInformationList.password.textContent).toBe('secret-copy');
      expect(props.resourceWorkspaceContext.onResourcePreviewed).toHaveBeenCalled();
      expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.find-by-resource-id', props.resourceWorkspaceContext.details.resource.id);
      await page.displayInformationList.click(page.displayInformationList.viewPassword);
      expect(page.displayInformationList.password.textContent).toBe('Copy password to clipboard');

      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({password: 'secret-password', description: "", totp: totp}));
      await page.displayInformationList.click(page.displayInformationList.viewTotp);
      const code = TotpCodeGeneratorService.generate(totp);
      expect(page.displayInformationList.totp.textContent.replaceAll(/\s+/g, "")).toBe(code);
      expect(props.resourceWorkspaceContext.onResourcePreviewed).toHaveBeenCalledTimes(2);
      await page.displayInformationList.click(page.displayInformationList.viewTotp);
      expect(page.displayInformationList.totp.textContent).toBe('Copy TOTP to clipboard');
    });

    it('AS LU, I cannot preview secret of resource if disabled by API flag', async() => {
      const context = defaultUserAppContext({
        siteSettings: {
          getServerTimezone: () => '',
          canIUse: () => false,
        }
      });
      const props = defaultProps({context});
      const user = props.context.users[0];
      const resourceWithContain = Object.assign({}, props.resourceWorkspaceContext.details.resource, {creator: user, modifier: user});
      props.context.port.addRequestListener("passbolt.resources.find-details", async() => resourceWithContain);

      page = new DisplayResourceDetailsInformationPage(props);
      await waitFor(() => {});

      expect.assertions(1);
      expect(page.displayInformationList.isViewPasswordExist).toBeFalsy();
    });

    it('AS LU, I cannot preview secret of resource if denied by RBAC', async() => {
      const props = propsWithDenyUiAction();
      const user = props.context.users[0];
      const resourceWithContain = Object.assign({}, props.resourceWorkspaceContext.details.resource, {creator: user, modifier: user});
      props.context.port.addRequestListener("passbolt.resources.find-details", async() => resourceWithContain);

      page = new DisplayResourceDetailsInformationPage(props);
      await waitFor(() => {});

      expect.assertions(1);
      expect(page.displayInformationList.isViewPasswordExist).toBeFalsy();
    });
  });
});
