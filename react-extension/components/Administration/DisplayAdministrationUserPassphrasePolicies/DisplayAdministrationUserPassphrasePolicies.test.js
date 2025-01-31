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
 * @since         4.3.0
 */

import "../../../../../test/mocks/mockPortal";
import each from 'jest-each';
import {defaultAppContext} from '../../../contexts/ApiAppContext.test.data';
import {defaultProps} from './DisplayAdministrationUserPassphrasePolicies.test.data';
import {defaultUserPassphrasePoliciesEntityDto, userPassphrasePoliciesEntityDtoFromApi} from '../../../../shared/models/userPassphrasePolicies/UserPassphrasePoliciesDto.test.data';
import DisplayAdministrationUserPassphrasePoliciesPage from './DisplayAdministrationUserPassphrasePolicies.test.page';
import {waitForTrue} from '../../../../../test/utils/waitFor';
import NotifyError from '../../Common/Error/NotifyError/NotifyError';

/**
 * Unit tests on DisplayAdministrationUserPassphrasePolicies in regard of specifications
 */
describe("DisplayAdministrationUserPassphrasePolicies", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe("As a signed-in administrator I can see the user passphrase policy settings", () => {
    it('The component loads properly', async() => {
      expect.assertions(2);
      const context = defaultAppContext();
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.user-passphrase-policies.find", () => null);

      const page = new DisplayAdministrationUserPassphrasePoliciesPage(context, props);
      await waitForTrue(() => page.exists());

      expect(page.saveSettingsButton).not.toBeNull();
      expect(page.title.textContent).toBe("User Passphrase Policies");
    });

    it('As an administrator I can access the user passphrase policies help page', async() => {
      expect.assertions(3);
      const context = defaultAppContext();
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.user-passphrase-policies.find", () => null);

      const page = new DisplayAdministrationUserPassphrasePoliciesPage(context, props);
      await waitForTrue(() => page.exists());

      const helpPageLink = page.helpPageLink;
      expect(helpPageLink).not.toBeNull();
      expect(helpPageLink.getAttribute('rel')).toStrictEqual("noopener noreferrer");
      expect(helpPageLink.getAttribute('href')).toStrictEqual("https://passbolt.com/docs/admin/authentication/user-passphrase-policies/");
    });

    it('As an administrator I should see the default settings', async() => {
      expect.assertions(2);
      const context = defaultAppContext();
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.user-passphrase-policies.find", () => null);

      const page = new DisplayAdministrationUserPassphrasePoliciesPage(context, props);
      await waitForTrue(() => page.exists());

      expect(page.getSelectedEntropyMinimumValue()).toStrictEqual(`50 bits`);
      expect(page.externalDictionaryCheck.checked).toStrictEqual(false);
    });

    each([
      {external_dictionary_check: true, entropy_minimum: 64},
      {external_dictionary_check: false, entropy_minimum: 128},
      {external_dictionary_check: true, entropy_minimum: 50},
    ]).describe("As an administrator I should see the custom settings", dto => {
      it(`with ${JSON.stringify(dto)}`, async() => {
        expect.assertions(2);

        const context = defaultAppContext();
        const props = defaultProps();
        props.context.port.addRequestListener("passbolt.user-passphrase-policies.find", () => dto);

        const page = new DisplayAdministrationUserPassphrasePoliciesPage(context, props);
        await waitForTrue(() => page.exists());

        expect(page.getSelectedEntropyMinimumValue()).toStrictEqual(`${dto.entropy_minimum.toString()} bits`);
        expect(page.externalDictionaryCheck.checked).toStrictEqual(dto.external_dictionary_check);
      });
    });
  });

  describe('As a signed-in administrator I can customise the user passphrase policy settings', () => {
    it('As an administrator when I modify a field, I can see a changes warning message', async() => {
      expect.assertions(1);
      const context = defaultAppContext();
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.user-passphrase-policies.find", () => null);

      const page = new DisplayAdministrationUserPassphrasePoliciesPage(context, props);
      await waitForTrue(() => page.exists());

      await page.clickOnExternalDictionaryCheck();

      expect(page.saveWarningBanner).not.toBeNull();
    });

    it('As an administrator I should be warned if I define weak settings', async() => {
      expect.assertions(1);
      const context = defaultAppContext();
      const props = defaultProps();
      const strongEntityDto = defaultUserPassphrasePoliciesEntityDto({
        entropy_minimum: 112
      });
      props.context.port.addRequestListener("passbolt.user-passphrase-policies.find", () => strongEntityDto);

      const page = new DisplayAdministrationUserPassphrasePoliciesPage(context, props);
      await waitForTrue(() => page.exists());

      const entropyLabelIndex = 1;
      await page.clickOnEntropyLabel(entropyLabelIndex);

      expect(page.weakSettingsWarningBanner).not.toBeNull();
    });

    it('As an administrator when I save the policy, I can see a success feedback', async() => {
      expect.assertions(3);
      const context = defaultAppContext();
      const props = defaultProps();
      const entityDto = defaultUserPassphrasePoliciesEntityDto();
      props.context.port.addRequestListener("passbolt.user-passphrase-policies.find", () => entityDto);

      const page = new DisplayAdministrationUserPassphrasePoliciesPage(context, props);
      await waitForTrue(() => page.exists());

      //changes are pending
      await page.clickOnExternalDictionaryCheck();

      expect(page.saveWarningBanner).not.toBeNull();
      await page.clickOnSave();

      //changes are not pending anymore, saved happened
      expect(page.saveWarningBanner).toBeNull();
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledTimes(1);
    });

    it('As an administrator I can save the policy', async() => {
      expect.assertions(2);
      const context = defaultAppContext();
      const props = defaultProps();
      const entityDto = userPassphrasePoliciesEntityDtoFromApi({
        entropy_minimum: 50,
        external_dictionary_check: false
      });
      const expectedData = {
        entropy_minimum: 128,
        external_dictionary_check: true
      };
      props.context.port.addRequestListener("passbolt.user-passphrase-policies.find", () => entityDto);
      props.context.port.addRequestListener("passbolt.user-passphrase-policies.save", entityDtoToSave => {
        expect(entityDtoToSave?.entropy_minimum).toStrictEqual(expectedData.entropy_minimum);
        expect(entityDtoToSave?.external_dictionary_check).toStrictEqual(expectedData.external_dictionary_check);
        return expectedData;
      });

      const page = new DisplayAdministrationUserPassphrasePoliciesPage(context, props);
      await waitForTrue(() => page.exists());

      const entropyLabel128Index = 4;
      await page.clickOnExternalDictionaryCheck();
      await page.clickOnEntropyLabel(entropyLabel128Index);
      await page.clickOnSave();
    });

    it('As an administrator when I save the policy, I cannot update any form fields', async() => {
      expect.assertions(2);
      const context = defaultAppContext();
      const props = defaultProps();
      const entityDto = defaultUserPassphrasePoliciesEntityDto();
      props.context.port.addRequestListener("passbolt.user-passphrase-policies.find", () => entityDto);

      let savePromise;
      props.context.port.addRequestListener("passbolt.user-passphrase-policies.save", () => new Promise(resolve => {
        savePromise = resolve;
      }));

      const page = new DisplayAdministrationUserPassphrasePoliciesPage(context, props);
      await waitForTrue(() => page.exists());

      page.clickOn(page.saveSettingsButton);

      await waitForTrue(() => page.externalDictionaryCheck.hasAttribute('disabled'));
      expect(page.externalDictionaryCheck.hasAttribute('disabled')).toStrictEqual(true);

      await savePromise(entityDto);

      await waitForTrue(() => !page.externalDictionaryCheck.hasAttribute('disabled'));
      expect(page.externalDictionaryCheck.hasAttribute('disabled')).toStrictEqual(false);
    });

    it('As an administrator when I save the policy, I cannot trigger an action on settings page', async() => {
      expect.assertions(2);
      const context = defaultAppContext();
      const props = defaultProps();
      const entityDto = defaultUserPassphrasePoliciesEntityDto();
      props.context.port.addRequestListener("passbolt.user-passphrase-policies.find", () => entityDto);

      let savePromise;
      props.context.port.addRequestListener("passbolt.user-passphrase-policies.save", () => new Promise(resolve => {
        savePromise = resolve;
      }));

      const page = new DisplayAdministrationUserPassphrasePoliciesPage(context, props);
      await waitForTrue(() => page.exists());

      page.clickOn(page.saveSettingsButton);

      await waitForTrue(() => page.saveSettingsButton.hasAttribute('disabled'));
      expect(page.saveSettingsButton.hasAttribute('disabled')).toStrictEqual(true);

      await savePromise(entityDto);

      await waitForTrue(() => !page.saveSettingsButton.hasAttribute('disabled'));
      expect(page.saveSettingsButton.hasAttribute('disabled')).toStrictEqual(false);
    });

    it('As an administrator when an unexpected error happened while saving the policy, I should see the error dialog', async() => {
      expect.assertions(3);
      const context = defaultAppContext();
      const props = defaultProps();
      const entityDto = defaultUserPassphrasePoliciesEntityDto();
      const expectedError = new Error("Something went wrong!");
      props.context.port.addRequestListener("passbolt.user-passphrase-policies.find", () => entityDto);
      props.context.port.addRequestListener("passbolt.user-passphrase-policies.save", () => { throw expectedError; });

      const page = new DisplayAdministrationUserPassphrasePoliciesPage(context, props);
      await waitForTrue(() => page.exists());
      await page.clickOnSave();
      expect(props.actionFeedbackContext.displayError).toHaveBeenCalledTimes(1);
      expect(props.dialogContext.open).toHaveBeenCalledTimes(1);
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: expectedError});
    });
  });
});
