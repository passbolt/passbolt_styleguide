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
 * @since         3.3.0
 */

/**
 * Unit tests on ConfigurePassphraseGenerator in regard of specifications
 */
import ConfigurePassphraseGeneratorPage from "./ConfigurePassphraseGenerator.test.page";
import {defaultProps} from "./ConfigurePassphraseGenerator.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("Configure Passphrase Generator", () => {
  let page; // The page to test against
  let props = null; // The page props

  beforeEach(() => {
    props = defaultProps(); // The props to pass
    page = new ConfigurePassphraseGeneratorPage(props);
  });

  describe('As LU I should update the passphrase configuration', () => {
    it('As LU I should change the range of word count', async() => {
      expect(page.rangeWordCount.value).toBe("8");
      expect(page.numberWordCount.value).toBe("8");
      await page.changeRangeWordCount("20");
      expect(page.rangeWordCount.value).toBe("20");
      expect(page.numberWordCount.value).toBe("20");
      expect(props.onChanged).toHaveBeenCalled();
    });

    it('As LU I should change the number of word count', async() => {
      expect(page.rangeWordCount.value).toBe("8");
      expect(page.numberWordCount.value).toBe("8");
      await page.changeNumberWordCount("20");
      expect(page.rangeWordCount.value).toBe("20");
      expect(page.numberWordCount.value).toBe("20");
      expect(props.onChanged).toHaveBeenCalled();
    });

    it('As LU I should change the separator', async() => {
      expect(page.separator.value).toBe(' ');
      await page.changeSeparator('{}');
      expect(page.separator.value).toBe('{}');
      expect(props.onChanged).toHaveBeenCalled();
    });

    it('As LU I should change the separator', async() => {
      expect(page.wordCase.textContent).toBe('Lower case');
      await page.changeWordCase();
      expect(page.wordCase.textContent).toBe('Upper case');
      expect(props.onChanged).toHaveBeenCalled();
    });
  });
});
