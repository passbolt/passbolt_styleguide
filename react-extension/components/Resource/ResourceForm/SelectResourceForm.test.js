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
  resourceTypePasswordAndDescriptionDto,
  resourceTypePasswordDescriptionTotpDto,
  resourceTypePasswordStringDto,
  resourceTypeV5DefaultTotpDto,
  resourceTypeV5TotpDto,
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION
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

    it('As LU I do not see the resource description for v4 default.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto()), resource: defaultResourceFormDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, secret: {password: ""}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.getSectionItem(2)).toBeUndefined();
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

    it('As LU I can see add secrets with only totp for a resource v4 password string.', async() => {
      expect.assertions(3);
      const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordStringDto()), resource: defaultResourceFormDto({secret: {password: ""}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.addSecretPassword).toBeNull();
      expect(page.addSecretTotp).toBeDefined();
      expect(page.addSecretNote).toBeNull();
    });

    it('As LU I can see add secrets disabled if no resource types is available.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceTypes: new ResourceTypesCollection([])});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.addSecret.hasAttribute("disabled")).toBeTruthy();
    });
  });

  describe('As LU I can add secret.', () => {
    it('As LU I can add secret note for a resource v5 from a password lead.', async() => {
      expect.assertions(1);
      const props = defaultProps();
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.addSecret);
      await page.click(page.addSecretNote);

      expect(props.onAddSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.NOTE);
    });

    it('As LU I can add secret totp for a resource v5 from a password lead.', async() => {
      expect.assertions(1);
      const props = defaultProps();
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.addSecret);
      await page.click(page.addSecretTotp);

      expect(props.onAddSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.TOTP);
    });

    it('As LU I can add secret note for a resource v5 from a totp lead.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.TOTP, resourceType: new ResourceTypeEntity(resourceTypeV5TotpDto()), resource: defaultResourceFormDto({secret: {totp: {}}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.addSecret);
      await page.click(page.addSecretNote);

      expect(props.onAddSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.NOTE);
    });

    it('As LU I can add secret password for a resource v5 from a totp lead.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.TOTP, resourceType: new ResourceTypeEntity(resourceTypeV5TotpDto()), resource: defaultResourceFormDto({secret: {totp: {}}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.addSecret);
      await page.click(page.addSecretPassword);

      expect(props.onAddSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.PASSWORD);
    });

    it('As LU I can add secret totp for a resource V5 from a note.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.NOTE, resource: defaultResourceFormDto({secret: {description: ""}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.addSecret);
      await page.click(page.addSecretTotp);

      expect(props.onAddSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.TOTP);
    });

    it('As LU I can add secret password for a resource V5 from a note.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.NOTE, resource: defaultResourceFormDto({secret: {description: ""}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.addSecret);
      await page.click(page.addSecretPassword);

      expect(props.onAddSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.PASSWORD);
    });

    it('As LU I can add secret totp for a resource V4 from a password lead.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto())});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.addSecret);
      await page.click(page.addSecretTotp);

      expect(props.onAddSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.TOTP);
    });

    it('As LU I can add secret note for a resource V4 from a password lead.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto())});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.addSecret);
      await page.click(page.addSecretNote);

      expect(props.onAddSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.NOTE);
    });

    it('As LU I can add secret password for a resource V4 from a totp lead.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordDescriptionTotpDto()), resourceFormSelected: ResourceEditCreateFormEnumerationTypes.TOTP, resource: defaultResourceFormDto({secret: {totp: {}}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.addSecret);
      await page.click(page.addSecretPassword);

      expect(props.onAddSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.PASSWORD);
    });

    it('As LU I can see add secrets disabled if all secrets are added.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypeV5DefaultTotpDto()), resourceFormSelected: ResourceEditCreateFormEnumerationTypes.TOTP, resource: defaultResourceFormDto({secret: {password: "", description: "", totp: {}}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.addSecret.hasAttribute("disabled")).toBeTruthy();
    });
  });

  describe('As LU I can delete secret.', () => {
    it('As LU I can delete secret note for a resource v5 from a password lead.', async() => {
      expect.assertions(1);
      const props = defaultProps({resource: defaultResourceFormDto({secret: {password: "", description: ""}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.deleteSecretNote);

      expect(props.onDeleteSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.NOTE);
    });

    it('As LU I can delete secret password for a resource v5 from a password lead.', async() => {
      expect.assertions(1);
      const props = defaultProps({resource: defaultResourceFormDto({secret: {password: "", description: ""}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.deleteSecretPassword);

      expect(props.onDeleteSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.PASSWORD);
    });

    it('As LU I can delete secret password and note for a resource v5 default totp.', async() => {
      expect.assertions(2);
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.TOTP, resourceType: new ResourceTypeEntity(resourceTypeV5DefaultTotpDto()), resource: defaultResourceFormDto({secret: {password: "", totp: {}, description: ""}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.deleteSecretPassword);
      await page.click(page.deleteSecretNote);

      expect(props.onDeleteSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.PASSWORD);
      expect(props.onDeleteSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.NOTE);
    });

    it('As LU I can delete secret totp for a resource v5 default totp.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.TOTP, resourceType: new ResourceTypeEntity(resourceTypeV5DefaultTotpDto()), resource: defaultResourceFormDto({secret: {password: "", totp: {}, description: ""}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.deleteSecretTotp);

      expect(props.onDeleteSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.TOTP);
    });

    it('As LU I can delete secret password and note for a resource v5 default totp.', async() => {
      expect.assertions(2);
      const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.TOTP, resourceType: new ResourceTypeEntity(resourceTypeV5DefaultTotpDto()), resource: defaultResourceFormDto({secret: {password: "", totp: {}, description: ""}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.deleteSecretNote);
      await page.click(page.deleteSecretPassword);

      expect(props.onDeleteSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.NOTE);
      expect(props.onDeleteSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.PASSWORD);
    });

    it('As LU I can delete secret totp for a resource V4 default totp.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordDescriptionTotpDto()), resource: defaultResourceFormDto({secret: {password: "", totp: {}, description: ""}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.deleteSecretTotp);

      expect(props.onDeleteSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.TOTP);
    });

    it('As LU I can delete secret note for a resource V4 default.', async() => {
      expect.assertions(1);
      const props = defaultProps({resource: defaultResourceFormDto({secret: {password: "", description: ""}}), resourceType: new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto())});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.deleteSecretNote);

      expect(props.onDeleteSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.NOTE);
    });

    it('As LU I can delete secret password for a resource V4 default.', async() => {
      expect.assertions(1);
      const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto()), resourceFormSelected: ResourceEditCreateFormEnumerationTypes.TOTP, resource: defaultResourceFormDto({secret: {password: "", description: ""}})});
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      await page.click(page.deleteSecretPassword);

      expect(props.onDeleteSecret).toHaveBeenCalledWith(ResourceEditCreateFormEnumerationTypes.PASSWORD);
    });

    it('As LU I cannot see delete secrets if resource has only one secret.', async() => {
      expect.assertions(1);
      const props = defaultProps();
      page = new SelectResourceFormPage(props);
      await waitFor(() => {});

      expect(page.deleteSecretPassword).toBeNull();
    });
  });

  describe('As LU I should see the select disabled.', () => {
    it('As LU I can see the select form disabled.', async() => {
      expect.assertions(8);

      const props = defaultProps({disabled: true, resource: defaultResourceFormDto({secret: {password: "", description: "", totp: {}}})});
      page = new SelectResourceFormPage(props);

      expect(page.addSecret.hasAttribute("disabled")).toBeTruthy();
      expect(page.deleteSecretPassword.hasAttribute("disabled")).toBeTruthy();
      expect(page.deleteSecretTotp.hasAttribute("disabled")).toBeTruthy();
      expect(page.deleteSecretNote.hasAttribute("disabled")).toBeTruthy();
      expect(page.getSectionItem(1).hasAttribute("disabled")).toBeTruthy();
      expect(page.getSectionItem(2).hasAttribute("disabled")).toBeTruthy();
      expect(page.getSectionItem(3).hasAttribute("disabled")).toBeTruthy();
      expect(page.getSectionItem(4).hasAttribute("disabled")).toBeTruthy();
    });
  });
});
