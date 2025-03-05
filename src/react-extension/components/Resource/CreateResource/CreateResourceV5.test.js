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
import {defaultProps} from "./CreateResourceV5.test.data";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";

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
  });
});

