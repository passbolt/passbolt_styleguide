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
 * Unit tests on DisplayGridContextualMenuContextualMenu in regard of specifications
 */
import {
  defaultProps, propsDenyUIActions, propsResourceWithReadOnlyPermission, propsResourceWithUpdatePermission,
} from "./DisplayResourcesListContextualMenu.test.data";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import DeleteResource from "../DeleteResource/DeleteResource";
import EditResource from "../EditResource/EditResource";
import ShareDialog from "../../Share/ShareDialog";
import DisplayResourcesListContextualMenuPage from "./DisplayResourcesListContextualMenu.test.page";

beforeEach(() => {
  jest.resetModules();
  let clipboardData = ''; //initalizing clipboard data so it can be used in testing
  const mockClipboard = {
    writeText: jest.fn(data => clipboardData = data),
    readText: jest.fn(() => document.activeElement.value = clipboardData),
  };
  global.navigator.clipboard = mockClipboard;
});

describe("DisplayResourcesListContextualMenu", () => {
  let page; // The page to test against

  describe('As LU I should be able to access all the offered capabilities on resources I have owner access', () => {
    const props = defaultProps(); // The props to pass
    jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementationOnce(() => {});

    beforeEach(() => {
      page = new DisplayResourcesListContextualMenuPage(props);
    });

    /**
     * Given an organization with 1 resource
     * Then I should see the 7 menu
     */
    it('As LU I should see all menu name', () => {
      expect(page.copyUsernameItem).not.toBeNull();
      expect(page.copyUsernameItem.hasAttribute("disabled")).toBeFalsy();
      expect(page.copyPasswordItem).not.toBeNull();
      expect(page.copyPasswordItem.hasAttribute("disabled")).toBeFalsy();
      expect(page.copyUriItem).not.toBeNull();
      expect(page.copyUriItem.hasAttribute("disabled")).toBeFalsy();
      expect(page.copyPermalinkItem).not.toBeNull();
      expect(page.copyPermalinkItem.hasAttribute("disabled")).toBeFalsy();
      expect(page.openUriItem).not.toBeNull();
      expect(page.openUriItem.hasAttribute("disabled")).toBeFalsy();
      expect(page.editItem).not.toBeNull();
      expect(page.editItem.hasAttribute("disabled")).toBeFalsy();
      expect(page.shareItem).not.toBeNull();
      expect(page.shareItem.hasAttribute("disabled")).toBeFalsy();
      expect(page.deleteItem).not.toBeNull();
      expect(page.deleteItem.hasAttribute("disabled")).toBeFalsy();
    });

    it('As LU I can start to copy the username of a resource', async() => {
      expect.assertions(3);
      await page.copyUsername();
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(props.resource.username);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to copy the password of a resource', async() => {
      expect.assertions(4);
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => 'secret-copy');
      await page.copyPassword();
      expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.decrypt', props.resource.id, {showProgress: true});
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('secret-copy');
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to copy the uri of a resource', async() => {
      expect.assertions(3);
      await page.copyUri();
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(props.resource.uri);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to copy the permalink of a resource', async() => {
      expect.assertions(3);
      await page.copyPermalink();
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(`${props.context.userSettings.getTrustedDomain()}/app/passwords/view/${props.resource.id}`);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can open a resource uri in new tab', async() => {
      jest.spyOn(props.resourceWorkspaceContext, 'onGoToResourceUriRequested').mockImplementationOnce(() => {});
      await page.openUri();
      expect(props.resourceWorkspaceContext.onGoToResourceUriRequested).toHaveBeenCalled();
    });

    it('As LU I can start to edit a resource', async() => {
      await page.edit();
      expect(props.dialogContext.open).toHaveBeenCalledWith(EditResource);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to share a resource', async() => {
      await page.share();
      expect(props.dialogContext.open).toHaveBeenCalledWith(ShareDialog);
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to delete a resource', async() => {
      await page.delete();
      expect(props.dialogContext.open).toHaveBeenCalledWith(DeleteResource);
      expect(props.hide).toHaveBeenCalled();
    });
  });

  describe('As LU I should have limited offered capabilities on resources I have read only access', () => {
    const props = propsResourceWithReadOnlyPermission(); // The props to pass

    beforeEach(() => {
      page = new DisplayResourcesListContextualMenuPage(props);
    });

    it('As LU I should not be able to edit/share/delete a password I have read only access', async() => {
      expect(page.copyUsernameItem).not.toBeNull();
      expect(page.copyUsernameItem.hasAttribute("disabled")).toBeFalsy();
      expect(page.copyPasswordItem).not.toBeNull();
      expect(page.copyPasswordItem.hasAttribute("disabled")).toBeFalsy();
      expect(page.copyUriItem).not.toBeNull();
      expect(page.copyUriItem.hasAttribute("disabled")).toBeFalsy();
      expect(page.copyPermalinkItem).not.toBeNull();
      expect(page.copyPermalinkItem.hasAttribute("disabled")).toBeFalsy();
      expect(page.openUriItem).not.toBeNull();
      expect(page.openUriItem.hasAttribute("disabled")).toBeFalsy();
      expect(page.editItem).not.toBeNull();
      expect(page.editItem.hasAttribute("disabled")).toBeTruthy();
      expect(page.shareItem).not.toBeNull();
      expect(page.shareItem.hasAttribute("disabled")).toBeTruthy();
      expect(page.deleteItem).not.toBeNull();
      expect(page.deleteItem.hasAttribute("disabled")).toBeTruthy();
    });
  });

  describe('As LU I should have limited offered capabilities on resources I have update access', () => {
    const props = propsResourceWithUpdatePermission(); // The props to pass

    beforeEach(() => {
      page = new DisplayResourcesListContextualMenuPage(props);
    });

    it('As LU I should not be able to share a password I have update access', async() => {
      expect(page.copyUsernameItem).not.toBeNull();
      expect(page.copyUsernameItem.hasAttribute('disabled')).toBeFalsy();
      expect(page.copyPasswordItem).not.toBeNull();
      expect(page.copyPasswordItem.hasAttribute('disabled')).toBeFalsy();
      expect(page.copyUriItem).not.toBeNull();
      expect(page.copyUriItem.hasAttribute('disabled')).toBeFalsy();
      expect(page.copyPermalinkItem).not.toBeNull();
      expect(page.copyPermalinkItem.hasAttribute('disabled')).toBeFalsy();
      expect(page.openUriItem).not.toBeNull();
      expect(page.openUriItem.hasAttribute('disabled')).toBeFalsy();
      expect(page.editItem).not.toBeNull();
      expect(page.editItem.hasAttribute('disabled')).toBeFalsy();
      expect(page.shareItem).not.toBeNull();
      expect(page.shareItem.hasAttribute('disabled')).toBeTruthy();
      expect(page.deleteItem).not.toBeNull();
      expect(page.deleteItem.hasAttribute('disabled')).toBeFalsy();
    });
  });

  describe('As LU I should have limited offered capabilities if constraint by rbac', () => {
    const props = propsDenyUIActions();

    beforeEach(() => {
      page = new DisplayResourcesListContextualMenuPage(props);
    });

    it('As LU I should not see the copy password to clipboard if denied by rbac', async() => {
      expect(page.copyUsernameItem).not.toBeNull();
      expect(page.copyUsernameItem.hasAttribute('disabled')).toBeFalsy();
      expect(page.copyPasswordItem).toBeNull();
      expect(page.copyUriItem).not.toBeNull();
      expect(page.copyUriItem.hasAttribute('disabled')).toBeFalsy();
      expect(page.copyPermalinkItem).not.toBeNull();
      expect(page.copyPermalinkItem.hasAttribute('disabled')).toBeFalsy();
      expect(page.openUriItem).not.toBeNull();
      expect(page.openUriItem.hasAttribute('disabled')).toBeFalsy();
      expect(page.editItem).not.toBeNull();
      expect(page.editItem.hasAttribute('disabled')).toBeFalsy();
      expect(page.shareItem).toBeNull();
      expect(page.deleteItem).not.toBeNull();
      expect(page.deleteItem.hasAttribute('disabled')).toBeFalsy();
    });
  });
});
