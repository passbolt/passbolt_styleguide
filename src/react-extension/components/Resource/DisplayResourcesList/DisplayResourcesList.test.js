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

import "../../../../../test/mocks/mockClipboard";
import "../../../../shared/components/Icons/ResourceIcon.test.init";
import {
  defaultProps,
  propsWithAllResourcesSelected,
  propsWithFilteredResources, propsWithFilteredResourcesAndColumnsHidden,
  propsWithFilteredResourcesAndDenyUiAction,
  propsWithNoResourcesForFilter,
} from "./DisplayResourcesList.test.data";
import DisplayResourcesListPage from "./DisplayResourcesList.test.page";
import {waitFor} from "@testing-library/dom";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import DisplayResourcesListContextualMenu from "./DisplayResourcesListContextualMenu";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {TotpCodeGeneratorService} from "../../../../shared/services/otp/TotpCodeGeneratorService";
import {ColumnFields} from "../../../../shared/models/column/ColumnModel";
import ColumnsResourceSettingCollection
  from "../../../../shared/models/entity/resource/columnsResourceSettingCollection";
import {defaultTotpViewModelDto} from "../../../../shared/models/entity/totp/totpDto.test.data";

beforeEach(() => {
  jest.resetModules();
  // Need to mock client width value for column calculation
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true, value: 1416
  });
});

