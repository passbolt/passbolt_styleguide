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
 * @since         5.4.0
 */

import {waitFor} from '@testing-library/dom';
import {defaultDisabledProps, defaultProps} from './DisplayAdministrationMetadataGettingStarted.test.data';
import DisplayAdministrationMetadataGettingStartedPage from './DisplayAdministrationMetadataGettingStarted.test.page';

describe('DisplayAdministrationMetadataGettingStarted', () => {
  let page, props;

  beforeEach(() => {
    props = new defaultProps();
    page = new DisplayAdministrationMetadataGettingStartedPage(props);
  });

  it('should display the title and description', () => {
    expect.assertions(2);
    expect(page.title).toBe('Getting Started');
    expect(page.description).toBe('Define the strategy to enable encrypted metadata and new resource types.');
  });

  it('should allow selecting enable encrypted metadata and save it', async() => {
    expect.assertions(3);
    jest.spyOn(props.context.port, "request");

    await page.selectEnableEncryptedMetadata();
    expect(page.keepLegacyCleartextMetadataRadio.checked).toEqual(false);
    expect(page.enableEncryptedMetadataRadio.checked).toEqual(true);
    await page.clickSaveButton();

    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.metadata.enable-encrypted-metadata-for-existing-instance");
  });

  it.skip('As a logged in administrator I can see an help box in administration metadata getting started screen ', async() => {
    expect.assertions(6);

    expect(page.exists()).toBeTruthy();
    await waitFor(() => {});
    expect(page.helpBox).not.toBeNull();
    expect(page.helpBoxTitle.textContent).toBe("Need some help?");
    expect(page.helpBoxDescription.textContent).toBe("For more information about MFA policy settings, checkout the dedicated page on the help website.");
    expect(page.helpBoxButton.textContent).toEqual("Read the documentation");
    expect(page.helpBoxButton.getAttribute('href')).toEqual('https://passbolt.com/docs/admin/authentication/mfa-policy');
  });


  it('should allow selecting keep legacy cleartext metadata and save it', async() => {
    expect.assertions(3);
    jest.spyOn(props.context.port, "request");

    await page.selectKeepLegacyCleartextMetadata();
    expect(page.keepLegacyCleartextMetadataRadio.checked).toEqual(true);
    expect(page.enableEncryptedMetadataRadio.checked).toEqual(false);

    await page.clickSaveButton();

    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.metadata.keep-cleartext-metadata-for-existing-instance");
  });

  it('should not be able to save if settings are already saved', async() => {
    expect.assertions(3);

    props = new defaultDisabledProps();
    page = new DisplayAdministrationMetadataGettingStartedPage(props);

    expect(page.keepLegacyCleartextMetadataRadio.hasAttribute("disabled")).toEqual(true);
    expect(page.enableEncryptedMetadataRadio.hasAttribute("disabled")).toEqual(true);
    expect(page.saveButton.hasAttribute("disabled")).toEqual(true);
  });
});
