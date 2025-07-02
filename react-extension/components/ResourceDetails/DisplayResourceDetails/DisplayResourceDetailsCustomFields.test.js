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
 * @since         5.3.0
 */

/**
 * Unit tests on DisplayResourceDetailsCustomFields in regard of specifications
 */
import {plaintextSecretCustomFieldsDto} from "../../../../shared/models/entity/plaintextSecret/plaintextSecretEntity.test.data";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import {
  defaultProps,
  propsWithApiFlagDisabled,
  propsWithDenyUiAction,
  resourceWithCustomFields,
} from "./DisplayResourceDetailsCustomFields.test.data";
import DisplayResourceDetailsCustomFieldsPage from "./DisplayResourceDetailsCustomFields.test.page";
import "../../../../../test/mocks/mockClipboard";

describe("See custom fields", () => {
  let props, resourceWithCustomFieldsDto;

  beforeEach(() => {
    jest.clearAllMocks();
    resourceWithCustomFieldsDto = resourceWithCustomFields;
    props = defaultProps({resourceWorkspaceContext: {details: {resource: resourceWithCustomFieldsDto}}});
    jest.spyOn(props.context.port, 'request').mockImplementation(() => plaintextSecretCustomFieldsDto(
      resourceWithCustomFieldsDto.metadata
    ));
  });

  it('As LU I see the encrypted custom fields of my resources', async() => {
    expect.assertions(7);

    const page = new DisplayResourceDetailsCustomFieldsPage(props);

    // by default the custom fields should be encrypted
    expect(page.exists()).toBeTruthy();
    expect(page.customFieldsCount).toBe(3);
    expect(page.getCustomFieldLabel(0).textContent).toBe("API Key");
    expect(page.getCustomFieldLabel(1).textContent).toBe("Environment");
    expect(page.getCustomFieldLabel(2).textContent).toBe("Database URL");

    await page.clickOn(page.title);

    expect(page.isOpen).toBeFalsy();
    expect(page.customFieldsSection).toBeNull();
  });

  it('As LU I should be able to open and close the section', async() => {
    expect.assertions(3);

    const page = new DisplayResourceDetailsCustomFieldsPage(props);

    expect(page.isOpen).toBeTruthy();

    await page.clickOn(page.title);

    expect(page.isOpen).toBeFalsy();

    await page.clickOn(page.title);

    expect(page.isOpen).toBeTruthy();
  });

  describe('As LU I can preview a dedicated custom field secret of a resource', () => {
    it('See the decrypted custom field when clicking on the preview button', async() => {
      expect.assertions(4);

      const page = new DisplayResourceDetailsCustomFieldsPage(props);

      expect(page.getCustomFieldValue(0).textContent).toBe("There is no password");

      await page.hover(page.getPreviewButton(0));
      await page.clickOn(page.getPreviewButton(0));

      expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.find-by-resource-id', props.resourceWorkspaceContext.details.resource.id);
      expect(page.getCustomFieldValue(0).textContent).toBe("I am a secret");

      await page.hover(page.getPreviewButton(0));
      await page.clickOn(page.getPreviewButton(0));

      expect(page.getCustomFieldValue(0).textContent).toBe("There is no password");
    });
    it('Should not run the decryption a second time for individual field', async() => {
      expect.assertions(4);

      const page = new DisplayResourceDetailsCustomFieldsPage(props);

      await page.hover(page.getPreviewButton(0));
      await page.clickOn(page.getPreviewButton(0));

      expect(page.getCustomFieldValue(0).textContent).toBe("I am a secret");

      await page.hover(page.getPreviewButton(1));
      await page.clickOn(page.getPreviewButton(1));

      expect(page.getCustomFieldValue(1).textContent).toBe("I am a secret 2");
      expect(props.context.port.request).toHaveBeenCalledWith('passbolt.secret.find-by-resource-id', props.resourceWorkspaceContext.details.resource.id);
      expect(props.context.port.request).toHaveBeenCalledTimes(1);
    });

    it('Should toggle individual custom field visibility correctly', async() => {
      expect.assertions(6);

      const page = new DisplayResourceDetailsCustomFieldsPage(props);

      expect(page.getCustomFieldValue(0).textContent).toBe("There is no password");

      await page.hover(page.getPreviewButton(0));
      await page.clickOn(page.getPreviewButton(0));

      expect(page.getCustomFieldValue(0).textContent).toBe("I am a secret");

      await page.hover(page.getPreviewButton(1));
      await page.clickOn(page.getPreviewButton(1));

      expect(page.getCustomFieldValue(0).textContent).toBe("I am a secret");
      expect(page.getCustomFieldValue(1).textContent).toBe("I am a secret 2");

      await page.hover(page.getPreviewButton(1));
      await page.clickOn(page.getPreviewButton(1));

      expect(page.getCustomFieldValue(0).textContent).toBe("I am a secret");
      expect(page.getCustomFieldValue(1).textContent).toBe("There is no password");
    });

    it('AS LU, I cannot preview secret of a custom field if denied by RBAC', async() => {
      expect.assertions(1);

      const props = propsWithDenyUiAction(
        {
          resource: resourceWithCustomFieldsDto
        }
      );
      const page = new DisplayResourceDetailsCustomFieldsPage(props);

      await page.hover(page.getCustomFieldValue(0));

      expect(page.getPreviewButton(0)).toBeUndefined();
    });

    it('AS LU, I cannot preview secret of a custom field if disable by API flag', async() => {
      expect.assertions(1);

      const props = propsWithApiFlagDisabled(
        {
          resource: resourceWithCustomFieldsDto
        }
      );
      const page = new DisplayResourceDetailsCustomFieldsPage(props);

      await page.hover(page.getCustomFieldValue(0));

      expect(page.getPreviewButton(0)).toBeUndefined();
    });
  });

  describe('As LU I can preview all custom field secrets of a resource', () => {
    it('See all decrypted custom fields when clicking on "Show all" button', async() => {
      expect.assertions(3);

      const page = new DisplayResourceDetailsCustomFieldsPage(props);

      await page.clickOn(page.showAllButton);

      expect(page.getCustomFieldValue(0).textContent).toBe("I am a secret");
      expect(page.getCustomFieldValue(1).textContent).toBe("I am a secret 2");
      expect(page.getCustomFieldValue(2).textContent).toBe("I am a secret 3");
    });

    it('Should hide all custom fields when clicking "Hide all" button', async() => {
      expect.assertions(6);

      const page = new DisplayResourceDetailsCustomFieldsPage(props);

      await page.clickOn(page.showAllButton);

      expect(page.getCustomFieldValue(0).textContent).toBe("I am a secret");
      expect(page.getCustomFieldValue(1).textContent).toBe("I am a secret 2");
      expect(page.getCustomFieldValue(2).textContent).toBe("I am a secret 3");

      await page.clickOn(page.hideAllButton);

      expect(page.getCustomFieldValue(0).textContent).toBe("There is no password");
      expect(page.getCustomFieldValue(1).textContent).toBe("There is no password");
      expect(page.getCustomFieldValue(2).textContent).toBe("There is no password");
    });

    it('Should not show empty secrets', async() => {
      expect.assertions(3);

      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => ({}));

      const page = new DisplayResourceDetailsCustomFieldsPage(props);

      await page.clickOn(page.showAllButton);

      expect(page.getCustomFieldValue(0).textContent).toBe("There is no password");
      expect(page.getCustomFieldValue(1).textContent).toBe("There is no password");
      expect(page.getCustomFieldValue(2).textContent).toBe("There is no password");
    });

    it('AS LU, I cannot preview all secrets of a custom field if denied by RBAC', async() => {
      expect.assertions(1);

      const props = propsWithDenyUiAction(
        {
          resource: resourceWithCustomFieldsDto
        }
      );

      const page = new DisplayResourceDetailsCustomFieldsPage(props);

      expect(page.showAllButton).toBeNull();
    });

    it('AS LU, I cannot preview  all secrets of a custom field if disable by API flag', async() => {
      expect.assertions(1);

      const props = propsWithApiFlagDisabled(
        {
          resource: resourceWithCustomFieldsDto
        }
      );
      const page = new DisplayResourceDetailsCustomFieldsPage(props);


      expect(page.showAllButton).toBeNull();
    });
  });

  describe(' As LU I can copy a custom field secret of a resource to clipboard', () => {
    it('AS LU, I should be able to copy the secret of a resource to clipboard', async() => {
      expect.assertions(2);

      const page = new DisplayResourceDetailsCustomFieldsPage(props);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.hover(page.getCustomFieldValue(0));
      await page.clickOn(page.getCustomFieldValueButton(0));

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("I am a secret");
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The secret has been copied to clipboard");
    });

    it('AS LU, I cannot copy secret of resource if denied by RBAC', async() => {
      const props = propsWithDenyUiAction(
        {
          resource: resourceWithCustomFieldsDto
        }
      );
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      const page = new DisplayResourceDetailsCustomFieldsPage(props);

      await page.hover(page.getCustomFieldValue(0));
      await page.clickOn(page.getCustomFieldValueButton(0));

      expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
      expect(ActionFeedbackContext._currentValue.displaySuccess).not.toHaveBeenCalled();
    });
  });

  describe(' As LU I can copy a custom field key of a resource to clipboard', () => {
    it('AS LU, I should be able to copy the key of a resource to clipboard', async() => {
      expect.assertions(2);

      const page = new DisplayResourceDetailsCustomFieldsPage(props);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.hover(page.getCustomFieldLabel(0));
      await page.clickOn(page.getCustomFieldLabel(0));

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("API Key");
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The secret has been copied to clipboard");
    });

    it('AS LU, I cannot copy secret of resource if denied by RBAC', async() => {
      const props = propsWithDenyUiAction(
        {
          resource: resourceWithCustomFieldsDto
        }
      );
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      const page = new DisplayResourceDetailsCustomFieldsPage(props);

      await page.hover(page.getCustomFieldLabel(0));
      await page.clickOn(page.getCustomFieldLabel(0));

      expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
      expect(ActionFeedbackContext._currentValue.displaySuccess).not.toHaveBeenCalled();
    });
  });
});
