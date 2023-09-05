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

import each from 'jest-each';
import {defaultAppContext} from '../../../contexts/ApiAppContext.test.data';
import {defaultProps} from './DisplayAdministrationUserPassphrasePolicies.test.data';
import {defaultUserPassphrasePoliciesDto} from '../../../../shared/models/userPassphrasePolicies/UserPassphrasePoliciesDto.test.data';
import DisplayAdministrationUserPassphrasePoliciesPage from './DisplayAdministrationUserPassphrasePolicies.test.page';
import {waitForTrue} from '../../../../../test/utils/waitFor';

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
      expect(helpPageLink.getAttribute('href')).toStrictEqual("https://help.passbolt.com/configure/user-passphrase-policies");
    });

    each([
      defaultUserPassphrasePoliciesDto(),
      null,
    ]).describe('As an administrator I should see the default settings', dto => {
      it(`with ${JSON.stringify(dto)}`, async() => {
        expect.assertions(2);
        const context = defaultAppContext();
        const props = defaultProps();
        props.context.port.addRequestListener("passbolt.user-passphrase-policies.find", () => dto);

        const page = new DisplayAdministrationUserPassphrasePoliciesPage(context, props);
        await waitForTrue(() => page.exists());

        expect(page.getSelectedEntropyMinimumValue()).toStrictEqual(`50 bits`);
        expect(page.externalDictionaryCheck.checked).toStrictEqual(true);
      });
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
});
