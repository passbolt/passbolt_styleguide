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

import {
  defaultProps,
  propsWithAllResourcesSelected,
  propsWithFilteredResources,
  propsWithFilteredResourcesAndDenyUiAction,
  propsWithNoResourcesForFilter,
} from "./DisplayResourcesList.test.data";
import DisplayResourcesListPage from "./DisplayResourcesList.test.page";
import {waitFor} from "@testing-library/dom";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import DisplayResourcesListContextualMenu from "./DisplayResourcesListContextualMenu";
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

describe("Display Resources", () => {
  describe("As LU, I should see the appropriate list of resources", () => {
    it('As LU, I should see initially an empty content when there are no resources', async() => {
      const page = new DisplayResourcesListPage(defaultProps());
      await waitFor(() => {});
      expect(page.hasEmptyContent).toBeTruthy();
    });

    it('As LU, I should see an empty content when there are no resources matching the text search', async() => {
      const page = new DisplayResourcesListPage(propsWithNoResourcesForFilter(ResourceWorkspaceFilterTypes.TEXT));
      await waitFor(() => {});
      expect(page.hasEmptyContent).toBeTruthy();
    });

    it('As LU, I should see an empty content when there are no resources matching the favorite search', async() => {
      const page = new DisplayResourcesListPage(propsWithNoResourcesForFilter(ResourceWorkspaceFilterTypes.FAVORITE));
      await waitFor(() => {});
      expect(page.hasEmptyContent).toBeTruthy();
    });

    it('As LU, I should see an empty content when there are no resources matching the group filter', async() => {
      const page = new DisplayResourcesListPage(propsWithNoResourcesForFilter(ResourceWorkspaceFilterTypes.GROUP));
      await waitFor(() => {});
      expect(page.hasEmptyContent).toBeTruthy();
    });

    it('As LU, I should see an empty content when there are no resources matching the folder filter', async() => {
      const page = new DisplayResourcesListPage(propsWithNoResourcesForFilter(ResourceWorkspaceFilterTypes.FOLDER));
      await waitFor(() => {});
      expect(page.hasEmptyContent).toBeTruthy();
    });

    it('As LU, I should see an empty content when there are no resources matching the shared with me search', async() => {
      const page = new DisplayResourcesListPage(propsWithNoResourcesForFilter(ResourceWorkspaceFilterTypes.SHARED_WITH_ME));
      await waitFor(() => {});
      expect(page.hasEmptyContent).toBeTruthy();
    });

    it('AS LU, I should see the appropriate filtered list of resources', async() => {
      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      expect(page.resourcesCount).toBe(3);
      expect(page.resource(1).name).toBe('apache');
      expect(page.resource(2).name).toBe('bower');
      expect(page.resource(3).name).toBe('test');
    });
  });

  describe('As LU, I should select resources', () => {
    it('As LU, I should select one resource', async() => {
      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      await page.resource(1).select();
      expect(props.resourceWorkspaceContext.onResourceSelected.single).toHaveBeenCalledWith(props.resourceWorkspaceContext.filteredResources[0]);
    });

    it('As LU, I should unselect one resource', async() => {
      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      await page.resource(1).select();
      expect(props.resourceWorkspaceContext.onResourceSelected.single).toHaveBeenCalledWith(props.resourceWorkspaceContext.filteredResources[0]);
      await page.resource(1).select();
      expect(props.resourceWorkspaceContext.onResourceSelected.single).toHaveBeenCalledWith(props.resourceWorkspaceContext.filteredResources[0]);
    });

    it('As LU, I should select multiple resources', async() => {
      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      await page.resource(1).selectWithCheckbox();
      await page.resource(2).selectWithCheckbox();
      expect(props.resourceWorkspaceContext.onResourceSelected.multiple).toHaveBeenCalledWith(props.resourceWorkspaceContext.filteredResources[0]);
      expect(props.resourceWorkspaceContext.onResourceSelected.multiple).toHaveBeenCalledWith(props.resourceWorkspaceContext.filteredResources[1]);
    });

    it('As LU, I should select a range of resources', async() => {
      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      await page.resource(1).selectWithCheckbox();
      await page.resource(3).selectRangeCheckbox();
      expect(props.resourceWorkspaceContext.onResourceSelected.multiple).toHaveBeenCalledWith(props.resourceWorkspaceContext.filteredResources[0]);
      expect(props.resourceWorkspaceContext.onResourceSelected.range).toHaveBeenCalledWith(props.resourceWorkspaceContext.filteredResources[2]);
    });

    it('As LU, I should select all resources', async() => {
      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      await page.selectAll();
      expect(props.resourceWorkspaceContext.onResourceSelected.all).toHaveBeenCalled();
    });

    it('As LU, I should unselect all resources', async() => {
      const props = propsWithAllResourcesSelected();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      await page.selectAll();
      expect(props.resourceWorkspaceContext.onResourceSelected.none).toHaveBeenCalled();
    });
  });

  describe('As LU, I should sort the resource by property column', () => {
    let props, page;

    beforeEach(() => {
      props = propsWithFilteredResources();
      page = new DisplayResourcesListPage(props);
    });

    it('As LU, I should sort the resources by favorite', async() => {
      await page.sortByResourceFavorite();
      expect(props.resourceWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('favorite');
    });

    it('As LU, I should sort the resources by name', async() => {
      await page.sortByResourceName();
      expect(props.resourceWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('name');
    });

    it('As LU, I should sort the resources by username', async() => {
      jest.spyOn(props.resourceWorkspaceContext, 'onSorterChanged').mockImplementationOnce(() => {});
      await page.sortByUsername();
      expect(props.resourceWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('username');
    });

    it('As LU, I should sort the resources by modified', async() => {
      await page.sortByModified();
      expect(props.resourceWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('modified');
    });

    it('As LU, I should sort the resources by uri', async() => {
      await page.sortByUri();
      expect(props.resourceWorkspaceContext.onSorterChanged).toHaveBeenCalledWith('uri');
    });
  });


  describe('As LU, I should be able to open the resource contextual menu', () => {
    it('As LU, I should be able to open a contextual menu for a resource', async() => {
      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      await page.resource(1).openContextualMenu();
      expect(props.contextualMenuContext.show).toHaveBeenCalledWith(DisplayResourcesListContextualMenu, {resource: props.resourceWorkspaceContext.filteredResources[0]});
    });
  });

  describe('As LU, I should favorite a resource', () => {
    let props, page;

    beforeEach(() => {
      props = propsWithFilteredResources();
      page = new DisplayResourcesListPage(props);
    });

    it('As LU, I should be able to favorite a resources', async() => {
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementationOnce(() => {});
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => {});
      await page.resource(2).selectFavorite();
      await waitFor(() => {
        expect(props.context.port.request).toHaveBeenCalledWith('passbolt.favorite.add', props.resourceWorkspaceContext.filteredResources[1].id);
        expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      });
    });

    it('As LU, I should be able to unfavorite a resources', async() => {
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementationOnce(() => {});
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => {});
      await page.resource(1).selectFavorite();
      await waitFor(() => {
        expect(props.context.port.request).toHaveBeenCalledWith('passbolt.favorite.delete', props.resourceWorkspaceContext.filteredResources[0].id);
        expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      });
    });
  });

  describe('As LU, I should copy the username.', () => {
    it('As LU, I should be able to copy the username of a resource', async() => {
      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementationOnce(() => {});
      await page.resource(1).selectUsername();
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(props.resourceWorkspaceContext.filteredResources[0].username);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
    });
  });

  describe('As LU, I should copy the secret.', () => {
    it('As LU, I should be able to copy the secret of resource', async() => {
      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => 'secret-copy');
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementationOnce(() => {});
      await page.resource(1).selectPassword();
      await waitFor(() => expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.decrypt', props.resourceWorkspaceContext.filteredResources[0].id, {showProgress: true}));
      await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith('secret-copy'));
      await waitFor(() => expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled());
    });

    it('As LU, I should not be able to copy the secret of resource  if denied by RBAC.', async() => {
      const props = propsWithFilteredResourcesAndDenyUiAction();
      const page = new DisplayResourcesListPage(props);
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => 'secret-copy');
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementationOnce(() => {});
      expect(page.resource(1).copyPasswordLink.hasAttribute("disabled")).toBeTruthy();
    });
  });

  describe('As LU, I should preview the secret.', () => {
    it('AS LU, I should preview the secret of a resource ', async() => {
      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => 'secret-copy');
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementationOnce(() => {});
      await page.resource(1).selectViewPassword();
      expect(page.resource(1).password).toBe('secret-copy');
      expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.decrypt', props.resourceWorkspaceContext.filteredResources[0].id, {showProgress: true});
      await page.resource(1).selectViewPassword();
      expect(page.resource(1).password).toBe('Copy password to clipboard');
    });

    it('AS LU, I shouldn\'t be able to preview secret of a resource if disabled by API flag', async() => {
      const appContext = {
        siteSettings: {
          getServerTimezone: () => '',
          canIUse: () => false,
        }
      };
      const context = defaultUserAppContext(appContext);
      const props = propsWithFilteredResources({context}); // The props to pass
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      await expect(page.resource(1).isViewPasswordExist).toBeFalsy();
    });

    it('AS LU, I shouldn\'t be able to preview secret of a resource if denied by RBAC.', async() => {
      const props = propsWithFilteredResourcesAndDenyUiAction();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      await expect(page.resource(1).isViewPasswordExist).toBeFalsy();
    });
  });

  describe('As LU, I should open the uri of a resource.', () => {
    it('As LU, I should be able to follow the uri of a resource', async() => {
      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      jest.spyOn(props.resourceWorkspaceContext, 'onGoToResourceUriRequested').mockImplementationOnce(() => {});
      await page.resource(1).selectUri();
      expect(props.resourceWorkspaceContext.onGoToResourceUriRequested).toHaveBeenCalled();
    });
  });
});


