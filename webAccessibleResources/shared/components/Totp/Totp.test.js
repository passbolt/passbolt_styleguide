/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import TotpTestPage from "./Totp.test.page";
import {defaultProps} from "./Totp.test.data";
import {TotpCodeGeneratorService} from "../../services/otp/TotpCodeGeneratorService";

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

describe("Totp", () => {
  describe('As a signed-in user I can see the TOTP code', () => {
    it('Matches the styleguide', () => {
      const props = defaultProps();
      const page = new TotpTestPage(props);
      const code = TotpCodeGeneratorService.generate(props.totp);

      expect.assertions(2);

      expect(page._page.container.textContent).toContain(code.substring(0, 3));
      expect(page._page.container.textContent).toContain(code.substring(3));
    });
  });

  describe('As a signed-in user I can see the TOTP changing with the next TOTP period', () => {
    it('Matches the styleguide', () => {
      const props = defaultProps();
      const page = new TotpTestPage(props);

      expect.assertions(5);

      const code = TotpCodeGeneratorService.generate(props.totp);
      expect(page._page.container.textContent).toContain(code.substring(0, 3));
      expect(page._page.container.textContent).toContain(code.substring(3));

      jest.advanceTimersByTime(31000);

      const code2 = TotpCodeGeneratorService.generate(props.totp);
      expect(code2).not.toEqual(code);
      expect(page._page.container.textContent).toContain(code2.substring(0, 3));
      expect(page._page.container.textContent).toContain(code2.substring(3));
    });
  });
});
