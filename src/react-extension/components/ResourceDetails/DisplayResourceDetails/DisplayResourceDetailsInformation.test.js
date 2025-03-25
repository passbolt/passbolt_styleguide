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
  defaultProps, propsWithDenyUiAction, withNestedFoldersProps,
} from "./DisplayResourceDetailsInformation.test.data";
import DisplayResourceDetailsInformationPage from "./DisplayResourceDetailsInformation.test.page";
import {waitFor} from "@testing-library/dom";
import {DateTime} from "luxon";

describe("DisplayResourceDetailsInformation", () => {
  let page, props;

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
      await page.title.click();
      expect(page.title.hyperlink.textContent).toBe("Information");
      expect(page.displayInformationList.exists()).toBeTruthy();
    });

    it('I should be able to identify each information name', async() => {
      page = new DisplayResourceDetailsInformationPage(props);
      await waitFor(() => {});
      await page.title.click();
      const absoluteModificationDate = props.resourceWorkspaceContext.details.resource.modified;
      const modificationDate = DateTime.fromISO(absoluteModificationDate).toRelative();
      const absoluteCreationDate = props.resourceWorkspaceContext.details.resource.created;
      const creationDate = DateTime.fromISO(absoluteCreationDate).toRelative();
      expect.assertions(12);
      await waitFor(() => {});
      expect(page.displayInformationList.modifiedLabel).toBe('Modified');
      expect(page.displayInformationList.modified.textContent).toBe(modificationDate);
      expect(page.displayInformationList.modifiedByLabel).toBe('Modified by');
      expect(page.displayInformationList.modifiedBy.textContent).toBe('ada@passbolt.com');
      expect(page.displayInformationList.createdLabel).toBe('Created');
      expect(page.displayInformationList.created.textContent).toBe(creationDate);
      expect(page.displayInformationList.createdByLabel).toBe('Created by');
      expect(page.displayInformationList.createdBy.textContent).toBe('ada@passbolt.com');
      expect(page.displayInformationList.locationLabel).toBe('Location');
      expect(page.displayInformationList.location.textContent).toBe("My workspace");
      expect(page.displayInformationList.expiryLabel).toBe('Expiry');
      expect(page.displayInformationList.expiry.textContent).toBe("Not set");
    });

    it('I can see if a resource is at the root', async() => {
      page = new DisplayResourceDetailsInformationPage(props);
      expect.assertions(2);
      await page.title.click();
      expect(page.displayInformationList.locationLabel).toBe('Location');
      expect(page.displayInformationList.location.textContent).toBe("My workspace");
    });

    it('I can see a folder a resource is contained in', async() => {
      expect.assertions(2);
      props = withNestedFoldersProps();
      page = new DisplayResourceDetailsInformationPage(props);
      const user = props.context.users[0];
      const resourceWithContain = Object.assign({}, props.resourceWorkspaceContext.details.resource, {creator: user, modifier: user});
      props.context.port.addRequestListener("passbolt.resources.find-details", async() => resourceWithContain);

      await page.title.click();
      expect(page.displayInformationList.locationLabel).toBe('Location');
      expect(page.displayInformationList.location.textContent).toBe("folder 0›folder 1›folder 2");
    });

    it('I cannot see the folder a resource is contained in if disabled by RBAC', async() => {
      const props = propsWithDenyUiAction();
      const user = props.context.users[0];
      const resourceWithContain = Object.assign({}, props.resourceWorkspaceContext.details.resource, {creator: user, modifier: user});
      props.context.port.addRequestListener("passbolt.resources.find-details", async() => resourceWithContain);
      page = new DisplayResourceDetailsInformationPage(props);
      expect.assertions(1);
      await page.title.click();
      expect(page.displayInformationList.location).toBeNull();
    });

    it('I cannot see the expiry information if the feature is disabled', async() => {
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
      await page.title.click();
      expect(page.displayInformationList.expiry).toBeNull();
    });
  });
});
