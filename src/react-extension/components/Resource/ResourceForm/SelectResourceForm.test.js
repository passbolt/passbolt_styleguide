/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.0.0
 */

/**
 * Unit tests on SelectResourceForm in regard of specifications
 */

import SelectResourceFormPage from "./SelectResourceForm.test.page";
import {defaultProps} from "./SelectResourceForm.test.data";
import {waitFor} from "@testing-library/dom";
import {
  ResourceEditCreateFormEnumerationTypes
} from "../../../../shared/models/resource/ResourceEditCreateFormEnumerationTypes";
import {defaultResourceFormDto} from "../../../../shared/models/entity/resource/resourceFormEntity.test.data";
import {
  resourceTypePasswordAndDescriptionDto, resourceTypePasswordDescriptionTotpDto,
  resourceTypeV5TotpDto, TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";

beforeEach(() => {
  jest.resetModules();
});

describe("SelectResourceForm", () => {
  let page; // The page to test against

  describe('As LU I can see the select resource form.', () => {
    it('As LU I can close the resource sections.', async() => {
      expect.assertions(2);
      const props = defaultProps();
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.getSectionItem(1)).toBeDefined();

      await page.click(page.sidebarSectionsSecret);
      await page.click(page.sidebarSectionMetadata);

      expect(page.getSectionItem(1)).toBeUndefined();
    });

    it('As LU I can see the resource description disabled for v4 default.', async() => {
      expect.assertions(2);
      const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto()), resource: defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, secret: {password: ""}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.getSectionItem(2).textContent).toStrictEqual("Description");
      expect(page.getSectionItem(2).hasAttribute("disabled")).toBeTruthy();
    });

    it('As LU the resource secret section password should be selected.', async() => {
      expect.assertions(1);
      const props = defaultProps();
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");
    });

    it('As LU the resource secret section totp should be selected.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.TOTP, resourceType: new ResourceTypeEntity(resourceTypeV5TotpDto()), resource: defaultResourceFormDto({secret: {totp: {}}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.sectionItemSelected.textContent).toStrictEqual("TOTP");
    });

    it('As LU the resource secret section note should be selected.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.NOTE, resource: defaultResourceFormDto({secret: {description: ""}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.sectionItemSelected.textContent).toStrictEqual("Note");
    });

    it('As LU the resource secret section description should be selected.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.DESCRIPTION});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.sectionItemSelected.textContent).toStrictEqual("Description");
    });
  });

  describe('As LU I can select another resource form.', () => {
    it('As LU I can select the resource description sections from a password lead.', async() => {
      expect.assertions(2);
      const props = defaultProps();
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");

      await page.click(page.getSectionItem(2));

      expect(props.onSelectForm).toHaveBeenCalledWith(expect.any(Object), ResourceEditCreateFormEnumerationTypes.DESCRIPTION);
    });

    it('As LU I can select the resource description sections from a totp lead.', async() => {
      expect.assertions(2);
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.TOTP, resourceType: new ResourceTypeEntity(resourceTypeV5TotpDto()), resource: defaultResourceFormDto({secret: {totp: {}}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.sectionItemSelected.textContent).toStrictEqual("TOTP");

      await page.click(page.getSectionItem(2));

      expect(props.onSelectForm).toHaveBeenCalledWith(expect.any(Object), ResourceEditCreateFormEnumerationTypes.DESCRIPTION);
    });
  });

  describe('As LU I can see secret that could be added.', () => {
    it('As LU I can see secrets that can be added for a resource v5 from a password lead.', async() => {
      expect.assertions(3);
      const props = defaultProps();
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.addSecret);

      expect(page.addSecretPassword).toBeNull();
      expect(page.addSecretTotp).toBeDefined();
      expect(page.addSecretNote).toBeDefined();
    });

    it('As LU I can see secrets that can be added for a resource v5 from a totp lead.', async() => {
      expect.assertions(3);
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.TOTP, resourceType: new ResourceTypeEntity(resourceTypeV5TotpDto()), resource: defaultResourceFormDto({secret: {totp: {}}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.addSecret);

      expect(page.addSecretPassword).toBeDefined();
      expect(page.addSecretTotp).toBeNull();
      expect(page.addSecretNote).toBeDefined();
    });

    it('As LU I can see secrets that can be added for a resource V5 from a note.', async() => {
      expect.assertions(3);
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.NOTE, resource: defaultResourceFormDto({secret: {description: ""}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.addSecret);

      expect(page.addSecretPassword).toBeDefined();
      expect(page.addSecretTotp).toBeDefined();
      expect(page.addSecretNote).toBeNull();
    });

    it('As LU I can see secrets that can be added for a resource V4 from a password lead.', async() => {
      expect.assertions(3);
      const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto())});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.addSecret);

      expect(page.addSecretPassword).toBeNull();
      expect(page.addSecretTotp).toBeDefined();
      expect(page.addSecretNote).toBeDefined();
    });

    it('As LU I can see secrets that can be added for a resource V4 from a totp lead.', async() => {
      expect.assertions(3);
      const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordDescriptionTotpDto()), resourceFormSelected: ResourceEditCreateFormEnumerationTypes.TOTP, resource: defaultResourceFormDto({secret: {totp: {}}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.addSecret);

      expect(page.addSecretPassword).toBeDefined();
      expect(page.addSecretTotp).toBeNull();
      expect(page.addSecretNote).toBeDefined();
    });

    it('As LU I can see add secrets disabled if no resource types is available.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceTypes: new ResourceTypesCollection([])});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.addSecret.hasAttribute("disabled")).toBeTruthy();
    });
  });
});
