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
 * Unit tests on ConfigurePasswordGenerator in regard of specifications
 */
import ConfigurePasswordGeneratorPage from "./ConfigurePasswordGenerator.test.page";
import {defaultProps} from "./ConfigurePasswordGenerator.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("Configure Password Generator", () => {
  let page; // The page to test against
  let props = null; // The page props

  beforeEach(() => {
    props = defaultProps(); // The props to pass
    page = new ConfigurePasswordGeneratorPage(props);
  });

  describe('As LU I should update the password configuration', () => {
    it('As LU I should change the range of word count', async() => {
      expect(page.rangeLength.value).toBe("10");
      expect(page.length.value).toBe("10");
      await page.changeRangeLength("20");
      expect(page.rangeLength.value).toBe("20");
      expect(page.length.value).toBe("20");
      expect(props.onChanged).toHaveBeenCalled();
    });

    it('As LU I should change the number of word count', async() => {
      expect(page.rangeLength.value).toBe("10");
      expect(page.length.value).toBe("10");
      await page.changeLength("20");
      expect(page.rangeLength.value).toBe("20");
      expect(page.length.value).toBe("20");
      expect(props.onChanged).toHaveBeenCalled();
    });

    it('As LU I should change the masks', async() => {
      expect(page.numberOfActiveMask).toBe(1);
      await page.selectMask(1);
      expect(page.numberOfActiveMask).toBe(2);
      expect(props.onChanged).toHaveBeenCalled();
    });

    it('As LU I should change the look alike', async() => {
      expect(page.isCheckedLookAlike).toBeTruthy();
      await page.changeLookAlike();
      expect(page.isCheckedLookAlike).toBeFalsy();
      expect(props.onChanged).toHaveBeenCalled();
    });
  });
});
