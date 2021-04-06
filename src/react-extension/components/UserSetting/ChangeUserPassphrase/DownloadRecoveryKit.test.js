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
 * @since         3.1.0
 */

/**
 * Unit tests on DownloadRecoveryKit in regard of specifications
 */
import DownloadRecoveryKitPage from "./DownloadRecoveryKit.test.page";
import {defaultProps} from "./DownloadRecoveryKit.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see the user confirm passphrase page", () => {
  let page; // The page to test against
  const props = defaultProps();

  describe('As LU I can start to download the recovery kit', () => {
    /**
     * Given the user settings passphrase
     * I should be able to download the recovery kit
     */
    beforeEach(() => {
      page = new DownloadRecoveryKitPage(props);
    });

    it('As LU I should be able to download the recovery kit', async() => {
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe('The passphrase was updated!');

      await page.downloadBackup();
      expect(props.userSettingsContext.onDownloadRecoveryKitRequested).toHaveBeenCalledTimes(1);
    });
  });
});
