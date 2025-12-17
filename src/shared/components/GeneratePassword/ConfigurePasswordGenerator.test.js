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
import { defaultProps } from "./ConfigurePasswordGenerator.test.data";

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

  describe("As LU I should update the password configuration", () => {
    it("As LU I should change the range of word count", async () => {
      expect.assertions(5);
      expect(page.rangeLength.value).toBe("18");
      expect(page.length.value).toBe("18");
      await page.changeRangeLength("20");
      page.rerender(props);
      expect(page.rangeLength.value).toBe("20");
      expect(page.length.value).toBe("20");
      expect(props.onConfigurationChanged).toHaveBeenCalled();
    });

    it("As LU I should change the number of word count", async () => {
      expect.assertions(5);
      expect(page.rangeLength.value).toBe("18");
      expect(page.length.value).toBe("18");
      await page.changeLength("20");
      page.rerender(props);
      expect(page.rangeLength.value).toBe("20");
      expect(page.length.value).toBe("20");
      expect(props.onConfigurationChanged).toHaveBeenCalled();
    });

    it("As LU I should change the masks", async () => {
      expect.assertions(3);
      expect(page.numberOfActiveMask).toBe(9);
      await page.selectMask(1);
      page.rerender(props);
      expect(page.numberOfActiveMask).toBe(8);
      expect(props.onConfigurationChanged).toHaveBeenCalled();
    });

    it("As LU I should change the look alike", async () => {
      expect.assertions(3);
      expect(page.isCheckedLookAlike).toBeTruthy();
      await page.changeLookAlike();
      page.rerender(props);
      expect(page.isCheckedLookAlike).toBeFalsy();
      expect(props.onConfigurationChanged).toHaveBeenCalled();
    });
  });
});
