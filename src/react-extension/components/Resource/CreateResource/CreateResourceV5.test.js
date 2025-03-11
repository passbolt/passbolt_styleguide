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
 * Unit tests on Create Resource in regard of specifications
 */
import {waitFor} from "@testing-library/react";
import CreateResourcePage from "./CreateResourceV5.test.page";
import {defaultProps, defaultTotpProps} from "./CreateResourceV5.test.data";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import {ResourceEditCreateFormEnumerationTypes} from "../../../../shared/models/resource/ResourceEditCreateFormEnumerationTypes";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import {
  resourceTypePasswordStringDto,
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";

describe("See the Create Resource", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('As LU I can start adding a password', () => {
    describe('Styleguide', () => {
      it('matches the styleguide', async() => {
        expect.assertions(18);
        const props = defaultProps(); // The props to pass
        const page = new CreateResourcePage(props);
        await waitFor(() => {});
        // Dialog title exists and correct
        expect(page.exists()).toBeTruthy();
        expect(page.header.textContent).toBe("Create a resource");

        // Close button exists
        expect(page.dialogClose).not.toBeNull();

        // Name input field exists.
        expect(page.name.value).toBe("");
        // Uri input field exists.
        expect(page.uri.value).toBe("");
        // Username input field exists.
        expect(page.username.value).toBe("");
        // Password input field exists
        expect(page.password).not.toBeNull();
        expect(page.password.value).toBe("");
        expect(page.password.getAttribute("type")).toBe("password");
        const passwordInputStyle = window.getComputedStyle(page.password);
        expect(passwordInputStyle.background).toBe("white");
        expect(passwordInputStyle.color).toBe("");

        // Complexity label exists but is not yet defined.
        expect(page.complexityText.textContent).toBe("Quality Entropy: 0.0 bits");

        // Password view button exists.
        expect(page.passwordViewButton).not.toBeNull();
        expect(page.passwordViewButton.classList.contains("eye-open")).toBe(true);
        expect(page.passwordViewButton.classList.contains("eye-close")).toBe(false);

        // Password generate button exists.
        expect(page.passwordGenerateButton).not.toBeNull();

        // Save button exists
        expect(page.saveButton.textContent).toBe("Create");

        // Cancel button exists
        expect(page.cancelButton.textContent).toBe("Cancel");
      });
    });

    describe("should select a resource form", () => {
      it('As a signed-in user I should be able to select description form', async() => {
        expect.assertions(5);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();
        expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");
        // select description form
        await page.click(page.getSectionItem(2));
        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Description");
        expect(page.description).toBeDefined();
        expect(page.password).toBeNull();
      });
    });

    describe("should add a secret to a resource", () => {
      it('As a signed-in user I should be able to add secret without a resource type mutation', async() => {
        expect.assertions(2);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretNote);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Note");
        expect(page.note).toBeDefined();
      });

      it('As a signed-in user I should be able to add secret with a resource type mutation', async() => {
        expect.assertions(2);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretTotp);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("TOTP");
        expect(page.note).toBeDefined();
      });

      it('As a signed-in user I should be able to add secret with a resource type mutation with a standalone totp', async() => {
        expect.assertions(2);

        const props = defaultTotpProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretPassword);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");
        expect(page.password).toBeDefined();
      });

      it('As a signed-in user I should be able to add secret totp for a resource v4 password string', async() => {
        expect.assertions(3);

        const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordStringDto()),});
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretTotp);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("TOTP");
        expect(page.note).toBeDefined();
        expect(page.getSectionItem(4).hasAttribute("disabled")).toBeTruthy();
      });
    });

    describe("should delete a secret to a resource", () => {
      it('As a signed-in user I should be able to delete secret without a resource type mutation', async() => {
        expect.assertions(3);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretNote);

        expect(page.sectionItemSelected.textContent).toStrictEqual("Note");

        await page.click(page.deleteSecretNote);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");
        expect(page.password).toBeDefined();
      });

      it('As a signed-in user I should be able to delete secret with a resource type mutation', async() => {
        expect.assertions(3);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretTotp);

        expect(page.sectionItemSelected.textContent).toStrictEqual("TOTP");

        await page.click(page.deleteSecretPassword);

        await page.click(page.getSectionItem(2));

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Description");
        expect(page.description).toBeDefined();
      });

      it('As a signed-in user I should be able to delete secret totp for a resource v4 password string', async() => {
        expect.assertions(4);

        const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordStringDto()),});
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretTotp);

        expect(page.sectionItemSelected.textContent).toStrictEqual("TOTP");

        await page.click(page.deleteSecretTotp);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");
        expect(page.password).toBeDefined();
        expect(page.getSectionItem(3).hasAttribute("disabled")).toBeTruthy();
      });
    });

    describe("should init password form", () => {
      it('As a signed-in user I should be able to add an URI', async() => {
        expect.assertions(2);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        await page.fillInput(page.uri, "https://passbolt.com");
        // expectations
        expect(page.uri.value).toBe("https://passbolt.com");
      });

      it('As a signed-in user I should be able to add an username', async() => {
        expect.assertions(2);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        await page.fillInput(page.username, "username");
        // expectations
        expect(page.username.value).toBe("username");
      });

      it('As a signed-in user I should be able to add a password', async() => {
        expect.assertions(2);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        await page.fillInput(page.password, "secret");
        // expectations
        expect(page.password.value).toBe("secret");
      });

      it('As a signed-in user I should be able to generate a password', async() => {
        expect.assertions(5);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        jest.spyOn(SecretGenerator, "generate").mockImplementation(() => "generate-password");
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();
        expect(page.password.value).toBe("");

        await page.click(page.passwordGenerateButton);
        // expectations
        expect(page.password.value).toBe("generate-password");
        expect(page.complexityText.textContent).not.toBe("Quality Entropy: 0.0 bits");
        expect(page.progressBar.classList.contains("error")).toBe(false);
      });
    });

    describe("should add a name to resource", () => {
      it('As a signed-in user I should be able to add name to a resource', async() => {
        expect.assertions(1);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.fillInput(page.name, "name");

        // expectations
        expect(page.name.value).toEqual("name");
      });
    });

    describe("should init description field", () => {
      it('As a signed-in user I should be able to add a description', async() => {
        expect.assertions(2);

        const props = defaultProps({resourceFormSelected: ResourceEditCreateFormEnumerationTypes.DESCRIPTION});

        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();
        await page.click(page.menuDescription);
        await page.fillInput(page.description, "description");
        // expectations
        expect(page.description.value).toBe("description");
      });
    });
    describe("should init totp form", () => {
      it('As a signed-in user I should be able to add an URI', async() => {
        expect.assertions(2);

        const props = defaultTotpProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        await page.fillInput(page.uri, "https://passbolt.com");
        // expectations
        expect(page.uri.value).toBe("https://passbolt.com");
      });

      it('As a signed-in user I should be able to add a resource totp key', async() => {
        expect.assertions(2);

        const props = defaultTotpProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        await page.fillInput(page.resourceTotpKey, "key");
        // expectations
        expect(page.resourceTotpKey.value).toBe("key");
      });

      it('As a signed-in user I should be able to add a totp expiry', async() => {
        expect.assertions(2);

        const props = defaultTotpProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        await page.click(page.advancedSettings);
        await page.fillInput(page.period, "60");

        // expectations
        expect(page.period.value).toBe("60");
      });

      it('As a signed-in user I should be able to add a totp length', async() => {
        expect.assertions(2);

        const props = defaultTotpProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        await page.click(page.advancedSettings);
        await page.fillInput(page.digits, "8");

        // expectations
        expect(page.digits.value).toBe("8");
      });
      it('As a signed-in user I should be able to select an algorithm', async() => {
        expect.assertions(2);

        const props = defaultTotpProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        await page.click(page.advancedSettings);
        await page.click(page.algorithm);
        await page.click(page.firstItemOption);
        // expectations
        expect(page.algorithm.textContent).toBe("SHA256");
      });
    });
    describe("should fill note form", () => {
      it('As a signed-in user I should be able to add a note', async() => {
        expect.assertions(2);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretNote);

        expect(page.exists()).toBeTruthy();

        await page.fillInput(page.note, "note");
        // expectations
        expect(page.note.value).toBe("note");
      });
    });
  });

  describe("Close dialog", () => {
    it('As LU I can stop creating a password by clicking on the cancel button', async() => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      const page = new CreateResourcePage(props);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      await page.click(page.cancelButton);
      expect(props.onClose).toHaveBeenCalled();
    });

    it('As LU I can stop creating a password by closing the dialog', async() => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      const page = new CreateResourcePage(props);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      await page.click(page.dialogClose);
      expect(props.onClose).toHaveBeenCalled();
    });

    it('As LU I can stop adding a password with the keyboard (escape)', async() => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      const page = new CreateResourcePage(props);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      await page.escapeKey(page.dialogClose);
      expect(props.onClose).toHaveBeenCalled();
    });
  });
});

