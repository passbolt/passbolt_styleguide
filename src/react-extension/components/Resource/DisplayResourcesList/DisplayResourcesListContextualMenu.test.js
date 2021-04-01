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
  defaultAppContext,
  defaultProps, propsResourceOnlyRead,
} from "./DisplayResourcesListContextualMenu.test.data";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import DeleteResource from "../DeleteResource/DeleteResource";
import EditResource from "../EditResource/EditResource";
import ShareDialog from "../../Share/ShareDialog";
import DisplayResourcesListContextualMenuPage from "./DisplayResourcesListContextualMenu.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see each menu", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  describe('As LU I should see and identify each menu for a resource', () => {
    const props = defaultProps(); // The props to pass
    jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementationOnce(() => {});
    /**
     * Given an organization with 1 resource
     * Then I should see the 7 menu
     */

    beforeEach(() => {
      page = new DisplayResourcesListContextualMenuPage(context, props);
    });

    it('As LU I should see all menu name', () => {
      expect(page.menuName(1)).toBe("Copy username");
      expect(page.menuName(2)).toBe("Copy password");
      expect(page.menuName(3)).toBe("Copy URI");
      expect(page.menuName(4)).toBe("Copy permalink");
      expect(page.menuName(5)).toBe("Open URI in a new Tab");
      expect(page.menuName(6)).toBe("Edit");
      expect(page.menuName(7)).toBe("Share");
      expect(page.menuName(8)).toBe("Delete");
    });

    it('As LU I can start to copy the username of a resource', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {});
      await page.copyUsername();
      expect(context.port.request).toHaveBeenCalledWith('passbolt.clipboard.copy', props.resource.username);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to copy the password of a resource', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => 'secret-copy');
      await page.copyPassword();
      expect(context.port.request).toHaveBeenCalledWith('passbolt.secret.decrypt', props.resource.id, {showProgress: true});
      expect(context.port.request).toHaveBeenCalledWith('passbolt.clipboard.copy', 'secret-copy');
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to copy the uri of a resource', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {});
      await page.copyUri();
      expect(context.port.request).toHaveBeenCalledWith('passbolt.clipboard.copy', props.resource.uri);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.hide).toHaveBeenCalled();
    });

    it('As LU I can start to copy the permalink of a resource', async() => {
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {});
      await page.copyPermalink();
      expect(context.port.request).toHaveBeenCalledWith('passbolt.clipboard.copy',  `${context.userSettings.getTrustedDomain()}/app/passwords/view/${props.resource.id}`);
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

  describe('As LU I should see and identify each menu disable', () => {
    const props = propsResourceOnlyRead(); // The props to pass
    /**
     * Given an organization with 1 resource
     * Then I should see 3 menu disabled
     */

    beforeEach(() => {
      page = new DisplayResourcesListContextualMenuPage(context, props);
    });

    it('As LU I should see 3 menu disabled', async() => {
      expect(page.menuItem(1).className).toBe("");
      expect(page.menuItem(2).className).toBe("");
      expect(page.menuItem(3).className).toBe("");
      expect(page.menuItem(4).className).toBe("");
      expect(page.menuItem(5).className).toBe("");
      expect(page.menuItem(6).className).toBe("disabled");
      expect(page.menuItem(7).className).toBe("disabled");
      expect(page.menuItem(8).className).toBe("disabled");
    });
  });
});