describe("Display Resources", () => {
  describe("As LU, I should see the appropriate list of resources", () => {
    it('As LU, I should see initially an empty content when there are no resources', async() => {
      const props = defaultProps();
      const page = new DisplayResourcesListPage(props);
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

    it('As LU, I should see an empty content when there are no resources matching the expired search', async() => {
      const page = new DisplayResourcesListPage(propsWithNoResourcesForFilter(ResourceWorkspaceFilterTypes.EXPIRED));
      await waitFor(() => {});
      expect(page.hasEmptyContent).toBeTruthy();
    });

    it('As LU, I should see an empty content when there are no private resources matching the private resource search', async() => {
      const page = new DisplayResourcesListPage(propsWithNoResourcesForFilter(ResourceWorkspaceFilterTypes.PRIVATE));
      await waitFor(() => {});
      expect(page.hasEmptyContent).toBeTruthy();
    });


    it('AS LU, I should see the appropriate filtered list of resources', async() => {
      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      expect(page.resourcesCount).toBe(6);
      expect(page.resource(1).name).toBe('apache');
      expect(page.resource(2).name).toBe('bower');
      expect(page.resource(3).name).toBe('test');
      expect(page.resource(4).name).toBe('totp');
      expect(page.resource(5).name).toBe('standalone totp');
      expect(page.resource(6).name).toBe('will-expire');
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
      expect(props.resourceWorkspaceContext.onSorterChanged).toHaveBeenCalledWith(ColumnFields.FAVORITE);
    });

    it('As LU, I should sort the resources by name', async() => {
      await page.sortByResourceName();
      expect(props.resourceWorkspaceContext.onSorterChanged).toHaveBeenCalledWith(ColumnFields.METADATA_NAME);
    });

    it('As LU, I should sort the resources by username', async() => {
      jest.spyOn(props.resourceWorkspaceContext, 'onSorterChanged').mockImplementationOnce(() => {});
      await page.sortByUsername();
      expect(props.resourceWorkspaceContext.onSorterChanged).toHaveBeenCalledWith(ColumnFields.METADATA_USERNAME);
    });

    it('As LU, I should sort the resources by modified', async() => {
      await page.sortByModified();
      expect(props.resourceWorkspaceContext.onSorterChanged).toHaveBeenCalledWith(ColumnFields.MODIFIED);
    });

    it('As LU, I should sort the resources by uri', async() => {
      await page.sortByUri();
      expect(props.resourceWorkspaceContext.onSorterChanged).toHaveBeenCalledWith(ColumnFields.METADATA_URIS);
    });

    it('As LU, I should sort the resources by expiration date', async() => {
      await page.sortByExpiry();
      expect(props.resourceWorkspaceContext.onSorterChanged).toHaveBeenCalledWith(ColumnFields.EXPIRED);
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
      await waitFor(() => {});
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementationOnce(() => {});
      await page.resource(1).selectUsername();
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(props.resourceWorkspaceContext.filteredResources[0].metadata.username);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
    });
  });

  describe('As LU, I should copy the secret.', () => {
    it('As LU, I should be able to copy the secret of resource', async() => {
      expect.assertions(6);
      const props = propsWithFilteredResources();
      const totp = defaultTotpViewModelDto();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});

      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({password: 'secret-password'}));
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});
      await page.resource(1).selectPassword();
      expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.find-by-resource-id', props.resourceWorkspaceContext.filteredResources[0].id);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('secret-password');
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();

      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({password: 'secret-password', description: "", totp: totp}));
      await page.resource(4).selectTotp();
      const code = TotpCodeGeneratorService.generate(totp);
      expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.find-by-resource-id', props.resourceWorkspaceContext.filteredResources[3].id);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
    });

    it('As LU, I should not be able to copy the secret of resource  if denied by RBAC.', async() => {
      expect.assertions(2);
      const props = propsWithFilteredResourcesAndDenyUiAction();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({password: 'secret-password'}));
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementationOnce(() => {});
      expect(page.resource(1).copyPasswordLink.hasAttribute("disabled")).toBeTruthy();
      expect(page.resource(4).copyTotpLink.hasAttribute("disabled")).toBeTruthy();
    });
  });

  describe('As LU, I should preview the secret.', () => {
    it('AS LU, I should preview the secret of a resource ', async() => {
      expect.assertions(7);
      const props = propsWithFilteredResources();
      const totp = defaultTotpViewModelDto();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});

      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({password: 'secret-password'}));
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementationOnce(() => {});
      await page.resource(1).selectViewPassword();
      expect(page.resource(1).password).toBe('secret-password');
      expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.find-by-resource-id', props.resourceWorkspaceContext.filteredResources[0].id);
      await page.resource(1).selectViewPassword();
      expect(page.resource(1).password).toBe('Copy password to clipboard');

      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({password: 'secret-password', description: "", totp: totp}));
      await page.resource(4).selectViewTotp();
      const code = TotpCodeGeneratorService.generate(totp);
      expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.find-by-resource-id', props.resourceWorkspaceContext.filteredResources[3].id);
      expect(page.resource(4).totp.replaceAll(/\s+/g, "")).toBe(code);
      expect(props.resourceWorkspaceContext.onResourcePreviewed).toHaveBeenCalledTimes(2);
      await page.resource(4).selectViewTotp();
      expect(page.resource(4).totp).toBe('Copy TOTP to clipboard');
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
      await expect(page.resource(4).isViewTotpExist).toBeFalsy();
    });
  });

  describe('As LU, I should open the uri of a resource.', () => {
    it('As LU, I should be able to follow the uri of a resource', async() => {
      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {
      });
      jest.spyOn(props.resourceWorkspaceContext, 'onGoToResourceUriRequested').mockImplementationOnce(() => {
      });
      await page.resource(1).selectUri();
      expect(props.resourceWorkspaceContext.onGoToResourceUriRequested).toHaveBeenCalled();
    });
  });

  describe('As LU, I should go to the folder location of a resource.', () => {
    it('As LU, I should be able to go to the folder root if a resource is not in a folder', async() => {
      expect.assertions(1);
      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      await page.resource(1).selectLocation();
      expect(page.resource(1).locationLink).toStrictEqual("My workspace");
    });

    it('As LU, I should be able to go to the folder location of a resource', async() => {
      expect.assertions(1);
      const props = propsWithFilteredResourcesAndColumnsHidden();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      await page.resource(1).selectLocation();
      expect(page.resource(1).locationLink).toStrictEqual("Accounting›Bank");
    });
  });

  describe('As LU, I should resize columns of a resource.', () => {
    it('As LU, I should be able to resize a column of a resource with mouse move', async() => {
      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});

      const totalColumnCount = page.columnsCount;
      const fixedSizeColumns = 3;
      const resizableColumnCount = totalColumnCount - fixedSizeColumns;

      const columnNameCheckAssertionsCount = 7;
      const resizeAssertionsCount = 1;

      const assertionsCallCount = columnNameCheckAssertionsCount + resizeAssertionsCount + 2 * resizableColumnCount;
      expect.assertions(assertionsCallCount);

      const columnCount = page.columnsCount;

      expect(page.columns(3).name).toStrictEqual("Name");
      expect(page.columns(4).name).toStrictEqual("Expiry");
      expect(page.columns(5).name).toStrictEqual("Username");
      expect(page.columns(6).name).toStrictEqual("Password");
      expect(page.columns(7).name).toStrictEqual("TOTP");
      expect(page.columns(8).name).toStrictEqual("URI");
      expect(page.columns(9).name).toStrictEqual("Modified");

      // Resize by increasing the width
      for (let j = fixedSizeColumns; j < columnCount; j += 1) {
        const column = page.columns(j + 1);
        const columnStartingwith = parseFloat(column.width.slice(0, -2));
        await column.resize(100);

        expect(columnStartingwith).toBeLessThan(parseFloat(column.width.slice(0, -2)));
      }

      // Resize by reducing the width
      for (let j = fixedSizeColumns; j < columnCount; j += 1) {
        const column = page.columns(j + 1);
        const columnStartingwith = parseFloat(column.width.slice(0, -2));
        await column.resize(-100);

        expect(columnStartingwith).toBeGreaterThan(parseFloat(column.width.slice(0, -2)));
      }

      // onChangeColumnsSettings called
      expect(props.resourceWorkspaceContext.onChangeColumnsSettings).toHaveBeenCalledTimes(2 * resizableColumnCount);
    });

    it('As LU, I should be able to resize a column to its default with double click', async() => {
      expect.assertions(8);

      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      await page.columns(3).resizeDefault();
      await page.columns(4).resizeDefault();
      await page.columns(5).resizeDefault();
      await page.columns(6).resizeDefault();
      await page.columns(7).resizeDefault();
      await page.columns(8).resizeDefault();
      await page.columns(9).resizeDefault();

      expect(page.columns(3).width).toStrictEqual("145px");
      expect(page.columns(4).width).toStrictEqual("145px");
      expect(page.columns(5).width).toStrictEqual("145px");
      expect(page.columns(6).width).toStrictEqual("145px");
      expect(page.columns(7).width).toStrictEqual("145px");
      expect(page.columns(8).width).toStrictEqual("210px");
      expect(page.columns(9).width).toStrictEqual("145px");
      // onChangeColumnsSettings called
      expect(props.resourceWorkspaceContext.onChangeColumnsSettings).toHaveBeenCalledTimes(7);
    });
  });

  describe('As LU, I should reorder a column of a resource.', () => {
    it('As LU, I should be able to reorder a column of a resource with mouse move', async() => {
      expect.assertions(8);

      const props = propsWithFilteredResources();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});
      // Need to resize before to check due to the actual width is negative
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
        configurable: true, value: 300
      });
      // Reorder
      await page.columns(3).reorder(-250);
      await page.columns(4).reorder(-200);
      await page.columns(6).reorder(-250);
      await page.columns(7).reorder(150);

      // Order should be changed
      expect(page.columns(3).name).toStrictEqual("Expiry");
      expect(page.columns(4).name).toStrictEqual("Name");
      expect(page.columns(5).name).toStrictEqual("Password");
      expect(page.columns(6).name).toStrictEqual("Username");
      expect(page.columns(7).name).toStrictEqual("TOTP");
      expect(page.columns(8).name).toStrictEqual("URI");
      expect(page.columns(9).name).toStrictEqual("Modified");
      // onChangeColumnsSettings called
      expect(props.resourceWorkspaceContext.onChangeColumnsSettings).toHaveBeenCalledTimes(4);
    });
  });

  describe('As LU, I should see columns of a resource with default value if at least one is negative.', () => {
    it('As LU, I should see all columns width with default value value if one isnegative', async() => {
      expect.assertions(9);
      const columnsResourceSetting = new ColumnsResourceSettingCollection([
        {id: "favorite", label: "Favorite", position: 1, show: true},
        {id: "icon", label: "Icon", position: 2, show: true},
        {id: "name", label: "Name", position: 3, show: true},
        {id: "expired", label: "Expiry", position: 4, show: true},
        {id: "username", label: "Username", position: 5, show: true, width: -100},
        {id: "password", label: "Password", position: 6, show: true},
        {id: "totp", label: "TOTP", position: 7, show: true},
        {id: "uri", label: "URI", position: 8, show: true, width: 0},
        {id: "modified", label: "Modified", position: 9, show: true},
        {id: "location", label: "Location", position: 10, show: true}]);
      const props = propsWithFilteredResources();
      props.resourceWorkspaceContext.columnsResourceSetting = columnsResourceSetting;
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});

      // Width should be the default
      expect(page.columns(2).width).toStrictEqual("20px");
      expect(page.columns(3).width).toStrictEqual("145.2248062015504px");
      expect(page.columns(4).width).toStrictEqual("145.2248062015504px");
      expect(page.columns(5).width).toStrictEqual("145.2248062015504px");
      expect(page.columns(6).width).toStrictEqual("145.2248062015504px");
      expect(page.columns(7).width).toStrictEqual("145.2248062015504px");
      expect(page.columns(8).width).toStrictEqual("210.32558139534882px");
      expect(page.columns(9).width).toStrictEqual("145.2248062015504px");
      expect(page.columns(10).width).toStrictEqual("210.32558139534882px");
    });
  });

  describe('As LU, I should hide or show a column of a resource.', () => {
    it('As LU, I should be able to hide or show a column of a resource', async() => {
      expect.assertions(4);

      const props = propsWithFilteredResourcesAndColumnsHidden();
      const page = new DisplayResourcesListPage(props);
      await waitFor(() => {});

      // 6 columns should be displayed
      expect(page.columnsCount).toStrictEqual(6);
      expect(page.columns(3).name).toStrictEqual("Name");
      expect(page.columns(4).name).toStrictEqual("Password");
      expect(page.columns(5).name).toStrictEqual("URI");
    });
  });
});
